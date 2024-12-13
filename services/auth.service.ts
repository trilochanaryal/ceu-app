import api from './api';

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
