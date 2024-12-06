import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { AddFile } from "@/components/AddFile";

export default function FileAttachmentScreen() {
  const handleFileSubmit = (fileRecevied: string) => {
    // Send file to ai.
    console.log({ fileRecevied });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AddFile onFileSubmit={handleFileSubmit} />
    </SafeAreaView>
  );
}
