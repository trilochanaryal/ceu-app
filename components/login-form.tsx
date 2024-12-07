import { View, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Button, Text } from 'react-native-paper';

import type { LoginFormData } from '../types/form';
import { Link } from 'expo-router';
import { COLORS } from '@/constants/colors';
import { useMutation } from '@tanstack/react-query';
import { signIn } from '@/services/auth.service';

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutateAsync, error, isError, isPending } = useMutation({
    mutationKey: ['login-user'],
    mutationFn: signIn,
  });

  const onSubmit = (data: LoginFormData) => {
    mutateAsync(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: (data) => {
          console.log('login', data);
        },
        onError: (err) => {
          console.log('Could not login', err.message);
        },
      }
    );
    reset();
  };

  return (
    <View style={styles.container}>
      <Text variant="titleLarge">Login Form</Text>

      {isError && <Text style={styles.errorText}>{error.message}</Text>}

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
        <Text>Don't have an account?</Text>
        <Link style={styles.infoLink} href="/(auth)/sign-up">
          Sign up
        </Link>
      </View>

      <Button disabled={isPending} onPress={handleSubmit(onSubmit)}>
        Login
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

export default LoginForm;
