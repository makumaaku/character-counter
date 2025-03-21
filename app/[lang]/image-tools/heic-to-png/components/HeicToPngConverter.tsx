'use client';

import { useState, useEffect } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import heicConvert from "heic-convert/browser";
import FileUploadArea from '../../components/FileUploadArea';

// TypeScript型定義
type ConvertedImage = {
  originalFile: File;
  originalName: string;
  pngBlob: Blob;
  pngUrl: string;
  status: 'processing' | 'done' | 'error';
  error?: string;
};

// 翻訳タイプ定義
type TranslationsType = {
  title: string;
  description: string;
  upload: {
    title: string;
    dragndrop: string;
    limit: string;
    button: string;
  };
  convert: {
    button: string;
    processing: string;
    download: string;
    downloadAll: string;
    converted: string;
  };
  preview: {
    title: string;
    nofiles: string;
  };
  error: {
    noFiles: string;
    invalidFormat: string;
    tooLarge: string;
    failed: string;
  };
};

type HeicToPngConverterProps = {
  translations: TranslationsType;
};

// propsからtranslationsを受け取る
export default function HeicToPngConverter({ translations }: HeicToPngConverterProps) {
  const t = translations;

  // 状態管理
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [convertedImages, setConvertedImages] = useState<ConvertedImage[]>([]);
  const [convertedCount, setConvertedCount] = useState(0);

  // リソース解放のためのクリーンアップ
  useEffect(() => {
    return () => {
      // コンポーネントのアンマウント時にBlobのURLを解放
      convertedImages.forEach(image => {
        URL.revokeObjectURL(image.pngUrl);
      });
    };
  }, [convertedImages]);

  // ファイルアップロードのエラーハンドラー
  const handleUploadError = (errorMessage: string) => {
    setError(errorMessage);
  };

  // ファイル選択時のハンドラー
  const handleFilesSelected = (files: File[]) => {
    setError(null);
    setUploadedFiles(files);
    setConvertedImages([]);
    setConvertedCount(0);
  };

  // 変換処理
  const convertToPng = async () => {
    if (uploadedFiles.length === 0) {
      setError(t.error.noFiles);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    // 古いURLを解放
    convertedImages.forEach(image => {
      URL.revokeObjectURL(image.pngUrl);
    });
    
    // 選択されたファイルごとにConvertedImageオブジェクトを初期化
    const initialConvertedImages = uploadedFiles.map(file => ({
      originalFile: file,
      originalName: file.name.replace(/\.heic$/i, ''),
      pngBlob: new Blob(),
      pngUrl: '',
      status: 'processing' as const
    }));
    
    setConvertedImages(initialConvertedImages);
    setConvertedCount(0);

    try {
      let currentImages: ConvertedImage[] = initialConvertedImages;

      for (let i = 0; i < uploadedFiles.length; i++) {
        const file = uploadedFiles[i];
        
        try {
          // ファイル変換中のステータスを表示
          currentImages = currentImages.map((image, index) => {
            if (index === i) {
              return { ...image, status: 'processing' };
            }
            return image;
          });
          setConvertedImages(currentImages);
          
          // ファイル変換処理
          const arrayBuffer = await file.arrayBuffer();
          
          // ブラウザ環境でheic-convertを使用
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const convert = heicConvert as any;
          const outputBuffer = await convert({
            buffer: new Uint8Array(arrayBuffer),
            format: 'PNG',
            quality: 0.8
          });
          
          // 変換結果を更新
          const pngBlob = new Blob([outputBuffer], { type: 'image/png' });
          const pngUrl = URL.createObjectURL(pngBlob);
          
          currentImages = currentImages.map((image, index) => {
            if (index === i) {
              return {
                originalFile: file,
                originalName: file.name.replace(/\.heic$/i, ''),
                pngBlob,
                pngUrl,
                status: 'done'
              };
            }
            return image;
          });
          
          setConvertedImages(currentImages);
          setConvertedCount(prev => prev + 1);
        } catch (err) {
          console.error(`Error converting file ${file.name}:`, err);
          currentImages = currentImages.map((image, index) => {
            if (index === i) {
              return {
                originalFile: file,
                originalName: file.name.replace(/\.heic$/i, ''),
                pngBlob: new Blob(),
                pngUrl: '',
                status: 'error',
                error: String(err)
              };
            }
            return image;
          });
          
          setConvertedImages(currentImages);
        }
      }
      
      if (convertedCount === 0) {
        setError(t.error.failed);
      }
    } catch (err) {
      console.error('Conversion error:', err);
      setError(t.error.failed);
    } finally {
      setIsLoading(false);
    }
  };

  // 個別ダウンロード
  const downloadImage = (image: ConvertedImage) => {
    if (image.status === 'done') {
      saveAs(image.pngBlob, `${image.originalName}.png`);
    }
  };

  // 一括ダウンロード
  const downloadAllImages = async () => {
    const successfulImages = convertedImages.filter(image => image.status === 'done');
    if (successfulImages.length === 0) return;

    try {
      setIsLoading(true);
      const zip = new JSZip();

      // 各画像をZIPに追加
      successfulImages.forEach((image) => {
        zip.file(`${image.originalName}.png`, image.pngBlob);
      });

      // ZIPファイル生成
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      saveAs(zipBlob, 'converted_images.zip');
    } catch (err) {
      console.error('ZIP creation error:', err);
      setError(t.error.failed);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ヘッダーセクション */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-3 text-gray-100">{t.title}</h1>
        <p className="text-xl text-gray-300">{t.description}</p>
      </div>

      {/* 共通のファイルアップロードエリアコンポーネントを使用 */}
      <div className="mb-8">
        <FileUploadArea
          title={t.upload.title}
          dragDropText={t.upload.dragndrop}
          limitText={t.upload.limit}
          buttonText={t.upload.button}
          accept=".heic"
          multiple={true}
          maxSizeMB={10}
          selectedFilesText="ファイル選択済み"
          validExtensions={['heic']}
          onFilesSelected={handleFilesSelected}
          onError={handleUploadError}
        />

        {/* 変換ボタン */}
        <div className="mt-6 bg-gray-700 shadow rounded-lg p-6">
          <button
            type="button"
            onClick={convertToPng}
            disabled={isLoading || uploadedFiles.length === 0}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {isLoading ? t.convert.processing : t.convert.button}
          </button>

          {/* エラーメッセージ */}
          {error && (
            <div className="mt-4 p-3 bg-red-900/50 text-red-200 rounded-md">
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>

      {/* プレビューと結果セクション */}
      {(convertedImages.length > 0 || isLoading) && (
        <div className="bg-gray-700 shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">{t.preview.title}</h2>
            
            {/* 一括ダウンロードボタン */}
            {convertedCount > 0 && (
              <button
                onClick={downloadAllImages}
                disabled={isLoading}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                {t.convert.downloadAll}
              </button>
            )}
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              {convertedImages.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {convertedImages.map((image, index) => (
                    <div key={index} className="border border-gray-600 rounded-lg overflow-hidden">
                      {image.status === 'processing' ? (
                        <div className="h-48 bg-gray-800 flex items-center justify-center text-gray-400">
                          <div className="flex flex-col items-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
                            <span>変換中...</span>
                          </div>
                        </div>
                      ) : image.status === 'error' ? (
                        <div className="h-48 bg-gray-800 flex items-center justify-center p-3 text-red-300 text-center">
                          <div>
                            <div className="text-3xl mb-2">⚠️</div>
                            <div>{t.error.failed}</div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="h-48 bg-gray-800 flex items-center justify-center">
                            <img
                              src={image.pngUrl}
                              alt={`Preview ${index + 1}`}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                          <div className="p-3 border-t border-gray-600">
                            <p className="text-sm text-gray-300 truncate">
                              {image.originalName}.png
                            </p>
                            <button
                              onClick={() => downloadImage(image)}
                              className="mt-2 w-full inline-flex justify-center items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                            >
                              <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                              {t.convert.download}
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-8 text-gray-400">
                  {t.preview.nofiles}
                </p>
              )}
            </>
          )}

          {convertedCount > 0 && (
            <p className="mt-4 text-sm text-center text-gray-400">
              {t.convert.converted.replace('{count}', convertedCount.toString())}
            </p>
          )}
        </div>
      )}
    </div>
  );
} 