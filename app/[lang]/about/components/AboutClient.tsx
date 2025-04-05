'use client'

import React from 'react';
import { AboutMessages } from '@/lib/i18n/generated-types';
import ReactMarkdown from 'react-markdown';

interface AboutClientProps {
  messages: AboutMessages;
  lang: string;
  copyright?: string;
}

export default function AboutClient({ messages }: AboutClientProps) {
  const { title, content } = messages;
  
  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <div className="prose prose-invert prose-lg max-w-none text-gray-300">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
} 