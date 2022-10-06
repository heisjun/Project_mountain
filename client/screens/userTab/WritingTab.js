import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator, ScrollView,Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {BASE_URL} from '../../config';
import FreeList from '../Free/FreeListItem';

function WritingTab() {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        await AsyncStorage.getItem('userData', (err, result) => {
          const saveduserDatas = JSON.parse(result);
          fetch(`${BASE_URL}/api/user/bord`, {
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
    console.log(lists);
    load();
  }, []);

  return (
    <View style={styles.block}>
      <ScrollView>
        <View style={styles.item}>
          {lists.length === 0 ? (
        <Text style={styles.text}>작성한 글이 없습니다</Text>
      ) : (
            lists
              .reverse()
              .map(free => (
                <FreeList
                  date={free.time}
                  title={free.title}
                  body={free.text}
                  id={free._id}
                  token={free.token}
                  nickname={free.nickname}
                  userImage={free.userImage}
                />
              ))
          )}
        </View>
      </ScrollView>
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
  block: {
    flex: 1,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    flex: 1,
  },
  semiblock: {
    alignItems: 'center',
  },
  block2: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  date: {
    color: '#546e7a',
    fontSize: 12,
    marginBottom: 8,
  },
  title: {
    color: '#263238',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  body: {
    color: '#37474f',
    fontSize: 16,
    lineHeight: 21,
  },
});

export default WritingTab;
