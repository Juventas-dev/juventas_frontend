import React from 'react';
import {Text, View, Pressable, StyleSheet} from 'react-native';
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
  return (
    <Pressable style={styles.eachComment}>
      <View style={styles.commentProfile}>
        <Pressable style={styles.profile} />
        <View style={styles.commentContent}>
          <Text style={styles.commentContentIDTxt}>{item.user_name}</Text>
          <Text style={styles.commentContentBodyTxt}>{item.c_content}</Text>
        </View>
      </View>
      <View style={styles.commentInfo}>
        {/* onPress시 incr이용해서 like 눌러주는 기능 */}
        <Pressable
          style={styles.recommend}
          onPress={() => likeComment(item.incr)}>
          <Text style={styles.recommendNum}>{item.like}</Text>
          <FontAwesomeIcon
            name="star"
            size={28}
            color="#DAE2D8"
            style={styles.commentIcon}
          />
        </Pressable>
        <FontAwesome5Icon
          name="caret-down"
          size={40}
          color="#DAE2D8"
          style={styles.commentIcon}
        />
      </View>
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
});

export default CommentItem;
