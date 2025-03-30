// JSON形式の多言語ファイルからTypeScript型定義を自動生成するユーティリティ

import fs from 'fs';
import path from 'path';

type JsonValue = string | number | boolean | null | JsonObject | JsonValue[];
type JsonObject = { [key: string]: JsonValue };

// キャメルケースに変換する関数
export const kebabToCamel = (kebab: string): string => {
  return kebab.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
};

// アッパーキャメルケース（パスカルケース）に変換する関数
export const toPascalCase = (str: string): string => {
  const camelCase = kebabToCamel(str);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};

// オブジェクトから型定義文字列を生成
function generateTypeFromObject(
  obj: JsonObject,
  indent: string = '  ',
  interfaceName?: string
): string {
  const lines: string[] = [];
  
  // インターフェース名が指定されている場合は、インターフェース定義を含める
  if (interfaceName) {
    lines.push(`export interface ${interfaceName} {`);
  } else {
    lines.push('{');
  }
  
  // オブジェクトのプロパティをループして型定義を生成
  for (const [key, value] of Object.entries(obj)) {
    if (value === null) {
      lines.push(`${indent}${key}: null;`);
    } else if (typeof value === 'string') {
      lines.push(`${indent}${key}: string;`);
    } else if (typeof value === 'number') {
      lines.push(`${indent}${key}: number;`);
    } else if (typeof value === 'boolean') {
      lines.push(`${indent}${key}: boolean;`);
    } else if (Array.isArray(value)) {
      if (value.length === 0) {
        lines.push(`${indent}${key}: any[];`);
      } else {
        const firstItem = value[0];
        if (typeof firstItem === 'object' && firstItem !== null) {
          const itemType = generateTypeFromObject(firstItem as JsonObject, indent + '  ');
          lines.push(`${indent}${key}: ${itemType}[];`);
        } else {
          lines.push(`${indent}${key}: ${typeof firstItem}[];`);
        }
      }
    } else if (typeof value === 'object') {
      const nestedType = generateTypeFromObject(value as JsonObject, indent + '  ');
      lines.push(`${indent}${key}: ${nestedType};`);
    }
  }
  
  // インターフェース定義をクローズ
  if (interfaceName) {
    lines.push('}');
  } else {
    lines.push(`${indent.slice(0, -2)}}`);
  }
  
  return lines.join('\n');
}

// ファイルパスからJSONを読み込み型定義を生成
export async function generateTypeFromFile(
  filePath: string,
  interfaceName: string
): Promise<string> {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const jsonData = JSON.parse(fileContent) as JsonObject;
    return generateTypeFromObject(jsonData, '  ', interfaceName);
  } catch (error) {
    console.error(`Error generating type from ${filePath}:`, error);
    return `// Error generating type from ${filePath}\nexport interface ${interfaceName} {}\n`;
  }
}

