import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {BASE_URL} from '../config';
import AsyncStorage from '@react-native-community/async-storage';

const FeedsSCREEN = ({navigation}) => {
  const [title, setTitle] = useState('');

  function Handle() {
    navigation.navigate('ListPage', {gtype: 'search', keyword: title});
  }

  const [feedList, setData] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        await AsyncStorage.getItem('userData', (err, result) => {
          const saveduserDatas = JSON.parse(result);
          fetch(`${BASE_URL}/api/mountInfo/main`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({token: saveduserDatas.token}),
          })
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => console.error(error))
            .finally(() => setLoading(false));
        });
      } catch (e) {}
    }
    load();
  }, []);

  const ImageList = loading ? (
    <ActivityIndicator
      animating={loading}
      color="#6990F7"
      size="large"
      style={{
        alignItems: 'center',
        height: 80,
      }}
    />
  ) : (
    feedList.slice(0, 5).map(list => (
      <View style={styles.slide1}>
        <Image
          style={{width: '100%', height: '70%'}}
          source={{uri: list.mntnattchimageseq}}></Image>
        <Text
          style={{
            paddingTop: 10,
            color: '#009688',
            fontSize: 17,
            fontWeight: 'bold',
            backgroundColor: '#fff',
          }}>
          {' '}
          {list.mntnnm}{' '}
        </Text>
      </View>
    ))
  );

  return (
    <View>
      <ScrollView
        style={{
          paddingTop: 10,
          flexDirection: 'column',
          height: '100%',
          backgroundColor: '#ffffff',
        }}>
        <View
          style={{
            marginBottom: 20,
            paddingHorizontal: 15,
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 2,
              borderColor: '#009688',
              borderRadius: 10,
              backgroundColor: '#ffffff',
            }}>
            <TouchableOpacity onPress={() => Handle()}>
              <View
                style={{
                  flexShrink: 0,
                  width: 40,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  backgroundColor: '#009688',
                }}>
                <Text
                  style={{textAlign: 'center', color: '#eee', fontSize: 12}}>
                  검색
                </Text>
              </View>
            </TouchableOpacity>

            <View style={{flex: 1, height: 40}}>
              <TextInput onChangeText={text => setTitle(text)}></TextInput>
            </View>
          </View>
        </View>

        {/* slide 컨테이너 */}
        <View
          style={{
            zIndex: 9999,
            bottom: 0,
            minHeight: 100,
            borderRadius: 30,
            backgroundColor: '#ffffff',
            width: '100%',
            paddingHorizontal: 34,
            paddingTop: 10,
            paddingBottom: 10,
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          {
            <Swiper style={styles.wrapper} showsButtons={false}>
              {ImageList}
            </Swiper>
          }
        </View>

        <View style={{paddingHorizontal: 15, paddingBottom: 40}}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 30,
              paddingHorizontal: 15,
            }}>
            <View style={{width: '33.33%', padding: 5}}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ListPage', {
                    gtype: 'keyword',
                    keyword: '100대명산',
                  })
                }>
                <View
                  style={{
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5,
                    backgroundColor: '#009688',
                  }}>
                  <Text style={{color: '#eee'}}>#100대 명산</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{width: '33.33%', padding: 5}}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ListPage', {
                    gtype: 'keyword',
                    keyword: '겨울',
                  })
                }>
                <View
                  style={{
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5,
                    backgroundColor: '#009688',
                  }}>
                  <Text style={{color: '#eee'}}>#겨울 산</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{width: '33.33%', padding: 5}}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ListPage', {
                    gtype: 'keyword',
                    keyword: '단풍',
                  })
                }>
                <View
                  style={{
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5,
                    backgroundColor: '#009688',
                  }}>
                  <Text style={{color: '#eee'}}>#단풍이 예쁜</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{width: '33.33%', padding: 5}}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ListPage', {
                    gtype: 'keyword',
                    keyword: '난이도_하',
                  })
                }>
                <View
                  style={{
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5,
                    backgroundColor: '#009688',
                  }}>
                  <Text style={{color: '#eee'}}>#난이도 하</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{width: '33.33%', padding: 5}}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ListPage', {
                    gtype: 'keyword',
                    keyword: '난이도_중',
                  })
                }>
                <View
                  style={{
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5,
                    backgroundColor: '#009688',
                  }}>
                  <Text style={{color: '#eee'}}>#난이도 중</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{width: '33.33%', padding: 5}}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ListPage', {
                    gtype: 'keyword',
                    keyword: '난이도_상',
                  })
                }>
                <View
                  style={{
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5,
                    backgroundColor: '#009688',
                  }}>
                  <Text style={{color: '#eee'}}>#난이도 상</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bgwhite: {backgroundColor: '#ffffff'},
  wrapper: {height: 400},

  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  slide2: {
    flex: 1,
  },
  slide3: {
    flex: 1,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default FeedsSCREEN;
