'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { VIBRANT_COLORS } from '../constants';

const STORAGE_KEY = 'roulette-items';
const DEFAULT_ITEMS = ['Item 1', 'Item 2', 'Item 3'];

// Three.jsコンポーネントは動的importが必要
const Roulette = dynamic(() => import('./Roulette'), { ssr: false });

type RouletteClientProps = {
  translations: {
    title: string;
    buttons: {
      spin: string;
      spinning: string;
      edit: string;
      save: string;
      cancel: string;
    };
    result: {
      selected: string;
      placeholder: string;
    };
    content?: {
      hero: {
        title: string;
        description: string;
        darkMode: string;
      };
      howTo: {
        title: string;
        steps: {
          input: {
            title: string;
            description: string;
            note: string;
          };
          spin: {
            title: string;
            description: string;
            note: string;
          };
          result: {
            title: string;
            description: string;
            note: string;
          };
        };
      };
      testimonials: {
        title: string;
        users: {
          teacher: {
            name: string;
            comment: string;
          };
          team: {
            name: string;
            comment: string;
          };
          family: {
            name: string;
            comment: string;
          };
        };
      };
      features: {
        title: string;
        items: {
          easy: {
            title: string;
            description: string;
          };
          fair: {
            title: string;
            description: string;
          };
          visual: {
            title: string;
            description: string;
          };
          free: {
            title: string;
            description: string;
          };
        };
      };
      faq: {
        title: string;
        questions: {
          what: {
            question: string;
            answer: string;
          };
          usage: {
            question: string;
            answer: string;
          };
          save: {
            question: string;
            answer: string;
          };
          limit: {
            question: string;
            answer: string;
          };
          mobile: {
            question: string;
            answer: string;
          };
        };
      };
    };
  };
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
            <button
              onClick={handleSpin}
              disabled={isSpinning || items.length < 2}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {isSpinning ? translations.buttons.spinning : translations.buttons.spin}
            </button>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-4 py-2 ${isEditing ? 'bg-blue-700' : 'bg-gray-500'} text-white rounded hover:${isEditing ? 'bg-blue-800' : 'bg-gray-600'}`}
            >
              {translations.buttons.edit}
            </button>
          </div>
        </div>
        {result && (
          <div 
            className="text-center p-6 rounded-xl shadow-lg border animate-fade-in mb-6"
            style={{
              background: selectedColor,
              borderColor: selectedColor,
              opacity: 0.8
            }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              🎉 {translations.result.selected}
            </h2>
            <p className="text-3xl md:text-4xl font-bold mt-3">
              {result}
            </p>
          </div>
        )}
        
        {/* モバイルではフォームを上部に、デスクトップでは横並びに表示 */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start">
          {/* 編集モードの場合はフォームを表示 - モバイルでは上部に */}
          {isEditing && (
            <div className="w-full lg:w-1/3 mb-3 lg:mb-4 order-first lg:order-last">
              <div className="lg:sticky lg:top-4">
                <p className="text-sm text-gray-300 mb-1 lg:mb-2">
                  {translations.result.placeholder}
                </p>
                <textarea
                  value={textAreaValue}
                  onChange={(e) => setTextAreaValue(e.target.value)}
                  className="w-full h-28 sm:h-32 lg:h-64 p-3 lg:p-4 border rounded text-black"
                  placeholder={translations.result.placeholder}
                />
                <div className="flex gap-3 lg:gap-4 mt-3 lg:mt-4">
                  <button
                    onClick={handleSave}
                    className="flex-1 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    {translations.buttons.save}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    {translations.buttons.cancel}
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* ルーレットを常に表示 - はみ出し防止のためにコンテナを調整 */}
          <div className={`w-full ${isEditing ? 'lg:w-2/3' : 'lg:w-full'} mx-auto overflow-hidden`}>
            <div className="aspect-square w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto">
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
          </div>
        </div>
      </div>

      {/* SEOテキストセクション */}
      {translations.content && (
        <main className="max-w-4xl mx-auto mt-16 text-white">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">{translations.content.hero.title}</h2>
            <p className="text-lg text-gray-300 mb-2">{translations.content.hero.description}</p>
            <p className="text-sm text-purple-400">{translations.content.hero.darkMode}</p>
          </div>

          {/* How To Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 text-center">{translations.content.howTo.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">{translations.content.howTo.steps.input.title}</h3>
                <p className="text-gray-300">{translations.content.howTo.steps.input.description}</p>
                <p className="text-sm text-purple-400 mt-2">{translations.content.howTo.steps.input.note}</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">{translations.content.howTo.steps.spin.title}</h3>
                <p className="text-gray-300">{translations.content.howTo.steps.spin.description}</p>
                <p className="text-sm text-purple-400 mt-2">{translations.content.howTo.steps.spin.note}</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">{translations.content.howTo.steps.result.title}</h3>
                <p className="text-gray-300">{translations.content.howTo.steps.result.description}</p>
                <p className="text-sm text-purple-400 mt-2">{translations.content.howTo.steps.result.note}</p>
              </div>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 text-center">{translations.content.testimonials.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">{translations.content.testimonials.users.teacher.name}</h3>
                <p className="text-gray-300">{translations.content.testimonials.users.teacher.comment}</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">{translations.content.testimonials.users.team.name}</h3>
                <p className="text-gray-300">{translations.content.testimonials.users.team.comment}</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">{translations.content.testimonials.users.family.name}</h3>
                <p className="text-gray-300">{translations.content.testimonials.users.family.comment}</p>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 text-center">{translations.content.features.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">{translations.content.features.items.easy.title}</h3>
                <p className="text-gray-300">{translations.content.features.items.easy.description}</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">{translations.content.features.items.fair.title}</h3>
                <p className="text-gray-300">{translations.content.features.items.fair.description}</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">{translations.content.features.items.visual.title}</h3>
                <p className="text-gray-300">{translations.content.features.items.visual.description}</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">{translations.content.features.items.free.title}</h3>
                <p className="text-gray-300">{translations.content.features.items.free.description}</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">{translations.content.faq.title}</h2>
            <div className="space-y-4">
              <div className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">{translations.content.faq.questions.what.question}</h3>
                <p className="text-gray-300">{translations.content.faq.questions.what.answer}</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">{translations.content.faq.questions.usage.question}</h3>
                <p className="text-gray-300">{translations.content.faq.questions.usage.answer}</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">{translations.content.faq.questions.save.question}</h3>
                <p className="text-gray-300">{translations.content.faq.questions.save.answer}</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">{translations.content.faq.questions.limit.question}</h3>
                <p className="text-gray-300">{translations.content.faq.questions.limit.answer}</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">{translations.content.faq.questions.mobile.question}</h3>
                <p className="text-gray-300">{translations.content.faq.questions.mobile.answer}</p>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
} 