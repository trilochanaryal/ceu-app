import { Text, View, StyleSheet, Button, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import LocationScanner from './location-scanner';

export type DocumentFormData = {
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

  const onSubmit = (data: DocumentFormData) => console.log(data);

  return (
    <View style={styles.container}>
      <Text>Document Form</Text>

      <LocationScanner control={control} setValue={setValue} errors={errors} location={location} />

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
