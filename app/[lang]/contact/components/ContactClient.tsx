'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { ContactMessages } from '@/lib/i18n/generated-types';

interface ContactClientProps {
  messages: ContactMessages;
  lang: string;
  submittingText?: string;
}

export default function ContactClient({ messages, lang, submittingText = "Submitting..." }: ContactClientProps) {
  const { title, content } = messages;
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // 実際には、ここでAPIを呼び出してフォームを送信します
    // この例では、単にタイムアウトでステータスを変更します
    setTimeout(() => {
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      
      <p className="mb-8 text-gray-300">{content.intro}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* フォームセクション */}
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                {content.form.name}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder={content.form.namePlaceholder}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500"
                disabled={formStatus === 'submitting'}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                {content.form.email}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder={content.form.emailPlaceholder}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500"
                disabled={formStatus === 'submitting'}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="subject">
                {content.form.subject}
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder={content.form.subjectPlaceholder}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500"
                disabled={formStatus === 'submitting'}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="message">
                {content.form.message}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                value={formData.message}
                onChange={handleChange}
                placeholder={content.form.messagePlaceholder}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500"
                disabled={formStatus === 'submitting'}
              />
            </div>
            
            <button
              type="submit"
              disabled={formStatus === 'submitting'}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
            >
              {formStatus === 'submitting' ? submittingText : content.form.submit}
            </button>
            
            {formStatus === 'success' && (
              <div className="mt-4 p-3 bg-green-800 text-green-100 rounded-md">
                {content.form.success}
              </div>
            )}
            
            {formStatus === 'error' && (
              <div className="mt-4 p-3 bg-red-800 text-red-100 rounded-md">
                {content.form.error}
              </div>
            )}
          </form>
        </div>
        
        {/* 連絡先情報セクション */}
        <div className="bg-gray-700 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">{content.info.title}</h2>
          <div className="space-y-3 text-gray-300">
            <p>{content.info.email}</p>
            <p>{content.info.hours}</p>
            <p>{content.info.response}</p>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">{content.faq.title}</h3>
            <p className="text-gray-300 mb-4">{content.faq.text}</p>
            <Link href={`/${lang}/faq`} className="inline-block px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors">
              {content.faq.button}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 