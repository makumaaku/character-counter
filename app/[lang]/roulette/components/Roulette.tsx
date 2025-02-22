import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, DoubleSide, MathUtils } from 'three';
import { Text } from '@react-three/drei';

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
  const dampingFactor = useRef(0.99); // 減速係数を0.98から0.99に変更してより緩やかな減速に

  useEffect(() => {
    if (isSpinning) {
      // ランダムな回転数を16-24回転に増加（以前は8-12回転）
      const rotations = 16 + Math.random() * 8;
      targetRotation.current = currentRotation.current + rotations * Math.PI * 2;
      spinSpeed.current = Math.PI * 4; // 初期回転速度を2倍に増加（2πから4π）
      dampingFactor.current = 0.99; // 減速係数をリセット
    }
  }, [isSpinning]);

  useFrame((_, delta) => {
    if (!wheelRef.current) return;

    if (isSpinning) {
      // イージング関数を使用してなめらかな減速を実現
      const distanceToTarget = targetRotation.current - currentRotation.current;
      
      if (distanceToTarget > 0.01) {
        // 現在の速度を維持しながら、目標に近づくにつれて減速
        spinSpeed.current *= dampingFactor.current;
        
        // 減速係数を徐々に小さくして、終盤でよりスムーズに
        if (distanceToTarget < Math.PI * 2) {
          // 終盤の減速も緩やかに調整
          dampingFactor.current = MathUtils.lerp(dampingFactor.current, 0.97, 0.005);
        }

        // 回転を更新
        const rotation = spinSpeed.current * delta;
        currentRotation.current += rotation;
        wheelRef.current.rotation.z = currentRotation.current;
        
        // 親コンポーネントに回転角度を通知
        // 時計回りの回転に合わせて角度を反転
        onRotationUpdate(-currentRotation.current);
      } else {
        // 最終位置に到達したら停止
        onSpinComplete();
      }
    }
  });

  const segmentAngle = (Math.PI * 2) / items.length;

  return (
    <group>
      <mesh ref={wheelRef} rotation={[0, 0, 0]}>
        {items.map((item, index) => {
          const angle = segmentAngle * index;
          const color = `hsl(${(360 / items.length) * index}, 70%, 60%)`;

          return (
            <group key={index}>
              {/* セグメント */}
              <mesh rotation={[0, 0, angle]}>
                <circleGeometry args={[2, 32, 0, segmentAngle]} />
                <meshStandardMaterial color={color} side={DoubleSide} />
              </mesh>
              
              {/* テキスト */}
              <Text
                position={[
                  1.2 * Math.cos(angle + segmentAngle / 2),
                  1.2 * Math.sin(angle + segmentAngle / 2),
                  0.01
                ]}
                rotation={[0, 0, angle + segmentAngle / 2]}
                fontSize={0.2}
                color="white"
                anchorX="center"
                anchorY="middle"
                maxWidth={1}
              >
                {item}
              </Text>
            </group>
          );
        })}

        {/* 中心の円 */}
        <mesh position={[0, 0, 0.02]}>
          <circleGeometry args={[0.3, 32]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
      </mesh>
      
      {/* 矢印 */}
      <mesh position={[2.2, 0, 0.1]}>
        <coneGeometry args={[0.2, 0.4, 32]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </group>
  );
} 