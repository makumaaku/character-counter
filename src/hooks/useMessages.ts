'use client';

import { useEffect, useState } from 'react';

/**
 * 多言語メッセージを取得するカスタムフック
 * @template T - メッセージの型
 * @returns {T | null} - メッセージオブジェクト
 */
export function useMessages<T>(): T | null {
  const [messages, setMessages] = useState<T | null>(null);

  useEffect(() => {
    const messagesScript = document.getElementById('messages');
    if (messagesScript) {
      const messages = JSON.parse(messagesScript.textContent || '{}');
      setMessages(messages);
    }
  }, []);

  return messages;
} 