import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import WriteEditor from './WriteEditor';
import WriteHeader from '../../components/WriteHeader';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {BASE_URL} from '../../config';
import AsyncStorage from '@react-native-community/async-storage';

function FreeWriteScreen() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userToken, setUserToken] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const [userProfile, setUserProfile] = useState(''); //프로필사진
  const navigation = useNavigation();
  const board = '자유게시판';

  useEffect(() => {
    async function load() {
      try {
        const userDatas = await AsyncStorage.getItem('userData'); //로그인할 때 저장된 정보들 불러오기
        const saveduserDatas = JSON.parse(userDatas);
        setUserToken(saveduserDatas.token);
        setUserNickname(saveduserDatas.nickname);
        setUserProfile(saveduserDatas.userImage);
      } catch (e) {}
    }
    load();
  }, []);

  const onSave = () => {
    if (!title) {
      alert('제목을 입력해주세요');
      return;
    }
    if (!body) {
      alert('내용을 입력해주세요');
      return;
    }

    var dataToSend = {
      title: title,
      text: body,
      time: new Date().toISOString(),
      _id: uuidv4(),
      token: userToken,
      nickname: userNickname,
      userImage: userProfile,
    };

    console.log(dataToSend);

    fetch(`${BASE_URL}/api/community/free/init`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    }).then(async res => {
      try {
        const jsonRes = await res.json();
        console.log(jsonRes);
        navigation.pop();
      } catch (err) {
        console.log('fail');
        console.log(err);
      }
    });
  };

  return (
    <SafeAreaView style={styles.block}>
      <WriteHeader onSave={onSave} board={board} />
      <WriteEditor
        title={title}
        body={body}
        onChangeTitle={setTitle}
        onChangeBody={setBody}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default FreeWriteScreen;
