import { getLanguageFromParams, translate, loadToolMessages } from '@/lib/i18n/server'
import PngToWebpClient from './components/PngToWebpClient'
import { Language, ImageToolsPngToWebpMessages } from '@/lib/i18n/types'
import SeoText, { SeoTextContent } from '@/components/SeoText'
import PageContainer from '@/components/PageContainer'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function PngToWebp({ params }: Props) {
  const param = await params;
  const lang = await getLanguageFromParams(param);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'image-tools/png-to-webp');

  // サーバーコンポーネントで翻訳を並列取得
  const [
    title,
    description,
    uploadLabel,
    uploadButton,
    dragDropText,
    convertButton,
    downloadButton,
    downloadAllButton,
    processingText,
    noFileText,
    fileTypeError,
    fileSizeError,
    uploadLimit,
    previewTitle,
    previewFilesSelected,
    resultTitle,
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
    translate(lang, 'imageTools.pngToWebp.title'),
    translate(lang, 'imageTools.pngToWebp.description'),
    translate(lang, 'imageTools.pngToWebp.form.upload.label'),
    translate(lang, 'imageTools.pngToWebp.form.upload.button'),
    translate(lang, 'imageTools.pngToWebp.form.upload.dragDrop'),
    translate(lang, 'imageTools.pngToWebp.form.convert'),
    translate(lang, 'imageTools.pngToWebp.result.download'),
    translate(lang, 'imageTools.pngToWebp.result.downloadAll'),
    translate(lang, 'imageTools.pngToWebp.status.processing'),
    translate(lang, 'imageTools.pngToWebp.status.noFile'),
    translate(lang, 'imageTools.pngToWebp.error.fileType'),
    translate(lang, 'imageTools.pngToWebp.error.fileSize'),
    translate(lang, 'imageTools.pngToWebp.upload.limit'),
    translate(lang, 'imageTools.pngToWebp.preview.title'),
    translate(lang, 'imageTools.pngToWebp.preview.filesSelected'),
    translate(lang, 'imageTools.pngToWebp.result.title'),
    // SEOテキスト関連の翻訳
    translate(lang, 'imageTools.pngToWebp.seoText.overview.title'),
    translate(lang, 'imageTools.pngToWebp.seoText.overview.content'),
    translate(lang, 'imageTools.pngToWebp.seoText.howTo.title'),
    translate(lang, 'imageTools.pngToWebp.seoText.howTo.steps.0.title'),
    translate(lang, 'imageTools.pngToWebp.seoText.howTo.steps.0.description'),
    translate(lang, 'imageTools.pngToWebp.seoText.howTo.steps.1.title'),
    translate(lang, 'imageTools.pngToWebp.seoText.howTo.steps.1.description'),
    translate(lang, 'imageTools.pngToWebp.seoText.howTo.steps.2.title'),
    translate(lang, 'imageTools.pngToWebp.seoText.howTo.steps.2.description'),
    translate(lang, 'imageTools.pngToWebp.seoText.testimonials.title'),
    translate(lang, 'imageTools.pngToWebp.seoText.testimonials.users.0.name'),
    translate(lang, 'imageTools.pngToWebp.seoText.testimonials.users.0.comment'),
    translate(lang, 'imageTools.pngToWebp.seoText.testimonials.users.1.name'),
    translate(lang, 'imageTools.pngToWebp.seoText.testimonials.users.1.comment'),
    translate(lang, 'imageTools.pngToWebp.seoText.testimonials.users.2.name'),
    translate(lang, 'imageTools.pngToWebp.seoText.testimonials.users.2.comment'),
    translate(lang, 'imageTools.pngToWebp.seoText.features.title'),
    translate(lang, 'imageTools.pngToWebp.seoText.features.items.0.title'),
    translate(lang, 'imageTools.pngToWebp.seoText.features.items.0.description'),
    translate(lang, 'imageTools.pngToWebp.seoText.features.items.1.title'),
    translate(lang, 'imageTools.pngToWebp.seoText.features.items.1.description'),
    translate(lang, 'imageTools.pngToWebp.seoText.features.items.2.title'),
    translate(lang, 'imageTools.pngToWebp.seoText.features.items.2.description'),
    translate(lang, 'imageTools.pngToWebp.seoText.features.items.3.title'),
    translate(lang, 'imageTools.pngToWebp.seoText.features.items.3.description'),
    translate(lang, 'imageTools.pngToWebp.seoText.faq.title'),
    translate(lang, 'imageTools.pngToWebp.seoText.faq.questions.0.question'),
    translate(lang, 'imageTools.pngToWebp.seoText.faq.questions.0.answer'),
    translate(lang, 'imageTools.pngToWebp.seoText.faq.questions.1.question'),
    translate(lang, 'imageTools.pngToWebp.seoText.faq.questions.1.answer'),
    translate(lang, 'imageTools.pngToWebp.seoText.faq.questions.2.question'),
    translate(lang, 'imageTools.pngToWebp.seoText.faq.questions.2.answer'),
    translate(lang, 'imageTools.pngToWebp.seoText.faq.questions.3.question'),
    translate(lang, 'imageTools.pngToWebp.seoText.faq.questions.3.answer'),
    translate(lang, 'imageTools.pngToWebp.seoText.faq.questions.4.question'),
    translate(lang, 'imageTools.pngToWebp.seoText.faq.questions.4.answer')
  ])

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: ImageToolsPngToWebpMessages = {
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
    preview: {
      title: previewTitle,
      filesSelected: previewFilesSelected
    },
    result: {
      title: resultTitle,
      download: downloadButton,
      downloadAll: downloadAllButton
    },
    status: {
      processing: processingText,
      noFile: noFileText
    },
    error: {
      fileType: fileTypeError,
      fileSize: fileSizeError
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
      <PngToWebpClient translations={messages} />
      <SeoText content={seoTextContent}/>
    </PageContainer>
  )
} 