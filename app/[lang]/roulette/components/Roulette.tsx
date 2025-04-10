'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { VIBRANT_COLORS } from '../constants';

export interface RouletteProps {
  items: string[];
  isSpinning: boolean;
  onSpinComplete: () => void;
  onRotationUpdate: (rotation: number) => void;
}

export default function Roulette({ items, isSpinning, onSpinComplete, onRotationUpdate }: RouletteProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | undefined>(undefined);
  const previousTimeRef = useRef<number | undefined>(undefined);
  
  // アニメーションとスピンの状態
  const spinSpeed = useRef(0);
  const targetRotation = useRef(0);
  const currentRotation = useRef(0);
  const isSpinningRef = useRef(isSpinning);
  const lastSegmentIndex = useRef(0);
  const startTime = useRef(0);
  const speedVariationFactor = useRef(1);
  const targetSegmentIndex = useRef(0);
  
  // スピンのタイミング設定
  const TOTAL_DURATION = 8; // 合計回転時間（秒）
  const ACCELERATION_DURATION = 2; // 加速時間（秒）
  const CONSTANT_SPEED_DURATION = 2; // 最高速度維持時間（秒）
  const DECELERATION_START = ACCELERATION_DURATION + CONSTANT_SPEED_DURATION; // 減速開始時間（秒）
  const MAX_SPEED = Math.PI * 6; // 最高速度 - 3回転/秒
  
  // ルーレットのサイズとスタイル設定
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  
  // キャンバスサイズの更新関数
  const updateCanvasSize = useCallback(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const parent = canvas.parentElement;
    
    if (parent) {
      // 親要素のサイズに合わせる
      const newWidth = parent.clientWidth;
      const newHeight = parent.clientHeight;
      
      // キャンバスの表示サイズを設定
      canvas.style.width = `${newWidth}px`;
      canvas.style.height = `${newHeight}px`;
      
      // キャンバスの実際の描画サイズを設定（高解像度ディスプレイ対応）
      const dpr = window.devicePixelRatio || 1;
      canvas.width = newWidth * dpr;
      canvas.height = newHeight * dpr;
      
      setCanvasSize({ width: newWidth, height: newHeight });
    }
  }, []);
  
  // リサイズ対応
  useEffect(() => {
    updateCanvasSize();
    
    const handleResize = () => {
      updateCanvasSize();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateCanvasSize]);
  
  // スピニング状態の変更を監視
  useEffect(() => {
    isSpinningRef.current = isSpinning;
    
    if (isSpinning) {
      startTime.current = performance.now() / 1000; // 秒単位で保存
      spinSpeed.current = 0; // 初期速度は0
      speedVariationFactor.current = 0.9 + Math.random() * 0.2; // 0.9 ~ 1.1の範囲でランダムな係数
      
      // ランダムに目標セグメントを選択
      targetSegmentIndex.current = Math.floor(Math.random() * items.length);
      const segmentAngle = (Math.PI * 2) / items.length;
      const targetAngle = segmentAngle * targetSegmentIndex.current;
      
      targetRotation.current = targetAngle;
    }
  }, [isSpinning, items.length]);
  
  // visibilitychangeイベントの監視
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isSpinningRef.current) {
        return;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
  
  // ルーレットの描画
  const drawRoulette = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, rotation: number) => {
    // キャンバスをクリア
    ctx.clearRect(0, 0, width, height);
    
    const dpr = window.devicePixelRatio || 1;
    ctx.save(); // 現在の状態を保存
    ctx.scale(dpr, dpr);
    
    const size = Math.min(width / dpr, height / dpr);
    const centerX = (width / dpr) / 2;
    const centerY = (height / dpr) / 2;
    const radius = size * 0.45; // ルーレットの半径
    const textRadius = radius * 0.7; // テキストの配置半径
    const centerRadius = radius * 0.15; // 中心円の半径
    const arrowSize = radius * 0.1; // 矢印のサイズ
    
    // セグメントの角度
    const segmentAngle = (Math.PI * 2) / items.length;
    
    // ルーレットを描画
    items.forEach((item, index) => {
      const startAngle = segmentAngle * index + rotation;
      const endAngle = startAngle + segmentAngle;
      const color = VIBRANT_COLORS[index % VIBRANT_COLORS.length];
      
      // セグメントを描画
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      
      // セグメントの境界線
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // テキストを描画
      const textAngle = startAngle + segmentAngle / 2;
      const textX = centerX + textRadius * Math.cos(textAngle);
      const textY = centerY + textRadius * Math.sin(textAngle);
      
      ctx.save();
      ctx.translate(textX, textY);
      ctx.rotate(textAngle + Math.PI / 2);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'black';
      ctx.font = `bold ${radius * 0.1}px Arial`;
      
      // テキストの長さに応じて調整
      const maxTextWidth = radius * 0.5;
      if (ctx.measureText(item).width > maxTextWidth) {
        const words = item.split(' ');
        let line = '';
        let y = 0;
        const lineHeight = radius * 0.12;
        
        words.forEach(word => {
          const testLine = line + word + ' ';
          const metrics = ctx.measureText(testLine);
          
          if (metrics.width > maxTextWidth && line !== '') {
            ctx.fillText(line, 0, y);
            line = word + ' ';
            y += lineHeight;
          } else {
            line = testLine;
          }
        });
        
        ctx.fillText(line, 0, y);
      } else {
        ctx.fillText(item, 0, 0);
      }
      
      ctx.restore();
    });
    
    // 中心の円を描画
    ctx.beginPath();
    ctx.arc(centerX, centerY, centerRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#1a1a1a';
    ctx.fill();
    
    // 矢印を描画（向きを修正）
    ctx.beginPath();
    ctx.moveTo(centerX + radius, centerY);
    ctx.lineTo(centerX + radius + arrowSize, centerY - arrowSize);
    ctx.lineTo(centerX + radius + arrowSize, centerY + arrowSize);
    ctx.closePath();
    ctx.fillStyle = '#FF0000';
    ctx.fill();
    
    ctx.restore(); // 保存した状態に戻す
  }, [items]);
  
  // アニメーションループ
  const animate = useCallback((time: number) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // 前回のフレームからの経過時間を計算
    if (previousTimeRef.current === undefined) {
      previousTimeRef.current = time;
    }
    const delta = (time - previousTimeRef.current) / 1000; // 秒単位
    previousTimeRef.current = time;
    
    // スピンアニメーション
    if (isSpinningRef.current) {
      const currentTime = performance.now() / 1000;
      const elapsedTime = currentTime - startTime.current;
      
      // 回転時間が経過したら停止
      if (elapsedTime >= TOTAL_DURATION) {
        isSpinningRef.current = false;
        
        // 最終的な回転位置を維持
        drawRoulette(ctx, canvas.width, canvas.height, currentRotation.current);
        onRotationUpdate(-currentRotation.current);
        onSpinComplete();
      } else {
        // 速度パターンの計算
        if (elapsedTime <= ACCELERATION_DURATION) {
          // 加速フェーズ
          spinSpeed.current = (MAX_SPEED * elapsedTime / ACCELERATION_DURATION) * speedVariationFactor.current;
        } else if (elapsedTime >= DECELERATION_START) {
          // 減速フェーズ
          const decelerationProgress = (elapsedTime - DECELERATION_START) / (TOTAL_DURATION - DECELERATION_START);
          const easeOutProgress = 1 - Math.pow(1 - decelerationProgress, 3); // cubic ease-out
          spinSpeed.current = MAX_SPEED * (1 - easeOutProgress) * speedVariationFactor.current;
        } else {
          // 最高速度維持フェーズ
          spinSpeed.current = MAX_SPEED * speedVariationFactor.current;
        }
        
        // 回転の更新
        const rotation = spinSpeed.current * delta;
        currentRotation.current += rotation;
        
        // セグメントの切り替わりを検出
        const segmentAngle = (Math.PI * 2) / items.length;
        const currentAngle = -currentRotation.current % (Math.PI * 2);
        const currentSegmentIndex = Math.floor(currentAngle / segmentAngle);
        
        if (currentSegmentIndex !== lastSegmentIndex.current) {
          lastSegmentIndex.current = currentSegmentIndex;
        }
        
        drawRoulette(ctx, canvas.width, canvas.height, currentRotation.current);
        onRotationUpdate(-currentRotation.current);
      }
    } else {
      // 回転していない時は通常描画
      drawRoulette(ctx, canvas.width, canvas.height, currentRotation.current);
    }
    
    requestRef.current = requestAnimationFrame(animate);
  }, [canvasSize, drawRoulette, items.length, onRotationUpdate, onSpinComplete]);
  
  // アニメーションの開始と停止
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate]);
  
  // コンポーネントがアンマウントされる前にアニメーションをクリーンアップ
  useEffect(() => {
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = undefined;
      }
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full rounded-full"
      style={{ touchAction: 'none', maxHeight: '100%', objectFit: 'contain' }}
    />
  );
} 