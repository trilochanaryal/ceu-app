import { Link } from 'expo-router';
import { View } from 'react-native';

function Home() {
  return (
    <View>
      <Link href="/create-document">Create Document</Link>
    </View>
  );
}

export default Home;
