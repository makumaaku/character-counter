import { translate, loadToolMessages } from '@/lib/i18n/server';
import { Language, CharacterCounterAboutUsMessages } from '@/lib/i18n/types';

type Props = {
  params: Promise<{ lang: string }>
}

export default async function AboutUsPage(props: Props) {
  const params = await props.params;
  const lang = params.lang as Language;
  
  // 翻訳をロード
  await loadToolMessages(lang, 'character-counter/about-us');
  
  // サーバーコンポーネントで翻訳を並列取得
  const [
    title,
    ourStoryTitle,
    ourStoryContent,
    ourMissionTitle,
    ourMissionIntro,
    ourMissionPoint1,
    ourMissionPoint2,
    ourMissionPoint3,
    ourMissionPoint4,
    toolTitle,
    toolDescription,
    toolFeature1,
    toolFeature2,
    toolFeature3,
    toolFeature4,
    toolFeature5,
    valuesTitle,
    simplicityTitle,
    simplicityContent,
    privacyTitle,
    privacyContent,
    accessibilityTitle,
    accessibilityContent,
    innovationTitle,
    innovationContent,
    contactTitle,
    contactDescription,
    contactEmail,
    contactTwitter,
    contactGithub
  ] = await Promise.all([
    translate(lang, 'characterCounter.aboutUs.title'),
    translate(lang, 'characterCounter.aboutUs.ourStory.title'),
    translate(lang, 'characterCounter.aboutUs.ourStory.content'),
    translate(lang, 'characterCounter.aboutUs.ourMission.title'),
    translate(lang, 'characterCounter.aboutUs.ourMission.intro'),
    translate(lang, 'characterCounter.aboutUs.ourMission.points.1'),
    translate(lang, 'characterCounter.aboutUs.ourMission.points.2'),
    translate(lang, 'characterCounter.aboutUs.ourMission.points.3'),
    translate(lang, 'characterCounter.aboutUs.ourMission.points.4'),
    translate(lang, 'characterCounter.aboutUs.tool.title'),
    translate(lang, 'characterCounter.aboutUs.tool.description'),
    translate(lang, 'characterCounter.aboutUs.tool.features.1'),
    translate(lang, 'characterCounter.aboutUs.tool.features.2'),
    translate(lang, 'characterCounter.aboutUs.tool.features.3'),
    translate(lang, 'characterCounter.aboutUs.tool.features.4'),
    translate(lang, 'characterCounter.aboutUs.tool.features.5'),
    translate(lang, 'characterCounter.aboutUs.values.title'),
    translate(lang, 'characterCounter.aboutUs.values.simplicity.title'),
    translate(lang, 'characterCounter.aboutUs.values.simplicity.content'),
    translate(lang, 'characterCounter.aboutUs.values.privacy.title'),
    translate(lang, 'characterCounter.aboutUs.values.privacy.content'),
    translate(lang, 'characterCounter.aboutUs.values.accessibility.title'),
    translate(lang, 'characterCounter.aboutUs.values.accessibility.content'),
    translate(lang, 'characterCounter.aboutUs.values.innovation.title'),
    translate(lang, 'characterCounter.aboutUs.values.innovation.content'),
    translate(lang, 'characterCounter.aboutUs.contact.title'),
    translate(lang, 'characterCounter.aboutUs.contact.description'),
    translate(lang, 'characterCounter.aboutUs.contact.email'),
    translate(lang, 'characterCounter.aboutUs.contact.twitter'),
    translate(lang, 'characterCounter.aboutUs.contact.github')
  ]);

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: CharacterCounterAboutUsMessages = {
    title,
    ourStory: {
      title: ourStoryTitle,
      content: ourStoryContent
    },
    ourMission: {
      title: ourMissionTitle,
      intro: ourMissionIntro,
      points: {
        1: ourMissionPoint1,
        2: ourMissionPoint2,
        3: ourMissionPoint3,
        4: ourMissionPoint4
      }
    },
    tool: {
      title: toolTitle,
      description: toolDescription,
      features: {
        1: toolFeature1,
        2: toolFeature2,
        3: toolFeature3,
        4: toolFeature4,
        5: toolFeature5
      }
    },
    values: {
      title: valuesTitle,
      simplicity: {
        title: simplicityTitle,
        content: simplicityContent
      },
      privacy: {
        title: privacyTitle,
        content: privacyContent
      },
      accessibility: {
        title: accessibilityTitle,
        content: accessibilityContent
      },
      innovation: {
        title: innovationTitle,
        content: innovationContent
      }
    },
    contact: {
      title: contactTitle,
      description: contactDescription,
      email: contactEmail,
      twitter: contactTwitter,
      github: contactGithub
    },
    meta: {
      title: "",
      description: "",
      keywords: "",
      publisher: {
        description: ""
      },
      article: {
        headline: "",
        description: "",
        body: ""
      }
    }
  };

  return (
    <div className="bg-gray-800 text-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-8">{messages.title}</h1>

        <div className="bg-gray-700 rounded-lg p-6 space-y-8">
          <div>
            <h2 className="text-xl font-bold mb-4">{messages.ourStory.title}</h2>
            <p className="text-gray-300">
              {messages.ourStory.content}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">{messages.ourMission.title}</h2>
            <p className="text-gray-300">
              {messages.ourMission.intro}
            </p>
            <ul className="list-disc pl-6 text-gray-300 mt-2">
              <li>{messages.ourMission.points[1]}</li>
              <li>{messages.ourMission.points[2]}</li>
              <li>{messages.ourMission.points[3]}</li>
              <li>{messages.ourMission.points[4]}</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">{messages.tool.title}</h2>
            <p className="text-gray-300">
              {messages.tool.description}
            </p>
            <ul className="list-disc pl-6 text-gray-300 mt-2">
              <li>{messages.tool.features[1]}</li>
              <li>{messages.tool.features[2]}</li>
              <li>{messages.tool.features[3]}</li>
              <li>{messages.tool.features[4]}</li>
              <li>{messages.tool.features[5]}</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">{messages.values.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">{messages.values.simplicity.title}</h3>
                <p className="text-gray-300">
                  {messages.values.simplicity.content}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{messages.values.privacy.title}</h3>
                <p className="text-gray-300">
                  {messages.values.privacy.content}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{messages.values.accessibility.title}</h3>
                <p className="text-gray-300">
                  {messages.values.accessibility.content}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{messages.values.innovation.title}</h3>
                <p className="text-gray-300">
                  {messages.values.innovation.content}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">{messages.contact.title}</h2>
            <p className="text-gray-300">
              {messages.contact.description}
            </p>
            <div className="mt-4">
              <p className="text-gray-300">{messages.contact.email}: support@boring-tool.com</p>
              <p className="text-gray-300">{messages.contact.twitter}: @boring_tool</p>
              <p className="text-gray-300">{messages.contact.github}: github.com/boring-inc</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 