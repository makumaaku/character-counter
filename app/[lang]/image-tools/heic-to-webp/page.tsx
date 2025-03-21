import { translate } from '@/lib/i18n/server'
import HeicToWebpClient from './components/HeicToWebpClient'
import { Metadata } from 'next';

type Props = {
  params: Promise<{ lang: string }>
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { lang } = await params;
  
  return {
    title: translate(lang, 'heicToWebp.meta.title'),
    description: translate(lang, 'heicToWebp.meta.description'),
    keywords: translate(lang, 'heicToWebp.meta.keywords'),
  };
}

export default async function HeicToWebp({ params }: Props) {
  const { lang } = await params

  // Get translations
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
    processingText,
    noFileText,
    successText,
    convertingFileText,
    fileTypeError,
    fileSizeError,
    conversionError
  ] = await Promise.all([
    translate(lang, 'heicToWebp.title'),
    translate(lang, 'heicToWebp.description'),
    translate(lang, 'heicToWebp.form.upload.label'),
    translate(lang, 'heicToWebp.form.upload.button'),
    translate(lang, 'heicToWebp.form.upload.dragDrop'),
    translate(lang, 'heicToWebp.upload.limit'),
    translate(lang, 'heicToWebp.form.convert'),
    translate(lang, 'heicToWebp.result.download'),
    translate(lang, 'heicToWebp.result.downloadAll'),
    translate(lang, 'heicToWebp.status.processing'),
    translate(lang, 'heicToWebp.status.noFile'),
    translate(lang, 'heicToWebp.status.success'),
    translate(lang, 'heicToWebp.status.convertingFile'),
    translate(lang, 'heicToWebp.error.fileType'),
    translate(lang, 'heicToWebp.error.fileSize'),
    translate(lang, 'heicToWebp.error.conversion')
  ])

  const translations = {
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
      downloadAll: downloadAllButton
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
    }
  }

  return <HeicToWebpClient translations={translations} />
} 