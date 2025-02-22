'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// Three.jsコンポーネントは動的importが必要
const Roulette = dynamic(() => import('./components/Roulette'), { ssr: false });

export default function RoulettePage() {
  const [items, setItems] = useState<string[]>(['Item 1', 'Item 2', 'Item 3']);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [currentRotation, setCurrentRotation] = useState(0);

  // テキストエリアの初期化
  useEffect(() => {
    setTextAreaValue(items.join('\n'));
  }, []);

  // キーボードショートカット
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !isEditing) {
        e.preventDefault();
        if (!isSpinning) handleSpin();
      } else if (e.code === 'KeyR' && !isEditing) {
        handleReset();
      } else if (e.code === 'KeyE') {
        setIsEditing(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSpinning, isEditing]);

  const handleSpin = useCallback(() => {
    if (items.length < 2) return;
    setIsSpinning(true);
    setResult(null); // 新しいスピンが始まるときに結果をクリア
  }, [items]);

  const handleSpinComplete = useCallback(() => {
    setIsSpinning(false);
    
    // 現在の回転角度から選ばれた項目を計算
    const segmentAngle = (Math.PI * 2) / items.length;
    // 矢印は右側（0度）にあるので、その位置を基準に計算
    // 回転は時計回りなので、正の方向に回転する
    // 現在の回転角度を正規化（0から2πの範囲に収める）
    let normalizedRotation = currentRotation % (Math.PI * 2);
    if (normalizedRotation < 0) {
      normalizedRotation += Math.PI * 2;
    }
    
    // 矢印の位置（0度）からの角度で選択されたインデックスを計算
    const selectedIndex = Math.floor(normalizedRotation / segmentAngle);
    // インデックスを反転させて、時計回りの順序に合わせる
    const reversedIndex = (items.length - selectedIndex) % items.length;
    const selectedItem = items[reversedIndex];
    
    setResult(selectedItem);
  }, [items, currentRotation]);

  const handleReset = useCallback(() => {
    setTextAreaValue(items.join('\n'));
    setIsEditing(false);
    setResult(null);
  }, [items]);

  const handleSave = useCallback(() => {
    const newItems = textAreaValue
      .split('\n')
      .map(item => item.trim())
      .filter(item => item !== '');
    
    if (newItems.length > 0) {
      setItems(newItems);
    }
    setIsEditing(false);
    setResult(null);
  }, [textAreaValue]);

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Web Roulette</h1>
          <div className="flex gap-4 mb-4">
            <button
              onClick={handleSpin}
              disabled={isSpinning || items.length < 2}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {isSpinning ? 'Spinning...' : 'Spin (Space)'}
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Edit List (E)
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Reset (R)
            </button>
          </div>
        </div>

        {isEditing ? (
          <div className="mb-8">
            <textarea
              value={textAreaValue}
              onChange={(e) => setTextAreaValue(e.target.value)}
              className="w-full h-64 p-4 border rounded"
              placeholder="Enter items (one per line)"
            />
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="aspect-square w-full max-w-2xl mx-auto mb-8">
              <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Roulette
                  items={items}
                  isSpinning={isSpinning}
                  onSpinComplete={handleSpinComplete}
                  onRotationUpdate={setCurrentRotation}
                />
                <OrbitControls enableZoom={false} enablePan={false} />
              </Canvas>
            </div>

            {/* 結果表示 */}
            {result && (
              <div className="text-center p-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-lg border border-green-100 animate-fade-in">
                <h2 className="text-3xl font-bold text-emerald-800 mb-2">
                  🎉 Selected!
                </h2>
                <p className="text-4xl font-bold text-emerald-600 mt-4">
                  {result}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 