import api from './api';

export const signIn = async ({ email, password }: { email: string; password: string }) => {
  const response = await api.post('auth/login', {
    email,
    password,
  });

  return response.data;
};

export const signUp = async ({
  email,
  password,
  role,
}: {
  email: string;
  password?: string;
  role: string;
}) => {
  const response = await api.post('auth/signup', {
    email,
    password,
    role,
  });

  return response.data;
};
