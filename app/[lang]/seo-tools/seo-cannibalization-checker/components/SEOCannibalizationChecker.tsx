'use client';

import Button from '@/components/ui/button';
import { useState } from 'react';
import { SeoToolsSeoCannibalizationCheckerMessages } from '@/lib/i18n/types';

interface SEOCannibalizationCheckerProps {
  messages: SeoToolsSeoCannibalizationCheckerMessages;
}

export default function SEOCannibalizationChecker({ messages }: SEOCannibalizationCheckerProps) {
  const [domain, setDomain] = useState('');
  const [keyword, setKeyword] = useState('');
  const [searchUrl, setSearchUrl] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const isValidDomain = (domain: string) => {
    const domainRegex = /^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(?:\/.*)?$/;
    return domainRegex.test(domain);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!domain) {
      setError(messages.error.emptyDomain);
      return;
    }
    
    if (!isValidDomain(domain)) {
      setError(messages.error.invalidDomain);
      return;
    }
    
    if (!keyword.trim()) {
      setError(messages.error.emptyKeyword);
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // ドメインからプロトコルとwwwを削除
      const domainClean = domain.replace(/^(https?:\/\/)?(www\.)?/, '');
      
      // 検索URLを作成
      const googleSearchUrl = `https://www.google.com/search?q=site:${encodeURIComponent(domainClean)}+${encodeURIComponent(`"${keyword}"`)}`; 
      
      setSearchUrl(googleSearchUrl);
      setIsProcessing(false);
    } catch {
      setError(messages.error.generic);
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-gray-800 text-gray-100 font-sans">
      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">{messages.title}</h1>
          <p className="text-xl text-gray-300 mb-6">
            {messages.description}
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-6 mb-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="domain" className="block text-lg mb-2">
                {messages.domain.label}
              </label>
              <input
                type="text"
                id="domain"
                className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white"
                placeholder={messages.domain.placeholder}
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
              <p className="text-sm text-gray-400 mt-1">{messages.domain.help}</p>
            </div>

            <div className="mb-6">
              <label htmlFor="keyword" className="block text-lg mb-2">
                {messages.keyword.label}
              </label>
              <input
                type="text"
                id="keyword"
                className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white"
                placeholder={messages.keyword.placeholder}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <p className="text-sm text-gray-400 mt-1">{messages.keyword.help}</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-900 text-white rounded-lg">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isProcessing}
              variant="purple"
              className="w-full"
            >
              {isProcessing ? messages.button.processing : messages.button.check}
            </Button>
          </form>
        </div>

        {searchUrl && (
          <div className="bg-gray-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">{messages.result.title}</h2>
            <p className="mb-6 text-gray-300">
              {messages.result.description}
            </p>
            <a
              href={searchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-bold text-lg text-center transition duration-200"
            >
              {messages.result.openButton}
            </a>
          </div>
        )}
      </main>
    </div>
  );
} 