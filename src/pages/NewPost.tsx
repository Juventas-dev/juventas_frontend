<<<<<<< HEAD
import React, {useState, useCallback, useEffect} from 'react';
=======
import React, {useState, useCallback} from 'react';
>>>>>>> fdc9cf66124221b54ebd0590195b18c3127a911f
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
} from 'react-native';
import {BoardStackParamList} from '../navigations/BoardNavigation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
<<<<<<< HEAD
// import MultipleImagePicker, {
//   ImageResults,
//   MediaType,
// } from '@baronha/react-native-multiple-image-picker';
=======
import MultipleImagePicker, {
  ImageResults,
  MediaType,
} from '@baronha/react-native-multiple-image-picker';
>>>>>>> fdc9cf66124221b54ebd0590195b18c3127a911f
import Config from 'react-native-config';
import {useSelector} from 'react-redux';
import {RootState} from '../store';

type BoardScreenProps = NativeStackScreenProps<BoardStackParamList, 'NewPost'>;

const NewPost = ({navigation}: BoardScreenProps) => {
<<<<<<< HEAD
  // const [categorySelected, setCategorySelected] = useState<number | null>(null);
  // const [filterSelected, setFilterSelected] = useState<number | null>(null);
  // const [images, setImages] = useState<ImageResults[]>([]);
  // const [questId, setQuestId] = useState('');
  // const [title, setTitle] = useState('');
  // const [content, setContent] = useState('');

  // const categoryDATA = ['건강', '여가', '학습', '관계'];
  // const filterDATA = ['노하우', 'QnA'];
  // const userID = useSelector((state: RootState) => state.user.id);

  // const onChangeQuest = useCallback((text: string) => {
  //   setQuestId(text);
  // }, []);
  // const onChangeTitle = useCallback((text: string) => {
  //   setTitle(text);
  // }, []);
  // const onChangeContent = useCallback((text: string) => {
  //   setContent(text);
  // }, []);

  // const selectImage = async () => {
  //   const response = await MultipleImagePicker.openPicker({
  //     mediaType: MediaType.IMAGE,
  //     maxSelectedAssets: 3,
  //     doneTitle: '완료',
  //     cancelTitle: '취소',
  //     selectedAssets: images,
  //   });
  //   setImages(response);
  // };

  // useEffect(() => {
  //   const upload = async () => {
  //     let temp;
  //     if (filterSelected === 1) {
  //       temp = 'T';
  //     } else {
  //       temp = 'F';
  //     }
  //     await axios.post(`${Config.API_URL}/board/post`, {
  //       id: userID,
  //       c_id: categorySelected,
  //       q_id: Number(questId),
  //       is_qna: temp,
  //       title: title,
  //       content: content,
  //     });
  //     navigation.goBack();
  //   };

  //   navigation.setOptions({
  //     headerRight: () => (
  //       <Pressable onPress={upload}>
  //         <Text style={styles.upLoad}>업로드</Text>
  //       </Pressable>
  //     ),
  //   });
  // }, [
  //   categorySelected,
  //   content,
  //   filterSelected,
  //   navigation,
  //   questId,
  //   title,
  //   userID,
  // ]);

  // useEffect(() => {}, [categorySelected, filterSelected]);

  return (
    <KeyboardAwareScrollView>
      {/* <SafeAreaView style={styles.Background}>
=======
  const [categorySelected, setCategorySelected] = useState<number | null>(null);
  const [filterSelected, setFilterSelected] = useState<number | null>(null);
  const [images, setImages] = useState<ImageResults[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const categoryDATA = ['건강', '여가', '학습', '관계'];
  const filterDATA = ['노하우', 'QnA'];
  const userID = useSelector((state: RootState) => state.user.id);

  const onChangeTitle = useCallback((text: string) => {
    setTitle(text);
  }, []);
  const onChangeContent = useCallback((text: string) => {
    setContent(text);
  }, []);

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

  const upload = async () => {
    await axios.post(`${Config.API_URL}/board/post`, {
      id: userID,
      c_id: categorySelected,
      q_id: 0,
      is_qna: filterSelected,
      title: title,
      content: content,
    });
    navigation.goBack();
  };

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView style={styles.Background}>
        <View style={styles.topContainer}>
          <Pressable style={styles.backBt} onPress={() => navigation.goBack()}>
            <Text style={styles.back}>뒤로</Text>
          </Pressable>
          <Text style={styles.titleHeader}>글쓰기</Text>
          <Pressable style={styles.upLoadBt} onPress={upload}>
            <Text style={styles.upLoad}>업로드</Text>
          </Pressable>
        </View>
>>>>>>> fdc9cf66124221b54ebd0590195b18c3127a911f
        <View>
          <SelectDropdown
            data={categoryDATA}
            onSelect={(_selectedItem, index) => {
              setCategorySelected(index);
            }}
            defaultButtonText="카테고리"
            defaultValue={0}
            buttonTextAfterSelection={(selectedItem, _index) => {
              return selectedItem;
            }}
            buttonStyle={styles.listBt}
            buttonTextStyle={styles.categoryList}
            renderDropdownIcon={() => {
              return (
                <FontAwesome5Icon
                  name="caret-down"
                  size={30}
                  color="#DAE2D8"
                  style={styles.categoryIcon}
                />
              );
            }}
            dropdownOverlayColor="transparent"
            rowStyle={styles.categoryList}
          />
          <SelectDropdown
            data={filterDATA}
            onSelect={(_selectedItem, index) => {
              setFilterSelected(index);
            }}
            defaultButtonText="필터"
            defaultValue={0}
            buttonTextAfterSelection={(selectedItem, _index) => {
              return selectedItem;
            }}
            buttonStyle={styles.listBt}
            buttonTextStyle={styles.categoryList}
            renderDropdownIcon={() => {
              return (
                <FontAwesome5Icon
                  name="caret-down"
                  size={30}
                  color="#DAE2D8"
                  style={styles.categoryIcon}
                />
              );
            }}
            dropdownOverlayColor="transparent"
            rowStyle={styles.categoryList}
          />
        </View>
        <View style={styles.board}>
<<<<<<< HEAD
          <Pressable
            android_ripple={{
              color: '#ffffff',
            }}
            style={styles.circle}
            onPress={selectImage}>
            <Icon name="camera-alt" color="white" size={24} />
          </Pressable>
          <TextInput
            style={styles.questInput}
            placeholder="퀘스트 번호를 입력하세요"
            placeholderTextColor="#829B89"
            multiline={false}
            value={questId}
            onChangeText={onChangeQuest}
            keyboardType="number-pad"
          />
          <TextInput
            style={styles.titleInput}
            placeholder="제목을 입력하세요"
            placeholderTextColor="#B7CBB2"
            multiline={true}
            value={title}
            onChangeText={onChangeTitle}
            maxLength={100}
          />
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
      </SafeAreaView> */}
=======
          <View style={styles.boardTitle}>
            <TextInput
              style={styles.titleInput}
              placeholder="제목을 입력하세요"
              placeholderTextColor="#B7CBB2"
              multiline={true}
              value={title}
              onChangeText={onChangeTitle}
            />
            <Pressable
              android_ripple={{
                color: '#ffffff',
              }}
              style={styles.circle}
              onPress={selectImage}>
              <Icon name="camera-alt" color="white" size={24} />
            </Pressable>
          </View>
          <View style={styles.contentBoard}>
            <TextInput
              style={styles.contentInput}
              placeholder="내용을 입력하세요"
              placeholderTextColor="#B7CBB2"
              multiline={true}
              value={content}
              onChangeText={onChangeContent}
            />
          </View>
        </View>
      </SafeAreaView>
>>>>>>> fdc9cf66124221b54ebd0590195b18c3127a911f
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  Background: {
    backgroundColor: '#F9FAF8',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
<<<<<<< HEAD
  upLoad: {
    color: '#1F6733',
    fontSize: 18,
    fontWeight: '700',
    marginRight: 10,
=======
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
>>>>>>> fdc9cf66124221b54ebd0590195b18c3127a911f
  },
  listBt: {
    width: 350,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 5,
  },
  categoryList: {
    fontSize: 18,
    color: '#B7CBB2',
    marginLeft: 10,
  },
  categoryIcon: {
    marginRight: 15,
  },
  categoryRow: {
    backgroundColor: 'white',
  },
<<<<<<< HEAD
  board: {
    minHeight: 570,
    width: 350,
    borderRadius: 10,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  questInput: {
    fontWeight: 'bold',
    fontSize: 12,
    paddingHorizontal: 21,
    paddingTop: 10,
    paddingBottom: 5,
  },
  titleInput: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingHorizontal: 21,
    paddingTop: 10,
    paddingBottom: 10,
  },
  contentInput: {
    fontSize: 17,
    paddingHorizontal: 21,
    paddingTop: 10,
    paddingBottom: 5,
=======
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
>>>>>>> fdc9cf66124221b54ebd0590195b18c3127a911f
  },
  circle: {
    backgroundColor: '#B7CBB2',
    borderRadius: 27,
<<<<<<< HEAD
    height: 49,
    width: 49,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 19,
    right: 10,
  },
});

export default NewPost;
=======
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 7,
    marginTop: 7,
  },
  imageBt: {},
});

export default NewPost;
>>>>>>> fdc9cf66124221b54ebd0590195b18c3127a911f
