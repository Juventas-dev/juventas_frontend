import { SafeAreaView, Text, View, TextInput, FlatList, Pressable, StyleSheet } from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { useRoute } from '@react-navigation/native';
import {RootStackParamList} from '../navigations/BoardNavigation';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import React, { useCallback, useState } from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const DATA = [
	{
		id: '1234',
		c_id: '0',
		q_id: '0',
		Is_qna: 'F',
		title: '줄넘기 하는 법',
		content: '줄넘기는 이렇게!줄넘기는 이렇게!줄넘기는 이렇게!줄넘기는 이렇게!줄넘기는 이렇게!줄넘기는 이렇게!줄넘기는 이렇게!줄넘기는 이렇게!줄넘기는 이렇게!줄넘기는 이렇게!줄넘기는 이렇게!줄넘기는 이렇게!줄넘기는 이렇게!줄넘기는 이렇게!줄넘기는 이렇게!줄넘기는 이렇게!줄넘기는 이렇게!줄넘기는 이렇게!줄넘기는 이렇게!',
		img_path: '',
	},
	{
		id: '12345',
		c_id: '1',
		q_id: '0',
		Is_qna: 'F',
		title: '서핑보드 중심 잡기',
		content: '어려워요',
		img_path: '',
	},
	];

	const DATA_comment = [
		{
			id: '12',
			content: '줄넘기는 어떻게?줄넘기는 어떻게?줄넘기는 어떻게?줄넘기는 어떻게?줄넘기는 어떻게?줄넘기는 어떻게?줄넘기는 어떻게?줄넘기는 어떻게?줄넘기는 어떻게?',
			recommend: 3,
		},
		{
			id: '45',
			content: '어려워요어려워요어려워요어려워요어려워요어려워요어려워요어려워요어려워요어려워요어려워요어려워요어려워요어려워요어려워요어려워요어려워요어려워요어려워요어려워요어려워요어려워요어려워요어려워요어려워요어려워요어려워요어려워요',
			recommend: 5,
		},
		];

type PostDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'PostDetail'>;
type ItemProps = {id: string, content: string, recommend: number};

function PostDetail({navigation}: PostDetailScreenProps) {
	const idCurrent = useRoute().params.postID;
	// DATA에서 불러오기(임시)
	const postInfo = DATA.filter(function(element){return element.id == idCurrent;})[0];

	const [myPostRecommend, setMyPostRecommend] = useState(false);

	const Item = ({id, content, recommend}: ItemProps) => (
    <Pressable style={styles.eachComment}>
			<View style={styles.commentProfile}>
				<Pressable style={styles.profile}></Pressable>
				<View style={styles.commentContent}>
					<Text style={styles.commentContentIDTxt}>{id}</Text>
					<Text style={styles.commentContentBodyTxt}>{content}</Text>
				</View>
			</View>
			<View style={styles.commentInfo}>
				<Pressable style={styles.recommend}>
					<Text style={styles.recommendNum}>{recommend}</Text>
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
						<Text style={styles.postHeaderTxt}>{postInfo.title}</Text>
					</View>
					<Pressable 
						onPress={() => setMyPostRecommend(!myPostRecommend)}>
							{/* 추천 수 올라가기 + 내가 추천 눌렀음을 저장 */}
						<FontAwesomeIcon
							name="thumbs-up"
							size={40}
							color={myPostRecommend ? '#1F6733' : '#DAE2D8'}
						/>
					</Pressable>
				</View>
				<View style={styles.postContent}>
					<Text>{postInfo.content}</Text>
				</View>
			</View>
			<View style={styles.comment}>
				<FlatList
					data={DATA_comment}
					renderItem={({item}) => <Item id={item.id} content={item.content} recommend={item.recommend} />}
					keyExtractor={Item => Item.id}
				/>
			</View>
		</KeyboardAwareScrollView>
		<View style={styles.myComment}>
			<Pressable style={styles.myProfile}></Pressable>
			<TextInput style={styles.myCommentContent} placeholder="댓글을 입력하세요"></TextInput>
		</View>
	</SafeAreaView>
}

export default PostDetail;

const styles = StyleSheet.create({
	eachComment: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		// alignItems: 'center',
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