import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, DoubleSide, MathUtils, Group } from 'three';
import { Text } from '@react-three/drei';
import { VIBRANT_COLORS } from '../constants';

export interface RouletteProps {
  items: string[];
  isSpinning: boolean;
  onSpinComplete: () => void;
  onRotationUpdate: (rotation: number) => void;
}

export default function Roulette({ items, isSpinning, onSpinComplete, onRotationUpdate }: RouletteProps) {
  const wheelRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);
  const spinSpeed = useRef(0);
  const targetRotation = useRef(0);
  const currentRotation = useRef(0);
  const isSpinningRef = useRef(isSpinning);
  const lastSegmentIndex = useRef(0); // 最後に通過したセグメントのインデックス
  const startTime = useRef(0); // 回転開始時刻
  const speedVariationFactor = useRef(1); // 回転速度の変動係数
  const targetSegmentIndex = useRef(0); // 目標となるセグメントのインデックス
  const TOTAL_DURATION = 8; // 合計回転時間（秒）- 8秒に変更
  const ACCELERATION_DURATION = 2; // 加速時間（秒）- 2秒に変更
  const CONSTANT_SPEED_DURATION = 2; // 最高速度維持時間（秒）- 2秒に変更
  const DECELERATION_START = ACCELERATION_DURATION + CONSTANT_SPEED_DURATION; // 減速開始時間（秒）
  // 減速時間は TOTAL_DURATION - DECELERATION_START = 4秒
  const MAX_SPEED = Math.PI * 6; // 最高速度 - 3回転/秒に増加（より速く回転）
  const MAX_ROTATION_ANGLE = Math.PI / 9; // 3Dでの最大傾き角度 - 20度（π/9ラジアン）

  // 初回レンダリング時のアニメーション用の状態
  const [isFirstRender, setIsFirstRender] = useState(true);
  const initialAnimationRef = useRef({ time: 0, duration: 2.1 }); // 持続時間を0.7倍に短縮（3 * 0.7 = 2.1）

  // ルーレットのサイズ設定
  const WHEEL_RADIUS = 3;
  const TEXT_RADIUS = WHEEL_RADIUS * 0.6;
  const CENTER_RADIUS = WHEEL_RADIUS * 0.15;
  const ARROW_POSITION = WHEEL_RADIUS + 0.3;

  // 初回レンダリング時のアニメーション
  useEffect(() => {
    if (isFirstRender) {
      // アニメーション終了後に初回レンダリングフラグをfalseに設定
      const timer = setTimeout(() => {
        setIsFirstRender(false);
      }, initialAnimationRef.current.duration * 1000);
      return () => clearTimeout(timer);
    }
  }, [isFirstRender]);

  // visibilitychangeイベントの監視
  useEffect(() => {
    const handleVisibilityChange = () => {
      // タブがバックグラウンドになった時の処理
      if (document.hidden && isSpinningRef.current) {
        return;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    isSpinningRef.current = isSpinning;
    if (isSpinning) {
      startTime.current = performance.now() / 1000; // 秒単位で保存
      spinSpeed.current = 0; // 初期速度は0
      speedVariationFactor.current = 0.9 + Math.random() * 0.2; // 0.9 ~ 1.1の範囲でランダムな係数を設定
      
      // ランダムに目標セグメントを選択
      targetSegmentIndex.current = Math.floor(Math.random() * items.length);
      const segmentAngle = (Math.PI * 2) / items.length;
      const targetAngle = segmentAngle * targetSegmentIndex.current;
      
      // Z軸の回転は制限なし
      targetRotation.current = targetAngle;
    }
  }, [isSpinning, items.length]);

  useFrame((_, delta) => {
    if (!wheelRef.current || !groupRef.current) return;

    // グループの回転を制限（毎フレーム適用）- X軸とY軸のみ制限
    if (groupRef.current) {
      // X軸とY軸の回転を最大20度（±0.35ラジアン）に制限
      groupRef.current.rotation.x = Math.max(-MAX_ROTATION_ANGLE, Math.min(MAX_ROTATION_ANGLE, groupRef.current.rotation.x));
      groupRef.current.rotation.y = Math.max(-MAX_ROTATION_ANGLE, Math.min(MAX_ROTATION_ANGLE, groupRef.current.rotation.y));
      // Z軸は制限しない
    }

    // 初回レンダリング時のアニメーション
    if (isFirstRender) {
      initialAnimationRef.current.time += delta;
      const t = initialAnimationRef.current.time;
      const duration = initialAnimationRef.current.duration;
      
      // 揺れるアニメーション - より大きな揺れに
      if (t < duration) {
        // より大きな振幅で揺らす
        const swayX = Math.sin(t * 2.5) * 0.15 * Math.max(0, 1 - t / duration);
        const swayY = Math.cos(t * 2) * 0.12 * Math.max(0, 1 - t / duration);
        const swayZ = Math.sin(t * 1.5) * 0.08 * Math.max(0, 1 - t / duration);
        
        // グループ全体を揺らす
        groupRef.current.rotation.x = swayX;
        groupRef.current.rotation.y = swayY;
        
        // ホイールを少し回転させる
        wheelRef.current.rotation.z = swayZ;
      } else {
        // アニメーション終了時に位置をリセット
        groupRef.current.rotation.x = 0;
        groupRef.current.rotation.y = 0;
        wheelRef.current.rotation.z = 0;
      }
      return;
    }

    if (!isSpinningRef.current) return;

    const currentTime = performance.now() / 1000;
    const elapsedTime = currentTime - startTime.current;

    // 回転時間が経過したら停止
    if (elapsedTime >= TOTAL_DURATION) {
      isSpinningRef.current = false;
      
      // 最終的な回転位置を目標位置に調整
      const segmentAngle = (Math.PI * 2) / items.length;
      const targetAngle = segmentAngle * targetSegmentIndex.current;
      currentRotation.current = targetAngle;
      wheelRef.current.rotation.z = currentRotation.current;
      
      onRotationUpdate(-currentRotation.current);
      onSpinComplete();
      return;
    }

    // 速度パターンの計算
    if (elapsedTime <= ACCELERATION_DURATION) {
      // 加速フェーズ (0-2秒)
      spinSpeed.current = MathUtils.lerp(0, MAX_SPEED, elapsedTime / ACCELERATION_DURATION) * speedVariationFactor.current;
    } else if (elapsedTime >= DECELERATION_START) {
      // 減速フェーズ (4-8秒)
      const decelerationProgress = (elapsedTime - DECELERATION_START) / (TOTAL_DURATION - DECELERATION_START);
      // イージング関数を使用してより自然な減速を実現
      const easeOutProgress = 1 - Math.pow(1 - decelerationProgress, 3); // cubic ease-out
      spinSpeed.current = MathUtils.lerp(MAX_SPEED, 0, easeOutProgress) * speedVariationFactor.current;
    } else {
      // 最高速度維持フェーズ (2-4秒)
      spinSpeed.current = MAX_SPEED * speedVariationFactor.current;
    }

    // 回転の更新（Z軸は制限なし）
    const rotation = spinSpeed.current * delta;
    currentRotation.current += rotation;
    wheelRef.current.rotation.z = currentRotation.current;
    onRotationUpdate(-currentRotation.current);

    // セグメントの切り替わりを検出
    const segmentAngle = (Math.PI * 2) / items.length;
    const currentAngle = -currentRotation.current % (Math.PI * 2);
    const currentSegmentIndex = Math.floor(currentAngle / segmentAngle);

    if (currentSegmentIndex !== lastSegmentIndex.current) {
      lastSegmentIndex.current = currentSegmentIndex;
    }

    // 完全に停止した場合
    if (elapsedTime >= TOTAL_DURATION - 0.1) {
      if (isSpinningRef.current) {
        isSpinningRef.current = false;
        onRotationUpdate(-currentRotation.current);
        onSpinComplete();
      }
    }
  });

  const segmentAngle = (Math.PI * 2) / items.length;

  return (
    <group ref={groupRef}>
      {/* 基本的な環境光のみ維持 */}
      <ambientLight intensity={1.0} />

      <mesh ref={wheelRef} rotation={[0, 0, 0]}>
        {items.map((item, index) => {
          const angle = segmentAngle * index;
          const color = VIBRANT_COLORS[index % VIBRANT_COLORS.length];

          return (
            <group key={index}>
              {/* セグメント */}
              <mesh rotation={[0, 0, angle]}>
                <circleGeometry args={[WHEEL_RADIUS, 32, 0, segmentAngle]} />
                <meshStandardMaterial 
                  color={color} 
                  side={DoubleSide}
                  roughness={0.3}
                  metalness={0.0}
                />
              </mesh>
              
              {/* テキスト */}
              <Text
                position={[
                  TEXT_RADIUS * Math.cos(angle + segmentAngle / 2),
                  TEXT_RADIUS * Math.sin(angle + segmentAngle / 2),
                  0.01
                ]}
                rotation={[0, 0, angle + segmentAngle / 2]}
                fontSize={0.3}
                color="black"
                anchorX="center"
                anchorY="middle"
                maxWidth={WHEEL_RADIUS * 0.8}
                font={undefined}
              >
                {item}
              </Text>
            </group>
          );
        })}

        {/* 中心の円 */}
        <mesh position={[0, 0, 0.02]}>
          <circleGeometry args={[CENTER_RADIUS, 32]} />
          <meshStandardMaterial 
            color="#1a1a1a"
            roughness={0.3}
            metalness={0.0}
          />
        </mesh>
      </mesh>
      
      {/* 矢印 */}
      <mesh position={[ARROW_POSITION, 0, 0.1]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.3, 0.6, 32]} />
        <meshStandardMaterial 
          color="#FF0000"
          roughness={0.3}
          metalness={0.0}
        />
      </mesh>
    </group>
  );
} 