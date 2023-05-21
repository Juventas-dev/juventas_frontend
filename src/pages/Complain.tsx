import {SettingStackParamList} from '../navigations/SettingNavigation';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useCallback, useEffect, useState} from 'react';
import {ComplainStackParamList} from '../navigations/ComplainNavigation';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ComplainScreenProps = NativeStackScreenProps<
  ComplainStackParamList,
  'Complain'
>;

function Complain({navigation}: ComplainScreenProps) {
  const [faq, setFaq] = useState([{incr: 0, title: ''}]);
  const [isAnswered, setAnswered] = useState('');
  const [complain, setComplain] = useState([{incr: 0, title: '', answer: ''}]);
  const toComplainAnswer = useCallback(() => {
    navigation.navigate('ComplainAnswer');
  }, [navigation]);
  const toNewComplain = useCallback(() => {
    navigation.navigate('NewComplain');
  }, [navigation]);

  const setComplainIncr = useCallback((text: string) => {
    console.log(text);
    AsyncStorage.setItem('complain', text, () => {
      console.log('저장완료');
    });
  }, []);

  const checkAnswered = useCallback((text: string) => {
    console.log(text);
    if (text === '답변완료') {
      setAnswered('T');
    } else {
      setAnswered('F');
    }
  }, []);

  useEffect(() => {
    const getComplain = async () => {
      const response = await axios.get(`${Config.API_URL}/settings/inquiry`);
      console.log('^^');
      console.log(response.data.FAQ);
      setFaq(response.data.FAQ);
      console.log('**');
      console.log(faq);
      setComplain(response.data.inquiry);
    };
    getComplain();
  }, []);

  function Faq({Item}) {
    return (
      <Pressable
        style={styles.QuestionBoxFr}
        onPress={() => {
          setComplainIncr(String(Item.incr));
          navigation.navigate('ComplainAnswer');
        }}>
        <Text style={styles.QuestionTxt}>자주 묻는 질문{') '}</Text>
        <Text style={styles.QuestionTxt}>{Item.title}</Text>
      </Pressable>
    );
  }

  function ComplainContent({Item}) {
    console.log({Item});
    console.log(Item.answer);
    checkAnswered(Item.answer);

    console.log(isAnswered);
    return isAnswered === 'F' ? (
      <Pressable
        style={styles.QuestionBox}
        onPress={() => {
          setComplainIncr(String(Item.incr));
          navigation.navigate('ComplainAnswer');
        }}>
        <Text style={styles.QuestionTxt}>{Item.title}</Text>
      </Pressable>
    ) : (
      <Pressable
        style={styles.QuestionBox}
        onPress={() => {
          setComplainIncr(String(Item.incr));
          navigation.navigate('ComplainAnswer');
        }}>
        <Text style={styles.QuestionTxt}>{Item.title}</Text>
        <Text style={styles.answered}>{Item.answered}</Text>
      </Pressable>
    );
  }

  return (
    <SafeAreaView style={styles.entire}>
      <View style={{height: 150}}>
        <FlatList
          data={faq}
          keyExtractor={item => String(item.incr)}
          renderItem={({item}) => <Faq Item={item} />}
        />
      </View>
      <View>
        <FlatList
          data={complain}
          keyExtractor={item => String(item.incr)}
          renderItem={({item}) => <ComplainContent Item={item} />}
        />
      </View>
      <Pressable style={styles.newComplainBtn}>
        <FontAwesome5Icon
          name="pen-nib"
          size={30}
          color="white"
          onPress={toNewComplain}
        />
        <Text
          style={{
            color: 'white',
            fontSize: 10,
            fontWeight: 'bold',
            marginTop: 3,
          }}>
          문의 작성
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default Complain;

const styles = StyleSheet.create({
  entire: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 30,
  },
  QuestionBoxFr: {
    backgroundColor: '#346627',
    flexDirection: 'row',
    paddingLeft: 5,
    borderRadius: 5,
    height: 40,
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 10,
  },
  QuestionBox: {
    backgroundColor: '#B7CBB2',
    marginHorizontal: 10,
    flexDirection: 'row',
    paddingLeft: 5,
    borderRadius: 5,
    height: 40,
    alignItems: 'center',
    marginBottom: 10,
  },
  QuestionTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
  newComplainBtn: {
    backgroundColor: '#346627',
    width: 65,
    height: 65,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
