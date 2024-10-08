import PDFDocument from 'pdfkit';

export function buildPDF(dataCallback: (data: any) => void, endCallback: () => void): void {
   const doc = new PDFDocument();

   doc.on('data', dataCallback);
   doc.on('end', endCallback);

   doc.fontSize(30).text('Hello World');

   doc.end();
}