import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {BASE_URL} from '../../config';
import Badge from '../user/Badge';

//탭 메뉴 중에 뱃지 탭
function BadgeTab() {
  //뱃지 이름을 위한 변수
  const [list, setLists] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        await AsyncStorage.getItem('userData', (err, result) => {
          const saveduserDatas = JSON.parse(result);
          fetch(`${BASE_URL}/api/user/badgeInfo`, {
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
      {list.length === 0 ? (
        <Text style={styles.text}>획득한 뱃지가 없습니다</Text>
      ) : (
        <ScrollView>
          <View style={styles.btList}>
            {list.map(badge => (
              <Badge name={badge.mntnnm} image={badge.mntnattchimageseq} />
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 200,
    fontWeight: 'bold',
    color: 'gray',
  },
  btList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    justifyContent: 'space-around',
    alignContent: 'space-between',
  },
});

export default BadgeTab;
