import React, {useState} from 'react';
import {Pressable, StyleSheet, View, Platform, Image} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

function SetupProfile() {
  const [response, setResPonse] = useState(null);
  const [test, setTest] = useState('');
  const onSelectImage = async () => {
    const image = {
      uri: '',
      type: 'image/jpeg',
      name: 'test',
    };
    await launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: Platform.OS === 'android',
      },
      res => {
        if (res.didCancel) {
          console.log('User cancelled image picker');
        } else if (res.errorCode) {
          console.log('ImagePicker Error: ', res.errorCode);
        } else if (res.assets) {
          //정상적으로 사진을 반환 받았을 때
          console.log('ImagePicker res');
          setResPonse(res);
          image.name = res.assets[0].fileName;
          image.type = res.assets[0].type;
          image.uri =
            Platform.OS === 'android'
              ? res.assets[0].uri
              : res.assets[0].uri.replace('file://', '');
        }
      },
    );
    const formdata = new FormData();
    formdata.append('u_img', image);

    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
      // headers :{'Content-Type': 'multipart/form-data'} 헤더를 지정해줄거면 multipart/form-data로 지정해주어야함
      // headers를 위처럼 따로 지정해 주지 않아도 되긴 함
    };

    await fetch('http://3.34.32.228:5000/api/image/uploadUser', requestOptions)
      .then(response => response.text())
      .then(result => setTest(result))
      .catch(error => console.log('error', error));
  };

  return (
    <View style={styles.block}>
      <Pressable style={styles.circle} onPress={onSelectImage}>
        <Image style={styles.circle} source={{uri: response?.assets[0]?.uri}} />
      </Pressable>
      <View style={styles.form}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 16,
    width: '100%',
  },
  circle: {
    backgroundColor: '#cdcdcd',
    borderRadius: 64,
    width: 128,
    height: 128,
  },
});

export default SetupProfile;
