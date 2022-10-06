import React, {useState} from 'react';
import {View, Pressable, StyleSheet, Platform, Image} from 'react-native';
import UploadModeModal from './UploadModeModal';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {BASE_URL} from '../config';

const TABBAR_HEIGHT = 49;

function ImageUploadButton({getImageUrl}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [response, setResPonse] = useState(null);
  const bottom = TABBAR_HEIGHT / 6;
  const [boardimage, setBoardImage] = useState('');
  getImageUrl(boardimage);

  const onLanchCamera = async () => {
    const image = {
      uri: '',
      type: 'image/jpeg',
      name: 'test',
    };
    await launchCamera(
      //카메라 실행시 사진 기본 조건 설정
      {
        mediaType: 'photo',
        maxWidth: 768,
        maxHeight: 768,
        includeBase64: Platform.OS == 'android',
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
    formdata.append('b_img', image);

    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
      // headers :{'Content-Type': 'multipart/form-data'} 헤더를 지정해줄거면 multipart/form-data로 지정해주어야함
      // headers를 위처럼 따로 지정해 주지 않아도 되긴 함
    };

    await fetch(`${BASE_URL}/api/image/uploadBoard`, requestOptions)
      .then(response => response.text())
      .then(result => setBoardImage(result))
      .catch(error => console.log('error', error));
  };

  const onLanchImageLibrary = async () => {
    const image = {
      uri: '',
      type: 'image/jpeg',
      name: 'test',
    };
    await launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 768,
        maxHeight: 768,
        includeBase64: Platform.OS == 'android',
      },
      res => {
        if (res.didCancel) {
          console.log('User cancelled image picker');
        } else if (res.errorCode) {
          console.log('ImagePicker Error: ', res.errorCode);
        } else if (res.assets) {
          //정상적으로 사진을 반환 받았을 때
          console.log('ImagePicker res', res);
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
    formdata.append('b_img', image);

    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
      // headers :{'Content-Type': 'multipart/form-data'} 헤더를 지정해줄거면 multipart/form-data로 지정해주어야함
      // headers를 위처럼 따로 지정해 주지 않아도 되긴 함
    };

    await fetch(`${BASE_URL}/api/image/uploadBoard`, requestOptions)
      .then(response => response.text())
      .then(result => setBoardImage(result))
      .catch(error => console.log('error', error));
  };

  return (
    <>
      <View style={[styles.wrapper, {bottom}]}>
        <Pressable
          android_ripple={{
            color: '#ffffff',
          }}
          style={styles.circle}
          onPress={() => setModalVisible(true)}>
          <Image
            style={styles.circle}
            source={{uri: response?.assets[0]?.uri}}
          />
        </Pressable>
      </View>
      <UploadModeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onLanchCamera={onLanchCamera}
        onLanchImageLibrary={onLanchImageLibrary}
      />
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 5,
    height: 80,
    width: 80,
    left: '8%',
    transform: [
      {
        translateX: -27,
      },
    ],
    ...Platform.select({
      android: {
        elevation: 5,
        overflow: 'hidden',
      },
    }),
  },
  circle: {
    backgroundColor: '#cdcdcd',
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ImageUploadButton;
