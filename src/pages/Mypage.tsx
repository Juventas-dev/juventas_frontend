import React, {useCallback, useState} from 'react';
import {View, Pressable, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MypageStackParamList} from '../navigations/MypageNavigation';
import {TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import MultipleImagePicker, {
  ImageResults,
  MediaType,
} from '@baronha/react-native-multiple-image-picker';

type MypageScreenProps = NativeStackScreenProps<MypageStackParamList, 'Mypage'>;

function Mypage({navigation}: MypageScreenProps) {
  const [images, setImages] = useState<ImageResults[]>([]);
  const selectImage = async () => {
    const response = await MultipleImagePicker.openPicker({
      mediaType: MediaType.IMAGE,
      maxSelectedAssets: 3,
      doneTitle: '완료',
      cancelTitle: '취소',
      selectedAssets: images,
    });
    setImages(response);
  };
  const toSetCategory = useCallback(() => {
    navigation.navigate('SetCategory');
  }, [navigation]);
  const toMyGrade = useCallback(() => {
    navigation.navigate('MyGrade');
  }, [navigation]);
  const toMyCertification = useCallback(() => {
    navigation.navigate('MyCertification');
  }, [navigation]);
  const toMyKnowhow = useCallback(() => {
    navigation.navigate('MyKnowhow');
  }, [navigation]);
  return (
    <SafeAreaView style={styles.entire}>
      <View style={styles.profile}>
        <View style={styles.Image}>
          <Pressable onPress={selectImage}>
            <Icon name="md-person-circle-outline" color="gray" size={70} />
          </Pressable>
        </View>
        <View style={styles.Name}>
          <Text style={styles.NameSt}>김연세</Text>
        </View>
        <View style={styles.Introduce}>
          <Text style={styles.IntroduceSt}>자기소개</Text>
        </View>
      </View>
      <View style={styles.grade}>
        <View style={styles.bar}>
          <Text style={styles.Txt}>다음등급:~</Text>
        </View>
      </View>
      <View style={styles.Ongoing}>
        <View style={styles.OngoingHead}>
          <Text style={styles.FontSt}>수행 중인 퀘스트</Text>
        </View>
        <View style={styles.QuestName}>
          <Text style={styles.Txt}>수행중인 퀘스트가 없습니다</Text>
        </View>
      </View>
      <View style={styles.Prefer}>
        <View style={styles.Head}>
          <Text style={styles.FontSt}>선호 카테고리</Text>
        </View>
        <View style={styles.CategoryName}>
          <View style={styles.CategoryBox1}>
            <Text style={styles.Txt}>등산</Text>
          </View>
          <View style={styles.CategoryBox2}>
            <Text style={styles.Txt}>일본어 공부</Text>
          </View>
          <View style={styles.CategoryBox3}>
            <Text style={styles.Txt}>공부</Text>
          </View>
        </View>
      </View>
      <Pressable style={styles.Modify}>
        <Text style={styles.ModifyBt} onPress={toSetCategory}>
          수정하기
        </Text>
      </Pressable>
      <View style={styles.Etc}>
        <View style={styles.EtcBox}>
          <View style={styles.Head}>
            <Text style={styles.FontSt}>이번달 인증률</Text>
          </View>
          <View style={styles.BoxCt}>
            <Text style={styles.Txt}>00%</Text>
          </View>
        </View>
        <View style={styles.EtcBox}>
          <View style={styles.Head}>
            <Text style={styles.FontSt}>대표 활동</Text>
          </View>
          <View style={styles.BoxCt}>
            <Text style={styles.Txt}>일본어 공부</Text>
          </View>
        </View>
        <View style={styles.EtcBox}>
          <View style={styles.Head}>
            <Text style={styles.FontSt}>활동 순위</Text>
          </View>
          <View style={styles.BoxCt}>
            <Text style={styles.Txt}>상위 00%</Text>
          </View>
        </View>
      </View>
      <View style={styles.Etc2}>
        <Pressable style={styles.Etc2Bt} onPress={toMyGrade}>
          <Text style={styles.FontSt}>등급보기</Text>
        </Pressable>
        <Pressable style={styles.Etc2Bt} onPress={toMyCertification}>
          <Text style={styles.FontSt}>인증보기</Text>
        </Pressable>
        <Pressable style={styles.Etc2Bt} onPress={toMyKnowhow}>
          <Text style={styles.FontSt}>내 노하우</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default Mypage;

const styles = StyleSheet.create({
  entire: {
    flex: 1,
    flexWrap: 'nowrap',
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  profile: {
    flex: 5,
  },
  Image: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    backgroundColor: 'yellow',
  },
  Name: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  NameSt: {
    color: '#3D3C3C',
    fontWeight: 'bold',
    fontSize: 20,
  },
  Introduce: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  IntroduceSt: {
    color: '#3D3C3C',
  },
  FontSt: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  grade: {
    flex: 1,
    justifyContent: 'center',
  },
  bar: {
    backgroundColor: '#F9FAF8',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Ongoing: {
    flex: 2.5,
    marginVertical: 5,
    flexDirection: 'column',
  },
  OngoingHead: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B7CBB2',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  QuestName: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAF8',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  Prefer: {
    flex: 2.5,
    marginVertical: 5,
  },
  Head: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B7CBB2',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  CategoryName: {
    flex: 1.5,
    flexDirection: 'row',
    backgroundColor: '#F9FAF8',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  CategoryBox1: {
    flex: 1,
    borderRightWidth: 2,
    borderRightColor: '#B7CBB2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  CategoryBox2: {
    flex: 0.8,
    borderRightWidth: 2,
    borderRightColor: '#B7CBB2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  CategoryBox3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Modify: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ModifyBt: {
    color: '#336627',
    textDecorationLine: 'underline',
  },
  Etc: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 5,
  },
  EtcBox: {
    width: 110,
    marginHorizontal: 5,
  },
  BoxCt: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAF8',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  Etc2: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  Etc2Bt: {
    backgroundColor: '#346627',
    borderRadius: 25,
    width: 110,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Txt: {
    fontWeight: 'bold',
    color: '#4C4D4C',
  },
});
