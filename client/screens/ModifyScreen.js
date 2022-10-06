import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ModifyWriteEditor from './ModifyWriteEditor';
import WriteHeader from '../components/WriteHeader';
import {BASE_URL} from '../config';
import AsyncStorage from '@react-native-community/async-storage';

function ModifyScreen({route}) {
  const [title, setTitle] = useState(route.params.title);
  const [body, setBody] = useState(route.params.body);
  const [userToken, setUserToken] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    async function load() {
      try {
        const userDatas = await AsyncStorage.getItem('userData'); //토큰과 아이디
        const saveduserDatas = JSON.parse(userDatas);
        setUserToken(saveduserDatas.token);
        setUserNickname(saveduserDatas.nickname);
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
      _id: route.params.id,
      nickname: userNickname,
      token: userToken,
    };

    console.log(dataToSend);

    fetch(`${BASE_URL}/api/community/${route.params.routing}/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    }).then(async res => {
      try {
        const jsonRes = await res.json();
        console.log(jsonRes);
        navigation.navigate(route.params.routing);
      } catch (err) {
        console.log('fail');
        console.log(err);
      }
    });
  };

  return (
    <SafeAreaView style={styles.block}>
      <WriteHeader onSave={onSave} />
      <ModifyWriteEditor
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

export default ModifyScreen;
