import { View, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Button, Text } from 'react-native-paper';
import { useMutation } from '@tanstack/react-query';
import type { RegisterFormData } from '../types/form';
import { Link, useRouter } from 'expo-router';
import { COLORS } from '@/constants/colors';
import { signUp } from '@/services/auth.service';

const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      email: '',
      password: '',
      role: 'User',
    },
  });

  const router = useRouter();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['register-user'],
    mutationFn: signUp,
  });

  const onSubmit = (data: RegisterFormData) => {
    mutateAsync(
      {
        email: data.email,
        password: data.password,
        role: data.role,
      },
      {
        onSuccess: () => {
          Alert.alert('Registration Successful!');
          router.push('/(auth)/sign-in');
        },
        onError: (err) => {
          console.log('Could not register', err.name, err.message);
          Alert.alert('Error while registering please try later!');
        },
      }
    );
    reset();
  };

  return (
    <View style={styles.container}>
      <Text variant="titleLarge">Register Form</Text>

      <Controller
        control={control}
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email address',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder="Enter your email"
            value={value}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        )}
        name="email"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

      <Controller
        control={control}
        rules={{
          required: 'Password is required',
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder="Enter your password"
            value={value}
            secureTextEntry
          />
        )}
        name="password"
      />
      {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

      <View style={styles.info}>
        <Text>Already have an account?</Text>
        <Link style={styles.infoLink} href="/(auth)/sign-in">
          Sign in
        </Link>
      </View>

      <Button disabled={isPending} onPress={handleSubmit(onSubmit)}>
        Register
      </Button>
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
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 4,
  },
  info: {
    flexDirection: 'row',
    gap: 3,
    marginBottom: 12,
  },
  infoLink: {
    color: COLORS.light.primary,
  },
});

export default RegisterForm;
