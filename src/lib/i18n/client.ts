'use client'

import { Language } from './types';

// 翻訳メッセージの型定義
export type MessageValue = string | string[] | Record<string, unknown>;
export type Messages = Record<string, MessageValue>;

// サーバー側のメッセージキャッシュを模倣するためのマップ
const clientMessages = new Map<Language, Messages>();

// 言語ごとのデフォルト翻訳
const defaultTranslations: Record<Language, Messages> = {
  en: {
    common: {
      footer: {
        privacy: 'Privacy Policy',
        contact: 'Contact',
        about: 'About Us',
        copyright: '© 2024 Boring Tools. All rights reserved.'
      },
      form: {
        submitting: 'Submitting...'
      }
    }
  },
  ja: {
    common: {
      footer: {
        privacy: 'プライバシーポリシー',
        contact: 'お問い合わせ',
        about: '会社概要',
        copyright: '© 2024 Boring Tools. All rights reserved.'
      },
      form: {
        submitting: '送信中...'
      }
    }
  },
  es: {
    common: {
      footer: {
        privacy: 'Política de privacidad',
        contact: 'Contacto',
        about: 'Sobre nosotros',
        copyright: '© 2024 Boring Tools. Todos los derechos reservados.'
      },
      form: {
        submitting: 'Enviando...'
      }
    }
  },
  ru: {
    common: {
      footer: {
        privacy: 'Политика конфиденциальности',
        contact: 'Контакты',
        about: 'О нас',
        copyright: '© 2024 Boring Tools. Все права защищены.'
      },
      form: {
        submitting: 'Отправка...'
      }
    }
  },
  zh: {
    common: {
      footer: {
        privacy: '隐私政策',
        contact: '联系我们',
        about: '关于我们',
        copyright: '© 2024 无聊工具。保留所有权利。'
      },
      form: {
        submitting: '提交中...'
      }
    }
  }
};

// クライアント側でのメッセージ取得関数
export function getMessages(locale: Language = 'en'): Messages {
  if (!clientMessages.has(locale)) {
    // 言語に対応するデフォルト翻訳を設定
    clientMessages.set(locale, defaultTranslations[locale] || defaultTranslations.en);
  }
  
  return clientMessages.get(locale) || {};
}

// クライアント側でメッセージを設定するための関数
export function setClientMessages(locale: Language, messages: Messages): void {
  clientMessages.set(locale, messages);
} 