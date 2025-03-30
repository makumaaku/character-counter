import { translate, loadToolMessages } from '@/lib/i18n/server';
import { Language, CharacterCounterUsecaseMessages } from '@/lib/i18n/types';

type Props = {
  params: Promise<{ lang: string }>
}

export default async function UseCasePage(props: Props) {
  const params = await props.params;
  const lang = params.lang as Language;
  
  // 翻訳をロード
  await loadToolMessages(lang, 'character-counter/usecase');
  
  // サーバーコンポーネントで翻訳を並列取得
  const [
    title,
    subtitle,
    description,
    writingTitle,
    writingEfficientArticleTitle,
    writingEfficientArticleDescription,
    writingStructureTitle,
    writingStructureDescription,
    socialTitle,
    socialLimitsTitle,
    socialLimitsDescription,
    socialAdCopyTitle,
    socialAdCopyDescription,
    seoTitle,
    seoContentTitle,
    seoContentDescription,
    seoStructureTitle,
    seoStructureDescription,
    marketingTitle,
    marketingBrandTitle,
    marketingBrandDescription,
    marketingDocumentsTitle,
    marketingDocumentsDescription,
    conclusion,
    testimonialsTitle,
    testimonial1Name,
    testimonial1Quote,
    testimonial2Name,
    testimonial2Quote,
    testimonial3Name,
    testimonial3Quote
  ] = await Promise.all([
    translate(lang, 'characterCounter.usecase.title'),
    translate(lang, 'characterCounter.usecase.subtitle'),
    translate(lang, 'characterCounter.usecase.description'),
    translate(lang, 'characterCounter.usecase.cases.writing.title'),
    translate(lang, 'characterCounter.usecase.cases.writing.efficientArticle.title'),
    translate(lang, 'characterCounter.usecase.cases.writing.efficientArticle.description'),
    translate(lang, 'characterCounter.usecase.cases.writing.structure.title'),
    translate(lang, 'characterCounter.usecase.cases.writing.structure.description'),
    translate(lang, 'characterCounter.usecase.cases.social.title'),
    translate(lang, 'characterCounter.usecase.cases.social.limits.title'),
    translate(lang, 'characterCounter.usecase.cases.social.limits.description'),
    translate(lang, 'characterCounter.usecase.cases.social.adCopy.title'),
    translate(lang, 'characterCounter.usecase.cases.social.adCopy.description'),
    translate(lang, 'characterCounter.usecase.cases.seo.title'),
    translate(lang, 'characterCounter.usecase.cases.seo.content.title'),
    translate(lang, 'characterCounter.usecase.cases.seo.content.description'),
    translate(lang, 'characterCounter.usecase.cases.seo.structure.title'),
    translate(lang, 'characterCounter.usecase.cases.seo.structure.description'),
    translate(lang, 'characterCounter.usecase.cases.marketing.title'),
    translate(lang, 'characterCounter.usecase.cases.marketing.brand.title'),
    translate(lang, 'characterCounter.usecase.cases.marketing.brand.description'),
    translate(lang, 'characterCounter.usecase.cases.marketing.documents.title'),
    translate(lang, 'characterCounter.usecase.cases.marketing.documents.description'),
    translate(lang, 'characterCounter.usecase.conclusion'),
    translate(lang, 'characterCounter.usecase.testimonials.title'),
    translate(lang, 'characterCounter.usecase.testimonials.users.1.name'),
    translate(lang, 'characterCounter.usecase.testimonials.users.1.quote'),
    translate(lang, 'characterCounter.usecase.testimonials.users.2.name'),
    translate(lang, 'characterCounter.usecase.testimonials.users.2.quote'),
    translate(lang, 'characterCounter.usecase.testimonials.users.3.name'),
    translate(lang, 'characterCounter.usecase.testimonials.users.3.quote')
  ]);

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: CharacterCounterUsecaseMessages = {
    title,
    subtitle,
    description,
    cases: {
      writing: {
        title: writingTitle,
        efficientArticle: {
          title: writingEfficientArticleTitle,
          description: writingEfficientArticleDescription
        },
        structure: {
          title: writingStructureTitle,
          description: writingStructureDescription
        }
      },
      social: {
        title: socialTitle,
        limits: {
          title: socialLimitsTitle,
          description: socialLimitsDescription
        },
        adCopy: {
          title: socialAdCopyTitle,
          description: socialAdCopyDescription
        }
      },
      seo: {
        title: seoTitle,
        content: {
          title: seoContentTitle,
          description: seoContentDescription
        },
        structure: {
          title: seoStructureTitle,
          description: seoStructureDescription
        }
      },
      marketing: {
        title: marketingTitle,
        brand: {
          title: marketingBrandTitle,
          description: marketingBrandDescription
        },
        documents: {
          title: marketingDocumentsTitle,
          description: marketingDocumentsDescription
        }
      }
    },
    conclusion,
    testimonials: {
      title: testimonialsTitle,
      users: {
        1: {
          name: testimonial1Name,
          quote: testimonial1Quote
        },
        2: {
          name: testimonial2Name,
          quote: testimonial2Quote
        },
        3: {
          name: testimonial3Name,
          quote: testimonial3Quote
        }
      }
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
    <>
      <div className="bg-gray-800 text-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-8">{messages.title}</h1>
          
          <div className="bg-gray-700 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-6">{messages.subtitle}</h2>
            <p className="text-gray-300 mb-8">{messages.description}</p>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold mb-4">{messages.cases.writing.title}</h3>
                <div className="space-y-4 pl-4">
                  <div>
                    <h4 className="font-semibold mb-2">{messages.cases.writing.efficientArticle.title}</h4>
                    <p className="text-gray-300">{messages.cases.writing.efficientArticle.description}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{messages.cases.writing.structure.title}</h4>
                    <p className="text-gray-300">{messages.cases.writing.structure.description}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">{messages.cases.social.title}</h3>
                <div className="space-y-4 pl-4">
                  <div>
                    <h4 className="font-semibold mb-2">{messages.cases.social.limits.title}</h4>
                    <p className="text-gray-300">{messages.cases.social.limits.description}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{messages.cases.social.adCopy.title}</h4>
                    <p className="text-gray-300">{messages.cases.social.adCopy.description}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">{messages.cases.seo.title}</h3>
                <div className="space-y-4 pl-4">
                  <div>
                    <h4 className="font-semibold mb-2">{messages.cases.seo.content.title}</h4>
                    <p className="text-gray-300">{messages.cases.seo.content.description}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{messages.cases.seo.structure.title}</h4>
                    <p className="text-gray-300">{messages.cases.seo.structure.description}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">{messages.cases.marketing.title}</h3>
                <div className="space-y-4 pl-4">
                  <div>
                    <h4 className="font-semibold mb-2">{messages.cases.marketing.brand.title}</h4>
                    <p className="text-gray-300">{messages.cases.marketing.brand.description}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{messages.cases.marketing.documents.title}</h4>
                    <p className="text-gray-300">{messages.cases.marketing.documents.description}</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-300 mt-8">{messages.conclusion}</p>
          </div>

          <div className="bg-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6">{messages.testimonials.title}</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">{messages.testimonials.users[1].name}</h3>
                <p className="text-gray-300 pl-4">&ldquo;{messages.testimonials.users[1].quote}&rdquo;</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{messages.testimonials.users[2].name}</h3>
                <p className="text-gray-300 pl-4">&ldquo;{messages.testimonials.users[2].quote}&rdquo;</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{messages.testimonials.users[3].name}</h3>
                <p className="text-gray-300 pl-4">&ldquo;{messages.testimonials.users[3].quote}&rdquo;</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 