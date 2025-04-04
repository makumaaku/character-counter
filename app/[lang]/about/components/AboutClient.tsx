'use client'

import React from 'react';
import Link from 'next/link';
import { AboutMessages } from '@/lib/i18n/generated-types';

interface AboutClientProps {
  messages: AboutMessages;
  lang: string;
  copyright?: string;
}

export default function AboutClient({ messages, lang, copyright }: AboutClientProps) {
  const { title, content } = messages;
  
  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      
      <p className="mb-8 text-lg text-gray-300">{content.intro}</p>
      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{content.mission.title}</h2>
        <p className="text-gray-300">{content.mission.text}</p>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{content.story.title}</h2>
        <p className="text-gray-300">{content.story.text}</p>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-6">{content.values.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.values.list.map((value, index) => (
            <div key={index} className="bg-gray-700 p-5 rounded-lg">
              <h3 className="text-xl font-medium mb-2">{value.heading}</h3>
              <p className="text-gray-300">{value.text}</p>
            </div>
          ))}
        </div>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{content.team.title}</h2>
        <p className="text-gray-300">{content.team.text}</p>
      </section>
      
      <div className="mt-12 pt-6 border-t border-gray-700 text-center">
        <p className="text-lg mb-4">{content.contact.text}</p>
        <Link 
          href={`/${lang}/contact`} 
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          {content.contact.button}
        </Link>
        {copyright && (
          <p className="mt-6 text-sm text-gray-400">
            {copyright}
          </p>
        )}
      </div>
    </div>
  );
} 