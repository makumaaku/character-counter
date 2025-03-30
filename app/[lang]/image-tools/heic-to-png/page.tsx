import { getLanguageFromParams, translate, loadToolMessages } from '@/lib/i18n/server';
import HeicToPngConverter from './components/HeicToPngConverter';
import { Language, ImageToolsHeicToPngMessages } from '@/lib/i18n/types';

type Props = {
  params: { lang: string }
}

export default async function HeicToPngPage({ params }: Props) {
  const lang = await getLanguageFromParams(params);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'image-tools/heic-to-png');
  
  // サーバーコンポーネントで翻訳を並列取得
  const [
    title,
    description,
    uploadTitle,
    uploadButton,
    uploadDragndrop,
    uploadLimit,
    convertButton,
    convertProcessing,
    convertDownload,
    convertDownloadAll,
    convertConverted,
    previewTitle,
    previewNofiles,
    errorNoFiles,
    errorInvalidFormat,
    errorTooLarge,
    errorFailed
  ] = await Promise.all([
    translate(lang, 'imageTools.heicToPng.title'),
    translate(lang, 'imageTools.heicToPng.description'),
    translate(lang, 'imageTools.heicToPng.upload.title'),
    translate(lang, 'imageTools.heicToPng.upload.button'),
    translate(lang, 'imageTools.heicToPng.upload.dragndrop'),
    translate(lang, 'imageTools.heicToPng.upload.limit'),
    translate(lang, 'imageTools.heicToPng.convert.button'),
    translate(lang, 'imageTools.heicToPng.convert.processing'),
    translate(lang, 'imageTools.heicToPng.convert.download'),
    translate(lang, 'imageTools.heicToPng.convert.downloadAll'),
    translate(lang, 'imageTools.heicToPng.convert.converted'),
    translate(lang, 'imageTools.heicToPng.preview.title'),
    translate(lang, 'imageTools.heicToPng.preview.nofiles'),
    translate(lang, 'imageTools.heicToPng.error.noFiles'),
    translate(lang, 'imageTools.heicToPng.error.invalidFormat'),
    translate(lang, 'imageTools.heicToPng.error.tooLarge'),
    translate(lang, 'imageTools.heicToPng.error.failed')
  ]);

  // クライアントコンポーネントに渡す翻訳オブジェクトを作成
  const messages: ImageToolsHeicToPngMessages = {
    meta: {
      title: "",
      description: "",
      keywords: ""
    },
    title,
    description,
    upload: {
      title: uploadTitle,
      button: uploadButton,
      dragndrop: uploadDragndrop,
      limit: uploadLimit
    },
    form: {
      upload: {
        label: "",
        button: "",
        dragDrop: ""
      },
      convert: ""
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
    error: {
      noFiles: errorNoFiles,
      invalidFormat: errorInvalidFormat,
      tooLarge: errorTooLarge,
      failed: errorFailed
    }
  };

  return (
    <div className="w-full">
      <HeicToPngConverter translations={messages} />
    </div>
  );
} 