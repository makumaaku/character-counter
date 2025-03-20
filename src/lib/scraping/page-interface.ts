import { Page } from 'puppeteer-core';

/**
 * puppeteer-coreのPageインターフェースを拡張
 * puppeteer-coreのTypeScriptの型との互換性を保つ
 */
export type PageInterface = Page; 