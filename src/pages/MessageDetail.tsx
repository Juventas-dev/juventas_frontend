import React, {useCallback, useState, useEffect} from 'react';
import { View, Text, SafeAreaView, FlatList, Pressable, StyleSheet, RefreshControl, TextInput } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MessageStackParamList } from '../navigations/MessageNavigation';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import useSocket from '../hooks/useSockets';

type MessageDetailScreenProps = NativeStackScreenProps<
  MessageStackParamList,
  'MessageDetail'
>;

type ChatProps = {
  user_id: string;
  message: string;
  timestamp: string;
};

function MessageDetail({route}: MessageDetailScreenProps) {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  const [socket, disconnect] = useSocket();
  const roomID = route.params.incr;
  const [myMessage, setMyMessage] = useState('');
  const [chats, setChats] = useState<ChatProps[]>([]);

  useEffect(() => {
    if (socket && roomID !== '') {
      socket.emit('join room', roomID);
      socket.on('messages', results => setChats(results));
      socket.on('new message', (userId, message, timestamp) => {
        setChats([
          {user_id: userId, message: message, timestamp: timestamp},
          ...chats,
        ]);
      });
    }
  }, [roomID]);

  const onChangeMessage = useCallback((text: string) => {
    setMyMessage(text);
  }, []);

	const onSend = () => {
    socket?.emit('send message', userID, roomID, myMessage);
    setChats(prev => [
      {
        user_id: userID,
        message: myMessage,
        timestamp: new Date().toTimeString(),
      },
      ...prev,
    ]);
    setMyMessage('');
  };

  const userID = useSelector((state: RootState) => state.user.id);

  return (
    <SafeAreaView style={styles.entire}>
      <FlatList
       style={styles.chatBody}
				data={chats}
				renderItem={({item}) => (
					<View style={styles.eachMessages}>
            {(item.user_id === userID) && <View style={{flex:1, height: 5}}></View>}
            <View style={(item.user_id === userID) ? styles.sendByMe : styles.sendByYou}>
                <Text style={(item.user_id === userID) ? styles.sendByMeTxt : styles.sendByYouTxt}>{item.message}</Text>
            </View>
            {(item.user_id != userID) && <View style={{flex:1, height: 5}}></View>}
          </View>
				)}
				keyExtractor={Item => Item.timestamp}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			/>

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
          onSubmitEditing={onSend}
        />
        <Pressable onPress={onSend} style={styles.sendBtn}>
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
  chatBody:{
    flex:1,
    marginBottom: 80
  },
	eachMessages:{
		flexDirection: 'row',
		marginTop: 10,
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