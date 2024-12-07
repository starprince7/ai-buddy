import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { AddFile } from "@/components/AddFile";
import { analyzeFile } from "@/store/slices/ai";

export default function ScanInvoice() {
  const handleFileSubmit = (fileUri: string) => {
    // Send file to ai.

    analyzeFile(fileUri)
    console.log({ fileUri });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AddFile onFileSubmit={handleFileSubmit} />
    </SafeAreaView>
  );
}
