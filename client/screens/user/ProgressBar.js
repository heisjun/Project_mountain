import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import * as Progress from 'react-native-progress';
import {BASE_URL} from '../../config';
import AsyncStorage from '@react-native-community/async-storage';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

function ProgressBar() {
  //화면 가로 면적
  const layout = useWindowDimensions();
  //유저 레벨, 진행률 값 받아오기 위한 변수
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
    //진행바(뱃지 달성률)
    <View>
      <View style={styles.progress}>
        {/*유저 레벨*/}
        <Text style={styles.level}>Level {list.level}</Text>
        <Progress.Bar
          color="#009688"
          progress={list.badgeProgress} //진행률
          width={(layout.width * 4) / 5} //진행바 길이
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  level: {
    marginTop: 10,
    marginBottom: 5,
  },
  progress: {
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default ProgressBar;
