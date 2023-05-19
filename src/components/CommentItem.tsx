import React, {useCallback, useState} from 'react';
import {Text, View, Pressable, StyleSheet, Modal} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {MessageStackNavigationProp} from '../navigations/MessageNavigation';
import {useNavigation} from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

type ItemProps = {
  incr: number;
  c_content: string;
  user_name: string;
  like: number;
};

const CommentItem = ({
  item,
  likeComment,
}: {
  item: ItemProps;
  likeComment: Function;
}) => {
  const [showProfile, setShowProfile] = useState(false);
  const userID = useSelector((state: RootState) => state.user.id);
  const navigation = useNavigation<MessageStackNavigationProp>();

  return (
    <Pressable style={styles.eachComment}>
      <View style={styles.commentProfile}>
        {/* setProfile(item.user_name) */}
        <Pressable
          style={styles.profile}
          onPress={() => {
            setShowProfile(true);
          }}
        />
        <View style={styles.commentContent}>
          <Text style={styles.commentContentIDTxt}>{item.user_name}</Text>
          <Text style={styles.commentContentBodyTxt}>{item.c_content}</Text>
        </View>
      </View>
      <View style={styles.commentInfo}>
        {/* onPress시 incr이용해서 like 눌러주는 기능 + axios get 해서 댓글 추천 수 새로고침하는 기능*/}
        <Pressable
          style={styles.recommend}
          onPress={() => likeComment(item.incr)}>
          <View style={styles.thumb}>
            <FontAwesomeIcon name="thumbs-up" size={28} color="#DAE2D8" />
            <Text style={styles.recommendNum}>{item.like}</Text>
          </View>
        </Pressable>
        <View style={styles.thumb}>
          <FontAwesome5Icon name="caret-down" size={40} color="#DAE2D8" />
          <Text style={{color: '#B7CBB2'}}>답글</Text>
        </View>
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
              }}
            />
            <Text style={styles.modalID}>{item.user_name}</Text>
            <Pressable
              style={styles.modalBtn}
              onPress={() =>
                navigation.navigate('MessageDetail', {
                  me: userID,
                  you: item.user_name,
                })
              }>
              {/* navigate할때 전달해주는 정보 수정 필요! roomID 찾아보고 있으면 string으로 전달해줘야함 (없으면 만들면서 전달) */}
              <Text style={styles.modalBtnTxt}>쪽지 보내기</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </Pressable>
  );
};

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
    width: '60%',
  },
  commentContentIDTxt: {
    fontSize: 11,
  },
  commentContentBodyTxt: {
    fontSize: 14,
  },
  commentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumb: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  recommend: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recommendNum: {
    color: '#B7CBB2',
    fontSize: 13,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  postTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  postProfile: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'black',
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'black',
    top: 1,
  },
  postHeaderTxt: {
    fontSize: 17,
    marginLeft: 20,
    width: '85%',
  },
  postContent: {
    paddingVertical: 10,
    fontSize: 16,
  },
  comment: {
    paddingHorizontal: 10,
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

export default CommentItem;
