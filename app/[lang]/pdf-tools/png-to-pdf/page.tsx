import { translate, getLanguageFromParams, loadToolMessages } from '@/lib/i18n/server'
import PngToPdfClient from './components/PngToPdfClient'
import { Language, PdfToolsPngToPdfMessages } from '@/lib/i18n/types'
import SeoText, { SeoTextContent } from '@/components/SeoText'
import PageContainer from '@/components/PageContainer'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function PngToPdf({ params }: Props) {
  const param = await params;
  const lang = await getLanguageFromParams(param);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'pdf-tools/png-to-pdf');
  
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
    convertButton,
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
    translate(lang, 'pdfTools.pngToPdf.title'),
    translate(lang, 'pdfTools.pngToPdf.description'),
    translate(lang, 'pdfTools.pngToPdf.meta.title'),
    translate(lang, 'pdfTools.pngToPdf.meta.description'),
    translate(lang, 'pdfTools.pngToPdf.meta.keywords'),
    translate(lang, 'pdfTools.pngToPdf.form.upload.label'),
    translate(lang, 'pdfTools.pngToPdf.form.upload.button'),
    translate(lang, 'pdfTools.pngToPdf.form.upload.dragDrop'),
    translate(lang, 'pdfTools.pngToPdf.form.convert'),
    translate(lang, 'pdfTools.pngToPdf.result.download'),
    translate(lang, 'pdfTools.pngToPdf.status.processing'),
    translate(lang, 'pdfTools.pngToPdf.status.noFile'),
    translate(lang, 'pdfTools.pngToPdf.error.fileType'),
    translate(lang, 'pdfTools.pngToPdf.error.fileSize'),
    // SEOテキスト関連の翻訳
    translate(lang, 'pdfTools.pngToPdf.seoText.overview.title'),
    translate(lang, 'pdfTools.pngToPdf.seoText.overview.content'),
    translate(lang, 'pdfTools.pngToPdf.seoText.howTo.title'),
    translate(lang, 'pdfTools.pngToPdf.seoText.howTo.steps.0.title'),
    translate(lang, 'pdfTools.pngToPdf.seoText.howTo.steps.0.description'),
    translate(lang, 'pdfTools.pngToPdf.seoText.howTo.steps.1.title'),
    translate(lang, 'pdfTools.pngToPdf.seoText.howTo.steps.1.description'),
    translate(lang, 'pdfTools.pngToPdf.seoText.howTo.steps.2.title'),
    translate(lang, 'pdfTools.pngToPdf.seoText.howTo.steps.2.description'),
    translate(lang, 'pdfTools.pngToPdf.seoText.testimonials.title'),
    translate(lang, 'pdfTools.pngToPdf.seoText.testimonials.users.0.name'),
    translate(lang, 'pdfTools.pngToPdf.seoText.testimonials.users.0.comment'),
    translate(lang, 'pdfTools.pngToPdf.seoText.testimonials.users.1.name'),
    translate(lang, 'pdfTools.pngToPdf.seoText.testimonials.users.1.comment'),
    translate(lang, 'pdfTools.pngToPdf.seoText.testimonials.users.2.name'),
    translate(lang, 'pdfTools.pngToPdf.seoText.testimonials.users.2.comment'),
    translate(lang, 'pdfTools.pngToPdf.seoText.features.title'),
    translate(lang, 'pdfTools.pngToPdf.seoText.features.items.0.title'),
    translate(lang, 'pdfTools.pngToPdf.seoText.features.items.0.description'),
    translate(lang, 'pdfTools.pngToPdf.seoText.features.items.1.title'),
    translate(lang, 'pdfTools.pngToPdf.seoText.features.items.1.description'),
    translate(lang, 'pdfTools.pngToPdf.seoText.features.items.2.title'),
    translate(lang, 'pdfTools.pngToPdf.seoText.features.items.2.description'),
    translate(lang, 'pdfTools.pngToPdf.seoText.features.items.3.title'),
    translate(lang, 'pdfTools.pngToPdf.seoText.features.items.3.description'),
    translate(lang, 'pdfTools.pngToPdf.seoText.faq.title'),
    translate(lang, 'pdfTools.pngToPdf.seoText.faq.questions.0.question'),
    translate(lang, 'pdfTools.pngToPdf.seoText.faq.questions.0.answer'),
    translate(lang, 'pdfTools.pngToPdf.seoText.faq.questions.1.question'),
    translate(lang, 'pdfTools.pngToPdf.seoText.faq.questions.1.answer'),
    translate(lang, 'pdfTools.pngToPdf.seoText.faq.questions.2.question'),
    translate(lang, 'pdfTools.pngToPdf.seoText.faq.questions.2.answer'),
    translate(lang, 'pdfTools.pngToPdf.seoText.faq.questions.3.question'),
    translate(lang, 'pdfTools.pngToPdf.seoText.faq.questions.3.answer'),
    translate(lang, 'pdfTools.pngToPdf.seoText.faq.questions.4.question'),
    translate(lang, 'pdfTools.pngToPdf.seoText.faq.questions.4.answer')
  ]);

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: PdfToolsPngToPdfMessages = {
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
      convert: convertButton
    },
    result: {
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
      <PngToPdfClient messages={messages} />
      <SeoText content={seoTextContent} />
    </PageContainer>
  )
} 