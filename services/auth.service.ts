import api from './api';

export const signIn = async ({ email, password }: { email: string; password: string }) => {
  const response = await api.post('auth/signin', {
    email,
    password,
  });

  return response.data;
};

export const signUp = async ({ email, password }: { email: string; password: string }) => {
  const response = await api.post('auth/signin', {
    email,
    password,
  });

  return response.data;
};
