import React, { useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import Roulette from './Roulette';

interface RouletteContainerProps {
  initialItems?: string[];
}

export default function RouletteContainer({ initialItems = [] }: RouletteContainerProps) {
  const [items, setItems] = useState<string[]>(initialItems);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>();
  const [newItem, setNewItem] = useState('');
  const [currentRotation, setCurrentRotation] = useState(0);

  const handleAddItem = useCallback(() => {
    if (newItem.trim()) {
      setItems(prev => [...prev, newItem.trim()]);
      setNewItem('');
    }
  }, [newItem]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddItem();
    }
  }, [handleAddItem]);

  const handleRemoveItem = useCallback((index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleSpin = useCallback(() => {
    if (items.length > 1 && !isSpinning) {
      setIsSpinning(true);
      setSelectedItem(undefined);
    }
  }, [items, isSpinning]);

  const handleSpinComplete = useCallback(() => {
    setIsSpinning(false);
    // 現在の回転角度から選択されたアイテムを計算
    const segmentAngle = (Math.PI * 2) / items.length;
    const normalizedRotation = -currentRotation % (Math.PI * 2);
    const selectedIndex = Math.floor(normalizedRotation / segmentAngle);
    setSelectedItem(items[selectedIndex % items.length]);
  }, [items, currentRotation]);

  return (
    <div className="flex flex-row gap-8 w-full h-full min-h-[600px] p-4">
      {/* ルーレット部分 */}
      <div className="flex-1 relative">
        {/* 結果表示 - ルーレットの上部に配置 */}
        {selectedItem && (
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-md">
            <div className="text-center p-6 bg-white/95 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-teal-700 mb-2 flex items-center justify-center gap-2">
                <span role="img" aria-label="party popper">🎉</span>
                Selected!
              </h2>
              <p className="text-3xl font-bold text-teal-600">
                {selectedItem}
              </p>
            </div>
          </div>
        )}

        <div className="w-full h-full min-h-[600px]">
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <Roulette
              items={items}
              isSpinning={isSpinning}
              onSpinComplete={handleSpinComplete}
              onRotationUpdate={setCurrentRotation}
            />
          </Canvas>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
          <button
            onClick={handleSpin}
            disabled={items.length < 2 || isSpinning}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
          >
            開始
          </button>
          <button
            onClick={() => {
              setItems([]);
              setSelectedItem(undefined);
            }}
            className="px-6 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500 transition-colors"
          >
            リセット
          </button>
        </div>
      </div>

      {/* 選択肢入力部分 */}
      <div className="w-80 bg-white rounded-lg shadow-lg p-4">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="新しい項目を入力"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddItem}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            追加
          </button>
        </div>

        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <span className="flex-1 truncate">{item}</span>
              <button
                onClick={() => handleRemoveItem(index)}
                className="ml-2 text-red-500 hover:text-red-600"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 