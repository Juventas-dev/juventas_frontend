import React from 'react';
import {
  //createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../AppInner';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// const Stack = createNativeStackNavigator();

type KnowhowScreenProps = NativeStackScreenProps<RootStackParamList, 'Knowhow'>;

export default function Board({navigation}: KnowhowScreenProps) {
  return (
    <KeyboardAwareScrollView style={styles.Background}>
      <View style={styles.topContainer}>
        <Text style={styles.titleHeader}>노하우</Text>
        <Pressable /*onpress={}*/>
          <Text style={styles.upLoad}>업로드</Text>
        </Pressable>
        <Pressable>
          <Text style={styles.back}>뒤로</Text>
        </Pressable>
      </View>
      <View>
        <Pressable style={styles.listBt}>
          <Text style={styles.categoryList}>카테고리</Text>
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  Background: {
    backgroundColor: '#DAE2D8',
  },
  topContainer: {
    width: 356,
    height: 24,
  },
  titleHeader: {
    color: '#1F6733',
    fontSize: 22,
    textAlign: 'center',
  },
  upLoad: {
    color: '#1F6733',
    fontSize: 18,
    textAlign: 'right',
  },
  back: {
    color: '#1F6733',
    fontSize: 18,
    textAlign: 'left',
  },
  listBt: {
    width: 350,
    height: 40,
  },
  categoryList: {
    fontSize: 18,
    color: '#B7CBB2',
    textAlign: 'left',
  },
});

/*import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {Text} from 'react-native-paper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../AppInner';
import DismissKeyboardView from '../components/DismissKeyBoardView';

type QuestScreenProps = NativeStackScreenProps<RootStackParamList, 'Quest'>;

export default function Quest({navigation}: QuestScreenProps) {
  const onGo = () => {
    navigation.navigate('Knowhow');
  };
  return (
    <View>
      <Text>노하우</Text>
      <Button title="knowhow" onPress={onGo} />
    </View>
  );
}*/

//const styles = StyleSheet.create({});
