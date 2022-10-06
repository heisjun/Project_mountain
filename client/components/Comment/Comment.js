import React, {useState, useEffect} from 'react';
import {View, TextInput, TouchableOpacity, Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import {BASE_URL} from '../../config';

function Comment({detailId, board}) {
  const [Text, setText] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const [userProfile, setUserProfile] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const userDatas = await AsyncStorage.getItem('userData'); //토큰과 아이디
        const saveduserDatas = JSON.parse(userDatas);
        setUserNickname(saveduserDatas.nickname);
        setUserProfile(saveduserDatas.userImage);
      } catch (e) {}
    }
    load();
  }, []);

  const onPress = () => {
    var Commentdata = {
      nickname: userNickname,
      Text: Text,
      date: new Date().toISOString(),
      commentImage: userProfile,
    };
    var dataToSend = {
      _id: detailId,
      comment: Commentdata,
    };
    console.log(dataToSend);
    fetch(`${BASE_URL}/api/community/${board}/commentIn`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    }).then(async res => {
      try {
        const jsonRes = await res.json();
        console.log(jsonRes);
        setText('');
        Keyboard.dismiss();
      } catch (err) {
        console.log('fail');
        console.log(err);
      }
    });
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        backgroundColor: '#ffffff',
      }}>
      <View style={{flex: 1, height: 40}}>
        <TextInput value={Text} onChangeText={setText}></TextInput>
      </View>
      <View
        style={{
          flexShrink: 0,
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#eee',
        }}>
        <TouchableOpacity onPress={onPress}>
          <Icon name="insert-comment" size={20} color="#9e9e9e" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Comment;
