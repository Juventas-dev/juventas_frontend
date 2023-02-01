import React from 'react';
// import {StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {RootStackParamList} from '../../App';

const Stack = createNativeStackNavigator();

// type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export default function Board() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Board" component={Board} />
    </Stack.Navigator>
  );
}

// const styles = StyleSheet.create({});
