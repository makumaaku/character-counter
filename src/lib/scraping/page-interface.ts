import { PDFOptions } from './types';

/**
 * Puppeteer/Puppeteer-Coreで共通して使える最小限のページインターフェース
 * 実装の違いを吸収するための抽象インターフェース
 */
export interface PageInterface {
  setViewport(options: { width: number; height: number; deviceScaleFactor?: number }): Promise<void>;
  setUserAgent(userAgent: string): Promise<void>;
  emulateMediaFeatures(features: Array<{ name: string; value: string }>): Promise<void>;
  evaluateOnNewDocument(fn: () => void): Promise<void>;
  goto(url: string, options?: { waitUntil?: string; timeout?: number }): Promise<unknown>;
  evaluate<T>(fn: () => T): Promise<T>;
  evaluate<T>(fn: string): Promise<T>;
  waitForFunction(fn: () => boolean, options?: { timeout?: number }): Promise<unknown>;
  waitForFunction(fn: string, options?: { timeout?: number }): Promise<unknown>;
  pdf(options?: PDFOptions): Promise<Buffer>;
  close(): Promise<void>;
} 