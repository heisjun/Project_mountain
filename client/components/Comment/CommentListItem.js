import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  Platform,
  View,
  Image,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {BASE_URL} from '../../config';

function CommentListItem({date, body, id, token, nickname, userImage, board}) {
  const navigation = useNavigation();

  var Commentdata = {
    nickname: nickname,
    Text: body,
    date: date,
    commentImage: userImage,
  };
  var dataToSend = {
    _id: id,
    comment: Commentdata,
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
            fetch(`${BASE_URL}/api/community/${board}/commentOut`, {
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
    <View style={styles.block}>
      <View style={[styles.head, styles.paddingBlock]}>
        <View style={styles.profile}>
          <Image
            source={
              userImage
                ? {
                    uri: userImage,
                  }
                : require('../../Assets/images/user.png')
            }
            style={styles.avator}
          />
          <View>
            <Text style={styles.displayName}>{nickname}</Text>
          </View>
        </View>
        <View style={styles.iconButtonWrapper}>
          <Pressable
            style={({pressed}) => [
              styles.iconButton,
              Platform.OS === 'ios' &&
                pressed && {
                  backgroundColor: '#efefef',
                },
            ]}
            onPress={onAskDelete}
            android_ripple={{color: '#ededed'}}>
            <Icon name="delete-forever" size={20} color="red" />
          </Pressable>
        </View>
      </View>

      <View style={styles.text}>
        <Text style={styles.description}>{body}</Text>
        <Text style={styles.date}>{new Date(date).toLocaleString()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    borderBottomWidth: 0.4,
    borderColor: '#bdbdbd',
  },
  avator: {
    width: 25,
    height: 25,
    borderRadius: 16,
  },

  paddingBlock: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: 'white',
  },
  text: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: 'white',
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  profile: {
    flexDirection: 'row',
  },
  displayName: {
    lineHeight: 18,
    fontSize: 16,
    marginLeft: 10,
    marginTop: 5,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 3,
    color: '#263238',
  },
  date: {
    color: '#757575',
    fontSize: 9,
  },
  id: {
    height: 0,
    width: 0,
  },
});

export default CommentListItem;
