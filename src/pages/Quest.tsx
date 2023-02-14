import React from 'react';
import {
  createNativeStackNavigator,
  //createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  Button,
  PermissionsAndroid,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {RootStackParamList} from '../../AppInner';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// const Stack = createNativeStackNavigator();

type QuestScreenProps = NativeStackScreenProps<RootStackParamList, 'Quest'>;

export default function Board({navigation}: QuestScreenProps) {
  const showPicker = async () => {
    const grantedcamera = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'A Camera Permission',
        message: 'App needs access to your camera',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'Okay',
      },
    );
    const grantedstorage = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'A Camera Permission',
        message: 'App needs access to your camera',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'Okay',
      },
    );
    if (
      grantedcamera === PermissionsAndroid.RESULTS.GRANTED &&
      grantedstorage === PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('Camera & storage permission given');
    } else {
      console.log('Camera permission denied');
    }
  };
  return (
    <KeyboardAwareScrollView>
      <SafeAreaView style={styles.Background}>
        <View style={styles.topContainer}>
          <Pressable style={styles.backBt}>
            <Text style={styles.back}>뒤로</Text>
          </Pressable>
          <Text style={styles.titleHeader}>글쓰기</Text>
          <Pressable style={styles.upLoadBt} /*onpress={}*/>
            <Text style={styles.upLoad}>업로드</Text>
          </Pressable>
        </View>
        <View>
          <Pressable style={styles.listBt}>
            <Text style={styles.categoryList}>카테고리</Text>
          </Pressable>
          <Pressable style={styles.listBt}>
            <Text style={styles.categoryList}>퀘스트</Text>
          </Pressable>
        </View>
        <View style={styles.board}>
          <View style={styles.boardTitle}>
            <TextInput
              style={styles.titleInput}
              placeholder="제목을 입력하세요"
              placeholderTextColor="#B7CBB2"
              multiline={true}
            />
            <Pressable
              android_ripple={{
                color: '#ffffff',
              }}
              style={styles.circle}
              onPress={showPicker}>
              <Icon name="camera-alt" color="white" size={24} />
            </Pressable>
          </View>
          <View style={styles.contentBoard}>
            <TextInput
              style={styles.contentInput}
              placeholder="내용을 입력하세요"
              placeholderTextColor="#B7CBB2"
              multiline={true}
            />
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  Background: {
    backgroundColor: '#DAE2D8',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  topContainer: {
    height: 24,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
  },
  titleHeader: {
    flex: 10,
    color: '#1F6733',
    fontSize: 20,
    marginTop: 1,
    textAlign: 'center',
  },
  upLoadBt: {
    flex: 2,
    width: 70,
    heigth: 18,
    alignItems: 'center',
    marginTop: 3,
    marginRight: 7,
  },
  backBt: {
    flex: 2,
    alignItems: 'flex-end',
    marginTop: 3,
  },
  upLoad: {
    color: '#1F6733',
    fontSize: 18,
  },
  back: {
    color: '#1F6733',
    fontSize: 18,
  },
  listBt: {
    width: 350,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 5,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  categoryList: {
    fontSize: 18,
    color: '#B7CBB2',
    textAlign: 'left',
    marginLeft: 10,
  },
  /*
  filter: {
    flexDirection: 'column',
    alignItems: 'center',
  },*/
  board: {
    height: 572,
    width: 350,
    borderRadius: 10,
    flexDirection: 'column',
    backgroundColor: 'green',
  },
  boardTitle: {
    flex: 1.5,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  contentBoard: {
    flex: 13,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: 'white',
  },
  titleInput: {
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 20,
  },
  contentInput: {
    marginLeft: 5,
    fontSize: 17,
  },
  circle: {
    backgroundColor: '#B7CBB2',
    borderRadius: 27,
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 7,
    marginTop: 7,
  },
  imageBt: {},
});
