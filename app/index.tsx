import { Redirect } from 'expo-router';

function Home() {
  const isLoggedIn = true;

  if (isLoggedIn) {
    return <Redirect href="/lists" />;
  } else {
    return <Redirect href="/(auth)/sign-in" />;
  }
}

export default Home;
