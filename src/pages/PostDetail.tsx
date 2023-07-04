import React, {useCallback, useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
  Alert,
  RefreshControl,
  Modal,
  Image,
  ScrollView,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useRoute} from '@react-navigation/native';
import {BoardStackParamList} from '../navigations/BoardNavigation';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import CommentItem from '../components/CommentItem';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

type PostDetailScreenProps = NativeStackScreenProps<
  BoardStackParamList,
  'PostDetail'
>;
type PostItemProps = {
  is_qna: string;
  title: string;
  content: string;
  img_path: string;
  user_id: number;
  user_name: string;
  like: number;
  myrec: number;
};
type CommentItemProps = {
  incr: number;
  c_content: string;
  user_id: number;
  user_name: string;
  like: number;
  myrec: number;
  r_id: number;
};

function PostDetail({navigation, route}: PostDetailScreenProps) {
  const idCurrent = route.params.postID;

  const [postDATA, setPostDATA] = useState<PostItemProps>({
    is_qna: 'T',
    title: '',
    content: '',
    img_path: '',
    user_id: 0,
    user_name: '',
    like: 0,
    myrec: 0,
  });
  const [commentDATA, setCommentDATA] = useState<CommentItemProps[]>([]);
  const [RecommentDATA, setReCommentDATA] = useState<CommentItemProps[]>([]);
  const [commentValue, setCommentValue] = useState('');
  const [needReset, setNeedReset] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [writeRc, setWriteRc] = useState('T');
  const [rid, setRid] = useState(0);
  const textInputRef = useRef<TextInput>(null);
  const handleValueChange = (incr: number) => {
    setWriteRc('T');
    setRid(incr);
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };
  const onChangeComment = useCallback((text: string) => {
    setCommentValue(text);
  }, []);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  navigation.setOptions({
    headerTitle: postDATA.is_qna === 'T' ? '질문' : '노하우',
    headerStyle: {backgroundColor: '#DAE2D8'},
  });

  const getBoardAndRefresh = useCallback(() => {
    const getBoardRefresh = async () => {
      try {
        const response = await axios.get(
          `${Config.API_URL}/board/post/${idCurrent}?id='${userID}'`,
        );
        setPostDATA(response.data.post[0]);
        setMyPostRecommend(response.data.post[0].myrec);
        setCommentDATA(response.data.comment);
        setReCommentDATA(response.data.comment2);
        console.log(response.data.comment2);
      } catch (error) {
        const errorResponse = (error as AxiosError<{message: string}>).response;
        console.error(errorResponse);
        if (errorResponse) {
          return Alert.alert('알림', errorResponse.data?.message);
        }
      }
    };
    getBoardRefresh();
  }, []);

  useEffect(() => {
    getBoardAndRefresh();
  }, []);

  const userID = useSelector((state: RootState) => state.user.id);
  const [myPostRecommend, setMyPostRecommend] = useState(0);
  const recommendPost = useCallback(() => {
    if (myPostRecommend) {
      Alert.alert('이미 추천한 게시글입니다.');
    } else {
      setMyPostRecommend(1);
      console.log(userID);
      const recommendPostWait = async () => {
        try {
          const response = await axios.post(
            `${Config.API_URL}/board/likepost`,
            {
              id: userID,
              w_id: idCurrent,
            },
          );
          console.log(response.data);
          console.log(1);
          getBoardAndRefresh();
        } catch (error) {
          const errorResponse = (error as AxiosError<{message: string}>)
            .response;
          console.error(errorResponse);
          if (errorResponse) {
            return Alert.alert('알림', errorResponse.data?.message);
          }
        }
      };
      recommendPostWait();
    }
  }, [idCurrent, myPostRecommend, userID, getBoardAndRefresh]);

  const postComment = useCallback(() => {
    const postCommentWait = async () => {
      try {
        console.log(rid);
        const response = await axios.post(`${Config.API_URL}/board/comment`, {
          id: userID,
          w_id: idCurrent,
          r_id: rid,
          c_content: commentValue,
        });
        setNeedReset(!needReset);
        setCommentValue('');
        console.log(response.data);
        // 백엔드 문제 해결 후 프론트 : post하고 나서 textinput clear되는지 확인해야 함
        getBoardAndRefresh();
      } catch (error) {
        const errorResponse = (error as AxiosError<{message: string}>).response;
        console.error(errorResponse);
        if (errorResponse) {
          return Alert.alert('알림', errorResponse.data?.message);
        }
      }
    };
    postCommentWait();
  }, [commentValue, idCurrent, needReset, userID, rid, getBoardAndRefresh]);

  const likeComment = useCallback(
    (incr: number) => {
      const likeCommentWait = async () => {
        try {
          const response = await axios.post(
            `${Config.API_URL}/board/likecomment`,
            {
              id: userID,
              c_id: incr,
            },
          );
          setNeedReset(!needReset);
          console.log(response.data);
          getBoardAndRefresh();
        } catch (error) {
          const errorResponse = (error as AxiosError<{message: string}>)
            .response;
          console.error(errorResponse);
          if (errorResponse) {
            return Alert.alert('알림', errorResponse.data?.message);
          }
        }
      };
      likeCommentWait();
    },
    [needReset, userID, getBoardAndRefresh],
  );

  return (
    <SafeAreaView style={styles.entire}>
      <ScrollView>
        <View style={styles.post}>
          <View style={styles.postHeader}>
            <View style={styles.postTitle}>
              <Pressable
                style={styles.postProfile}
                onPress={() => {
                  setShowProfile(true);
                }}
              />
              <View style={styles.postProfileTxt}>
                <Text style={styles.postProfileNameTxt}>
                  {postDATA.user_name}
                </Text>
                <Text style={styles.postHeaderTxt}>{postDATA.title}</Text>
              </View>
            </View>
            <Pressable onPress={recommendPost} style={styles.like}>
              <FontAwesomeIcon
                name="thumbs-up"
                size={40}
                color={myPostRecommend ? '#1F6733' : '#DAE2D8'}
              />
              <Text style={styles.likeTxt}>{postDATA.like}</Text>
            </Pressable>
          </View>
          <View style={styles.postContent}>
            <Text style={{color: '#4C4D4C'}}>{postDATA.content}</Text>
          </View>
        </View>

        <View style={styles.comment}>
          <FlatList
            data={commentDATA}
            renderItem={({item}) => (
              <CommentItem
                items={item}
                likeComment={likeComment}
                onValueChange={handleValueChange}
                writeRc={writeRc}
                recommentData={RecommentDATA}
              />
            )}
            keyExtractor={Item => String(Item.incr)}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
      </ScrollView>
      <View style={styles.myComment}>
        <Pressable style={styles.myProfile} />
        <TextInput
          value={commentValue}
          ref={textInputRef}
          onBlur={() => {
            setWriteRc('F');
            console.log('**');
          }}
          style={styles.myCommentContent}
          onChangeText={onChangeComment}
          placeholder="댓글을 입력하세요"
          onSubmitEditing={postComment}
          multiline={true}
        />
        <Pressable onPress={postComment} style={styles.commentBtn}>
          <Text style={styles.commentBtnTxt}>입력</Text>
        </Pressable>
      </View>
      <Modal transparent={true} visible={showProfile}>
        <Pressable
          style={styles.modalBG}
          onPress={() => {
            setShowProfile(false);
          }}>
          <View style={styles.modal}>
            <View
              style={{
                width: 130,
                height: 130,
                borderRadius: 70,
                backgroundColor: 'black',
              }}
            />
            <Text style={styles.modalID}>{postDATA.user_name}</Text>
            <Pressable
              style={styles.modalBtn}
              onPress={async () => {
                const response = await axios.post(
                  `${Config.API_URL}/message/makeroom`,
                  {
                    id: userID,
                    you: postDATA.user_id,
                  },
                );
                console.log(response?.data.roomlist[0].incr);
                navigation.navigate('MessageDetail', {
                  incr: response?.data.roomlist[0].incr,
                });
              }}>
              <Text style={styles.modalBtnTxt}>쪽지 보내기</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

export default PostDetail;

const styles = StyleSheet.create({
  eachComment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  commentContent: {
    paddingHorizontal: 10,
  },
  commentProfile: {
    flexDirection: 'row',
    width: '80%',
  },
  commentContentIDTxt: {
    fontSize: 11,
    color: '#5F5D5D',
  },
  commentContentBodyTxt: {
    fontSize: 14,
    color: '#878787',
  },
  commentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recommend: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recommendNum: {
    color: '#B7CBB2',
    fontSize: 20,
  },
  commentIcon: {
    marginLeft: 15,
    marginRight: 5,
  },
  entire: {
    flex: 1,
    backgroundColor: 'white',
  },
  post: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  postTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    flex: 6,
  },
  like: {},
  postProfile: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'black',
    felx: 1,
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'black',
    top: 1,
  },
  postProfileTxt: {
    flex: 5,
  },
  postProfileNameTxt: {
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 10,
  },
  postHeaderTxt: {
    fontSize: 17,
    fontWeight: '800',
    marginLeft: 10,
    width: '85%',
    color: 'black',
  },
  likeTxt: {
    color: '#B7CBB2',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  postContent: {
    paddingVertical: 10,
    fontSize: 16,
  },
  comment: {
    borderTopWidth: 1,
    borderTopColor: '#EBEFEA',
    marginBottom: 100,
  },
  myComment: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    height: 70,
    backgroundColor: 'white',
  },
  myProfile: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'black',
  },
  myCommentContent: {
    borderWidth: 1,
    borderColor: '#EBEFEA',
    borderRadius: 30,
    marginLeft: 10,
    flex: 1,
    fontSize: 14,
    color: '#878787',
    paddingHorizontal: 20,
  },
  commentBtn: {
    marginLeft: 10,
  },
  commentBtnTxt: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 14,
    color: '#B7CBB2',
  },
  modalBG: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    width: 300,
    height: 330,
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalID: {
    color: '#3D3C3C',
    fontWeight: '800',
    fontSize: 30,
    marginTop: 10,
  },
  modalBtn: {
    backgroundColor: '#346627',
    borderRadius: 30,
    width: 120,
    height: 30,
    marginTop: 20,
    justifyContent: 'center',
  },
  modalBtnTxt: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
  },
});
