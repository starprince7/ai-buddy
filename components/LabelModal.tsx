import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';

interface LabelModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (label: string) => void;
}

const LabelModal: React.FC<LabelModalProps> = ({ visible, onClose, onConfirm }) => {
  const [labelInput, setLabelInput] = useState('');

  const handleConfirm = () => {
    onConfirm(labelInput);
    setLabelInput(''); // Reset input after confirmation
  };

  const handleClose = () => {
    setLabelInput(''); // Reset input on close
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Enter Field Label</Text>
          <TextInput
            style={styles.input}
            value={labelInput}
            onChangeText={setLabelInput}
            placeholder="Enter label"
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton, !labelInput && styles.buttonDisabled]}
              onPress={handleConfirm}
              disabled={!labelInput}
            >
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    marginBottom: 20,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    minWidth: 100,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  confirmButton: {
    backgroundColor: '#2ecc71',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  cancelButtonText: {
    color: '#666',
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LabelModal;
