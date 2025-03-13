// PDF to Word conversion library
(function(global) {
  // Document class represents a Word document
  class Document {
    constructor(options) {
      this.sections = options.sections || [];
      this.styles = options.styles || {};
      this.properties = options.properties || {};
      this.images = options.images || [];
    }
  }

  // Section class represents a section in a Word document
  class Section {
    constructor(options) {
      this.properties = options.properties || {};
      this.children = options.children || [];
    }
  }

  // Paragraph class represents a paragraph in a Word document
  class Paragraph {
    constructor(options) {
      this.children = options.children || [];
      this.spacing = options.spacing || { before: 0, after: 0 };
      this.alignment = options.alignment || 'left';
      this.style = options.style || 'normal';
      this.heading = options.heading || false;
    }
  }

  // TextRun class represents a run of text with the same formatting
  class TextRun {
    constructor(text, options = {}) {
      this.text = text || '';
      this.bold = options.bold || false;
      this.italic = options.italic || false;
      this.underline = options.underline || false;
      this.size = options.size || 11; // Default font size
      this.font = options.font || 'Calibri';
      this.color = options.color || '000000'; // Black
      this.type = 'text';
    }
  }

  // ImageRun class represents an image in a Word document
  class ImageRun {
    constructor(options = {}) {
      this.data = options.data || null; // Base64 encoded image data
      this.width = options.width || 300;
      this.height = options.height || 200;
      this.alignment = options.alignment || 'center';
      this.id = options.id || `img${Date.now()}${Math.floor(Math.random() * 1000)}`;
      this.type = 'image';
    }
  }

  // Helper function to convert text to ArrayBuffer (used internally)
  function textToArrayBuffer(text) {
    const buffer = new ArrayBuffer(text.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < text.length; i++) {
      view[i] = text.charCodeAt(i) & 0xFF;
    }
    return buffer;
  }

  // Helper function to create a simple XML document
  function createSimpleXml(doc) {
    // Create a simplified DOCX XML structure
    let xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n';
    xml += '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" ';
    xml += 'xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" ';
    xml += 'xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" ';
    xml += 'xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture" ';
    xml += 'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">\n';
    xml += '  <w:body>\n';

    // Process each section
    doc.sections.forEach(section => {
      // Process each paragraph in the section
      section.children.forEach(paragraph => {
        xml += '    <w:p>\n';
        
        // Add paragraph properties
        xml += '      <w:pPr>\n';
        if (paragraph.alignment !== 'left') {
          xml += `        <w:jc w:val="${paragraph.alignment}"/>\n`;
        }
        if (paragraph.heading) {
          xml += `        <w:pStyle w:val="Heading${paragraph.heading}"/>\n`;
        }
        if (paragraph.spacing.before > 0 || paragraph.spacing.after > 0) {
          xml += `        <w:spacing w:before="${paragraph.spacing.before}" w:after="${paragraph.spacing.after}"/>\n`;
        }
        xml += '      </w:pPr>\n';
        
        // Process each run in the paragraph
        paragraph.children.forEach(run => {
          if (run.type === 'text') {
            // Process text run
            xml += '      <w:r>\n';
            
            // Add run properties
            xml += '        <w:rPr>\n';
            if (run.bold) {
              xml += '          <w:b/>\n';
            }
            if (run.italic) {
              xml += '          <w:i/>\n';
            }
            if (run.underline) {
              xml += '          <w:u w:val="single"/>\n';
            }
            if (run.size) {
              xml += `          <w:sz w:val="${run.size * 2}"/>\n`; // Word uses half-points
            }
            if (run.font) {
              xml += `          <w:rFonts w:ascii="${run.font}" w:hAnsi="${run.font}"/>\n`;
            }
            if (run.color && run.color !== '000000') {
              xml += `          <w:color w:val="${run.color}"/>\n`;
            }
            xml += '        </w:rPr>\n';
            
            // Add text
            xml += `        <w:t>${escapeXml(run.text)}</w:t>\n`;
            xml += '      </w:r>\n';
          } else if (run.type === 'image') {
            // Process image run
            xml += '      <w:r>\n';
            xml += '        <w:drawing>\n';
            xml += '          <wp:inline distT="0" distB="0" distL="0" distR="0">\n';
            xml += `            <wp:extent cx="${run.width * 9525}" cy="${run.height * 9525}"/>\n`;
            xml += '            <wp:effectExtent l="0" t="0" r="0" b="0"/>\n';
            xml += '            <wp:docPr id="1" name="Picture 1"/>\n';
            xml += '            <wp:cNvGraphicFramePr>\n';
            xml += '              <a:graphicFrameLocks xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" noChangeAspect="1"/>\n';
            xml += '            </wp:cNvGraphicFramePr>\n';
            xml += '            <a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">\n';
            xml += '              <a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">\n';
            xml += '                <pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">\n';
            xml += '                  <pic:nvPicPr>\n';
            xml += `                    <pic:cNvPr id="0" name="Picture ${run.id}"/>\n`;
            xml += '                    <pic:cNvPicPr/>\n';
            xml += '                  </pic:nvPicPr>\n';
            xml += '                  <pic:blipFill>\n';
            xml += `                    <a:blip r:embed="rId${run.id}"/>\n`;
            xml += '                    <a:stretch>\n';
            xml += '                      <a:fillRect/>\n';
            xml += '                    </a:stretch>\n';
            xml += '                  </pic:blipFill>\n';
            xml += '                  <pic:spPr>\n';
            xml += '                    <a:xfrm>\n';
            xml += '                      <a:off x="0" y="0"/>\n';
            xml += `                      <a:ext cx="${run.width * 9525}" cy="${run.height * 9525}"/>\n`;
            xml += '                    </a:xfrm>\n';
            xml += '                    <a:prstGeom prst="rect">\n';
            xml += '                      <a:avLst/>\n';
            xml += '                    </a:prstGeom>\n';
            xml += '                  </pic:spPr>\n';
            xml += '                </pic:pic>\n';
            xml += '              </a:graphicData>\n';
            xml += '            </a:graphic>\n';
            xml += '          </wp:inline>\n';
            xml += '        </w:drawing>\n';
            xml += '      </w:r>\n';
          }
        });
        
        xml += '    </w:p>\n';
      });
    });

    xml += '  </w:body>\n';
    xml += '</w:document>';
    
    return xml;
  }

  // Helper function to escape XML special characters
  function escapeXml(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  // Create a simple DOCX file structure
  async function createDocxPackage(doc) {
    try {
      // Load JSZip library if available
      const JSZip = global.JSZip || (await import('https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js')).default;
      
      // Create a new ZIP file
      const zip = new JSZip();
      
      // Add required DOCX files
      
      // Content Types
      zip.file('[Content_Types].xml', 
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
        '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">\n' +
        '  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>\n' +
        '  <Default Extension="xml" ContentType="application/xml"/>\n' +
        '  <Default Extension="png" ContentType="image/png"/>\n' +
        '  <Default Extension="jpeg" ContentType="image/jpeg"/>\n' +
        '  <Default Extension="jpg" ContentType="image/jpeg"/>\n' +
        '  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>\n' +
        '</Types>'
      );
      
      // Relationships
      zip.file('_rels/.rels', 
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">\n' +
        '  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>\n' +
        '</Relationships>'
      );
      
      // Document relationships XML
      let documentRelsXml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">\n';
      
      // Add image relationships and files
      if (doc.images && doc.images.length > 0) {
        doc.images.forEach((image, index) => {
          const imageId = image.id;
          const imageExt = image.format || 'png';
          const imagePath = `media/image${index + 1}.${imageExt}`;
          
          // Add relationship
          documentRelsXml += `  <Relationship Id="rId${imageId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="${imagePath}"/>\n`;
          
          // Add image file to zip
          if (image.data) {
            // Convert base64 to binary
            const binaryData = atob(image.data.split(',')[1]);
            const array = new Uint8Array(binaryData.length);
            for (let i = 0; i < binaryData.length; i++) {
              array[i] = binaryData.charCodeAt(i);
            }
            
            // Add image to zip
            zip.file(`word/${imagePath}`, array);
          }
        });
      }
      
      documentRelsXml += '</Relationships>';
      
      // Add document relationships file
      zip.file('word/_rels/document.xml.rels', documentRelsXml);
      
      // Main document
      const xmlContent = createSimpleXml(doc);
      // Use textToArrayBuffer for binary data handling if needed
      const xmlBuffer = typeof xmlContent === 'string' ? xmlContent : textToArrayBuffer(xmlContent);
      zip.file('word/document.xml', xmlBuffer);
      
      // Generate the ZIP file
      const blob = await zip.generateAsync({ 
        type: 'blob',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      });
      
      return blob;
    } catch (error) {
      console.error('Error creating DOCX package:', error);
      // Fallback to a simple text file if JSZip fails
      const textContent = doc.sections
        .flatMap(section => section.children)
        .flatMap(paragraph => paragraph.children)
        .filter(run => run.type === 'text')
        .map(run => run.text)
        .join('\n');
      
      return new Blob([textContent], { 
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
      });
    }
  }

  // Packer class for converting Document to Blob
  const Packer = {
    toBlob: async function(doc) {
      return await createDocxPackage(doc);
    }
  };

  // Analyze text to detect formatting
  function analyzeText(text) {
    // This is a simple implementation that could be expanded
    // to detect formatting based on text patterns
    
    const formatting = {
      bold: false,
      italic: false,
      underline: false,
      size: 11
    };
    
    // Simple heuristics for formatting detection
    // Heading detection (simple)
    if (text.trim().length < 100 && text.trim().endsWith(':')) {
      formatting.bold = true;
    }
    
    // Detect all caps as emphasis
    if (text.length > 2 && text === text.toUpperCase() && /[A-Z]/.test(text)) {
      formatting.bold = true;
    }
    
    return formatting;
  }

  // Process PDF text content into structured document
  function processPdfTextContent(textContent) {
    const paragraphs = [];
    let currentParagraph = null;
    let prevY = -1;
    
    // Process each text item
    textContent.forEach(item => {
      // Simple paragraph detection based on Y position
      const y = item.transform ? item.transform[5] : (item.y || 0);
      
      // If Y position changed significantly, start a new paragraph
      if (prevY === -1 || Math.abs(y - prevY) > 5) {
        if (currentParagraph) {
          paragraphs.push(currentParagraph);
        }
        
        // Create a new paragraph
        currentParagraph = new Paragraph({
          children: []
        });
      }
      
      // Analyze text for formatting
      const formatting = analyzeText(item.str);
      
      // Add text run to current paragraph
      currentParagraph.children.push(new TextRun(item.str, formatting));
      
      prevY = y;
    });
    
    // Add the last paragraph
    if (currentParagraph && currentParagraph.children.length > 0) {
      paragraphs.push(currentParagraph);
    }
    
    return paragraphs;
  }

  // Extract images from PDF page
  async function extractImagesFromPage(page) {
    try {
      console.log('Attempting to extract images from page');
      
      // PDF.jsのOPSオブジェクトが利用可能かチェック
      const pdfjsLib = global.pdfjsLib || global.pdfjs;
      if (!pdfjsLib) {
        console.warn('PDF.js library not found for image extraction');
        return [];
      }
      
      // PDF.jsのバージョンによってはOPSが直接アクセスできない場合がある
      const OPS = pdfjsLib.OPS || window.pdfjsLib?.OPS;
      if (!OPS) {
        console.warn('PDF.js OPS object not found, trying alternative method');
        return extractImagesAlternative(page);
      }
      
      const operatorList = await page.getOperatorList();
      const images = [];
      
      console.log('Operator list obtained, length:', operatorList.fnArray.length);
      
      for (let i = 0; i < operatorList.fnArray.length; i++) {
        // paintImageXObjectの定数値は通常93または'paintImageXObject'
        const isPaintImage = 
          operatorList.fnArray[i] === OPS.paintImageXObject || 
          operatorList.fnArray[i] === 93 || 
          operatorList.fnArray[i] === 'paintImageXObject';
        
        if (isPaintImage) {
          console.log('Found image operation at index', i);
          const imgIndex = operatorList.argsArray[i][0];
          console.log('Image index:', imgIndex);
          
          try {
            const imgData = page.objs.get(imgIndex);
            
            if (imgData && imgData.data) {
              console.log('Image data found, dimensions:', imgData.width, 'x', imgData.height);
              
              // Create a canvas to draw the image
              const canvas = document.createElement('canvas');
              canvas.width = imgData.width;
              canvas.height = imgData.height;
              
              const ctx = canvas.getContext('2d');
              const imgWidth = imgData.width;
              const imgHeight = imgData.height;
              
              // 画像データの形式によって処理を分ける
              if (imgData.kind === 'RGBA_32BPP') {
                // RGBAデータの場合は直接使用
                const imageData = new ImageData(
                  new Uint8ClampedArray(imgData.data.buffer), 
                  imgWidth, 
                  imgHeight
                );
                ctx.putImageData(imageData, 0, 0);
              } else {
                // グレースケールなどの場合はRGBAに変換
                const imageData = ctx.createImageData(imgWidth, imgHeight);
                const data = imageData.data;
                
                if (imgData.kind === 'RGB_24BPP') {
                  // RGB 24bit
                  for (let j = 0, k = 0; j < imgData.data.length; j += 3, k += 4) {
                    data[k] = imgData.data[j];     // R
                    data[k + 1] = imgData.data[j + 1]; // G
                    data[k + 2] = imgData.data[j + 2]; // B
                    data[k + 3] = 255;             // Alpha
                  }
                } else {
                  // その他のフォーマット（グレースケールなど）
                  for (let j = 0, k = 0; j < imgData.data.length; j++, k += 4) {
                    data[k] = imgData.data[j];     // R
                    data[k + 1] = imgData.data[j]; // G
                    data[k + 2] = imgData.data[j]; // B
                    data[k + 3] = 255;             // Alpha
                  }
                }
                
                ctx.putImageData(imageData, 0, 0);
              }
              
              // Convert canvas to base64 data URL
              const dataUrl = canvas.toDataURL('image/png');
              console.log('Image converted to data URL');
              
              // Create image object
              const image = new ImageRun({
                data: dataUrl,
                width: imgWidth,
                height: imgHeight,
                id: `img${images.length + 1}`
              });
              
              images.push(image);
              console.log('Image added to collection, total:', images.length);
            } else {
              console.warn('Image data not found or invalid for index', imgIndex);
            }
          } catch (imgErr) {
            console.error('Error processing image:', imgErr);
          }
        }
      }
      
      console.log('Total images extracted:', images.length);
      return images;
    } catch (error) {
      console.error('Error extracting images:', error);
      return extractImagesAlternative(page);
    }
  }

  // 代替の画像抽出方法
  async function extractImagesAlternative(page) {
    try {
      console.log('Using alternative image extraction method');
      const images = [];
      
      // ページのコンテンツを取得
      const commonObjs = page.commonObjs;
      const objs = page.objs;
      
      // すべてのオブジェクトを調査
      const checkObject = (obj) => {
        if (!obj) return;
        
        // 画像データを持つオブジェクトを探す
        if (obj.data && (obj.width || obj.height)) {
          console.log('Found potential image object:', obj.width, 'x', obj.height);
          
          try {
            // Canvasに描画
            const canvas = document.createElement('canvas');
            const width = obj.width || 100;
            const height = obj.height || 100;
            canvas.width = width;
            canvas.height = height;
            
            const ctx = canvas.getContext('2d');
            
            // 画像データをImageDataに変換
            const imageData = ctx.createImageData(width, height);
            const data = imageData.data;
            
            // データをコピー（フォーマットに応じて処理を変える）
            if (obj.data.length === width * height * 4) {
              // RGBA形式
              for (let i = 0; i < obj.data.length; i++) {
                data[i] = obj.data[i];
              }
            } else if (obj.data.length === width * height * 3) {
              // RGB形式
              for (let i = 0, j = 0; i < obj.data.length; i += 3, j += 4) {
                data[j] = obj.data[i];     // R
                data[j + 1] = obj.data[i + 1]; // G
                data[j + 2] = obj.data[i + 2]; // B
                data[j + 3] = 255;         // Alpha
              }
            } else {
              // グレースケールなど
              for (let i = 0, j = 0; i < obj.data.length; i++, j += 4) {
                data[j] = obj.data[i];     // R
                data[j + 1] = obj.data[i]; // G
                data[j + 2] = obj.data[i]; // B
                data[j + 3] = 255;         // Alpha
              }
            }
            
            ctx.putImageData(imageData, 0, 0);
            
            // データURLに変換
            const dataUrl = canvas.toDataURL('image/png');
            
            // ImageRunオブジェクトを作成
            const image = new ImageRun({
              data: dataUrl,
              width: width,
              height: height,
              id: `img${images.length + 1}`
            });
            
            images.push(image);
            console.log('Alternative method: Image added, total:', images.length);
          } catch (err) {
            console.error('Error processing potential image:', err);
          }
        }
      };
      
      // commonObjsとobjsの両方をチェック
      if (commonObjs && typeof commonObjs.getAll === 'function') {
        const allCommonObjs = commonObjs.getAll();
        Object.values(allCommonObjs).forEach(checkObject);
      }
      
      if (objs && typeof objs.getAll === 'function') {
        const allObjs = objs.getAll();
        Object.values(allObjs).forEach(checkObject);
      } else if (objs) {
        // getAll関数がない場合は直接オブジェクトを調査
        for (const key in objs) {
          if (objs.hasOwnProperty(key) && objs[key]) {
            checkObject(objs[key]);
          }
        }
      }
      
      console.log('Alternative method total images:', images.length);
      return images;
    } catch (error) {
      console.error('Error in alternative image extraction:', error);
      return [];
    }
  }

  // Helper function to convert PDF to DOCX
  async function convertPdfToDocx(pdfData) {
    try {
      // Load PDF.js if not already loaded
      const pdfjsLib = global.pdfjsLib || global.pdfjs;
      
      if (!pdfjsLib) {
        throw new Error('PDF.js library not found');
      }
      
      console.log('Starting PDF to DOCX conversion with image support');
      
      // Load the PDF
      const loadingTask = pdfjsLib.getDocument(pdfData);
      const pdf = await loadingTask.promise;
      console.log('PDF loaded, pages:', pdf.numPages);
      
      const allParagraphs = [];
      const allImages = [];
      
      // Process each page
      for (let i = 1; i <= pdf.numPages; i++) {
        console.log(`Processing page ${i} of ${pdf.numPages}`);
        const page = await pdf.getPage(i);
        
        // Extract text content
        const textContent = await page.getTextContent();
        console.log(`Page ${i}: Text content extracted, items:`, textContent.items.length);
        const paragraphs = processPdfTextContent(textContent.items);
        allParagraphs.push(...paragraphs);
        
        // Extract images
        try {
          console.log(`Page ${i}: Extracting images`);
          const images = await extractImagesFromPage(page);
          console.log(`Page ${i}: Extracted ${images.length} images`);
          
          if (images && images.length > 0) {
            // Add image paragraph after text paragraphs
            images.forEach((image, idx) => {
              allImages.push(image);
              
              // Create a paragraph for each image
              const imageParagraph = new Paragraph({
                children: [image],
                alignment: 'center'
              });
              
              allParagraphs.push(imageParagraph);
              console.log(`Page ${i}: Added image ${idx + 1} to document`);
            });
          }
        } catch (imgError) {
          console.warn(`Error extracting images from page ${i}:`, imgError);
        }
      }
      
      console.log('PDF processing complete. Paragraphs:', allParagraphs.length, 'Images:', allImages.length);
      
      // Create document with processed paragraphs and images
      const doc = new Document({
        sections: [
          new Section({
            children: allParagraphs
          })
        ],
        images: allImages
      });
      
      return doc;
    } catch (error) {
      console.error('Error converting PDF to DOCX:', error);
      
      // Return a simple document with error message
      return new Document({
        sections: [
          new Section({
            children: [
              new Paragraph({
                children: [
                  new TextRun('Error converting PDF: ' + error.message)
                ]
              })
            ]
          })
        ]
      });
    }
  }

  // Export the classes and utilities
  const docxLib = {
    Document,
    Section,
    Paragraph,
    TextRun,
    ImageRun,
    Packer,
    convertPdfToDocx
  };
  
  // グローバルオブジェクトに登録
  global.docx = docxLib;
  
  // ライブラリ読み込み完了イベントを発火
  if (typeof document !== 'undefined') {
    // カスタムイベントを発火
    const event = new CustomEvent('docx-library-loaded');
    document.dispatchEvent(event);
    
    console.log('DOCX library initialized and ready to use');
  }
  
  // JSZipが読み込まれているか確認
  if (global.JSZip) {
    console.log('JSZip library detected');
  } else {
    console.warn('JSZip library not detected. Some features may not work properly.');
  }
  
  return docxLib;
})(typeof window !== 'undefined' ? window : global); 