import heicConvert from 'heic-convert';
import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

// heic-convert の型定義
interface HeicConvertOptions {
  buffer: Buffer;
  format: 'JPEG' | 'PNG' | 'WEBP';
  quality: number;
}

export async function POST(
  request: NextRequest,
) {
  try {
    // Get the form data
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Check if file is HEIC
    if (!file.name.toLowerCase().endsWith('.heic')) {
      return NextResponse.json(
        { error: 'Only HEIC files are supported' },
        { status: 400 }
      );
    }

    // Check file size (max 20MB)
    if (file.size > 20 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size exceeds the 20MB limit' },
        { status: 400 }
      );
    }

    // Convert HEIC to JPEG
    const fileBuffer = await file.arrayBuffer();
    // @ts-expect-error - heic-convert types are not perfect
    const jpegBuffer = await heicConvert({
      buffer: Buffer.from(fileBuffer),
      format: 'JPEG',
      quality: 0.9
    } as HeicConvertOptions);

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    
    // Embed the JPEG image in the PDF
    const jpegImage = await pdfDoc.embedJpg(jpegBuffer);
    
    // Add a page with the image dimensions
    const page = pdfDoc.addPage([jpegImage.width, jpegImage.height]);
    
    // Draw the image on the page
    page.drawImage(jpegImage, {
      x: 0,
      y: 0,
      width: jpegImage.width,
      height: jpegImage.height
    });
    
    // Save the PDF as bytes
    const pdfBytes = await pdfDoc.save();
    
    // Return the PDF as a response
    return new NextResponse(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${file.name.replace('.heic', '')}.pdf"`
      }
    });
  } catch (error) {
    console.error('Error converting HEIC to PDF:', error);
    return NextResponse.json(
      { error: 'Error during conversion. Please try again.' },
      { status: 500 }
    );
  }
} 