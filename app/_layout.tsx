import { Stack } from 'expo-router';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// const queryClient = new QueryClient();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    text: '#333333',
    placeholder: '#888888',
    background: '#ffffff',
  },
};

const RootLayout = () => {
  return (
    <PaperProvider theme={theme}>
      {/* <QueryClientProvider client={queryClient}> */}
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      {/* </QueryClientProvider> */}
    </PaperProvider>
  );
};

export default RootLayout;
