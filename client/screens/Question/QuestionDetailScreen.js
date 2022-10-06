import React, {useState, useEffect} from 'react';
import {Pressable, StyleSheet, Text, Alert, View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {BASE_URL} from '../../config';
import Moidfy_DeleteModeModal from '../../components/Modify_DeleteModeModal';
import Comment from '../../components/Comment/Comment';
import CommentScreen from '../../components/Comment/CommentScreen';
import AsyncStorage from '@react-native-community/async-storage';

function QuestionDetailScreen({route}) {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const userDatas = await AsyncStorage.getItem('userData'); //로그인할 때 저장된 정보들 불러오기
        const saveduserDatas = JSON.parse(userDatas);
        setUserToken(saveduserDatas.token);
      } catch (e) {}
    }
    load();
  }, []);

  const log1 = route.params?.title;
  const log2 = route.params?.body;
  const log3 = route.params?.date;
  const log4 = route.params?.id;
  const log5 = route.params?.nickname;
  const log6 = route.params?.userImage;

  const [detailTitle, setDetailTitle] = useState(log1);
  const [detailBody, setDetailBody] = useState(log2);
  const [detailDate, setDetailDate] = useState(log3);
  const [detailId, setDetailId] = useState(log4);
  const [detailName, setDetailName] = useState(log5);
  const [detailUserImage, setDetailUserImage] = useState(log6);
  const [userToken, setUserToken] = useState('');

  const board = 'question';

  const onOpenProfile = () => {};

  const navigation = useNavigation();
  var dataToSend = {
    _id: detailId,
    token: userToken,
  };
  const onAskDelete = () => {
    Alert.alert(
      '삭제',
      '정말로 삭제하시겠습니까?',
      [
        {text: '취소', style: 'cancle'},
        {
          text: '삭제',
          onPress: () => {
            console.log(dataToSend);
            fetch(`${BASE_URL}/api/community/question/delete`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },

              body: JSON.stringify(dataToSend),
            }).then(async res => {
              try {
                const jsonRes = await res.json();
                console.log(jsonRes);
                console.log('delete free');
                navigation.pop();
              } catch (err) {
                console.log(err);
                console.log('사용자가 일치하지 않습니다');
              }
            });
          },
          style: 'destructive',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  return (
    <>
      <View style={styles.block}>
        <View style={[styles.head, styles.paddingBlock]}>
          <Pressable style={styles.profile} onPress={onOpenProfile}>
            <Image
              source={
                detailUserImage
                  ? {
                      uri: detailUserImage,
                    }
                  : require('../../Assets/images/user.png')
              }
              style={styles.avator}
            />
            <View>
              <Text style={styles.displayName}>{detailName}</Text>
              <Text style={styles.date}>
                {new Date(detailDate).toLocaleString()}
              </Text>
            </View>
          </Pressable>
          <>
            <View style={styles.iconButtonWrapper}>
              <Pressable
                style={({pressed}) => [
                  styles.iconButton,
                  Platform.OS === 'ios' &&
                    pressed && {
                      backgroundColor: '#efefef',
                    },
                ]}
                onPress={() => setModalVisible(true)}
                android_ripple={{color: '#ededed'}}>
                <Icon name="list" size={24} color="grey" />
              </Pressable>
            </View>
            <Moidfy_DeleteModeModal
              visible={modalVisible}
              onClose={() => setModalVisible(false)}
              onAskDelete={onAskDelete}
              modifyTitle={detailTitle}
              modifyBody={detailBody}
              modifyId={detailId}
              board={board}
            />
          </>
        </View>
        <View style={styles.paddingBlock}>
          <Text style={styles.displayTitle}>{detailTitle}</Text>
          <Text style={styles.description}>{detailBody}</Text>
        </View>
      </View>
      <Comment detailId={detailId} board={board} />
      <CommentScreen detailId={detailId} board={board} />
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
  },
  avator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ffffff',
  },
  buttonlist: {
    alignItems: 'flex-end',
  },
  paddingBlock: {
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  displayName: {
    lineHeight: 18,
    fontSize: 14,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  displayTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    color: 'black',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  date: {
    color: '#757575',
    fontSize: 12,
    marginLeft: 10,
  },
  iconButtonWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: 16,
  },
});

export default QuestionDetailScreen;
