import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, DoubleSide, MathUtils } from 'three';
import { Text } from '@react-three/drei';
import useSound from 'use-sound';

// より鮮やかな色のパレットを定義
const VIBRANT_COLORS = [
  '#FF1E1E', // 赤
  '#FF8C1A', // オレンジ
  '#FFD700', // 黄色
  '#32CD32', // ライムグリーン
  '#1E90FF', // ドジャーブルー
  '#9932CC', // ダークオーキッド
  '#FF1493', // ディープピンク
  '#00CED1', // ダークターコイズ
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
  const TOTAL_DURATION = 10; // 合計回転時間（秒）
  const ACCELERATION_DURATION = 2; // 加速時間（秒）
  const CONSTANT_SPEED_DURATION = 2; // 最高速度維持時間（秒）
  const DECELERATION_START = ACCELERATION_DURATION + CONSTANT_SPEED_DURATION; // 減速開始時間（秒）
  const MAX_SPEED = Math.PI * 6; // 最高速度

  // 効果音の設定
  const [playTickSound] = useSound('/sounds/tick.mp3', { volume: 0.5 });
  const [playStopSound] = useSound('/sounds/stop.mp3', { volume: 0.7 });

  // ルーレットのサイズ設定
  const WHEEL_RADIUS = 3;
  const TEXT_RADIUS = WHEEL_RADIUS * 0.6;
  const CENTER_RADIUS = WHEEL_RADIUS * 0.15;
  const ARROW_POSITION = WHEEL_RADIUS + 0.3;

  useEffect(() => {
    isSpinningRef.current = isSpinning;
    if (isSpinning) {
      startTime.current = performance.now() / 1000; // 秒単位で保存
      spinSpeed.current = 0; // 初期速度は0
      const totalRotations = 20 + Math.random() * 5; // 合計回転数（20-25回転）
      targetRotation.current = currentRotation.current + totalRotations * Math.PI * 2;
    }
  }, [isSpinning]);

  useFrame((_, delta) => {
    if (!wheelRef.current || !isSpinningRef.current) return;

    const currentTime = performance.now() / 1000;
    const elapsedTime = currentTime - startTime.current;

    // 10秒経過で強制停止
    if (elapsedTime >= TOTAL_DURATION) {
      isSpinningRef.current = false;
      playStopSound();
      onRotationUpdate(-currentRotation.current);
      onSpinComplete();
      return;
    }

    // 速度パターンの計算
    if (elapsedTime <= ACCELERATION_DURATION) {
      // 加速フェーズ（0-2秒）
      spinSpeed.current = MathUtils.lerp(0, MAX_SPEED, elapsedTime / ACCELERATION_DURATION);
    } else if (elapsedTime >= DECELERATION_START) {
      // 減速フェーズ（4-10秒）: より長いイージングで滑らかに減速
      const decelerationProgress = (elapsedTime - DECELERATION_START) / (TOTAL_DURATION - DECELERATION_START);
      // イージング関数を使用してより自然な減速を実現
      const easeOutProgress = 1 - Math.pow(1 - decelerationProgress, 3); // cubic ease-out
      spinSpeed.current = MathUtils.lerp(MAX_SPEED, 0, easeOutProgress);
    } else {
      // 最高速度維持フェーズ（2-4秒）
      spinSpeed.current = MAX_SPEED;
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
      {/* 環境光を明るく、ポイントライトを追加 */}
      <ambientLight intensity={1.2} />
      <pointLight position={[0, 0, 5]} intensity={0.8} />
      <pointLight position={[5, 5, 5]} intensity={0.3} />

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
                  metalness={0.1}
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
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </mesh>
      
      {/* 矢印 */}
      <mesh position={[ARROW_POSITION, 0, 0.1]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.3, 0.6, 32]} />
        <meshStandardMaterial 
          color="#FF1E1E"
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
    </group>
  );
} 