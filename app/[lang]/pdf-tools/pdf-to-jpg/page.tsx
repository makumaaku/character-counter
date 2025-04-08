import { translate } from '@/lib/i18n/server'
import PdfToJpgClient from './components/PdfToJpgClient'
import { getLanguageFromParams, loadToolMessages } from '@/lib/i18n/server'
import { Language, PdfToolsPdfToJpgMessages } from '@/lib/i18n/types'
import SeoText, { SeoTextContent } from '@/components/SeoText'
import PageContainer from '@/components/PageContainer'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function PdfToJpg({ params }: Props) {
  const param = await params;
  const lang = await getLanguageFromParams(param);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'pdf-tools/pdf-to-jpg');
  
  // サーバーコンポーネントで翻訳を並列取得
  const [
    title,
    description,
    metaTitle,
    metaDescription,
    metaKeywords,
    uploadLabel,
    uploadButton,
    dragDropText,
    qualityLabel,
    qualityLow,
    qualityMedium,
    qualityHigh,
    convertButton,
    downloadAllButton,
    downloadButton,
    processingText,
    noFileText,
    fileTypeError,
    fileSizeError,
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
    translate(lang, 'pdfTools.pdfToJpg.title'),
    translate(lang, 'pdfTools.pdfToJpg.description'),
    translate(lang, 'pdfTools.pdfToJpg.meta.title'),
    translate(lang, 'pdfTools.pdfToJpg.meta.description'),
    translate(lang, 'pdfTools.pdfToJpg.meta.keywords'),
    translate(lang, 'pdfTools.pdfToJpg.form.upload.label'),
    translate(lang, 'pdfTools.pdfToJpg.form.upload.button'),
    translate(lang, 'pdfTools.pdfToJpg.form.upload.dragDrop'),
    translate(lang, 'pdfTools.pdfToJpg.form.quality.label'),
    translate(lang, 'pdfTools.pdfToJpg.form.quality.low'),
    translate(lang, 'pdfTools.pdfToJpg.form.quality.medium'),
    translate(lang, 'pdfTools.pdfToJpg.form.quality.high'),
    translate(lang, 'pdfTools.pdfToJpg.form.convert'),
    translate(lang, 'pdfTools.pdfToJpg.result.downloadAll'),
    translate(lang, 'pdfTools.pdfToJpg.result.download'),
    translate(lang, 'pdfTools.pdfToJpg.status.processing'),
    translate(lang, 'pdfTools.pdfToJpg.status.noFile'),
    translate(lang, 'pdfTools.pdfToJpg.error.fileType'),
    translate(lang, 'pdfTools.pdfToJpg.error.fileSize'),
    // SEOテキスト関連の翻訳
    translate(lang, 'pdfTools.pdfToJpg.seoText.overview.title'),
    translate(lang, 'pdfTools.pdfToJpg.seoText.overview.content'),
    translate(lang, 'pdfTools.pdfToJpg.seoText.howTo.title'),
    translate(lang, 'pdfTools.pdfToJpg.seoText.howTo.steps.0.title'),
    translate(lang, 'pdfTools.pdfToJpg.seoText.howTo.steps.0.description'),
    translate(lang, 'pdfTools.pdfToJpg.seoText.howTo.steps.1.title'),
    translate(lang, 'pdfTools.pdfToJpg.seoText.howTo.steps.1.description'),
    translate(lang, 'pdfTools.pdfToJpg.seoText.howTo.steps.2.title'),
    translate(lang, 'pdfTools.pdfToJpg.seoText.howTo.steps.2.description'),
    translate(lang, 'pdfTools.pdfToJpg.seoText.testimonials.title'),
    translate(lang, 'pdfTools.pdfToJpg.seoText.testimonials.users.0.name'),
    translate(lang, 'pdfTools.pdfToJpg.seoText.testimonials.users.0.comment'),
    translate(lang, 'pdfTools.pdfToJpg.seoText.testimonials.users.1.name'),
    translate(lang, 'pdfTools.pdfToJpg.seoText.testimonials.users.1.comment'),
    translate(lang, 'pdfTools.pdfToJpg.seoText.testimonials.users.2.name'),
    translate(lang, 'pdfTools.pdfToJpg.seoText.testimonials.users.2.comment'),
    translate(lang, 'pdfTools.pdfToJpg.seoText.features.title'),
    translate(lang, 'pdfTools.pdfToJpg.seoText.features.items.0.title'),
    translate(lang, 'pdfTools.pdfToJpg.seoText.features.items.0.description'),
    translate(lang, 'pdfTools.pdfToJpg.seoText.features.items.1.title'),
    translate(lang, 'pdfTools.pdfToJpg.seoText.features.items.1.description'),
    translate(lang, 'pdfTools.pdfToJpg.seoText.features.items.2.title'),
    translate(lang, 'pdfTools.pdfToJpg.seoText.features.items.2.description'),
    translate(lang, 'pdfTools.pdfToJpg.seoText.features.items.3.title'),
    translate(lang, 'pdfTools.pdfToJpg.seoText.features.items.3.description'),
    translate(lang, 'pdfTools.pdfToJpg.seoText.faq.title'),
    translate(lang, 'pdfTools.pdfToJpg.seoText.faq.questions.0.question'),
    translate(lang, 'pdfTools.pdfToJpg.seoText.faq.questions.0.answer'),
    translate(lang, 'pdfTools.pdfToJpg.seoText.faq.questions.1.question'),
    translate(lang, 'pdfTools.pdfToJpg.seoText.faq.questions.1.answer'),
    translate(lang, 'pdfTools.pdfToJpg.seoText.faq.questions.2.question'),
    translate(lang, 'pdfTools.pdfToJpg.seoText.faq.questions.2.answer'),
    translate(lang, 'pdfTools.pdfToJpg.seoText.faq.questions.3.question'),
    translate(lang, 'pdfTools.pdfToJpg.seoText.faq.questions.3.answer'),
    translate(lang, 'pdfTools.pdfToJpg.seoText.faq.questions.4.question'),
    translate(lang, 'pdfTools.pdfToJpg.seoText.faq.questions.4.answer')
  ]);

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: PdfToolsPdfToJpgMessages = {
    meta: {
      title: metaTitle,
      description: metaDescription,
      keywords: metaKeywords
    },
    title,
    description,
    form: {
      upload: {
        label: uploadLabel,
        button: uploadButton,
        dragDrop: dragDropText
      },
      quality: {
        label: qualityLabel,
        low: qualityLow,
        medium: qualityMedium,
        high: qualityHigh
      },
      convert: convertButton
    },
    result: {
      downloadAll: downloadAllButton,
      download: downloadButton
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
  };

  // SEOテキスト用のデータを作成
  const seoTextContent: SeoTextContent = messages.seoText;

  return (
    <PageContainer>
      <PdfToJpgClient messages={messages} />
      <SeoText content={seoTextContent}/>
    </PageContainer>
  )
} 