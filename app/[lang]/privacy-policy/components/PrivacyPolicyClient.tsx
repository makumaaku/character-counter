'use client'

import React from 'react';
import Link from 'next/link';
import { PrivacyPolicyMessages } from '@/lib/i18n/generated-types';

interface PrivacyPolicyClientProps {
  messages: PrivacyPolicyMessages;
  lang: string;
}

export default function PrivacyPolicyClient({ messages, lang }: PrivacyPolicyClientProps) {
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
        <h2 className="text-2xl font-semibold mb-4">{content.cookies}</h2>
        <p className="mb-4 text-gray-300">{content.cookiesText}</p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{content.sharing}</h2>
        <p className="mb-4 text-gray-300">{content.sharingText}</p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{content.external}</h2>
        <p className="mb-4 text-gray-300">{content.externalText}</p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{content.contact}</h2>
        <p className="mb-4 text-gray-300">
        <>
              {content.contactText.before}
              <Link href={`/${lang}/contact`} className="text-blue-400 hover:text-blue-300">
                {content.contactText.link}
              </Link>
              {content.contactText.after}
            </>
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{content.policy}</h2>
        <p className="mb-4 text-gray-300">{content.policyText}</p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{content.conclusion}</h2>
        <p className="mb-4 text-gray-300">{content.conclusionText}</p>
      </section>
      
      <p className="text-sm text-gray-400 mt-8">{updated}</p>
    </div>
  );
} 