'use client';

import { useRef, useCallback, useState } from 'react';
import { PhotoIcon } from '@heroicons/react/24/outline';

// バリデーション関数の型定義
export type FileValidator = (file: File) => string | null;

export type FileUploadAreaProps = {
  // 表示テキスト
  title: string;
  dragDropText: string;
  limitText: string;
  buttonText: string;
  // ファイル関連設定
  accept: string;
  multiple?: boolean;
  maxSizeMB?: number;
  totalMaxSizeMB?: number; // 複数ファイルの合計サイズ制限（MB）
  // ファイルリスト表示関連
  selectedFilesText?: string;
  // カスタムバリデーター（追加のカスタム検証が必要な場合）
  customValidator?: FileValidator;
  // イベントハンドラー
  onFilesSelected: (files: File[]) => void;
  onError: (errorMessage: string) => void;
  // 拡張子バリデーション（複数可）
  validExtensions?: string[];
};

export default function FileUploadArea({
  title,
  dragDropText,
  limitText,
  buttonText,
  accept,
  multiple = false,
  maxSizeMB = 10,
  totalMaxSizeMB,
  selectedFilesText = 'Files selected',
  customValidator,
  onFilesSelected,
  onError,
  validExtensions = []
}: FileUploadAreaProps) {
  // ステート
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ファイルアップロードハンドラー
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    validateAndSetFiles(Array.from(files));
  };

  // ドラッグ&ドロップハンドラー
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files) {
      validateAndSetFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // ファイルバリデーション
  const validateAndSetFiles = (files: File[]) => {
    const validFiles: File[] = [];
    
    // 複数ファイルが許可されていない場合は最初のファイルのみ使用
    const filesToProcess = multiple ? files : files.slice(0, 1);
    
    // 合計サイズチェック（totalMaxSizeMBが設定されている場合）
    if (totalMaxSizeMB && multiple && filesToProcess.length > 1) {
      const totalSize = filesToProcess.reduce((sum, file) => sum + file.size, 0);
      if (totalSize > totalMaxSizeMB * 1024 * 1024) {
        onError(`The total size of the files must be less than ${totalMaxSizeMB}MB`);
        return;
      }
    }

    for (const file of filesToProcess) {
      // ファイル拡張子チェック
      if (validExtensions.length > 0) {
        const fileName = file.name.toLowerCase();
        const isValidExtension = validExtensions.some(ext => 
          fileName.endsWith(`.${ext.toLowerCase()}`)
        );
        
        if (!isValidExtension) {
          onError(`Valid file formats: ${validExtensions.join(', ')}`);
          return;
        }
      }

      // ファイルサイズチェック
      if (file.size > maxSizeMB * 1024 * 1024) {
        onError(`The file size must be less than ${maxSizeMB}MB`);
        return;
      }

      // カスタムバリデーションがある場合は実行
      if (customValidator) {
        const errorMessage = customValidator(file);
        if (errorMessage) {
          onError(errorMessage);
          return;
        }
      }

      validFiles.push(file);
    }

    // バリデーション通過後の処理
    setUploadedFiles(validFiles);
    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }
  };

  return (
    <div className="bg-gray-700 shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-white">{title}</h2>
      
      <div
        className="border-2 border-dashed border-gray-500 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-colors"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
      >
        <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm font-medium text-gray-300">
          {dragDropText}
        </p>
        <p className="mt-1 text-xs text-gray-400">
          {limitText}
        </p>
        <button
          type="button"
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {buttonText}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* アップロードファイル一覧 */}
      {uploadedFiles.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-300 mb-2">
            {uploadedFiles.length} {selectedFilesText}
          </h3>
          <ul className="text-xs text-gray-400 space-y-1">
            {uploadedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 