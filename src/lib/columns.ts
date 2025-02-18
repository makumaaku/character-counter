import fs from 'fs';
import path from 'path';

export async function readColumn(slug: string) {
  const columnsDirectory = path.join(process.cwd(), 'assets', 'mdx', 'character-counter');
  const filePath = path.join(columnsDirectory, `${slug}.mdx`);

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return {
      slug,
      content,
    };
  } catch (error) {
    console.error("Error reading column", slug, error);
    return null;
  }
}