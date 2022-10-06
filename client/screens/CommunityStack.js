import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SearchScreen from './SearchScreen';
import FreeWriteScreen from './Free/FreeWriteScreen';
import FreeDetail from './Free/FreeDetailScreen';
import QuestionWrite from './Question/QuestionWriteScreen';
import QuestionDetail from './Question/QuestionDetailScreen';
import CertificationDetail from './Certification/CertificationDetailScreen';
import CertificationWrite from './Certification/CertificationWriteScreen';
import RecruitDetail from './Recruit/RecruitDetailScreen';
import RecruitWrite from './Recruit/RecruitWriteScreen';
import FreeSearchScreen from './Free/FreeSearchScreen';
import Modify from './ModifyScreen';
const Stack = createNativeStackNavigator();

function CommunityStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Write"
        component={FreeWriteScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="QuestionWrite"
        component={QuestionWrite}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CertificationWrite"
        component={CertificationWrite}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RecruitWrite"
        component={RecruitWrite}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FreeDetail"
        component={FreeDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="QuestionDetail"
        component={QuestionDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CertificationDetail"
        component={CertificationDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RecruitDetail"
        component={RecruitDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FreeSearch"
        component={FreeSearchScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Modify"
        component={Modify}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default CommunityStack;
