'use client'

import React from 'react';
import Link from 'next/link';
import { PrivacyPolicyMessages } from '@/lib/i18n/generated-types';

interface PrivacyPolicyClientProps {
  messages: PrivacyPolicyMessages;
  lang: string;
  contactText?: string;
}

export default function PrivacyPolicyClient({ messages, lang, contactText = "Contact" }: PrivacyPolicyClientProps) {
  const { title, content, updated } = messages;
  
  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      
      <p className="mb-6 text-gray-300">{content.intro}</p>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{content.collection}</h2>
        <p className="mb-4 text-gray-300">{content.collectionText}</p>
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          {content.collectionItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{content.usage}</h2>
        <p className="mb-4 text-gray-300">{content.usageText}</p>
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          {content.usageItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{content.sharing}</h2>
        <p className="mb-4 text-gray-300">{content.sharingText}</p>
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          {content.sharingItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{content.security}</h2>
        <p className="mb-4 text-gray-300">{content.securityText}</p>
      </section>
      
      <p className="text-sm text-gray-400 mt-8">{updated}</p>
      
      <div className="mt-8 pt-4 border-t border-gray-700">
        <Link href={`/${lang}/contact`} className="text-blue-400 hover:text-blue-300">
          {contactText}
        </Link>
      </div>
    </div>
  );
} 