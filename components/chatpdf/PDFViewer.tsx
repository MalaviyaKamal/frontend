'use client'
import React from "react";

type Props = { pdf_url: string };

const PDFViewer = ({ pdf_url }: Props) => {
  const googleDocsViewerUrl = ` `;

  return (
    <>
    <embed src={pdf_url} className="w-full h-full" type="application/pdf"/>
    </>
  );
};

export default PDFViewer;

