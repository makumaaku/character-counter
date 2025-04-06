'use client';

import React, { HTMLAttributes } from 'react';
import { DarkModeWrapper } from './DarkModeWrapper';

interface PageContainerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  darkMode?: boolean;
}

// 内部用のクライアントコンポーネント
interface ContentProps {
  className: string;
  children: React.ReactNode;
  htmlProps: HTMLAttributes<HTMLDivElement>;
}

const PageContainerContent: React.FC<ContentProps> = ({ 
  className, 
  children, 
  htmlProps 
}) => {
  // コンテキストからダークモード状態は不要になりました
  
  return (
    <div 
      className={`container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 bg-[var(--theme-bg)] text-[var(--theme-text)] ${className}`}
      {...htmlProps}
    >
      {children}
    </div>
  );
};

/**
 * ページのメインコンテンツをラップするコンテナコンポーネント
 * 中央配置、最大幅制限、適切なパディングを提供します
 */
export const PageContainer: React.FC<PageContainerProps> = ({
  className = '',
  children,
  ...props
}) => {
  return (
    <DarkModeWrapper>
      <PageContainerContent className={className} htmlProps={props}>
        {children}
      </PageContainerContent>
    </DarkModeWrapper>
  );
};

export default PageContainer; 