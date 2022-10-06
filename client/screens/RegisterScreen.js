import React, {useState} from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Pressable,
  Platform,
  Image,
} from 'react-native';
import {BASE_URL} from '../config';
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';

function RegisterScreen() {
  const [userName, setUserName] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordchk, setUserPasswordchk] = useState('');
  const [errortext, setErrortext] = useState('');
  const [response, setResPonse] = useState(null);
  const [test, setTest] = useState('');

  const navigation = useNavigation();

  //프로필 사진 컴포넌트
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

  //회원가입 컴포넌트
  const registerButton = () => {
    if (!userName) {
      setErrortext('이름을 입력해주세요');
      return;
    } else {
      setErrortext('');
    }
    if (!userNickname) {
      setErrortext('닉네임을 입력해주세요');
      return;
    } else {
      setErrortext('');
    }
    if (!userEmail) {
      setErrortext('이메일을 입력해주세요');
      return;
    } else {
      setErrortext('');
    }
    if (!userPassword) {
      setErrortext('비밀번호를 입력해주세요');
      return;
    } else {
      setErrortext('');
    }
    if (userPasswordchk != userPassword) {
      setErrortext('비밀번호가 일치하지 않습니다');
      return;
    } else {
      setErrortext('');
    }

    navigation.navigate('Keyword', {
      name: userName,
      nickname: userNickname,
      email: userEmail,
      password: userPassword,
      userImage: test,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <Pressable style={styles.circle} onPress={onSelectImage}>
          <Image
            style={styles.circle}
            source={{uri: response?.assets[0]?.uri}}
          />
        </Pressable>
        <View style={styles.form}></View>
      </View>
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          placeholder="이름"
          onChangeText={userName => setUserName(userName)}
        />
        <TextInput
          style={styles.input}
          placeholder="닉네임"
          onChangeText={userNickname => setUserNickname(userNickname)}
        />

        <TextInput
          style={styles.input}
          placeholder="이메일"
          onChangeText={userEmail => setUserEmail(userEmail)}
        />

        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          onChangeText={userPassword => setUserPassword(userPassword)}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="비밀번호 확인"
          onChangeText={userPasswordchk => setUserPasswordchk(userPasswordchk)}
          secureTextEntry
        />
        <Text style={styles.error}>{errortext}</Text>

        <Button title="다음" onPress={registerButton} color="#009688"></Button>

        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
  },
  wrapper: {
    width: '80%',
    marginTop: 20,
  },
  input: {
    marginBottom: 13,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  link: {
    color: 'blue',
  },
  error: {
    color: 'red',
    fontSize: 15,
    marginBottom: 10,
  },
  block: {
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 16,
    width: '100%',
  },
  circle: {
    marginBottom: 5,
    backgroundColor: '#cdcdcd',
    borderRadius: 64,
    width: 128,
    height: 128,
  },
});

export default RegisterScreen;
