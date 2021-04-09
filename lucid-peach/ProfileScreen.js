import React, { useState, useEffect } from 'react';
import {
  Button,
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  Platform
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.scrollView}>
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={false}>
        <Text style={styles.heading}>My Profile</Text>

        <MyImagePicker />

        <Text style={styles.prompt}>Name</Text>
        <TextInput style={styles.profileInput} placeholder="Your name" />

        <Text style={styles.prompt}>D.O.B</Text>
        <TextInput style={styles.profileInput} placeholder="mm/dd/yyyy" />
        <Text style={styles.prompt}>Current mood</Text>
        <TextInput
          style={styles.profileInput}
          placeholder="i.e. happy, exhausted, calm, etc."
        />
        <Text style={styles.prompt}>Dream job</Text>
        <TextInput
          style={styles.profileInput}
          placeholder="i.e. Cat Cafe Owner"
        />
      </KeyboardAwareScrollView>
    </ScrollView>
  );
}

function MyImagePicker() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View
      style={{ alignItems: 'center', justifyContent: 'center', margin: 25 }}>
      <Button title="Upload an image" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'white',
    padding: 20,
  },
  heading: {
    margin: 24,
    backgroundColor: 'pink',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'McLauren',
  },
  prompt: {
    fontSize: 18,
    fontFamily: 'Baskerville-Italic',
  },
  profileInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 8,
    fontSize: 16,
    fontFamily: 'Baskerville',
  },
});
