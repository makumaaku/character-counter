'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { VIBRANT_COLORS } from '../constants';
import Button from '@/components/ui/button';
import { RouletteMessages } from '@/lib/i18n/types';

const STORAGE_KEY = 'roulette-items';
const DEFAULT_ITEMS = ['Item 1', 'Item 2', 'Item 3'];

// Three.jsコンポーネントは動的importが必要
const Roulette = dynamic(() => import('./Roulette'), { ssr: false });

type RouletteClientProps = {
  translations: RouletteMessages;
}

export default function RouletteClient({ translations }: RouletteClientProps) {
  const [items, setItems] = useState<string[]>(DEFAULT_ITEMS);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');

  // ローカルストレージへの保存を行う関数
  const saveItemsToStorage = useCallback((itemsToSave: string[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(itemsToSave));
    } catch (error) {
      console.error('Failed to save items to localStorage:', error);
    }
  }, []);

  // ローカルストレージからアイテムを読み込む
  useEffect(() => {
    try {
      const savedItems = localStorage.getItem(STORAGE_KEY);
      if (savedItems) {
        const parsedItems = JSON.parse(savedItems);
        if (Array.isArray(parsedItems) && parsedItems.length > 0) {
          setItems(parsedItems);
          setTextAreaValue(parsedItems.join('\n'));
          return;
        }
      }
      // 保存されたデータがない場合やエラーの場合はデフォルト値を設定
      setTextAreaValue(DEFAULT_ITEMS.join('\n'));
    } catch (error) {
      console.error('Failed to load items from localStorage:', error);
      setTextAreaValue(DEFAULT_ITEMS.join('\n'));
    }
  }, []);

  // スピン処理
  const handleSpin = useCallback(() => {
    if (items.length < 2) return;
    setIsSpinning(true);
    setResult(null);
  }, [items]);

  // キーボードショートカット
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !isEditing) {
        e.preventDefault();
        if (!isSpinning) handleSpin();
      } else if (e.code === 'KeyE') {
        setIsEditing(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSpinning, isEditing, handleSpin]);

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

    // ルーレットを回した後に自動保存
    saveItemsToStorage(items);
  }, [items, currentRotation, saveItemsToStorage]);

  const handleCancel = useCallback(() => {
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
      saveItemsToStorage(newItems);
    }
    setIsEditing(false);
    setResult(null);
  }, [textAreaValue, saveItemsToStorage]);


  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4 text-white">{translations.title}</h1>
          <div className="flex flex-wrap gap-4 mb-4">
            <Button
              onClick={handleSpin}
              disabled={isSpinning || items.length < 2}
              variant="purple"
            >
              {isSpinning ? translations.buttons.spinning : translations.buttons.spin}
            </Button>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? 'purple' : 'secondary'}
            >
              {translations.buttons.edit}
            </Button>
          </div>
        </div>
        {result && (
          <div 
            className="text-center p-6 rounded-xl shadow-lg border animate-fade-in mb-6"
            style={{
              background: selectedColor,
              borderColor: selectedColor,
            }}
          >
            <h3 className="text-xl font-bold text-white mb-2">{translations.result.selected}</h3>
            <p className="text-3xl font-extrabold text-white">{result}</p>
          </div>
        )}
        
        {isEditing ? (
          <div className="mb-6 animate-fade-in">
            <div className="relative mb-4">
              <textarea
                className="w-full h-48 p-4 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:outline-none"
                value={textAreaValue}
                onChange={(e) => setTextAreaValue(e.target.value)}
                placeholder={translations.result.placeholder}
              />
            </div>
            <div className="flex gap-4">
              <Button onClick={handleSave} variant="purple">
                {translations.buttons.save}
              </Button>
              <Button onClick={handleCancel} variant="secondary">
                {translations.buttons.cancel}
              </Button>
            </div>
          </div>
        ) : (
          <div className="relative h-[380px] w-full mb-6 flex items-center justify-center">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <Roulette
                items={items}
                isSpinning={isSpinning}
                onSpinComplete={handleSpinComplete}
                onRotationUpdate={setCurrentRotation}
              />
              <OrbitControls 
                enableZoom={false}
                enablePan={false}
                enableRotate={false}
              />
            </Canvas>
          </div>
        )}
        
        {/* Content Section */}
        <div className="text-white space-y-12 mt-12">
          {/* Hero Section */}
          <section className="text-center">
            <h2 className="text-3xl font-bold mb-4">{translations.content.hero.title}</h2>
            <p className="text-xl text-gray-300 mb-8">{translations.content.hero.description}</p>
            <div className="inline-flex items-center bg-gray-700 rounded-full px-4 py-2">
              <span className="text-sm text-gray-300">{translations.content.hero.darkMode}</span>
            </div>
          </section>
          
          {/* How To Use Section */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-center">{translations.content.howTo.title}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-700 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-3">{translations.content.howTo.steps.input.title}</h3>
                <p className="text-gray-300 mb-3">{translations.content.howTo.steps.input.description}</p>
                <p className="text-sm text-gray-400 italic">{translations.content.howTo.steps.input.note}</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-3">{translations.content.howTo.steps.spin.title}</h3>
                <p className="text-gray-300 mb-3">{translations.content.howTo.steps.spin.description}</p>
                <p className="text-sm text-gray-400 italic">{translations.content.howTo.steps.spin.note}</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-3">{translations.content.howTo.steps.result.title}</h3>
                <p className="text-gray-300 mb-3">{translations.content.howTo.steps.result.description}</p>
                <p className="text-sm text-gray-400 italic">{translations.content.howTo.steps.result.note}</p>
              </div>
            </div>
          </section>
          
          {/* Testimonials Section */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-center">{translations.content.testimonials.title}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-700 p-6 rounded-xl">
                <p className="text-gray-300 mb-4">&ldquo;{translations.content.testimonials.users.teacher.comment}&rdquo;</p>
                <p className="font-bold text-right">- {translations.content.testimonials.users.teacher.name}</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-xl">
                <p className="text-gray-300 mb-4">&ldquo;{translations.content.testimonials.users.team.comment}&rdquo;</p>
                <p className="font-bold text-right">- {translations.content.testimonials.users.team.name}</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-xl">
                <p className="text-gray-300 mb-4">&ldquo;{translations.content.testimonials.users.family.comment}&rdquo;</p>
                <p className="font-bold text-right">- {translations.content.testimonials.users.family.name}</p>
              </div>
            </div>
          </section>
          
          {/* Features Section */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-center">{translations.content.features.title}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-700 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-3">{translations.content.features.items.easy.title}</h3>
                <p className="text-gray-300">{translations.content.features.items.easy.description}</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-3">{translations.content.features.items.fair.title}</h3>
                <p className="text-gray-300">{translations.content.features.items.fair.description}</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-3">{translations.content.features.items.visual.title}</h3>
                <p className="text-gray-300">{translations.content.features.items.visual.description}</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-3">{translations.content.features.items.free.title}</h3>
                <p className="text-gray-300">{translations.content.features.items.free.description}</p>
              </div>
            </div>
          </section>
          
          {/* FAQ Section */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-center">{translations.content.faq.title}</h2>
            <div className="space-y-6">
              <div className="bg-gray-700 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-3">{translations.content.faq.questions.what.question}</h3>
                <p className="text-gray-300">{translations.content.faq.questions.what.answer}</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-3">{translations.content.faq.questions.usage.question}</h3>
                <p className="text-gray-300">{translations.content.faq.questions.usage.answer}</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-3">{translations.content.faq.questions.save.question}</h3>
                <p className="text-gray-300">{translations.content.faq.questions.save.answer}</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-3">{translations.content.faq.questions.limit.question}</h3>
                <p className="text-gray-300">{translations.content.faq.questions.limit.answer}</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-3">{translations.content.faq.questions.mobile.question}</h3>
                <p className="text-gray-300">{translations.content.faq.questions.mobile.answer}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 