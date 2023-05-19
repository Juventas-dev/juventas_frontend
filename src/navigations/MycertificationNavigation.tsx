import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import MyCertification from '../pages/MyCertification';
import CertificationContent from '../pages/CertificationContent';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export type CertificationtStackParamList = {
  MyCertification: undefined;
  CertificationContent: undefined;
};

export type CertificationStackNavigationProp =
  NativeStackNavigationProp<CertificationtStackParamList>;

const Stack = createNativeStackNavigator<CertificationtStackParamList>();

export default function AllQuestNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyCertification"
        component={MyCertification}
        options={{
          headerBackTitle: '뒤로',
          headerShadowVisible: false,
          headerStyle: {backgroundColor: '#E7EBE4'},
          headerTitleAlign: 'center',
          headerTitle: '도전 모음',
          headerTintColor: '#346627',
          headerTitleStyle: {fontSize: 22, fontWeight: '800'},
          headerRight: () => (
            <FontAwesome5Icon name="bell" size={35} color="#346627" />
          ),
        }}
      />
      <Stack.Screen
        name="CertificationContent"
        component={CertificationContent}
        options={{
          headerBackTitle: '뒤로',
          headerShadowVisible: false,
          headerStyle: {backgroundColor: '#E7EBE4'},
          headerTitleAlign: 'center',
          headerTitle: '도전 모음',
          headerTintColor: '#346627',
          headerTitleStyle: {fontSize: 22, fontWeight: '800'},
        }}
      />
    </Stack.Navigator>
  );
}
