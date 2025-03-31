import { translate, loadToolMessages } from '@/lib/i18n/server';
import { Language, CharacterCounterPrivacyMessages } from '@/lib/i18n/types';

type Props = {
  params: Promise<{ lang: string }>
}

export default async function PrivacyPage(props: Props) {
  const params = await props.params;
  const lang = params.lang as Language;
  
  // 翻訳をロード
  await loadToolMessages(lang, 'character-counter/privacy');
  
  // サーバーコンポーネントで翻訳を並列取得
  const [
    title,
    introduction,
    collectionTitle,
    collectionTextTitle,
    collectionTextDescription,
    collectionLogTitle,
    collectionLogIntro,
    collectionLogItem1,
    collectionLogItem2,
    collectionLogItem3,
    collectionLogPurpose,
    collectionCookiesTitle,
    collectionCookiesDescription,
    usageTitle,
    usageIntro,
    usagePurpose1,
    usagePurpose2,
    usagePurpose3,
    usageNote,
    sharingTitle,
    sharingIntro,
    sharingCase1,
    sharingCase2,
    retentionTitle,
    retentionDescription,
    childrenTitle,
    childrenDescription,
    securityTitle,
    securityDescription,
    changesTitle,
    changesDescription,
    contactTitle,
    contactDescription
  ] = await Promise.all([
    translate(lang, 'characterCounter.privacy.title'),
    translate(lang, 'characterCounter.privacy.introduction'),
    translate(lang, 'characterCounter.privacy.collection.title'),
    translate(lang, 'characterCounter.privacy.collection.text.title'),
    translate(lang, 'characterCounter.privacy.collection.text.description'),
    translate(lang, 'characterCounter.privacy.collection.log.title'),
    translate(lang, 'characterCounter.privacy.collection.log.intro'),
    translate(lang, 'characterCounter.privacy.collection.log.items.1'),
    translate(lang, 'characterCounter.privacy.collection.log.items.2'),
    translate(lang, 'characterCounter.privacy.collection.log.items.3'),
    translate(lang, 'characterCounter.privacy.collection.log.purpose'),
    translate(lang, 'characterCounter.privacy.collection.cookies.title'),
    translate(lang, 'characterCounter.privacy.collection.cookies.description'),
    translate(lang, 'characterCounter.privacy.usage.title'),
    translate(lang, 'characterCounter.privacy.usage.intro'),
    translate(lang, 'characterCounter.privacy.usage.purposes.1'),
    translate(lang, 'characterCounter.privacy.usage.purposes.2'),
    translate(lang, 'characterCounter.privacy.usage.purposes.3'),
    translate(lang, 'characterCounter.privacy.usage.note'),
    translate(lang, 'characterCounter.privacy.sharing.title'),
    translate(lang, 'characterCounter.privacy.sharing.intro'),
    translate(lang, 'characterCounter.privacy.sharing.cases.1'),
    translate(lang, 'characterCounter.privacy.sharing.cases.2'),
    translate(lang, 'characterCounter.privacy.retention.title'),
    translate(lang, 'characterCounter.privacy.retention.description'),
    translate(lang, 'characterCounter.privacy.children.title'),
    translate(lang, 'characterCounter.privacy.children.description'),
    translate(lang, 'characterCounter.privacy.security.title'),
    translate(lang, 'characterCounter.privacy.security.description'),
    translate(lang, 'characterCounter.privacy.changes.title'),
    translate(lang, 'characterCounter.privacy.changes.description'),
    translate(lang, 'characterCounter.privacy.contact.title'),
    translate(lang, 'characterCounter.privacy.contact.description')
  ]);

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: CharacterCounterPrivacyMessages = {
    title,
    introduction,
    collection: {
      title: collectionTitle,
      text: {
        title: collectionTextTitle,
        description: collectionTextDescription
      },
      log: {
        title: collectionLogTitle,
        intro: collectionLogIntro,
        items: {
          "1": collectionLogItem1,
          "2": collectionLogItem2,
          "3": collectionLogItem3
        },
        purpose: collectionLogPurpose
      },
      cookies: {
        title: collectionCookiesTitle,
        description: collectionCookiesDescription
      }
    },
    usage: {
      title: usageTitle,
      intro: usageIntro,
      purposes: {
        "1": usagePurpose1,
        "2": usagePurpose2,
        "3": usagePurpose3
      },
      note: usageNote
    },
    sharing: {
      title: sharingTitle,
      intro: sharingIntro,
      cases: {
        "1": sharingCase1,
        "2": sharingCase2
      }
    },
    retention: {
      title: retentionTitle,
      description: retentionDescription
    },
    children: {
      title: childrenTitle,
      description: childrenDescription
    },
    security: {
      title: securityTitle,
      description: securityDescription
    },
    changes: {
      title: changesTitle,
      description: changesDescription
    },
    contact: {
      title: contactTitle,
      description: contactDescription
    },
    meta: {
      title: '',
      description: '',
      keywords: '',
      article: {
        headline: '',
        description: '',
        body: ''
      }
    }
  };

  return (
    <div className="bg-gray-800 text-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-8">{messages.title}</h1>

        <div className="bg-gray-700 rounded-lg p-6 space-y-8">
          <div>
            <p className="text-gray-300">
              {messages.introduction}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">{messages.collection.title}</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">{messages.collection.text.title}</h3>
                <p className="text-gray-300" dangerouslySetInnerHTML={{ __html: messages.collection.text.description }} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{messages.collection.log.title}</h3>
                <p className="text-gray-300">
                  {messages.collection.log.intro}
                </p>
                <ul className="list-disc pl-6 text-gray-300 mt-2">
                  <li>{messages.collection.log.items["1"]}</li>
                  <li>{messages.collection.log.items["2"]}</li>
                  <li>{messages.collection.log.items["3"]}</li>
                </ul>
                <p className="text-gray-300 mt-2">
                  {messages.collection.log.purpose}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{messages.collection.cookies.title}</h3>
                <p className="text-gray-300" dangerouslySetInnerHTML={{ __html: messages.collection.cookies.description }} />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">{messages.usage.title}</h2>
            <p className="text-gray-300">{messages.usage.intro}</p>
            <ul className="list-disc pl-6 text-gray-300 mt-2">
              <li>{messages.usage.purposes["1"]}</li>
              <li>{messages.usage.purposes["2"]}</li>
              <li>{messages.usage.purposes["3"]}</li>
            </ul>
            <p className="text-gray-300 mt-2">
              {messages.usage.note}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">{messages.sharing.title}</h2>
            <p className="text-gray-300">
              {messages.sharing.intro}
            </p>
            <ul className="list-disc pl-6 text-gray-300 mt-2">
              <li>{messages.sharing.cases["1"]}</li>
              <li>{messages.sharing.cases["2"]}</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">{messages.retention.title}</h2>
            <p className="text-gray-300" dangerouslySetInnerHTML={{ __html: messages.retention.description }} />
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">{messages.children.title}</h2>
            <p className="text-gray-300">
              {messages.children.description}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">{messages.security.title}</h2>
            <p className="text-gray-300">
              {messages.security.description}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">{messages.changes.title}</h2>
            <p className="text-gray-300">
              {messages.changes.description}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">{messages.contact.title}</h2>
            <p className="text-gray-300" dangerouslySetInnerHTML={{ __html: messages.contact.description }} />
          </div>
        </div>
      </div>
    </div>
  );
} 