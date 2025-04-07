import { getLanguageFromParams, translate, loadToolMessages } from '@/lib/i18n/server'
import HeicToWebpClient from './components/HeicToWebpClient'
import { Language, ImageToolsHeicToWebpMessages } from '@/lib/i18n/types'
import SeoText, { SeoTextContent } from '@/components/SeoText'
import PageContainer from '@/components/PageContainer'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function HeicToWebp({ params }: Props) {
  const param = await params;
  const lang = await getLanguageFromParams(param);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'image-tools/heic-to-webp');

  // サーバーコンポーネントで翻訳を取得
  const [
    title,
    description,
    // upload section
    uploadTitle,
    uploadDragndrop,
    uploadButton,
    uploadLimit,
    // form section
    formUploadLabel,
    formUploadButton,
    formUploadDragDrop,
    formConvert,
    // convert section
    convertButton,
    convertProcessing,
    convertDownload,
    convertDownloadAll,
    convertConverted,
    // preview section
    previewTitle,
    previewNofiles,
    // result section
    resultDownload,
    resultDownloadAll,
    // status section
    statusProcessing,
    statusNoFile,
    statusSuccess,
    statusConvertingFile,
    // error section
    errorInvalidFormat,
    errorTooLarge,
    errorNoFiles,
    errorFailed,
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
    translate(lang, 'imageTools.heicToWebp.title'),
    translate(lang, 'imageTools.heicToWebp.description'),
    // upload section
    translate(lang, 'imageTools.heicToWebp.upload.title'),
    translate(lang, 'imageTools.heicToWebp.upload.dragndrop'),
    translate(lang, 'imageTools.heicToWebp.upload.button'),
    translate(lang, 'imageTools.heicToWebp.upload.limit'),
    // form section
    translate(lang, 'imageTools.heicToWebp.form.upload.label'),
    translate(lang, 'imageTools.heicToWebp.form.upload.button'),
    translate(lang, 'imageTools.heicToWebp.form.upload.dragDrop'),
    translate(lang, 'imageTools.heicToWebp.form.convert'),
    // convert section
    translate(lang, 'imageTools.heicToWebp.convert.button'),
    translate(lang, 'imageTools.heicToWebp.convert.processing'),
    translate(lang, 'imageTools.heicToWebp.convert.download'),
    translate(lang, 'imageTools.heicToWebp.convert.downloadAll'),
    translate(lang, 'imageTools.heicToWebp.convert.converted'),
    // preview section
    translate(lang, 'imageTools.heicToWebp.preview.title'),
    translate(lang, 'imageTools.heicToWebp.preview.nofiles'),
    // result section
    translate(lang, 'imageTools.heicToWebp.result.download'),
    translate(lang, 'imageTools.heicToWebp.result.downloadAll'),
    // status section
    translate(lang, 'imageTools.heicToWebp.status.processing'),
    translate(lang, 'imageTools.heicToWebp.status.noFile'),
    translate(lang, 'imageTools.heicToWebp.status.success'),
    translate(lang, 'imageTools.heicToWebp.status.convertingFile'),
    // error section
    translate(lang, 'imageTools.heicToWebp.error.invalidFormat'),
    translate(lang, 'imageTools.heicToWebp.error.tooLarge'),
    translate(lang, 'imageTools.heicToWebp.error.noFiles'),
    translate(lang, 'imageTools.heicToWebp.error.failed'),
    // SEOテキスト関連の翻訳
    translate(lang, 'imageTools.heicToWebp.seoText.overview.title'),
    translate(lang, 'imageTools.heicToWebp.seoText.overview.content'),
    translate(lang, 'imageTools.heicToWebp.seoText.howTo.title'),
    translate(lang, 'imageTools.heicToWebp.seoText.howTo.steps.0.title'),
    translate(lang, 'imageTools.heicToWebp.seoText.howTo.steps.0.description'),
    translate(lang, 'imageTools.heicToWebp.seoText.howTo.steps.1.title'),
    translate(lang, 'imageTools.heicToWebp.seoText.howTo.steps.1.description'),
    translate(lang, 'imageTools.heicToWebp.seoText.howTo.steps.2.title'),
    translate(lang, 'imageTools.heicToWebp.seoText.howTo.steps.2.description'),
    translate(lang, 'imageTools.heicToWebp.seoText.testimonials.title'),
    translate(lang, 'imageTools.heicToWebp.seoText.testimonials.users.0.name'),
    translate(lang, 'imageTools.heicToWebp.seoText.testimonials.users.0.comment'),
    translate(lang, 'imageTools.heicToWebp.seoText.testimonials.users.1.name'),
    translate(lang, 'imageTools.heicToWebp.seoText.testimonials.users.1.comment'),
    translate(lang, 'imageTools.heicToWebp.seoText.testimonials.users.2.name'),
    translate(lang, 'imageTools.heicToWebp.seoText.testimonials.users.2.comment'),
    translate(lang, 'imageTools.heicToWebp.seoText.features.title'),
    translate(lang, 'imageTools.heicToWebp.seoText.features.items.0.title'),
    translate(lang, 'imageTools.heicToWebp.seoText.features.items.0.description'),
    translate(lang, 'imageTools.heicToWebp.seoText.features.items.1.title'),
    translate(lang, 'imageTools.heicToWebp.seoText.features.items.1.description'),
    translate(lang, 'imageTools.heicToWebp.seoText.features.items.2.title'),
    translate(lang, 'imageTools.heicToWebp.seoText.features.items.2.description'),
    translate(lang, 'imageTools.heicToWebp.seoText.features.items.3.title'),
    translate(lang, 'imageTools.heicToWebp.seoText.features.items.3.description'),
    translate(lang, 'imageTools.heicToWebp.seoText.faq.title'),
    translate(lang, 'imageTools.heicToWebp.seoText.faq.questions.0.question'),
    translate(lang, 'imageTools.heicToWebp.seoText.faq.questions.0.answer'),
    translate(lang, 'imageTools.heicToWebp.seoText.faq.questions.1.question'),
    translate(lang, 'imageTools.heicToWebp.seoText.faq.questions.1.answer'),
    translate(lang, 'imageTools.heicToWebp.seoText.faq.questions.2.question'),
    translate(lang, 'imageTools.heicToWebp.seoText.faq.questions.2.answer'),
    translate(lang, 'imageTools.heicToWebp.seoText.faq.questions.3.question'),
    translate(lang, 'imageTools.heicToWebp.seoText.faq.questions.3.answer'),
    translate(lang, 'imageTools.heicToWebp.seoText.faq.questions.4.question'),
    translate(lang, 'imageTools.heicToWebp.seoText.faq.questions.4.answer')
  ])

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: ImageToolsHeicToWebpMessages = {
    meta: {
      title: "",
      description: "",
      keywords: ""
    },
    title,
    description,
    upload: {
      title: uploadTitle,
      dragndrop: uploadDragndrop,
      button: uploadButton,
      limit: uploadLimit
    },
    form: {
      upload: {
        label: formUploadLabel,
        button: formUploadButton,
        dragDrop: formUploadDragDrop
      },
      convert: formConvert
    },
    convert: {
      button: convertButton,
      processing: convertProcessing,
      download: convertDownload,
      downloadAll: convertDownloadAll,
      converted: convertConverted
    },
    preview: {
      title: previewTitle,
      nofiles: previewNofiles
    },
    result: {
      download: resultDownload,
      downloadAll: resultDownloadAll
    },
    status: {
      processing: statusProcessing,
      noFile: statusNoFile,
      success: statusSuccess,
      convertingFile: statusConvertingFile
    },
    error: {
      invalidFormat: errorInvalidFormat,
      tooLarge: errorTooLarge,
      noFiles: errorNoFiles,
      failed: errorFailed
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

  // クライアントコンポーネントの props の型に合わせる
  const clientTranslations = {
    title: messages.title,
    description: messages.description,
    upload: {
      limit: messages.upload.limit
    },
    form: {
      upload: {
        label: messages.form.upload.label,
        button: messages.form.upload.button,
        dragDrop: messages.form.upload.dragDrop
      },
      convert: messages.form.convert
    },
    result: {
      download: messages.result.download,
      downloadAll: messages.result.downloadAll
    },
    status: {
      processing: messages.status.processing,
      noFile: messages.status.noFile,
      success: messages.status.success,
      convertingFile: messages.status.convertingFile
    },
    error: {
      fileType: messages.error.invalidFormat,
      fileSize: messages.error.tooLarge,
      conversion: messages.error.failed
    }
  }

  // SEOテキスト用のデータを作成
  const seoTextContent: SeoTextContent = messages.seoText;

  return (
    <PageContainer>
      <HeicToWebpClient translations={clientTranslations} />
      <SeoText content={seoTextContent}/>
    </PageContainer>
  )
} 