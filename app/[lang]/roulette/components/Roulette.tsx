import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, DoubleSide, MathUtils } from 'three';
import { Text } from '@react-three/drei';
import useSound from 'use-sound';

// より鮮やかな色のパレットを定義
const VIBRANT_COLORS = [
  '#FF3366', // ビビッドピンク
  '#00CCFF', // ブライトスカイブルー
  '#33FF66', // ネオングリーン
  '#FFCC00', // ゴールデンイエロー
  '#FF6633', // ビビッドオレンジ
  '#3366FF', // ブライトブルー
  '#FF33FF', // ホットピンク
  '#33FFCC', // ターコイズ
];

export interface RouletteProps {
  items: string[];
  isSpinning: boolean;
  onSpinComplete: () => void;
  onRotationUpdate: (rotation: number) => void;
}

export default function Roulette({ items, isSpinning, onSpinComplete, onRotationUpdate }: RouletteProps) {
  const wheelRef = useRef<Mesh>(null);
  const spinSpeed = useRef(0);
  const targetRotation = useRef(0);
  const currentRotation = useRef(0);
  const isSpinningRef = useRef(isSpinning);
  const lastSegmentIndex = useRef(0); // 最後に通過したセグメントのインデックス
  const startTime = useRef(0); // 回転開始時刻
  const speedVariationFactor = useRef(1); // 回転速度の変動係数
  const targetSegmentIndex = useRef(0); // 目標となるセグメントのインデックス
  const TOTAL_DURATION = 10; // 合計回転時間（秒）
  const ACCELERATION_DURATION = 2; // 加速時間（秒）
  const CONSTANT_SPEED_DURATION = 2; // 最高速度維持時間（秒）
  const DECELERATION_START = ACCELERATION_DURATION + CONSTANT_SPEED_DURATION; // 減速開始時間（秒）
  const MAX_SPEED = Math.PI * 6; // 最高速度

  // 効果音の設定
  const [playTickSound] = useSound('/sounds/tick.mp3', { 
    volume: 0.5,
    interrupt: true, // 音声の重複を許可
    soundEnabled: true, // 常に音声を有効化
    preload: true, // 事前ロード
    html5: true, // Web Audio APIではなくHTML5 Audioを使用
  });
  const [playStopSound] = useSound('/sounds/stop.mp3', { 
    volume: 0.7,
    soundEnabled: true, // 常に音声を有効化
    preload: true, // 事前ロード
    html5: true, // Web Audio APIではなくHTML5 Audioを使用
  });

  // ルーレットのサイズ設定
  const WHEEL_RADIUS = 3;
  const TEXT_RADIUS = WHEEL_RADIUS * 0.6;
  const CENTER_RADIUS = WHEEL_RADIUS * 0.15;
  const ARROW_POSITION = WHEEL_RADIUS + 0.3;

  // visibilitychangeイベントの監視
  useEffect(() => {
    const handleVisibilityChange = () => {
      // タブがバックグラウンドになった時も音声を継続させる
      if (document.hidden && isSpinningRef.current) {
        // 既存の音声を停止せずに継続
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
      
      // 最低20回転 + ランダムな追加回転 + 目標位置までの回転
      const baseRotations = 20 + Math.random() * 5;
      targetRotation.current = (baseRotations * Math.PI * 2) + targetAngle;
    }
  }, [isSpinning, items.length]);

  useFrame((_, delta) => {
    if (!wheelRef.current || !isSpinningRef.current) return;

    const currentTime = performance.now() / 1000;
    const elapsedTime = currentTime - startTime.current;

    // 10秒経過で強制停止
    if (elapsedTime >= TOTAL_DURATION) {
      isSpinningRef.current = false;
      
      // 最終的な回転位置を目標位置に調整
      const segmentAngle = (Math.PI * 2) / items.length;
      const targetAngle = segmentAngle * targetSegmentIndex.current;
      currentRotation.current = Math.floor(currentRotation.current / (Math.PI * 2)) * Math.PI * 2 + targetAngle;
      wheelRef.current.rotation.z = currentRotation.current;
      
      playStopSound();
      onRotationUpdate(-currentRotation.current);
      onSpinComplete();
      return;
    }

    // 速度パターンの計算
    if (elapsedTime <= ACCELERATION_DURATION) {
      // 加速フェーズ（0-2秒）
      spinSpeed.current = MathUtils.lerp(0, MAX_SPEED, elapsedTime / ACCELERATION_DURATION) * speedVariationFactor.current;
    } else if (elapsedTime >= DECELERATION_START) {
      // 減速フェーズ（4-10秒）: より長いイージングで滑らかに減速
      const decelerationProgress = (elapsedTime - DECELERATION_START) / (TOTAL_DURATION - DECELERATION_START);
      // イージング関数を使用してより自然な減速を実現
      const easeOutProgress = 1 - Math.pow(1 - decelerationProgress, 3); // cubic ease-out
      spinSpeed.current = MathUtils.lerp(MAX_SPEED, 0, easeOutProgress) * speedVariationFactor.current;
    } else {
      // 最高速度維持フェーズ（2-4秒）
      spinSpeed.current = MAX_SPEED * speedVariationFactor.current;
    }

    // 回転の更新
    const rotation = spinSpeed.current * delta;
    currentRotation.current += rotation;
    wheelRef.current.rotation.z = currentRotation.current;
    onRotationUpdate(-currentRotation.current);

    // セグメントの切り替わりを検出して音を鳴らす
    const segmentAngle = (Math.PI * 2) / items.length;
    const currentAngle = -currentRotation.current % (Math.PI * 2);
    const currentSegmentIndex = Math.floor(currentAngle / segmentAngle);

    if (currentSegmentIndex !== lastSegmentIndex.current) {
      playTickSound();
      lastSegmentIndex.current = currentSegmentIndex;
    }

    // 完全に停止した場合
    if (elapsedTime >= TOTAL_DURATION - 0.1) {
      if (isSpinningRef.current) {
        playStopSound();
        isSpinningRef.current = false;
        onRotationUpdate(-currentRotation.current);
        onSpinComplete();
      }
    }
  });

  const segmentAngle = (Math.PI * 2) / items.length;

  return (
    <group>
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