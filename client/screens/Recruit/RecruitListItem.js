import React from 'react';
import {Pressable, StyleSheet, Text, Platform, View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ko} from 'date-fns/locale';
import {format, formatDistanceToNow} from 'date-fns';

function formatDate(date) {
  const d = new Date(date);
  const now = Date.now();
  const diff = (now - d.getTime()) / 1000;

  if (diff < 60 * 1) {
    return '방금 전';
  }
  if (diff < 60 * 60 * 24 * 3) {
    return formatDistanceToNow(d, {addSuffix: true, locale: ko});
  }
  return format(d, 'PPP EEE p', {locale: ko});
}

function truncate(text) {
  const replaced = text.replace(/\n/g, ' ');
  if (replaced.length <= 100) {
    return replaced;
  }
  return replaced.slice(0, 100).concat('...');
}

function RecruitListItem({
  title,
  date,
  body,
  id,
  token,
  nickname,
  userImage,
  local,
  gender,
  people,
}) {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate('RecruitDetail', {
      title,
      date,
      body,
      id,
      token,
      nickname,
      userImage,
      local,
      gender,
      people,
    });
  };

  return (
    <Pressable
      style={({pressed}) => [
        styles.block,
        Platform.OS === 'ios' && pressed && {backgroundColor: '#efefef'},
      ]}
      android_ripple={{color: '#ededed'}}
      onPress={onPress}>
      <View style={styles.block}>
        <View style={[styles.head, styles.paddingBlock]}>
          <Pressable style={styles.profile}>
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
              <Text style={styles.date}>{formatDate(date)}</Text>
            </View>
          </Pressable>
        </View>

        <View style={styles.paddingBlock2}>
          <Text style={styles.displayTitle}>{title}</Text>
          <Text style={styles.keydescription}>
            {local === '도' ? '' : <Text>[{local}]</Text>}
            {gender === '자' ? '' : <Text>[{gender}]</Text>}
            {people === '명' ? '' : <Text>[{people}]</Text>}
          </Text>
          <Text style={styles.description}>{truncate(body)}</Text>
          <Text style={styles.id}>{id}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  block: {
    borderBottomWidth: 0.4,
    borderColor: '#bdbdbd',
  },
  avator: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },

  paddingBlock: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    backgroundColor: 'white',
  },
  paddingBlock2: {
    paddingHorizontal: 16,
    paddingVertical: 5,
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
    alignItems: 'center',
  },
  displayName: {
    lineHeight: 18,
    fontSize: 14,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  displayTitle: {
    color: '#263238',
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  keydescription: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
  },
  date: {
    color: '#757575',
    fontSize: 12,
    marginLeft: 10,
  },
  id: {
    height: 0,
    width: 0,
  },
});

export default RecruitListItem;
