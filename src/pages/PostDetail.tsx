import { SafeAreaView, Text, View, TextInput, FlatList, Pressable, StyleSheet, Alert, RefreshControl } from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { useRoute } from '@react-navigation/native';
import {RootStackParamList} from '../navigations/BoardNavigation';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import React, { useCallback, useState, useEffect } from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios, { AxiosError } from 'axios';
import Config from 'react-native-config';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

type PostDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'PostDetail'>;
type PostItemProps = {is_qna: string, title: string, content: string, img_path: string, user_name: string, like: number};
type CommentItemProps = {incr: number, c_content: string, user_name: string, like: number};

function PostDetail({navigation}: PostDetailScreenProps) {
	const idCurrent = useRoute().params.postID;
	// DATA에서 불러오기(임시)
	// const postInfo = DATA.filter(function(element){return element.id == idCurrent;})[0];

	const [postDATA, setPostDATA] = useState<PostItemProps>({is_qna: 'T', title: '', content: '', img_path: '', user_name: '', like: 0});
	const [commentDATA, setCommentDATA] = useState<CommentItemProps[]>([]);
	const [commentValue, setCommentValue] = useState('');
	const [needReset, setNeedReset] = useState(false);
	const onChangeComment = useCallback((text: string) => {setCommentValue(text);}, []);

	const [refreshing, setRefreshing] = useState(false);
	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
		setRefreshing(false);
		}, 1000);
	}, []);

	useEffect(() => {
    const getBoardAndRefresh = async () => {
      try {
        const response = await axios.get(`${Config.API_URL}/board/post/${idCurrent}`);
        setPostDATA(response.data.post[0]);
				console.log(postDATA);
				setCommentDATA(response.data.comment);
      } catch (error) {
        const errorResponse = (error as AxiosError<{message: string}>).response;
        console.error(errorResponse);
        if (errorResponse) {
          return Alert.alert('알림', errorResponse.data?.message);
        }
      }
    };
    getBoardAndRefresh();
  },[needReset, refreshing]);

	const userID = useSelector((state:RootState)=>state.user.id);
	const [myPostRecommend, setMyPostRecommend] = useState(false);
	const recommendPost = useCallback(() => {
		// 추천한 후 누르면 오류 발생!
		setMyPostRecommend(!myPostRecommend);
		console.log(userID);
		const recommendPostWait = async () => {
			try {
				const response = await axios.post(`${Config.API_URL}/board/likepost`, {
					id: userID,
					w_id: idCurrent,
				});
				console.log(response.data);
				console.log(1);
			} catch (error) {
				const errorResponse = (error as AxiosError<{message: string}>).response;
        console.error(errorResponse);
        if (errorResponse) {
          return Alert.alert('알림', errorResponse.data?.message);
        }
			}
		};
		recommendPostWait();
	}, []);

	const postComment = useCallback(() => {
		const postCommentWait = async () => {
			try {
				console.log(1);
				// c_date를 넣어줘야 할듯 그거 디폴트 값 없다고 백엔드 서버에서 에러남
				const response = await axios.post(`${Config.API_URL}/board/comment`, {
					id: userID,
					w_id: idCurrent,
					r_id: null,
					c_content: commentValue,
				});	
				setNeedReset(!needReset);
				console.log(response.data)
				// 백엔드 문제 해결 후 프론트 : post하고 나서 textinput clear되는지 확인해야 함
			} catch (error) {
				const errorResponse = (error as AxiosError<{message: string}>).response;
        console.error(errorResponse);
        if (errorResponse) {
          return Alert.alert('알림', errorResponse.data?.message);
        }
			}
		};
		postCommentWait();
	}, []);

	const likeComment = useCallback ((incr: number) => {
		const likeCommentWait = async () => {
			try {
				const response = await axios.post(`${Config.API_URL}/board/likecomment`, {
					id: userID,
					c_id: incr,
				});
				setNeedReset(!needReset);
				console.log(response.data)
			} catch (error) {
				const errorResponse = (error as AxiosError<{message: string}>).response;
        console.error(errorResponse);
        if (errorResponse) {
          return Alert.alert('알림', errorResponse.data?.message);
        }
			}
		};
		likeCommentWait();
	}, []);

	const Item = ({incr, c_content, user_name, like}: CommentItemProps) => (
    <Pressable style={styles.eachComment}>
		<View style={styles.commentProfile}>
			<Pressable style={styles.profile}></Pressable>
			<View style={styles.commentContent}>
				<Text style={styles.commentContentIDTxt}>{user_name}</Text>
				<Text style={styles.commentContentBodyTxt}>{c_content}</Text>
			</View>
		</View>
		<View style={styles.commentInfo}>
			{/* onPress시 incr이용해서 like 눌러주는 기능 */}
			<Pressable style={styles.recommend} onPress={() => likeComment(incr)}> 
				<Text style={styles.recommendNum}>{like}</Text>
				<FontAwesomeIcon
					name="star"
					size={28}
					color='#DAE2D8'
					style={styles.commentIcon}
				/>
			</Pressable>
			<FontAwesome5Icon
				name="caret-down"
				size={40}
				color='#DAE2D8'
				style={styles.commentIcon}
			/>
		</View>
	</Pressable>
  );

	return <SafeAreaView style={styles.entire}>
		<KeyboardAwareScrollView>
			<View style={styles.post}>
				<View style={styles.postHeader}>
					<View style={styles.postTitle}>
						<Pressable style={styles.postProfile}></Pressable>
						<Text style={styles.postHeaderTxt}>{postDATA.title}</Text>
					</View>
					<Pressable 
						onPress={recommendPost}>
							{/* 추천 수 올라가기 + 내가 추천 눌렀음을 저장 */}
						<FontAwesomeIcon
							name="thumbs-up"
							size={40}
							color={myPostRecommend ? '#1F6733' : '#DAE2D8'}
						/>
					</Pressable>
				</View>
				<View style={styles.postContent}>
					<Text>{postDATA.content}</Text>
				</View>
			</View>
			<View style={styles.comment}>
				<FlatList
					data={commentDATA}
					renderItem={({item}) => <Item incr={item.incr} c_content={item.c_content} user_name={item.user_name} like={item.like} />}
					keyExtractor={Item => String(Item.incr)}
        			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
				/>
			</View>
		</KeyboardAwareScrollView>
		<View style={styles.myComment}>
			<Pressable style={styles.myProfile}></Pressable>
			<TextInput style={styles.myCommentContent} onChangeText={onChangeComment} placeholder="댓글을 입력하세요" onSubmitEditing={postComment}></TextInput>
		</View>
	</SafeAreaView>
}

