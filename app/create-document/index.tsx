import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

function CreateDocument() {
  const router = useRouter();

  return (
    <View>
      <Pressable onPress={() => router.back()}>
        <Text>Go back</Text>
      </Pressable>
      <Text>A am in Create Document page</Text>
    </View>
  );
}

export default CreateDocument;
