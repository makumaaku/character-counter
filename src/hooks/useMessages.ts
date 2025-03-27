'use client';

import { useEffect, useState } from 'react';

/**
 * 多言語メッセージを取得するカスタムフック
 * @template T - メッセージの型
 * @param {string} [id="messages"] - メッセージを含むスクリプトタグのID。(WordGenとWordGen/WordCardGeneratorなど親子ページでidが重複すると一方を上書きする現象が発生するため、ユニークなIDを指定する。)
 * @returns {T | null} - メッセージオブジェクト
 */
export function useMessages<T>(id: string = 'messages'): T | null {
  const [messages, setMessages] = useState<T | null>(null);

  useEffect(() => {
    const messagesScript = document.getElementById(id);
    if (messagesScript) {
      const messages = JSON.parse(messagesScript.textContent || '{}');
      setMessages(messages);
    }
  }, [id]);

  return messages;
} 