'use client'

import React from 'react';
import Link from 'next/link';
import { getMessages, MessageValue } from '@/lib/i18n/client';
import { Language } from '@/lib/i18n/types';
import { useParams } from 'next/navigation';
import { useCallback } from 'react';

const Footer: React.FC = () => {
  const params = useParams();
  const lang = params?.lang || 'en';
  const t = useTranslation();
  
  return (
    <footer className="bg-gray-900 text-center py-6 mt-10">
      <Link href={`/${lang}`}>
        <div className="w-24 h-24 bg-black rounded-full mx-auto flex items-center justify-center hover:bg-gray-800 transition-colors cursor-pointer">
          <span className="text-white font-bold">Boring.</span>
        </div>
      </Link>
      <div className="flex justify-center gap-6 mt-4">
        <Link href={`/${lang}/privacy-policy`} className="text-gray-400 hover:text-white transition-colors">
          {t('common.footer.privacy')}
        </Link>
        <Link href={`/${lang}/about`} className="text-gray-400 hover:text-white transition-colors">
          {t('common.footer.about')}
        </Link>
        <Link href={`/${lang}/contact`} className="text-gray-400 hover:text-white transition-colors">
          {t('common.footer.contact')}
        </Link>
      </div>
      <p className="text-gray-400 mt-4">{t('common.footer.copyright')}</p>
    </footer>
  );
};

// クライアントコンポーネント用の翻訳フック
 function useTranslation() {
  const params = useParams();
  const lang = (params?.lang || 'en') as Language;
  
  // クライアントサイドでgetMessagesから取得する
  const messages = getMessages(lang);
  
  // 翻訳関数
  const t = useCallback((key: string): string => {
    try {
      // キーを分割して解析
      const keys = key.split('.');
      
      // メッセージを取得
      let value: MessageValue | undefined = messages;
      
      // 各キーに対して順番にアクセス
      for (const k of keys) {
        if (!value || typeof value !== 'object') {
          console.warn(`Translation key not found: ${key} (at ${k})`);
          return key;
        }
        value = (value as Record<string, MessageValue>)[k];
      }
      
      // 最終的な値が文字列でない場合は、キーを返す
      if (typeof value !== 'string') {
        console.warn(`Translation value is not a string: ${key}`);
        return key;
      }
      
      return value;
    } catch (error) {
      console.error(`Error in translation: ${key}`, error);
      return key;
    }
  }, [messages]);
  
  return t;
} 

export default Footer;