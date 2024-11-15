import { useState } from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';

const DocumentForm = () => {
  const [text, setText] = useState('');

  return (
    <View>
      <TextInput
        mode="outlined"
        label="Location"
        value={text}
        onChangeText={(text) => setText(text)}
      />
    </View>
  );
};

export default DocumentForm;
