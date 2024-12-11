import { useAuth } from '@/context/AuthContext';
import { Redirect } from 'expo-router';
import React from 'react';

const Home = () => {
  const { authState } = useAuth();

  if (authState?.authenticated) {
    return <Redirect href="/(tabs)/lists" />;
  } else {
    return <Redirect href="/(auth)/sign-in" />;
  }
};

export default Home;
