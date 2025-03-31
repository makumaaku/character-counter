'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import heicConvert from "heic-convert/browser";
import FileUploadArea from '@/components/FileUploadArea';
import { Button } from '@/components/ui/button';
import { ImageToolsHeicToPngMessages } from '@/lib/i18n/types';

// heic-convert の型定義
interface HeicConvertOptions {
  buffer: Uint8Array;
  format: 'JPEG' | 'PNG';
  quality: number;
}

// TypeScript型定義
type ConvertedImage = {
  originalFile: File;
  originalName: string;
  pngBlob: Blob;
  pngUrl: string;
  status: 'processing' | 'done' | 'error';
  error?: string;
};

// 処理中/完了/エラー状態の型
// type ProcessingImage = Omit<ConvertedImage, 'status'> & { status: 'processing' };
// type DoneImage = Omit<ConvertedImage, 'status'> & { status: 'done' };
// type ErrorImage = Omit<ConvertedImage, 'status'> & { status: 'error', error: string };

type HeicToPngConverterProps = {
  translations: ImageToolsHeicToPngMessages;
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
  
  // BlobURLの参照を保持するref
  const blobUrlsRef = useRef<string[]>([]);

  // リソース解放のためのクリーンアップ
  useEffect(() => {
    // コンポーネントのアンマウント時にすべてのBlobのURLを解放
    return () => {
      blobUrlsRef.current.forEach(url => {
        if (url) {
          URL.revokeObjectURL(url);
        }
      });
      // 配列をリセット
      blobUrlsRef.current = [];
    };
  }, []);

  // ファイルアップロードのエラーハンドラー
  const handleUploadError = (errorMessage: string) => {
    setError(errorMessage);
  };

  // ファイル選択時のハンドラー
  const handleFilesSelected = (files: File[]) => {
    setError(null);
    setUploadedFiles(files);
    
    // クリーンアップ - 既存のBlobURLを解放
    blobUrlsRef.current.forEach(url => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    });
    blobUrlsRef.current = [];
    
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
    
    // クリーンアップ - 既存のBlobURLを解放
    blobUrlsRef.current.forEach(url => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    });
    blobUrlsRef.current = [];
    
    // 新しいconvertedImagesの状態を初期化
    const initialConvertedImages = uploadedFiles.map(file => ({
      originalFile: file,
      originalName: file.name.replace(/\.heic$/i, ''),
      pngBlob: new Blob(),
      pngUrl: '',
      status: 'processing'
    } as ConvertedImage));
    
    // 状態を更新
    setConvertedImages(initialConvertedImages);
    setConvertedCount(0);

    try {
      let newConvertedImages = [...initialConvertedImages];
      let successCount = 0; // 成功カウンターをループ内で追跡

      for (let i = 0; i < uploadedFiles.length; i++) {
        const file = uploadedFiles[i];
        
        try {
          // 処理中の状態を設定して状態を更新
          newConvertedImages = [...newConvertedImages];
          newConvertedImages[i] = {
            ...newConvertedImages[i],
            status: 'processing'
          } as ConvertedImage;
          setConvertedImages(newConvertedImages);
          
          // ファイル変換処理
          const arrayBuffer = await file.arrayBuffer();
          
          // ブラウザ環境でheic-convertを使用
          // @ts-expect-error - heic-convert types are not perfect
          const outputBuffer = await heicConvert({
            buffer: new Uint8Array(arrayBuffer),
            format: 'PNG',
            quality: 0.5  // 変換品質
          } as HeicConvertOptions);
          
          // 変換結果を更新
          const pngBlob = new Blob([outputBuffer], { type: 'image/png' });
          const pngUrl = URL.createObjectURL(pngBlob);
          
          // BlobURLを追跡
          blobUrlsRef.current.push(pngUrl);
          
          // 成功状態を更新
          newConvertedImages = [...newConvertedImages];
          newConvertedImages[i] = {
            originalFile: file,
            originalName: file.name.replace(/\.heic$/i, ''),
            pngBlob,
            pngUrl,
            status: 'done'
          } as ConvertedImage;
          
          successCount++; // 成功カウンターをインクリメント
          setConvertedImages(newConvertedImages);
          setConvertedCount(successCount); // 現在のループでの成功数を設定
        } catch (err) {
          console.error(`Error converting file ${file.name}:`, err);
          
          // エラー状態を更新
          newConvertedImages = [...newConvertedImages];
          newConvertedImages[i] = {
            originalFile: file,
            originalName: file.name.replace(/\.heic$/i, ''),
            pngBlob: new Blob(),
            pngUrl: '',
            status: 'error',
            error: String(err)
          } as ConvertedImage;
          
          setConvertedImages(newConvertedImages);
        }
      }
      
      // すべての変換が失敗した場合のみエラーを表示
      if (successCount === 0) {
        setError(t.error.failed);
      } else {
        // 1つでも成功していれば、エラーメッセージをクリア
        setError(null);
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
          <Button
            type="button"
            onClick={convertToPng}
            disabled={isLoading || uploadedFiles.length === 0}
            isLoading={isLoading}
            variant="purple"
          >
            {isLoading ? t.convert.processing : t.convert.button}
          </Button>

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
              <Button
                onClick={downloadAllImages}
                disabled={isLoading}
                variant="purple"
                size="sm"
                className="inline-flex items-center"
              >
                <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                {t.convert.downloadAll}
              </Button>
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
                            <Image
                              src={image.pngUrl}
                              alt={`Preview ${index + 1}`}
                              className="max-h-full max-w-full object-contain"
                              width={200}
                              height={150}
                              unoptimized
                            />
                          </div>
                          <div className="p-3 border-t border-gray-600">
                            <p className="text-sm text-gray-300 truncate">
                              {image.originalName}.png
                            </p>
                            <Button
                              onClick={() => downloadImage(image)}
                              variant="purple"
                              size="sm"
                              className="mt-2 w-full inline-flex justify-center items-center"
                            >
                              <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                              {t.convert.download}
                            </Button>
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