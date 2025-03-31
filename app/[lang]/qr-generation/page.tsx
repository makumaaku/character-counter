import { getLanguageFromParams, translate, loadToolMessages } from '@/lib/i18n/server';
import QRCodeGenerator from './components/QRCodeGenerator';
import { Language, QrGenerationMessages } from '@/lib/i18n/types';

type Props = {
  params: Promise<{ lang: string }>
}

export default async function QRGenerationPage({ params }: Props) {
  const param = await params;
  const lang = await getLanguageFromParams(param);
  
  // 翻訳をロード
  await loadToolMessages(lang as Language, 'qr-generation');
  
  // 必要な翻訳を並列取得
  const [
    placeholder,
    emptyState,
    inputLabel,
    generateButton,
    downloadButton,
    copyButton,
    contentTypeLabel,
    contentTypeText,
    contentTypeUrl,
    contentTypeEmail,
    contentTypePhone,
    colorLabel,
    bgColorLabel,
    sizeLabel,
    errorCorrection,
    errorCorrectionL,
    errorCorrectionM,
    errorCorrectionQ,
    errorCorrectionH,
    successMessage,
    errorMessage
  ] = await Promise.all([
    translate(lang, 'qrGeneration.ui.placeholder'),
    translate(lang, 'qrGeneration.ui.emptyState'),
    translate(lang, 'qrGeneration.ui.inputLabel'),
    translate(lang, 'qrGeneration.ui.generateButton'),
    translate(lang, 'qrGeneration.ui.downloadButton'),
    translate(lang, 'qrGeneration.ui.copyButton'),
    translate(lang, 'qrGeneration.ui.contentTypeLabel'),
    translate(lang, 'qrGeneration.ui.contentTypes.text'),
    translate(lang, 'qrGeneration.ui.contentTypes.url'),
    translate(lang, 'qrGeneration.ui.contentTypes.email'),
    translate(lang, 'qrGeneration.ui.contentTypes.phone'),
    translate(lang, 'qrGeneration.ui.colorLabel'),
    translate(lang, 'qrGeneration.ui.bgColorLabel'),
    translate(lang, 'qrGeneration.ui.sizeLabel'),
    translate(lang, 'qrGeneration.ui.errorCorrection'),
    translate(lang, 'qrGeneration.ui.errorCorrectionLevels.L'),
    translate(lang, 'qrGeneration.ui.errorCorrectionLevels.M'),
    translate(lang, 'qrGeneration.ui.errorCorrectionLevels.Q'),
    translate(lang, 'qrGeneration.ui.errorCorrectionLevels.H'),
    translate(lang, 'qrGeneration.ui.successMessage'),
    translate(lang, 'qrGeneration.ui.errorMessage')
  ]);
  
  // クライアントコンポーネントに渡す翻訳オブジェクト
  const messages: Partial<QrGenerationMessages> = {
    ui: {
      placeholder,
      emptyState,
      inputLabel,
      generateButton,
      downloadButton,
      copyButton,
      contentTypeLabel,
      contentTypes: {
        text: contentTypeText,
        url: contentTypeUrl,
        email: contentTypeEmail,
        phone: contentTypePhone
      },
      colorLabel,
      bgColorLabel,
      sizeLabel,
      errorCorrection,
      errorCorrectionLevels: {
        L: errorCorrectionL,
        M: errorCorrectionM,
        Q: errorCorrectionQ,
        H: errorCorrectionH
      },
      successMessage,
      errorMessage
    }
  };
  
  return <QRCodeGenerator messages={messages} />;
}