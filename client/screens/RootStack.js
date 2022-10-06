import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTab from './MainTab';
import UserInfo from './UserInfoScreen';
import Login from './LoginScreen';
import Register from './RegisterScreen';
import SplashScreen from './SplashScreen';
import Keyword from './KeywordScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TransparentCircleButton from '../components/TransparentCircleButton';
import {StyleSheet, View, Alert, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import ListPage from './ListScreen';
import DetailPage from './DetailScreen';
import HelpPage from './HelpScreen';
import {BASE_URL} from '../config';

const Stack = createNativeStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Keyword"
        component={Keyword}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

function RootStack() {
  const navigation = useNavigation();
  const [userToken, setUserToken] = useState('');

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

  const onGoHelp = () => {
    navigation.navigate('HelpPage');
  };
  const onGoLogout = () => {
    var dataToSend = {
      token: userToken,
    };

    fetch(`${BASE_URL}/api/user/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    }).then(async res => {
      try {
        const jsonRes = await res.json();
        console.log(jsonRes);
        if (jsonRes.logoutSuccess === true) {
          //로그아웃 성공시
          AsyncStorage.removeItem('userData');

          Alert.alert('로그아웃이 완료되었습니다', '  ', [
            {text: '확인', onPress: () => navigation.navigate('SplashScreen')},
          ]);
        }
      } catch (err) {
        console.log(dataToSend);
        console.log(err);
      }
    });
  };
  const onGoUser = () => {
    navigation.navigate('UserInfo');
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        // Hiding header for Splash Screen
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainTab"
        component={MainTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Auth"
        component={Auth}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ListPage"
        component={ListPage}
        options={{
          headerLeft: () => (
            <View style={styles.buttons}>
              <TransparentCircleButton
                name="warning"
                color="red"
                onPress={onGoHelp}
              />
            </View>
          ),
          title: '산목록',
          headerTitleAlign: 'center',
          headerRight: () => (
            <View style={styles.buttons}>
              <TransparentCircleButton
                name="person"
                color="#009688"
                onPress={onGoUser}
              />
            </View>
          ),

          tabBarIcon: ({color, size}) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Stack.Screen
        name="DetailPage"
        component={DetailPage}
        options={{
          headerLeft: () => (
            <View style={styles.buttons}>
              <TransparentCircleButton
                name="warning"
                color="red"
                onPress={onGoHelp}
              />
            </View>
          ),
          title: '산 상세페이지',
          headerTitleAlign: 'center', 
          headerRight: () => (
            <View style={styles.buttons}>
              <TransparentCircleButton
                name="person"
                color="#009688"
                onPress={onGoUser}
              />
            </View>
          ),

          tabBarIcon: ({color, size}) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Stack.Screen
        name="HelpPage"
        component={HelpPage}
        options={{
          headerLeft: () => (
            <View style={styles.buttons}>
              <TransparentCircleButton
                name="warning"
                color="red"
                onPress={onGoHelp}
              />
            </View>
          ),
          title: '구조요청',
          headerTitleAlign: "center", 
          tabBarIcon: ({color, size}) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />

      <Stack.Screen
        name="UserInfo"
        component={UserInfo}
        options={{
          headerLeft: () => (
            <View style={styles.buttons}>
              <TransparentCircleButton
                name="warning"
                color="red"
                onPress={onGoHelp}
              />
            </View>
          ),
          title: '내정보',
          headerTitleAlign: 'center',
          headerRight: () => (
            <View style={styles.buttons}>
              <TransparentCircleButton
                name="logout"
                color="#009688"
                onPress={onGoLogout}
              />
            </View>
          ),

          tabBarIcon: ({color, size}) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    zIndex: 0,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default RootStack;
