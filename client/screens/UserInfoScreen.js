import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import UserHeader from './user/UserHeader';
import ProgressBar from './user/ProgressBar';
import Badge from './userTab/BadgeTab';
import Writing from './userTab/WritingTab';
import Picture from './userTab/PictureTab';

const MenuTab = createMaterialTopTabNavigator();

function UserInfoScreen() {
  const tabBarOptions = {
    tabBarIndicatorStyle: '#009688',
    tabBarActiveTintColor: '#009688',
    tabBarInactiveTintColor: 'gray',
  };

  return (
    <>
      {/* UserHeader: 프로필 사진, 닉네임, 자기소개 */}
      <UserHeader />
      {/*뱃지 획득 진행률을 알 수 있는 진행바*/}
      <ProgressBar />
      {/* UserTab: 
                Badge - 뱃지 모은 현황 부분 
                Picture - 자신이 쓴 사진 후기 글을 볼 수 있는 부분
                Writing - 자신이 커뮤니티에 쓴 글을 볼 수 있는 부분
      */}
      <MenuTab.Navigator screenOptions={tabBarOptions}>
        <MenuTab.Screen name="Badge" component={Badge} />
        <MenuTab.Screen name="Picture" component={Picture} />
        <MenuTab.Screen name="Writing" component={Writing} />
      </MenuTab.Navigator>
    </>
  );
}

export default function () {
  return <UserInfoScreen />;
}
