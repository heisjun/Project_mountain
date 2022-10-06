import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator, ScrollView,Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {BASE_URL} from '../../config';
import CertificationList from '../Certification/CertificationListItem';

function PictureTab() {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        await AsyncStorage.getItem('userData', (err, result) => {
          const saveduserDatas = JSON.parse(result);
          fetch(`${BASE_URL}/api/user/bordC`, {
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
    <View style={styles.container}>
      <ScrollView>
        {lists.length === 0 ? (
        <Text style={styles.text}>작성한 글이 없습니다</Text>
      ) : (
          lists
            .reverse()
            .map(certify => (
              <CertificationList
                date={certify.time}
                title={certify.title}
                body={certify.text}
                id={certify._id}
                token={certify.token}
                nickname={certify.nickname}
                userImage={certify.userImage}
                boardImage={certify.imagepath}
              />
            ))
        )}
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
  },
});

export default PictureTab;
