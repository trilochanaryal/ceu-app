import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import type { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import type { DocumentFormData } from './document-form';

type Props = {
  control: Control<DocumentFormData>;
  setValue: UseFormSetValue<DocumentFormData>;
  errors: FieldErrors<DocumentFormData>;
  location: string;
};

const LocationScanner = ({ control, setValue, errors, location }: Props) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraVisible, setCameraVisible] = useState(false);
  const isPermissionGranted = Boolean(permission?.granted);

  console.log(errors);

  if (!permission) {
    return <View />;
  }

  return (
    <>
      {isPermissionGranted && !location && (
        <Button title="Get Location" onPress={() => setCameraVisible(true)} />
      )}

      {isPermissionGranted && location && (
        <Button title="Change Location" onPress={() => setCameraVisible(true)} />
      )}

      {!isPermissionGranted && (
        <View style={styles.permissionView}>
          <Text>Camera permission is required</Text>
          <Button title="Grant Permission" onPress={requestPermission} />
        </View>
      )}

      {location && (
        <Controller
          control={control}
          rules={{
            required: 'Location is required',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Location"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
            />
          )}
          name="location"
        />
      )}

      {errors.location && <Text style={styles.errorText}>{errors.location.message}</Text>}

      {cameraVisible && (
        <View style={styles.overlay}>
          <CameraView
            style={styles.camera}
            facing="back"
            onBarcodeScanned={({ data }) => {
              setValue('location', data);
              setCameraVisible(false);
            }}>
            <View style={styles.scannerOverlay}>
              <View style={styles.scanner} />
            </View>
            <TouchableOpacity onPress={() => setCameraVisible(false)} style={styles.closeIcon}>
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
          </CameraView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  permissionView: {
    display: 'flex',
    gap: 6,
    marginTop: 6,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
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
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 0,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  closeIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },

  errorText: {
    color: 'red',
    marginTop: 4,
  },
});

export default LocationScanner;
