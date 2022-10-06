import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {BASE_URL} from '../../config';

function UserHeader() {
  //유저 정보 받아오기 위한 변수
  const [list, setLists] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        await AsyncStorage.getItem('userData', (err, result) => {
          const saveduserDatas = JSON.parse(result);
          fetch(`${BASE_URL}/api/user/auth`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({token: saveduserDatas.token}),
          })
            .then(response => response.json())
            .then(json => setLists(json))
            .catch(error => console.error(error))
            .finally(() => setLoading(false));
        });
      } catch (e) {}
    }
    load();
  }, []);

  return (
    <View>
      <View style={styles.header}>
        {/*프로필 이미지*/}
        {list.userImage === '' ? (
          <Image
            style={styles.profile}
            source={require('../../Assets/images/user.png')}
          />
        ) : (
          <Image style={styles.profile} source={{uri: list.userImage}} />
        )}

        <View style={styles.profileTxtContainer}>
          <View style={styles.profileText1}>
            {/*닉네임*/}
            <Text style={styles.profileName}>{list.nickname}</Text>
          </View>
          {/*자기소개*/}
          <Text style={styles.profileText2}>{list.description}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 20,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'stretch',
    height: 80,
    width: 80,
    resizeMode: 'contain',
    borderRadius: 500,
  },
  profileTxtContainer: {
    marginLeft: 10,
  },
  profileText1: {
    paddingTop: 10,
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    marginRight: 5,
  },
  profileText2: {
    marginTop: 10,
    paddingBottom: 10,
  },
});

export default UserHeader;