export default PostDetail;

const styles = StyleSheet.create({
	eachComment: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 10
	},
	commentContent:{
		paddingHorizontal: 10
	},
	commentProfile: {
		flexDirection: 'row',
		width: '60%'
	},
	commentContentIDTxt: {
		fontSize: 11,
	},
	commentContentBodyTxt: {
		fontSize: 14
	},
	commentInfo: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	recommend: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	recommendNum: {
		color: '#B7CBB2',
		fontSize: 20
	},
	commentIcon: {
		marginLeft: 15,
		marginRight: 5
	},
	entire: {
		flex: 1,
		backgroundColor: 'white'
	},
	post:{
		paddingHorizontal: 20,
		marginBottom: 20,
	},
	postHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 15
	},
	postTitle: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '80%'
	},
	postProfile: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: 'black'
	},
	profile: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: 'black',
		top: 1
	},
	postHeaderTxt: {
		fontSize: 17,
		marginLeft: 20,
		width: '85%'
	},
	postContent: {
		paddingVertical: 10,
		fontSize: 16
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
		backgroundColor: 'white'
	},
	myProfile: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: 'black'
	},
	myCommentContent: {
		borderWidth: 1,
		borderColor: '#EBEFEA',
		borderRadius: 30,
		marginLeft: 10,
		flex: 1,
		fontSize: 14,
		color: '#878787',
		paddingHorizontal: 20
	}
});