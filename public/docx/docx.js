// PDF to Word conversion library
(function(global) {
  // Document class represents a Word document
  class Document {
    constructor(options) {
      this.sections = options.sections || [];
      this.styles = options.styles || {};
      this.properties = options.properties || {};
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
    xml += '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">\n';
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
        
        // Process each text run in the paragraph
        paragraph.children.forEach(run => {
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
      
      // Document relationships
      zip.file('word/_rels/document.xml.rels', 
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">\n' +
        '</Relationships>'
      );
      
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

  // Helper function to convert PDF to DOCX
  async function convertPdfToDocx(pdfData) {
    try {
      // Load PDF.js if not already loaded
      const pdfjsLib = global.pdfjsLib || global.pdfjs;
      
      if (!pdfjsLib) {
        throw new Error('PDF.js library not found');
      }
      
      // Load the PDF
      const loadingTask = pdfjsLib.getDocument(pdfData);
      const pdf = await loadingTask.promise;
      
      const allParagraphs = [];
      
      // Process each page
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        
        // Process text content into paragraphs
        const paragraphs = processPdfTextContent(textContent.items);
        allParagraphs.push(...paragraphs);
      }
      
      // Create document with processed paragraphs
      const doc = new Document({
        sections: [
          new Section({
            children: allParagraphs
          })
        ]
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