'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/button';
import { SeoToolsLinkStatusCheckerMessages } from '@/lib/i18n/types';

type Props = {
  lang: string;
  messages: SeoToolsLinkStatusCheckerMessages;
};

// リンクの型定義を更新
type LinkStatus = {
  url: string;
  status: number;
  errorMessage?: string;
};

export default function LinkStatusCheckerClient({ lang, messages }: Props) {
  const [url, setUrl] = useState('');
  const [links, setLinks] = useState<LinkStatus[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sortedLinks, setSortedLinks] = useState<LinkStatus[]>([]);
  const [progress, setProgress] = useState(0); // 進行状況を追跡

  // 翻訳されたメッセージを使用
  const totalLinksCheckedMessage = (count: number) => {
    return messages.results.total_links_checked.replace('{{count}}', count.toString());
  };

  useEffect(() => {
    if (links.length > 0) {
      const newSortedLinks = [...links].sort((a, b) => {
        const aIsError = a.status >= 400 && a.status < 600;
        const bIsError = b.status >= 400 && b.status < 600;

        if (aIsError && !bIsError) {
          return -1;
        }
        if (!aIsError && bIsError) {
          return 1;
        }
        return a.status - b.status;
      });
      setSortedLinks(newSortedLinks);
    }
  }, [links]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLinks([]);
    setLoading(true);
    setProgress(0); // 進行状況をリセット
    setProgress(10); // 初期進行状況を設定

    try {
      // Add a timeout to the fetch request - increase timeout for handling more links
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60秒に延長
      
      setProgress(20); // リクエスト開始
      
      const response = await fetch(`/${lang}/api/seo-tools?url=${encodeURIComponent(url)}`, {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      setProgress(50); // レスポンス受信
      
      let data;
      const contentType = response.headers.get('content-type');
      
      // Check if the response is JSON
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
        setProgress(70); // JSONパース完了
      } else {
        // If not JSON, get the text and create an error object
        const text = await response.text();
        throw new Error(`Server returned non-JSON response: ${text.substring(0, 100)}`);
      }

      if (response.ok) {
        if (data.links && Array.isArray(data.links)) {
          setLinks(data.links);
          setProgress(100); // 処理完了
          
          // リンクが多い場合は通知
          if (data.links.length > 50) {
            console.log(`Found ${data.links.length} links on the page`);
          }
        } else {
          setLinks([]);
          setProgress(100); // 処理完了
        }
      } else {
        // Handle specific error types
        if (data.error) {
          if (data.error.includes('timeout') || data.error.includes('too long') || response.status === 504) {
            setError(messages.errors.timeout);
          } else if (data.error.includes('network') || data.error.includes('ENOTFOUND') || data.error.includes('resolve host')) {
            setError(messages.errors.network);
          } else if (data.error.includes('URL') || data.error.includes('url')) {
            setError(messages.errors.invalid_url);
          } else {
            setError(data.error);
          }
        } else {
          setError(messages.errors.general);
        }
        setProgress(100); // エラー時も処理完了
      }
    } catch (error: unknown) {
      console.error('Error in link status checker:', error);
      
      // Handle fetch abort (timeout)
      if (error instanceof DOMException && error.name === 'AbortError') {
        setError(messages.errors.timeout);
        setProgress(100); // タイムアウト時も処理完了
        return;
      }
      
      if (error instanceof Error) {
        if (error.message.includes('JSON')) {
          setError(messages.errors.general);
        } else if (error.message.includes('timeout') || error.message.includes('abort') || error.message.includes('Gateway Timeout')) {
          setError(messages.errors.timeout);
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          setError(messages.errors.network);
        } else if (error.message.includes('URL')) {
          setError(messages.errors.invalid_url);
        } else {
          setError(error.message || messages.errors.general);
        }
      } else {
        setError(messages.errors.general);
      }
      setProgress(100); // エラー時も処理完了
    } finally {
      setLoading(false);
    }
  };

  // ステータスコードに応じたテキストカラーを取得する関数
  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-green-500';
    if (status >= 300 && status < 400) return 'text-yellow-500';
    if (status >= 400 && status < 600) return 'text-red-500';
    return 'text-gray-400';
  };

  return (
    <>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-300">
            {messages.form.url.label}
          </label>
          <div className="mt-1">
            <input
              id="url"
              name="url"
              type="url"
              autoComplete="url"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-gray-800 text-white"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={messages.form.url.placeholder}
              disabled={loading}
            />
          </div>
        </div>

        <div>
          <Button
            type="submit"
            variant="purple"  
            className="w-full flex justify-center"
            disabled={loading}
          >
            {loading 
              ? messages.form.button.checking 
              : messages.form.button.check}
          </Button>
        </div>
      </form>

      {/* ローディングインジケーター */}
      {loading && (
        <div className="mt-4">
          <div className="text-center text-gray-300 mb-2">
            {messages.form.button.checking}...
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-purple-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-center text-gray-400 text-sm mt-1">
            {progress < 50 ? messages.results.processing_url : messages.results.checking_links}
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-md bg-red-50 p-4 mt-4">
          <div className="text-red-700">
            {error}
          </div>
        </div>
      )}

      {sortedLinks.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-medium text-gray-300">
            {messages.results.title}:
          </h2>
          <div className="text-sm text-gray-400 mb-2">
            {totalLinksCheckedMessage(sortedLinks.length)}
          </div>
          <ul className="mt-2 space-y-1">
            {sortedLinks.map((link, index) => (
              <li key={index} className="text-gray-400">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hover:text-purple-500 ${
                    link.status >= 400 && link.status < 600
                      ? 'text-red-500'
                      : 'text-purple-400'
                  }`}
                >
                  {link.url}
                </a>
                <span className={`ml-2 ${getStatusColor(link.status)}`}>
                  {messages.results.status}: {link.status}
                  {link.errorMessage && link.status >= 400 && (
                    <span className="ml-2 text-red-400">({link.errorMessage})</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
} 