import { getLanguageFromParams, translate, loadToolMessages } from '@/lib/i18n/server'
import PngToJpgClient from './components/PngToJpgClient'
import { Language, ImageToolsPngToJpgMessages } from '@/lib/i18n/types'
import SeoText, { SeoTextContent } from '@/components/SeoText'
import PageContainer from '@/components/PageContainer'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function PngToJpg({ params }: Props) {
  const param = await params;
  const lang = await getLanguageFromParams(param);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'image-tools/png-to-jpg');
  
  // サーバーコンポーネントで翻訳を並列取得
  const [
    title,
    description,
    uploadLabel,
    uploadButton,
    dragDropText,
    uploadLimitText,
    convertButton,
    downloadButton,
    downloadAllButton,
    previewText,
    processingText,
    noFileText,
    successText,
    browserProcessingText,
    fileTypeError,
    fileSizeError,
    conversionFailedError,
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
    translate(lang, 'imageTools.pngToJpg.title'),
    translate(lang, 'imageTools.pngToJpg.description'),
    translate(lang, 'imageTools.pngToJpg.form.upload.label'),
    translate(lang, 'imageTools.pngToJpg.form.upload.button'),
    translate(lang, 'imageTools.pngToJpg.form.upload.dragDrop'),
    translate(lang, 'imageTools.pngToJpg.form.upload.limitText'),
    translate(lang, 'imageTools.pngToJpg.form.convert'),
    translate(lang, 'imageTools.pngToJpg.result.download'),
    translate(lang, 'imageTools.pngToJpg.result.downloadAll'),
    translate(lang, 'imageTools.pngToJpg.result.preview'),
    translate(lang, 'imageTools.pngToJpg.status.processing'),
    translate(lang, 'imageTools.pngToJpg.status.noFile'),
    translate(lang, 'imageTools.pngToJpg.status.success'),
    translate(lang, 'imageTools.pngToJpg.status.browserProcessing'),
    translate(lang, 'imageTools.pngToJpg.error.fileType'),
    translate(lang, 'imageTools.pngToJpg.error.fileSize'),
    translate(lang, 'imageTools.pngToJpg.error.conversionFailed'),
    // SEOテキスト関連の翻訳
    translate(lang, 'imageTools.pngToJpg.seoText.overview.title'),
    translate(lang, 'imageTools.pngToJpg.seoText.overview.content'),
    translate(lang, 'imageTools.pngToJpg.seoText.howTo.title'),
    translate(lang, 'imageTools.pngToJpg.seoText.howTo.steps.0.title'),
    translate(lang, 'imageTools.pngToJpg.seoText.howTo.steps.0.description'),
    translate(lang, 'imageTools.pngToJpg.seoText.howTo.steps.1.title'),
    translate(lang, 'imageTools.pngToJpg.seoText.howTo.steps.1.description'),
    translate(lang, 'imageTools.pngToJpg.seoText.howTo.steps.2.title'),
    translate(lang, 'imageTools.pngToJpg.seoText.howTo.steps.2.description'),
    translate(lang, 'imageTools.pngToJpg.seoText.testimonials.title'),
    translate(lang, 'imageTools.pngToJpg.seoText.testimonials.users.0.name'),
    translate(lang, 'imageTools.pngToJpg.seoText.testimonials.users.0.comment'),
    translate(lang, 'imageTools.pngToJpg.seoText.testimonials.users.1.name'),
    translate(lang, 'imageTools.pngToJpg.seoText.testimonials.users.1.comment'),
    translate(lang, 'imageTools.pngToJpg.seoText.testimonials.users.2.name'),
    translate(lang, 'imageTools.pngToJpg.seoText.testimonials.users.2.comment'),
    translate(lang, 'imageTools.pngToJpg.seoText.features.title'),
    translate(lang, 'imageTools.pngToJpg.seoText.features.items.0.title'),
    translate(lang, 'imageTools.pngToJpg.seoText.features.items.0.description'),
    translate(lang, 'imageTools.pngToJpg.seoText.features.items.1.title'),
    translate(lang, 'imageTools.pngToJpg.seoText.features.items.1.description'),
    translate(lang, 'imageTools.pngToJpg.seoText.features.items.2.title'),
    translate(lang, 'imageTools.pngToJpg.seoText.features.items.2.description'),
    translate(lang, 'imageTools.pngToJpg.seoText.features.items.3.title'),
    translate(lang, 'imageTools.pngToJpg.seoText.features.items.3.description'),
    translate(lang, 'imageTools.pngToJpg.seoText.faq.title'),
    translate(lang, 'imageTools.pngToJpg.seoText.faq.questions.0.question'),
    translate(lang, 'imageTools.pngToJpg.seoText.faq.questions.0.answer'),
    translate(lang, 'imageTools.pngToJpg.seoText.faq.questions.1.question'),
    translate(lang, 'imageTools.pngToJpg.seoText.faq.questions.1.answer'),
    translate(lang, 'imageTools.pngToJpg.seoText.faq.questions.2.question'),
    translate(lang, 'imageTools.pngToJpg.seoText.faq.questions.2.answer'),
    translate(lang, 'imageTools.pngToJpg.seoText.faq.questions.3.question'),
    translate(lang, 'imageTools.pngToJpg.seoText.faq.questions.3.answer'),
    translate(lang, 'imageTools.pngToJpg.seoText.faq.questions.4.question'),
    translate(lang, 'imageTools.pngToJpg.seoText.faq.questions.4.answer')
  ])

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: ImageToolsPngToJpgMessages = {
    meta: {
      title: "",
      description: "",
      keywords: ""
    },
    title,
    description,
    form: {
      upload: {
        label: uploadLabel,
        button: uploadButton,
        dragDrop: dragDropText,
        limitText: uploadLimitText
      },
      convert: convertButton
    },
    result: {
      download: downloadButton,
      downloadAll: downloadAllButton,
      preview: previewText
    },
    status: {
      processing: processingText,
      noFile: noFileText,
      success: successText,
      browserProcessing: browserProcessingText
    },
    error: {
      fileType: fileTypeError,
      fileSize: fileSizeError,
      conversionFailed: conversionFailedError
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
  }

  // SEOテキスト用のデータを作成
  const seoTextContent: SeoTextContent = messages.seoText;

  return (
    <PageContainer>
      <PngToJpgClient translations={messages} />
      <SeoText content={seoTextContent}/>
    </PageContainer>
  )
} 