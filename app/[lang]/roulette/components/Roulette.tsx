import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, DoubleSide, MathUtils } from 'three';
import { Text } from '@react-three/drei';

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
  const dampingFactor = useRef(0.99);
  const isSpinningRef = useRef(isSpinning);

  // ルーレットのサイズ設定
  const WHEEL_RADIUS = 3;
  const TEXT_RADIUS = WHEEL_RADIUS * 0.6;
  const CENTER_RADIUS = WHEEL_RADIUS * 0.15;
  const ARROW_POSITION = WHEEL_RADIUS + 0.3;

  useEffect(() => {
    isSpinningRef.current = isSpinning;
    if (isSpinning) {
      const rotations = 16 + Math.random() * 8;
      targetRotation.current = currentRotation.current + rotations * Math.PI * 2;
      spinSpeed.current = Math.PI * 4;
      dampingFactor.current = 0.99;
    }
  }, [isSpinning]);

  useFrame((_, delta) => {
    if (!wheelRef.current || !isSpinningRef.current) return;

    const distanceToTarget = targetRotation.current - currentRotation.current;
    const shouldStop = spinSpeed.current < 0.01 || distanceToTarget < 0.1;

    if (!shouldStop) {
      spinSpeed.current *= dampingFactor.current;
      
      if (distanceToTarget < Math.PI * 2) {
        dampingFactor.current = MathUtils.lerp(dampingFactor.current, 0.97, 0.005);
      }

      const rotation = spinSpeed.current * delta;
      currentRotation.current += rotation;
      wheelRef.current.rotation.z = currentRotation.current;
      onRotationUpdate(-currentRotation.current); // 回転方向を反転
    } else {
      isSpinningRef.current = false;
      onRotationUpdate(-currentRotation.current); // 回転方向を反転
      onSpinComplete();
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