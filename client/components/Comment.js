import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function Comment() {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        backgroundColor: '#ffffff',
        marginHorizontal: 10,
      }}>
      <View style={{flex: 1, height: 40}}>
        <TextInput></TextInput>
      </View>
      <View
        style={{
          flexShrink: 0,
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#eee',
        }}>
        <Icon name="insert-comment" size={20} color="#9e9e9e" />
      </View>
    </View>
  );
}

export default Comment;
