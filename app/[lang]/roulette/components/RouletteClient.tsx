'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { VIBRANT_COLORS } from '../constants';

// Three.jsコンポーネントは動的importが必要
const Roulette = dynamic(() => import('./Roulette'), { ssr: false });

type RouletteClientProps = {
  translations: {
    title: string;
    buttons: {
      spin: string;
      spinning: string;
      edit: string;
      reset: string;
      save: string;
      cancel: string;
    };
    result: {
      selected: string;
      placeholder: string;
    };
  };
}

export default function RouletteClient({ translations }: RouletteClientProps) {
  const [items, setItems] = useState<string[]>(['Item 1', 'Item 2', 'Item 3']);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');

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
    setResult(null);
  }, [items]);

  const handleSpinComplete = useCallback(() => {
    setIsSpinning(false);
    
    const segmentAngle = (Math.PI * 2) / items.length;
    let normalizedRotation = currentRotation % (Math.PI * 2);
    if (normalizedRotation < 0) {
      normalizedRotation += Math.PI * 2;
    }
    
    const selectedIndex = Math.floor(normalizedRotation / segmentAngle);
    const selectedItem = items[selectedIndex];
    
    const colorIndex = selectedIndex % VIBRANT_COLORS.length;
    setSelectedColor(VIBRANT_COLORS[colorIndex]);
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
          <h1 className="text-3xl font-bold mb-4">{translations.title}</h1>
          <div className="flex gap-4 mb-4">
            <button
              onClick={handleSpin}
              disabled={isSpinning || items.length < 2}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {isSpinning ? translations.buttons.spinning : translations.buttons.spin}
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              {translations.buttons.edit}
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              {translations.buttons.reset}
            </button>
          </div>
        </div>
        {result && (
          <div 
            className="text-center p-8 rounded-xl shadow-lg border animate-fade-in"
            style={{
              background: selectedColor,
              borderColor: selectedColor,
              opacity: 0.8
            }}
          >
            <h2 className="text-3xl font-bold mb-2">
              🎉 {translations.result.selected}
            </h2>
            <p className="text-4xl font-bold mt-4">
              {result}
            </p>
          </div>
        )}
        {isEditing ? (
          <div className="mb-8">
            <textarea
              value={textAreaValue}
              onChange={(e) => setTextAreaValue(e.target.value)}
              className="w-full h-64 p-4 border rounded"
              placeholder={translations.result.placeholder}
            />
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                {translations.buttons.save}
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                {translations.buttons.cancel}
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
          </>
        )}
      </div>
    </div>
  );
} 