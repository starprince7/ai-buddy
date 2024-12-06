import { Link } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";

type Field = {
  name: string;
  label: string;
  type: string;
  value: any;
  required: boolean;
  group: string;
};

type Props = {
  fields: Field[];
  onDataUpdate: (updatedFields: Field[]) => void;
};

const DynamicDocumentInput: React.FC<Props> = ({ fields, onDataUpdate }) => {
  const [formData, setFormData] = useState<Field[]>(fields);

  // Handle input change
  const handleChange = (name: string, value: any) => {
    const updatedFields = formData.map((field) =>
      field.name === name ? { ...field, value } : field
    );
    setFormData(updatedFields);
    onDataUpdate(updatedFields); // Notify parent of changes
  };

  // Group fields by their "group" property
  const groupedFields = formData.reduce((groups, field) => {
    if (!groups[field.group]) groups[field.group] = [];
    groups[field.group].push(field);
    return groups;
  }, {} as Record<string, Field[]>);

  return (
    <View style={styles.container}>
      {Object.entries(groupedFields).map(([group, groupFields]) => (
        <View key={group} style={styles.groupContainer}>
          <Text style={styles.groupTitle}>{group}</Text>
          {groupFields.map((field) => (
            <View key={field.name} style={styles.fieldContainer}>
              <Text style={styles.label}>
                {field.label} {field.required && "*"}
              </Text>
              {field.type === "text" && (
                <TextInput
                  style={styles.textInput}
                  value={field.value}
                  onChangeText={(text) => handleChange(field.name, text)}
                  placeholder={field.label}
                />
              )}
              {field.type === "boolean" && (
                <Switch
                  value={field.value}
                  onValueChange={(value) => handleChange(field.name, value)}
                />
              )}
              {field.type === "number" && (
                <TextInput
                  style={styles.textInput}
                  value={String(field.value)}
                  onChangeText={(text) =>
                    handleChange(field.name, parseFloat(text) || 0)
                  }
                  keyboardType="numeric"
                  placeholder={field.label}
                />
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
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
  groupContainer: {
    marginBottom: 24,
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
  },
});

export default DynamicDocumentInput;
