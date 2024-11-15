import { useState } from 'react';
import { Text, View, StyleSheet, Button, TextInput, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

const DocumentForm = () => {
  const [text, setText] = useState('');
  const [noOfEmployee, setNoOfEmployee] = useState('');
  const [company, setCompany] = useState('UNOPS');

  const [permission, requestPermission] = useCameraPermissions();
  const [cameraVisible, setCameraVisible] = useState(false);
  const isPermissionGranted = Boolean(permission?.granted);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  return (
    <View style={styles.container}>
      <Text>Document Form</Text>

      {isPermissionGranted && (
        <Button title=" Get Location" onPress={() => setCameraVisible(true)} />
      )}

      {isPermissionGranted && text && (
        <Button title=" Change Location" onPress={() => setCameraVisible(true)} />
      )}

      {!isPermissionGranted && (
        <View style={styles.permissionView}>
          <Text>Camera permission is required </Text>
          <Button title="Grant Permission" onPress={requestPermission} />
        </View>
      )}

      {text && <TextInput value={text} style={styles.input} />}

      {cameraVisible && (
        <View style={styles.overlay}>
          <CameraView
            style={styles.camera}
            facing="back"
            onBarcodeScanned={({ data }) => {
              setText(data);
              setCameraVisible(false);
            }}>
            <View style={styles.scannerOverlay}>
              <View style={styles.scanner} />
            </View>
            <Button title="Close" onPress={() => setCameraVisible(false)} />
          </CameraView>
        </View>
      )}

      <TextInput
        onChangeText={setNoOfEmployee}
        placeholder="Number of employee in site"
        value={noOfEmployee}
        keyboardType="numeric"
        style={styles.input}
      />

      {/* Radio Group for UNOPS or Contractor */}
      <View style={styles.radioGroup}>
        <Text>Select Company</Text>
        <TouchableOpacity
          style={[styles.radioItem, company === 'UNOPS' && styles.selectedRadio]}
          onPress={() => setCompany('UNOPS')}>
          <Text>UNOPS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.radioItem, company === 'Contractor' && styles.selectedRadio]}
          onPress={() => setCompany('Contractor')}>
          <Text>Contractor</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    gap: 6,
  },

  permissionView: {
    display: 'flex',
    gap: 6,
    marginTop: 6,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  scannerOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanner: {
    width: 200,
    height: 200,
    borderWidth: 4,
    borderColor: '#00FF00',
    borderRadius: 8,
  },
  permissionContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  input: {
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 8,
    padding: 10,
  },
  radioGroup: {
    marginTop: 10,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  selectedRadio: {
    backgroundColor: '#ddd', // Highlight selected option
    borderRadius: 4,
  },
});

export default DocumentForm;
