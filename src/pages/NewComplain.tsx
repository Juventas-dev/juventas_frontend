import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useState} from 'react';
import {Text, TextInput, View, StyleSheet, Pressable} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ComplainStackParamList} from '../navigations/ComplainNavigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MultipleImagePicker, {
  ImageResults,
  MediaType,
} from '@baronha/react-native-multiple-image-picker';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

type ComplainScreenProps = NativeStackScreenProps<
  ComplainStackParamList,
  'NewComplain'
>;

const NewComplain = ({navigation}: ComplainScreenProps) => {
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
  const ComplainData = ['퀘스트', '노하우', '쪽지', '내 정보', '기타 문의'];
  const [ComplainSelected, setComplainSelected] = useState<number | null>(null);
  const [title, Settitle] = useState('');
  const onChangeTitle = useCallback((text: string) => {
    Settitle(text);
  }, []);
  const [content, SetContent] = useState('');
  const onChangeContent = useCallback((text: string) => {
    SetContent(text);
  }, []);
  return (
    <KeyboardAwareScrollView>
      <SafeAreaView style={styles.entire}>
        <View>
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

        <View style={styles.board}>
          <Pressable
            android_ripple={{
              color: '#ffffff',
            }}
            style={styles.circle}
            onPress={selectImage}>
            <Icon name="camera-alt" color="white" size={24} />
          </Pressable>
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
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default NewComplain;

const styles = StyleSheet.create({
  entire: {
    flex: 1,
    backgroundColor: '#F9FAF8',
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 4,
  },
  ComplainTitle: {
    fontWeight: 'bold',
    fontSize: 15,
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
    minHeight: 570,
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
});
