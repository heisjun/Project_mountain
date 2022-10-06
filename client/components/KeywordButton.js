import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

function KeywordButton() {
  return (
    <View style={{paddingHorizontal: 10, marginBottom: 20}}>
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
          <TouchableOpacity onPress={() => navigation.navigate('Testings')}>
            <View
              style={{
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                backgroundColor: '#eee',
              }}>
              <Text>#100대 명산</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{width: '33.33%', padding: 5}}>
          <TouchableOpacity onPress={() => navigation.navigate('Testings')}>
            <View
              style={{
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                backgroundColor: '#eee',
              }}>
              <Text>#겨울 산</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{width: '33.33%', padding: 5}}>
          <TouchableOpacity onPress={() => navigation.navigate('Testings')}>
            <View
              style={{
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                backgroundColor: '#eee',
              }}>
              <Text>#단풍이 예쁜</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{width: '33.33%', padding: 5}}>
          <TouchableOpacity onPress={() => navigation.navigate('Testings')}>
            <View
              style={{
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                backgroundColor: '#eee',
              }}>
              <Text>#난이도 하</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{width: '33.33%', padding: 5}}>
          <TouchableOpacity onPress={() => navigation.navigate('Testings')}>
            <View
              style={{
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                backgroundColor: '#eee',
              }}>
              <Text>#난이도 중</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{width: '33.33%', padding: 5}}>
          <TouchableOpacity onPress={() => navigation.navigate('Testings')}>
            <View
              style={{
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                backgroundColor: '#eee',
              }}>
              <Text>#난이도 상</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default KeywordButton;
