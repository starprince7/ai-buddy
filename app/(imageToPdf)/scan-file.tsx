import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, { useState } from "react";
import PDFLib, { PDFDocument, PDFPage } from "react-native-pdf-lib";
import { AddFile } from "@/components/AddFile";
import Pdf from 'react-native-pdf';

export default function ScanInvoice() {
  const [pdfPath, setPdfPath] = useState<string | null>(null);

  const createPDF = async (imageUri: string) => {
    const pdfDoc = await PDFDocument.create("My PDF Document");
    
    const page = PDFPage.create()
      .setMediaBox(600, 800)
      .drawImage(imageUri, {
        x: 0,
        y: 0,
        width: 600,
        height: 800,
      });
    
    pdfDoc.addPages([page]);

    const docsDir = await PDFLib.getDocumentsDirectory();
    const pdfPath = `${docsDir}/buddy-my-ai.pdf`;

    await pdfDoc.write();
    return pdfPath;
  };

  const handleFileSubmit = async (fileUri: string) => {
    // const pdfFileUri = await createPDF(fileUri);
    // setPdfPath(pdfFileUri);
    // console.log({ pdfFileUri });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AddFile onFileSubmit={handleFileSubmit} />
      {pdfPath && (
        <Pdf
          source={{ uri: pdfPath }}
          style={styles.pdf}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
