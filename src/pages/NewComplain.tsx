import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useState} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Pressable,
  Modal,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ComplainStackParamList} from '../navigations/ComplainNavigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import CheckIcon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import Config from 'react-native-config';
import {useSelector} from 'react-redux';
import {RootState} from '../store';

type ComplainScreenProps = NativeStackScreenProps<
  ComplainStackParamList,
  'NewComplain'
>;

const NewComplain = ({navigation}: ComplainScreenProps) => {
  const ComplainData = ['도전', '노하우', '쪽지', '내 정보', '기타 문의'];
  const [ComplainSelected, setComplainSelected] = useState<number | null>(null);
  const [title, Settitle] = useState('');
  const [content, SetContent] = useState('');
  const [showModal, setShowModal] = useState(false);

  const onChangeTitle = useCallback((text: string) => {
    Settitle(text);
  }, []);
  const onChangeContent = useCallback((text: string) => {
    SetContent(text);
  }, []);
  const writeDone = useCallback(() => {
    setShowModal(true);
  }, []);

  const userID = useSelector((state: RootState) => state.user.id);

  const upload = async () => {
    await axios.post(`${Config.API_URL}/settings/inquiry`, {
      id: userID,
      is_faq: 'F',
      title: title,
      content: content,
      iid: ComplainSelected,
    });
    navigation.goBack();
  };

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView style={styles.entire}>
        <View>
          <View>
            <TextInput
              style={styles.ComplainTitle}
              placeholder="글의 제목"
              placeholderTextColor="#B7CBB2"
              multiline={true}
              value={title}
              onChangeText={onChangeTitle}
              maxLength={100}
            />
          </View>
          <SelectDropdown
            data={ComplainData}
            onSelect={(_selectedItem, index) => {
              setComplainSelected(index);
            }}
            defaultButtonText="문의 종류"
            defaultValue={0}
            buttonTextAfterSelection={(selectedItem, _index) => {
              return selectedItem;
            }}
            buttonStyle={styles.listBt}
            buttonTextStyle={styles.ComplainList}
            renderDropdownIcon={() => {
              return (
                <FontAwesome5Icon name="caret-down" size={30} color="#DAE2D8" />
              );
            }}
            dropdownOverlayColor="transparent"
            rowStyle={styles.RowSt}
            rowTextStyle={styles.RowTxtSt}
          />
        </View>

        <View style={styles.board}>
          <TextInput
            style={styles.contentInput}
            placeholder="내용을 입력하세요"
            placeholderTextColor="#B7CBB2"
            multiline={true}
            value={content}
            onChangeText={onChangeContent}
            maxLength={5000}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <Pressable style={styles.complete} onPress={writeDone}>
            <Text style={{color: '#346627'}}>문의 작성</Text>
          </Pressable>
        </View>
        <Modal transparent={true} visible={showModal}>
          <Pressable style={styles.modalBG} onPress={() => setShowModal(false)}>
            <View style={styles.modal}>
              <View style={styles.modalHead}>
                <CheckIcon
                  name="check-circle"
                  size={50}
                  color="#F6DD55"
                  style={styles.modalImg}
                />
                <Text style={styles.modalTextHeader}>
                  문의 작성을 완료하시겠습니까?
                </Text>
              </View>
              <View style={styles.Choose}>
                <Pressable style={styles.YesBt} onPress={upload}>
                  <Text style={styles.ChooseTxt}>예</Text>
                </Pressable>
                <Pressable
                  style={styles.NoBt}
                  onPress={() => setShowModal(false)}>
                  <Text style={styles.ChooseTxt}>아니요</Text>
                </Pressable>
              </View>
            </View>
          </Pressable>
        </Modal>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default NewComplain;

const styles = StyleSheet.create({
  entire: {
    flex: 1,
    backgroundColor: '#E7EBE4',
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 4,
  },
  ComplainTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 7,
    marginBottom: 5,
  },
  listBt: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 7,
    marginBottom: 5,
  },
  RowSt: {
    backgroundColor: '#B7CBB2',
    alignContent: 'space-around',
  },
  RowTxtSt: {
    color: 'white',
    textAlign: 'left',
  },
  ComplainList: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#B7CBB2',
    textAlign: 'left',
  },
  board: {
    minHeight: 450,
    borderRadius: 10,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  contentInput: {
    fontSize: 17,
    paddingHorizontal: 21,
    paddingTop: 10,
    paddingBottom: 5,
  },
  circle: {
    backgroundColor: '#B7CBB2',
    borderRadius: 27,
    height: 49,
    width: 49,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 19,
    right: 10,
  },
  complete: {
    backgroundColor: 'white',
    borderRadius: 7.5,
    height: 30,
    width: 160,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#346627',
    borderWidth: 1,
    marginTop: 8,
  },
  modalBG: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    width: 246,
    height: 181,
    backgroundColor: 'white',
    borderRadius: 30,
  },
  modalHead: {
    flex: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImg: {
    marginTop: 3,
  },
  modalTextHeader: {
    fontSize: 15,
    fontWeight: '700',
    color: 'black',
    marginVertical: 10,
  },
  modalText: {
    fontSize: 9,
    color: '#8D8D8D',
    paddingHorizontal: 25,
    textAlign: 'center',
  },
  Choose: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  NoBt: {
    width: '49.5%',
    backgroundColor: '#346627',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 30,
  },
  YesBt: {
    width: '49.5%',
    backgroundColor: '#346627',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
  },
  ChooseTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
});
