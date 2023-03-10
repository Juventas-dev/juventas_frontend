import React, {useCallback, useState, useEffect} from 'react';
import { View, Text, SafeAreaView, FlatList, Pressable, StyleSheet, RefreshControl, TextInput } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MessageStackParamList } from '../navigations/MessageNavigation';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';


const messageDATA = [
  {
  'incr':1,
  'who': 'me',
  'content':'어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구구저쩌구어쩌구저쩌구구저쩌구어쩌구저쩌구구저쩌구어쩌구저쩌구구저쩌구어쩌구저쩌구',
  'when':'오전 12:01'
  },
  {
  'incr':2,
  'who': 'me',
  'content':'샬라샤락',
  'when':'오전 12:01'
  },
  {
  'incr':3,
  'who': 'you',
  'content':'콘텐츠콘텐츠콘텐츠콘텐츠콘텐츠콘텐츠콘텐츠콘텐츠콘텐츠콘텐츠콘텐츠콘텐츠콘텐츠콘텐츠콘텐츠콘텐츠콘텐츠콘텐츠콘텐츠콘텐츠콘텐츠콘텐츠콘텐츠콘텐츠',
  'when':'오전 12:01'
  },
];

type MessageDetailScreenProps = NativeStackScreenProps<
  MessageStackParamList,
  'MessageDetail'
>;

type ItemProps = {
  incr: number;
  who: string;
  content: string;
  when: string;
};

const MessageDetailItem = ({
  item,
}: {
  item: ItemProps;
}) => {
  return (
		<View style={styles.eachMessage}>
			{(item.who === 'me') && <View style={{flex:1, height: 5}}></View>}
			<View style={(item.who === 'me') ? styles.sendByMe : styles.sendByYou}>
					<Text style={(item.who === 'me') ? styles.sendByMeTxt : styles.sendByYouTxt}>{item.content}</Text>
			</View>
			{(item.who === 'you') && <View style={{flex:1, height: 5}}></View>}
		</View>
  );
};

function MessageDetail({route}: MessageDetailScreenProps) {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  const myID = route.params.me;
  const yourID = route.params.you;
	const [messageValue, setMessageValue] = useState('');

  const onChangeMessage = useCallback((text: string) => {
    setMessageValue(text);
  }, []);

	const sendMessage = useCallback(() => {
    const sendMessageWait = async () => {
      try {
        
      } catch (error) {
        
      }
    };
    sendMessageWait();
  }, [messageValue]);

  return (
    <SafeAreaView style={styles.entire}>
      <FlatList
				data={messageDATA}
				renderItem={({item}) => (
					<MessageDetailItem item={item} />
				)}
				keyExtractor={Item => String(Item.incr)}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			/>
			<Text>{myID}</Text>
			<Text>{yourID}</Text>

			<View style={styles.myMessage}>
        <Pressable style={styles.cameraBtn}>
				<FontAwesomeIcon
						name="camera"
						size={20}
						color={'white'}
					/>
				</Pressable>
        <TextInput
          style={styles.myMessageContent}
          onChangeText={onChangeMessage}
          onSubmitEditing={sendMessage}
        />
        <Pressable onPress={sendMessage} style={styles.sendBtn}>
          <Text style={styles.sendBtnTxt}>전송</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
export default MessageDetail;

const styles = StyleSheet.create({
	entire:{
		backgroundColor: 'white',
		flex: 1,
	},
	eachMessage:{
		flexDirection: 'row',
		marginTop: 10
	},
  sendByMe:{
		backgroundColor: '#346627',
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'flex-end',
		marginTop: 5,
		marginRight: 15,
		marginLeft: 150,
		padding: 9
	},
	sendByYou:{
		backgroundColor: '#EBEFEA',
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'flex-end',
		marginTop: 5,
		marginRight: 150,
		marginLeft: 15,
		padding: 9

	},
	sendByMeTxt:{
		color: 'white',
		fontSize: 14,
		fontWeight: '500',
	},
	sendByYouTxt:{
		color: '#575757',
		fontSize: 14,
		fontWeight: '500'
	},
	myMessage: {
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
  cameraBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#B7CBB2',
		justifyContent: 'center',
		alignItems: 'center'
  },
  myMessageContent: {
    borderWidth: 1,
    borderColor: '#EBEFEA',
    borderRadius: 30,
    marginLeft: 10,
    flex: 1,
    fontSize: 14,
    color: '#878787',
    paddingHorizontal: 20,
  },
  sendBtn:{
    marginLeft: 10
  },
  sendBtnTxt:{
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 14,
    color: '#B7CBB2'
  },
});