import { useState } from 'react';
import { Text, View, StyleSheet, Button, TextInput, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useForm, Controller } from 'react-hook-form';

type FormData = {
  location: string;
  noOfEmployee: string;
  company: string;
};

const DocumentForm = () => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: '',
      noOfEmployee: '',
      company: '',
    },
  });

  const location = watch('location');

  const onSubmit = (data: FormData) => console.log(data);

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

      {isPermissionGranted && !location && (
        <Button title="Get Location" onPress={() => setCameraVisible(true)} />
      )}

      {isPermissionGranted && location && (
        <Button title="Change Location" onPress={() => setCameraVisible(true)} />
      )}

      {/* Request permission if not granted */}
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
              setValue('location', data); // Directly update the form field
              setCameraVisible(false); // Close camera view
            }}>
            <View style={styles.scannerOverlay}>
              <View style={styles.scanner} />
            </View>
            <Button title="Close" onPress={() => setCameraVisible(false)} />
          </CameraView>
        </View>
      )}

      <Controller
        control={control}
        rules={{
          required: 'Number of employees is required',
          pattern: {
            value: /^[0-9]*$/,
            message: 'Only numbers are allowed',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder="Number of employees on site"
            value={value}
            keyboardType="numeric"
            style={styles.input}
          />
        )}
        name="noOfEmployee"
      />
      {errors.noOfEmployee && <Text style={styles.errorText}>{errors.noOfEmployee.message}</Text>}

      <View style={styles.radioGroup}>
        <Text>Select Company</Text>
        <Controller
          control={control}
          name="company"
          render={({ field: { value, onChange } }) => (
            <>
              <TouchableOpacity
                style={[styles.radioItem, value === 'UNOPS' && styles.selectedRadio]}
                onPress={() => onChange('UNOPS')}>
                <Text>UNOPS</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.radioItem, value === 'Contractor' && styles.selectedRadio]}
                onPress={() => onChange('Contractor')}>
                <Text>Contractor</Text>
              </TouchableOpacity>
            </>
          )}
        />
      </View>

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    gap: 6,
    padding: 16,
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
  input: {
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
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
  errorText: {
    color: 'red',
    marginTop: 4,
  },
});

export default DocumentForm;
