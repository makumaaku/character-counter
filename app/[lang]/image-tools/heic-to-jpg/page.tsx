import { getLanguageFromParams, translate, loadToolMessages } from '@/lib/i18n/server'
import HeicToJpgClient from './components/HeicToJpgClient'
import { Language } from '@/lib/i18n/types'
import SeoText, { SeoTextContent } from '@/components/SeoText'
import PageContainer from '@/components/PageContainer'

// Define the extended message type to include seoText
interface ImageToolsHeicToJpgMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  title: string;
  description: string;
  upload: {
    limit: string;
  };
  form: {
    upload: {
      label: string;
      button: string;
      dragDrop: string;
    };
    convert: string;
  };
  result: {
    download: string;
    downloadAll: string;
    preview: string;
  };
  preview: {
    filesSelected: string;
  };
  status: {
    processing: string;
    noFile: string;
    success: string;
    convertingFile: string;
  };
  error: {
    fileType: string;
    fileSize: string;
    conversion: string;
  };
  seoText: SeoTextContent;
}

type Props = {
  params: Promise<{ lang: string }>
}

export default async function HeicToJpg({ params }: Props) {
  const param = await params;
  const lang = await getLanguageFromParams(param);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'image-tools/heic-to-jpg');

  // サーバーコンポーネントで翻訳を並列取得
  const [
    title,
    description,
    uploadLabel,
    uploadButton,
    dragDropText,
    uploadLimit,
    convertButton,
    downloadButton,
    downloadAllButton,
    previewText,
    filesSelectedText,
    processingText,
    noFileText,
    successText,
    convertingFileText,
    fileTypeError,
    fileSizeError,
    conversionError,
    // SEOテキスト関連の翻訳
    seoOverviewTitle,
    seoOverviewContent,
    seoHowToTitle,
    seoHowToStep1Title,
    seoHowToStep1Desc,
    seoHowToStep2Title,
    seoHowToStep2Desc,
    seoHowToStep3Title,
    seoHowToStep3Desc,
    seoTestimonialsTitle,
    seoTestimonialsUser1Name,
    seoTestimonialsUser1Comment,
    seoTestimonialsUser2Name,
    seoTestimonialsUser2Comment,
    seoTestimonialsUser3Name,
    seoTestimonialsUser3Comment,
    seoFeaturesTitle,
    seoFeaturesItem1Title,
    seoFeaturesItem1Desc,
    seoFeaturesItem2Title,
    seoFeaturesItem2Desc,
    seoFeaturesItem3Title,
    seoFeaturesItem3Desc,
    seoFeaturesItem4Title,
    seoFeaturesItem4Desc,
    seoFaqTitle,
    seoFaqQ1,
    seoFaqA1,
    seoFaqQ2,
    seoFaqA2,
    seoFaqQ3,
    seoFaqA3,
    seoFaqQ4,
    seoFaqA4,
    seoFaqQ5,
    seoFaqA5
  ] = await Promise.all([
    translate(lang, 'imageTools.heicToJpg.title'),
    translate(lang, 'imageTools.heicToJpg.description'),
    translate(lang, 'imageTools.heicToJpg.form.upload.label'),
    translate(lang, 'imageTools.heicToJpg.form.upload.button'),
    translate(lang, 'imageTools.heicToJpg.form.upload.dragDrop'),
    translate(lang, 'imageTools.heicToJpg.upload.limit'),
    translate(lang, 'imageTools.heicToJpg.form.convert'),
    translate(lang, 'imageTools.heicToJpg.result.download'),
    translate(lang, 'imageTools.heicToJpg.result.downloadAll'),
    translate(lang, 'imageTools.heicToJpg.result.preview'),
    translate(lang, 'imageTools.heicToJpg.preview.filesSelected'),
    translate(lang, 'imageTools.heicToJpg.status.processing'),
    translate(lang, 'imageTools.heicToJpg.status.noFile'),
    translate(lang, 'imageTools.heicToJpg.status.success'),
    translate(lang, 'imageTools.heicToJpg.status.convertingFile'),
    translate(lang, 'imageTools.heicToJpg.error.fileType'),
    translate(lang, 'imageTools.heicToJpg.error.fileSize'),
    translate(lang, 'imageTools.heicToJpg.error.conversion'),
    // SEOテキスト関連の翻訳
    translate(lang, 'imageTools.heicToJpg.seoText.overview.title'),
    translate(lang, 'imageTools.heicToJpg.seoText.overview.content'),
    translate(lang, 'imageTools.heicToJpg.seoText.howTo.title'),
    translate(lang, 'imageTools.heicToJpg.seoText.howTo.steps.0.title'),
    translate(lang, 'imageTools.heicToJpg.seoText.howTo.steps.0.description'),
    translate(lang, 'imageTools.heicToJpg.seoText.howTo.steps.1.title'),
    translate(lang, 'imageTools.heicToJpg.seoText.howTo.steps.1.description'),
    translate(lang, 'imageTools.heicToJpg.seoText.howTo.steps.2.title'),
    translate(lang, 'imageTools.heicToJpg.seoText.howTo.steps.2.description'),
    translate(lang, 'imageTools.heicToJpg.seoText.testimonials.title'),
    translate(lang, 'imageTools.heicToJpg.seoText.testimonials.users.0.name'),
    translate(lang, 'imageTools.heicToJpg.seoText.testimonials.users.0.comment'),
    translate(lang, 'imageTools.heicToJpg.seoText.testimonials.users.1.name'),
    translate(lang, 'imageTools.heicToJpg.seoText.testimonials.users.1.comment'),
    translate(lang, 'imageTools.heicToJpg.seoText.testimonials.users.2.name'),
    translate(lang, 'imageTools.heicToJpg.seoText.testimonials.users.2.comment'),
    translate(lang, 'imageTools.heicToJpg.seoText.features.title'),
    translate(lang, 'imageTools.heicToJpg.seoText.features.items.0.title'),
    translate(lang, 'imageTools.heicToJpg.seoText.features.items.0.description'),
    translate(lang, 'imageTools.heicToJpg.seoText.features.items.1.title'),
    translate(lang, 'imageTools.heicToJpg.seoText.features.items.1.description'),
    translate(lang, 'imageTools.heicToJpg.seoText.features.items.2.title'),
    translate(lang, 'imageTools.heicToJpg.seoText.features.items.2.description'),
    translate(lang, 'imageTools.heicToJpg.seoText.features.items.3.title'),
    translate(lang, 'imageTools.heicToJpg.seoText.features.items.3.description'),
    translate(lang, 'imageTools.heicToJpg.seoText.faq.title'),
    translate(lang, 'imageTools.heicToJpg.seoText.faq.questions.0.question'),
    translate(lang, 'imageTools.heicToJpg.seoText.faq.questions.0.answer'),
    translate(lang, 'imageTools.heicToJpg.seoText.faq.questions.1.question'),
    translate(lang, 'imageTools.heicToJpg.seoText.faq.questions.1.answer'),
    translate(lang, 'imageTools.heicToJpg.seoText.faq.questions.2.question'),
    translate(lang, 'imageTools.heicToJpg.seoText.faq.questions.2.answer'),
    translate(lang, 'imageTools.heicToJpg.seoText.faq.questions.3.question'),
    translate(lang, 'imageTools.heicToJpg.seoText.faq.questions.3.answer'),
    translate(lang, 'imageTools.heicToJpg.seoText.faq.questions.4.question'),
    translate(lang, 'imageTools.heicToJpg.seoText.faq.questions.4.answer')
  ]);

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: ImageToolsHeicToJpgMessages = {
    meta: {
      title: "",
      description: "",
      keywords: ""
    },
    title,
    description,
    upload: {
      limit: uploadLimit
    },
    form: {
      upload: {
        label: uploadLabel,
        button: uploadButton,
        dragDrop: dragDropText
      },
      convert: convertButton
    },
    result: {
      download: downloadButton,
      downloadAll: downloadAllButton,
      preview: previewText
    },
    preview: {
      filesSelected: filesSelectedText
    },
    status: {
      processing: processingText,
      noFile: noFileText,
      success: successText,
      convertingFile: convertingFileText
    },
    error: {
      fileType: fileTypeError,
      fileSize: fileSizeError,
      conversion: conversionError
    },
    seoText: {
      overview: {
        title: seoOverviewTitle,
        content: seoOverviewContent
      },
      howTo: {
        title: seoHowToTitle,
        steps: [
          {
            title: seoHowToStep1Title,
            description: seoHowToStep1Desc
          },
          {
            title: seoHowToStep2Title,
            description: seoHowToStep2Desc
          },
          {
            title: seoHowToStep3Title,
            description: seoHowToStep3Desc
          }
        ]
      },
      testimonials: {
        title: seoTestimonialsTitle,
        users: [
          {
            name: seoTestimonialsUser1Name,
            comment: seoTestimonialsUser1Comment
          },
          {
            name: seoTestimonialsUser2Name,
            comment: seoTestimonialsUser2Comment
          },
          {
            name: seoTestimonialsUser3Name,
            comment: seoTestimonialsUser3Comment
          }
        ]
      },
      features: {
        title: seoFeaturesTitle,
        items: [
          {
            title: seoFeaturesItem1Title,
            description: seoFeaturesItem1Desc
          },
          {
            title: seoFeaturesItem2Title,
            description: seoFeaturesItem2Desc
          },
          {
            title: seoFeaturesItem3Title,
            description: seoFeaturesItem3Desc
          },
          {
            title: seoFeaturesItem4Title,
            description: seoFeaturesItem4Desc
          }
        ]
      },
      faq: {
        title: seoFaqTitle,
        questions: [
          {
            question: seoFaqQ1,
            answer: seoFaqA1
          },
          {
            question: seoFaqQ2,
            answer: seoFaqA2
          },
          {
            question: seoFaqQ3,
            answer: seoFaqA3
          },
          {
            question: seoFaqQ4,
            answer: seoFaqA4
          },
          {
            question: seoFaqQ5,
            answer: seoFaqA5
          }
        ]
      }
    }
  };

  // SEO用のテキストコンテンツを作成
  const seoContent: SeoTextContent = messages.seoText;

  return (
    <PageContainer>
      <HeicToJpgClient messages={messages} />
      <SeoText content={seoContent} />
    </PageContainer>
  )
} 