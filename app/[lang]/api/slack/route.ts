import { loadToolMessages, translate } from '@/lib/i18n/server';
import { Language } from '@/lib/i18n/types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest, { params }: { params: Promise<{ lang: string }> }) {
  try {
    const { lang } = await params;
    await loadToolMessages(lang as Language, 'contact');
    const t = (key: string) => translate(lang, key);

    // リクエストボディを取得
    const { name, email, subject, message } = await request.json();

    // 必須項目のバリデーション
    if (!name || !email || !subject || !message) {
      const errorMessage = await t('contact.content.form.requiredFieldsError');
      return NextResponse.json(
        { error: errorMessage },
        { status: 400 }
      );
    }

    // 環境変数からSlack APIトークンとチャンネル名を取得
    const slackToken = process.env.SLACK_API_TOKEN;
    const channelId = process.env.SLACK_CHANNEL_ID;
    
    if (!slackToken) {
      console.warn('SLACK_API_TOKEN is not set. Skipping Slack notification.');
      // 開発環境用のモックレスポンス
      return NextResponse.json({ success: true, mock: true });
    }

    // Slackへのメッセージを構築
    const slackMessage = {
      channel: channelId,
      text: `🌟 新しい問い合わせが届きました 🌟`,
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '🌟 新しい問い合わせが届きました 🌟',
            emoji: true
          }
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*名前:*\n${name}`
            },
            {
              type: 'mrkdwn',
              text: `*メール:*\n${email}`
            }
          ]
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*件名:*\n${subject}`
            }
          ]
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*メッセージ:*\n${message}`
          }
        },
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: `送信日時: ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}`
            }
          ]
        }
      ]
    };

    // Slack Chat API (chat.postMessage)を呼び出し
    const slackResponse = await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${slackToken}`
      },
      body: JSON.stringify(slackMessage),
    });

    const slackData = await slackResponse.json();

    if (!slackResponse.ok || !slackData.ok) {
      console.error('Slack API error:', slackData);
      
      const errorMessage = await t('contact.content.form.error');
      return NextResponse.json(
        { error: errorMessage },
        { status: 500 }
      );
    }

    // 成功レスポンス
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending to Slack:', error);
    return NextResponse.json(
      { error: '内部サーバーエラー' },
      { status: 500 }
    );
  }
} 