import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

// Supported image types for most AI models
const SUPPORTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

// Maximum file size (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

interface Props {
  onFileSubmit: (imageUri: string) => void;
}

export const AddFile: React.FC<Props> = ({ onFileSubmit }) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  // Request camera and media library permissions
  const requestPermissions = async () => {
    if (Platform.OS !== "web") {
      const { status: cameraStatus } =
        await ImagePicker.requestCameraPermissionsAsync();
      const { status: mediaStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (cameraStatus !== "granted" || mediaStatus !== "granted") {
        Alert.alert(
          "Permissions required",
          "Sorry, we need camera and media library permissions to make this work!"
        );
        return false;
      }
    }
    return true;
  };

  // Validate image file
  const validateImageFile = async (uri: string): Promise<boolean> => {
    try {
      // Get file metadata
      const fileInfo = await FileSystem.getInfoAsync(uri, { size: true });

      // Robust size checking with type guard
      if (!fileInfo.exists) {
        Alert.alert("File Error", "Selected file does not exist");
        return false;
      }

      // Explicit type checking for size
      if (fileInfo.size === undefined) {
        Alert.alert("File Error", "Could not determine file size");
        return false;
      }

      // Here I'm checking file size
      if (fileInfo.size > MAX_FILE_SIZE) {
        Alert.alert(
          "File Too Large",
          `Please upload an image under ${MAX_FILE_SIZE}MB`
        );
        return false;
      }

      // Check file type
      const fileName = uri.toLowerCase();
      const fileExtension = fileName.split(".").pop();

      const extensionToMimeType: { [key: string]: string } = {
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        webp: "image/webp",
        pdf: "application/pdf",
      };

      const detectedMimeType = extensionToMimeType[fileExtension || ""];

      if (
        !detectedMimeType ||
        !SUPPORTED_IMAGE_TYPES.includes(detectedMimeType)
      ) {
        Alert.alert(
          "Unsupported File Type",
          `Please upload ${SUPPORTED_IMAGE_TYPES.join(", ")} files only`
        );
        return false;
      }

      return true;
    } catch (error) {
      console.error("Image validation error:", error);
      return false;
    }
  };

  // Open camera to capture image
  const takePhoto = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const isValid = await validateImageFile(uri);

      if (isValid) {
        setImageUri(uri);
      }
    }
  };

  // Select image from media library
  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const isValid = await validateImageFile(uri);

      if (isValid) {
        setImageUri(uri);
      }
    }
  };

  // Submit image and prompt to AI model
  const handleSubmit = () => {
    if (imageUri) {
      onFileSubmit(imageUri);
    } else {
      Alert.alert(
        "Missing Information",
        "Please select an image and enter a prompt"
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={takePhoto} style={styles.button}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={pickImage} style={styles.button}>
          <Text style={styles.buttonText}>Pick from Library</Text>
        </TouchableOpacity>
      </View>

      {imageUri &&
        (imageUri.toLowerCase().endsWith(".pdf") ? (
          <View style={styles.pdfPlaceholder}>
            <Text style={styles.pdfText}>PDF Document Selected</Text>
          </View>
        ) : (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ))}

      <TouchableOpacity
        onPress={handleSubmit}
        style={[
          styles.button,
          { maxHeight: 60 },
          !imageUri && styles.disabledButton,
        ]}
        disabled={!imageUri}
      >
        <Text style={styles.buttonText}>Submit to AI</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flex: 0.48,
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    marginBottom: 20,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    minHeight: 100,
    textAlignVertical: "top",
  },
  pdfPlaceholder: {
    width: "100%",
    height: 300,
    backgroundColor: "#e9ecef",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 10,
  },
  pdfText: {
    fontSize: 16,
    color: "#495057",
    fontWeight: "bold",
  },
});
