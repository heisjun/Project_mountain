import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {BASE_URL} from '../config';

function LoginScreen({navigation}) {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleSubmitButton = () => {
    if (!userEmail) {
      alert('아이디를 입력하세요');
      return;
    }
    if (!userPassword) {
      alert('비밀번호를 입력하세요');
      return;
    }
    var dataToSend = {
      email: userEmail,
      password: userPassword,
    };

    fetch(`${BASE_URL}/api/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    }).then(async res => {
      try {
        const jsonRes = await res.json();
        console.log(jsonRes);
        if (jsonRes.loginSuccess === true) {
          //로그인 성공시
          AsyncStorage.setItem(
            'userData',
            JSON.stringify({
              token: jsonRes.token,
              nickname: jsonRes.nickname,
              userImage: jsonRes.userImage,
            }),
          ); //로그인할 때 적은

          console.log(JSON.stringify(jsonRes.token));
          console.log(JSON.stringify(jsonRes.nickname));
          console.log(JSON.stringify(jsonRes.userImage));

          navigation.replace('MainTab');
        } else {
          console.log('Please check your id or password');
          Alert.alert('아이디와 비밀번호를 다시 확인해주세요');
        }
      } catch (err) {
        console.log(err);
      }
    });
  };

  return (
    <SafeAreaView style={styles.fullScreen}>
      <Image
        style={styles.image}
        source={require('../Assets/images/logo.jpg')}
      />
      <Text style={styles.text}>산넘어산</Text>
      <View style={styles.form}>
        <TextInput
          style={[styles.input, styles.margin]}
          placeholder={'이메일'}
          onChangeText={userEmail => setUserEmail(userEmail)}
          autoCapitalize="none"
          underlineColorAndroid="#f000"
          blurOnSubmit={false}
        />
        <TextInput
          style={[styles.input, styles.margin]}
          placeholder={'비밀번호'}
          onChangeText={userPassword => setUserPassword(userPassword)}
          autoCapitalize="none"
          underlineColorAndroid="#f000"
          blurOnSubmit={false}
          secureTextEntry
        />
        <Button
          title="로그인"
          onPress={handleSubmitButton}
          color="#009688"></Button>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    alignItems: 'center',
    marginTop: 70,
  },
  image: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
    borderRadius: 100,
  },
  text: {
    marginTop: -10,
    fontSize: 32,
    fontWeight: 'bold',
  },
  form: {
    marginTop: 60,
    width: '100%',
    paddingHorizontal: 16,
  },
  input: {
    borderColor: '#bdbdbd',
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 4,
    height: 48,
    backgroundColor: 'white',
  },
  margin: {
    marginBottom: 16,
  },
  link: {
    color: 'blue',
  },
  avoid: {
    flex: 1,
  },
});

export default LoginScreen;
