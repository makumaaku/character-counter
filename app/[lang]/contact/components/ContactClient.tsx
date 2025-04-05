'use client'

import React, { useState } from 'react';
import { ContactMessages } from '@/lib/i18n/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ContactClientProps {
  messages: ContactMessages;
  submittingText?: string;
}

export default function ContactClient({ messages, submittingText = "Submitting..." }: ContactClientProps) {
  const { title, content } = messages;
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setErrorMessage('');
    
    try {
      // APIエンドポイントへのPOSTリクエスト
      const response = await fetch('/api/slack', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || '送信中にエラーが発生しました');
      }
      
      // 送信成功
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('error');
      setErrorMessage(error instanceof Error ? error.message : '送信中にエラーが発生しました');
    }
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      
      <p className="mb-8 text-gray-300">{content.intro}</p>
      
      <div className="flex flex-col space-y-8">
        {/* フォームセクション */}
        <div className="w-full">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                {content.form.name}
              </label>
              <Input
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
              <Input
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
              <Input
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
            
            <div className="flex justify-center mt-6">
              <Button
                type="submit"
                disabled={formStatus === 'submitting'}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
              >
                {formStatus === 'submitting' ? submittingText : content.form.submit}
              </Button>
            </div>
            
            {formStatus === 'success' && (
              <Alert className="mt-4 p-3 bg-green-800 text-green-100 rounded-md">
                <AlertDescription>
                  {content.form.success}
                </AlertDescription>
              </Alert>
            )}
            
            {formStatus === 'error' && (
              <Alert className="mt-4 p-3 bg-red-800 text-red-100 rounded-md">
                <AlertDescription>
                  {errorMessage || content.form.error}
                </AlertDescription>
              </Alert>
            )}
          </form>
        </div>
        
        {/* 連絡先情報セクション */}
        <div className="w-full bg-gray-700 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">{content.info.title}</h2>
          <div className="space-y-3 text-gray-300">
            <p>{content.info.hours}</p>
            <p>{content.info.response}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 