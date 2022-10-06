import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Styled from 'styled-components/native';
import axios from 'axios';
import {BASE_URL} from '../config';

const Container = Styled.View``;

const ListScreen = ({route, navigation}) => {
  const {gtype, keyword} = route.params;
  const [feedList, setData] = useState('');
  const [loading, setLoading] = useState(true);

  function truncate(text) {
    const replaced = text.replace(/\n/g, ' ');
    if (replaced.length <= 100) {
      return replaced;
    }
    return replaced.slice(0, 100).concat('...');
  }

  if (gtype == 'keyword') {
    var params = {
      keyword: keyword, //gtype=main, keyword=userToken
    };
  } else {
    var params = {
      search: keyword,
    };
  }

  const url = `${BASE_URL}/api/mountInfo/` + gtype;
  console.log(url);

  const _callApi = async () => {
    //setLoading(true); //추가한 부분
    try {
      const res = await axios.post(url, params);

      console.log('res.data.result[0]===>' + res.data);
      setData(res.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    _callApi();
  }, []);

  return (
    <Container>
      {loading ? (
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
        <View style={{paddingHorizontal: 15, backgroundColor: '#ffffff'}}>
          <FlatList
            data={feedList.slice(0, feedList.length)}
            keyExtractor={(item, index) => {
              return `image-feed-${index}`;
            }}
            renderItem={({item, index}) => (
              <View
                style={{
                  paddingTop: 20,
                  flexDirection: 'row',
                  marginBottom: 10,
                  borderWidth: 2,
                  borderColor: '#009688',
                  borderRadius: 10,
                  backgroundColor: '#fafafa',
                }}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('DetailPage', {
                      mntnnm: item.mntnnm,
                      x: item.x,
                      y: item.y,
                      keyword: item.keyword,
                      hndfmsmtnslctnrson: item.hndfmsmtnslctnrson,
                    })
                  }>
                  <View
                    style={{
                      flexShrink: 0,
                      width: '100%',
                      paddingHorizontal: 20,
                      justifyContent: 'center',
                      overflow: 'hidden',
                    }}>
                    <Image
                      style={{zIndex: 5, width: 300, height: 150}}
                      source={{uri: item.mntnattchimageseq}}></Image>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'column',
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#009688',
                        fontWeight: 'bold',
                      }}>
                      {item.mntnnm}
                    </Text>
                    <Text style={{marginTop: 5, fontSize: 14, color: '#666'}}>
                      {truncate(item.hndfmsmtnslctnrson)}
                    </Text>
                    <View
                      style={{
                        marginTop: 25,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text style={{fontSize: 13, color: '#009688'}}>
                        자세히 보기
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}
    </Container>
  );
};

export default ListScreen;
