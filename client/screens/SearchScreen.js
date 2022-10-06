import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FreeScreen from './Free/FreeScreen';
import QuestionScreen from './Question/QuestionScreen';
import CertificationScreen from './Certification/CertificationScreen';
import RecruitScreen from './Recruit/RecruitScreen';

const Tab = createMaterialTopTabNavigator();

function SearchScreen() {
  return (
    <Tab.Navigator initialRouteName="Free">
      <Tab.Screen
        name="free"
        component={FreeScreen}
        options={{
          headerTitleAlign: 'center',
          title: '자유게시판',
          headerBackVisible: false,
        }}
      />
      <Tab.Screen
        name="question"
        component={QuestionScreen}
        options={{
          headerTitleAlign: 'center',
          title: '질문게시판',
          headerBackVisible: false,
        }}
      />
      <Tab.Screen
        name="certify"
        component={CertificationScreen}
        options={{
          headerTitleAlign: 'center',
          title: '인증게시판',
          headerBackVisible: false,
        }}
      />
      <Tab.Screen
        name="recruit"
        component={RecruitScreen}
        options={{
          headerTitleAlign: 'center',
          title: '모집게시판',
          headerBackVisible: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default SearchScreen;
