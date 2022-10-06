import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';

function Badge({name, image}) {
  //뱃지 이름을 위한 변수
  return (
    <View>
      {/*뱃지 이름*/}
      <View style={styles.btName}>
        <Text style={styles.btNameText}>{name}</Text>
      </View>
      {/*뱃지*/}
      <Image source={{uri: image}} style={styles.badge} />
      {/*뱃지 획득 여부*/}
      <Text style={styles.btProgress}>획득</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  btList: {
    flexDirection: 'column',
    marginTop: 20,
    justifyContent: 'space-around',
  },
  btName: {
    marginLeft: 10,
    alignItems: 'center',
    width: 70,
    backgroundColor: '#009688',
    borderRadius: 10,
  },
  btNameText: {
    textAlign: 'center',
    color: 'white',
  },
  btProgress: {
    textAlign: 'center',
  },
  badge: {
    marginTop: 5,
    alignItems: 'center',
    height: 90,
    width: 90,
    borderRadius: 50,
  },
});

export default Badge;
