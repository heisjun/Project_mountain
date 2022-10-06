import React, {useState} from 'react';
import {Text, View, Button} from 'react-native';
import SelectBox from 'react-native-multi-selectbox';
import {xorBy} from 'lodash';
import {useNavigation} from '@react-navigation/native';
import {BASE_URL} from '../config';

// Options data must contain 'item' & 'id' keys

const K_OPTIONS = [
  {
    item: '계곡',
    id: '1',
  },
  {
    item: '단풍',
    id: '2',
  },
  {
    item: '봄',
    id: '3',
  },
  {
    item: '여름',
    id: '4',
  },
  {
    item: '가을',
    id: '5',
  },
  {
    item: '겨울',
    id: '6',
  },
  {
    item: '난이도_하',
    id: '7',
  },
  {
    item: '난이도_중',
    id: '8',
  },
  {
    item: '난이도_상',
    id: '9',
  },
  {
    item: '바위',
    id: '10',
  },
];

function KeywordScreen({route}) {
  const navigation = useNavigation();
  const [selectedTeams, setSelectedTeams] = useState([]);
  const keywordButton = () => {
    var dataToSend = {
      keyword: selectedTeams.map(row => row.item),
      name: route.params.name,
      nickname: route.params.nickname,
      email: route.params.email,
      password: route.params.password,
      userImage: route.params.userImage,
    };
    console.log(dataToSend);
    navigation.navigate('Login');
    fetch(`${BASE_URL}/api/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    }).then(async res => {
      try {
        const jsonRes = await res.json();
        console.log(jsonRes);
        if (jsonRes.success === true) {
          navigation.navigate('Login');
        } else {
          console.log('이미 가입된 이메일이 있습니다');
        }
      } catch (err) {
        console.log(err);
      }
    });
  };
  return (
    <View style={{margin: 30}}>
      <View style={{width: '100%', alignItems: 'center'}}>
        <Text style={{fontSize: 30, paddingBottom: 20}}>산넘어산</Text>
      </View>

      <View style={{height: 40}} />
      <Text style={{fontSize: 20, paddingBottom: 10}}>
        당신의 등산 취향을 골라보세요
      </Text>
      <Text></Text>
      <SelectBox
        label="Select multiple"
        options={K_OPTIONS}
        selectedValues={selectedTeams}
        onMultiSelect={onMultiChange()}
        isMulti
      />
      <Button title="로그인" onPress={keywordButton} color="#009688"></Button>
    </View>
  );

  function onMultiChange() {
    console.log(selectedTeams);
    console.log(selectedTeams.map(row => row.item));
    return item => setSelectedTeams(xorBy(selectedTeams, [item]), 'id');
  }
}

export default KeywordScreen;