// ディレクトリから全てのJSONファイルの型定義を生成
export async function generateTypesForDirectory(
  dirPath: string,
  baseInterfaceName: string,
  outputPath: string
): Promise<void> {
  try {
    const typeDefinitions: string[] = [];
    
    // ファイルが存在するか確認
    if (!fs.existsSync(dirPath)) {
      console.error(`Directory ${dirPath} does not exist`);
      return;
    }
    
    // 英語ディレクトリから型定義を生成（英語を基準とする）
    const enDirPath = path.join(dirPath, 'en');
    if (!fs.existsSync(enDirPath)) {
      console.error(`English directory ${enDirPath} does not exist`);
      return;
    }
    
    typeDefinitions.push('// このファイルは自動生成されています。手動で変更しないでください。');
    typeDefinitions.push('// Generated at: ' + new Date().toISOString());
    typeDefinitions.push('');
    
    // 共通ファイルの型定義
    const commonFilePath = path.join(enDirPath, 'common.json');
    if (fs.existsSync(commonFilePath)) {
      const commonType = await generateTypeFromFile(commonFilePath, 'CommonMessages');
      typeDefinitions.push(commonType);
      typeDefinitions.push('');
    }
    
    // メタファイルの型定義
    const metaFilePath = path.join(enDirPath, 'meta.json');
    if (fs.existsSync(metaFilePath)) {
      const metaType = await generateTypeFromFile(metaFilePath, 'MetaMessages');
      typeDefinitions.push(metaType);
      typeDefinitions.push('');
    }
    
    // トップレベルのJSONファイル
    const topLevelJsonFiles = fs.readdirSync(enDirPath)
      .filter(file => file.endsWith('.json') && !['common.json', 'meta.json'].includes(file));
    
    for (const jsonFile of topLevelJsonFiles) {
      const typeName = toPascalCase(path.basename(jsonFile, '.json'));
      const interfaceName = `${typeName}Messages`;
      const filePath = path.join(enDirPath, jsonFile);
      const typeDefinition = await generateTypeFromFile(filePath, interfaceName);
      typeDefinitions.push(typeDefinition);
      typeDefinitions.push('');
    }
    
    // サブディレクトリの処理
    const subDirs = fs.readdirSync(enDirPath).filter(item => {
      const itemPath = path.join(enDirPath, item);
      return fs.lstatSync(itemPath).isDirectory();
    });
    
    for (const subDir of subDirs) {
      const subDirPath = path.join(enDirPath, subDir);
      const categoryName = toPascalCase(subDir);
      
      // カテゴリの共通ファイル
      const categoryCommonPath = path.join(subDirPath, 'common.json');
      if (fs.existsSync(categoryCommonPath)) {
        const commonInterfaceName = `${categoryName}CommonMessages`;
        const commonType = await generateTypeFromFile(categoryCommonPath, commonInterfaceName);
        typeDefinitions.push(commonType);
        typeDefinitions.push('');
      }
      
      // カテゴリ内の他のJSONファイル
      const categoryFiles = fs.readdirSync(subDirPath)
        .filter(file => file.endsWith('.json') && file !== 'common.json');
      
      for (const jsonFile of categoryFiles) {
        const toolName = toPascalCase(path.basename(jsonFile, '.json'));
        const interfaceName = `${categoryName}${toolName}Messages`;
        const filePath = path.join(subDirPath, jsonFile);
        const typeDefinition = await generateTypeFromFile(filePath, interfaceName);
        typeDefinitions.push(typeDefinition);
        typeDefinitions.push('');
      }
    }
    
    // 全メッセージタイプの定義
    typeDefinitions.push(`export interface ${baseInterfaceName} {`);
    typeDefinitions.push('  common?: CommonMessages;');
    
    // トップレベルのJSONファイル
    for (const jsonFile of topLevelJsonFiles) {
      const fileBaseName = path.basename(jsonFile, '.json');
      const typeName = toPascalCase(fileBaseName);
      const propName = kebabToCamel(fileBaseName);
      typeDefinitions.push(`  ${propName}?: ${typeName}Messages;`);
    }
    
    // サブディレクトリ
    for (const subDir of subDirs) {
      const categoryBaseName = subDir;
      const categoryPropName = kebabToCamel(categoryBaseName);
      const categoryTypeName = toPascalCase(categoryBaseName);
      typeDefinitions.push(`  ${categoryPropName}?: {`);
      
      // カテゴリの共通ファイル
      if (fs.existsSync(path.join(enDirPath, subDir, 'common.json'))) {
        typeDefinitions.push(`    common?: ${categoryTypeName}CommonMessages;`);
      }
      
      // カテゴリ内の他のJSONファイル
      const categoryFiles = fs.readdirSync(path.join(enDirPath, subDir))
        .filter(file => file.endsWith('.json') && file !== 'common.json');
      
      for (const jsonFile of categoryFiles) {
        const toolBaseName = path.basename(jsonFile, '.json');
        const toolPropName = kebabToCamel(toolBaseName);
        const toolTypeName = toPascalCase(toolBaseName);
        typeDefinitions.push(`    ${toolPropName}?: ${categoryTypeName}${toolTypeName}Messages;`);
      }
      
      typeDefinitions.push('  };');
    }
    
    typeDefinitions.push('}');
    
    // 結果をファイルに書き出し
    fs.writeFileSync(outputPath, typeDefinitions.join('\n'));
    console.log(`Type definitions written to ${outputPath}`);
  } catch (error) {
    console.error('Error generating types:', error);
  }
}

// ESモジュール対応のメイン処理
const isMainModule = import.meta.url === `file://${process.argv[1]}`;
if (isMainModule) {
  const args = process.argv.slice(2);
  if (args.length < 3) {
    console.log('Usage: node --loader ts-node/esm type-generator.ts <dirPath> <baseInterfaceName> <outputPath>');
    process.exit(1);
  }
  
  const [dirPath, baseInterfaceName, outputPath] = args;
  generateTypesForDirectory(dirPath, baseInterfaceName, outputPath)
    .then(() => {
      console.log('Done!');
    })
    .catch((error) => {
      console.error('Error:', error);
      process.exit(1);
    });
} 