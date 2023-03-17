import React, {useCallback, useState, useEffect} from 'react';
import { View, Text, SafeAreaView, FlatList, Pressable, StyleSheet, RefreshControl, TextInput } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MessageStackParamList } from '../navigations/MessageNavigation';
import MessageItem from '../components/MessageItem';
import axios from 'axios';
import Config from 'react-native-config';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import useSocket from '../hooks/useSockets';

type RoomProps = {
  incr: number;
  user_name: string;
  last_chat: string;
};

type ChatProps = {
  user_id: string;
  message: string;
  timestamp: string;
};

// const messageDATA = [
//   {
//   'incr':1,
//   'id': 'abd',
//   'content':'어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구',
//   'when':'오전 12:01'
//   },
//   {
//   'incr':2,
//   'id': 'abc',
//   'content':'샬라샤락',
//   'when':'오전 12:01'
//   },
//   {
//   'incr':3,
//   'id': '아이디',
//   'content':'콘텐츠',
//   'when':'오전 12:01'
//   },
// ];

const messageDATA = [
  {
  'incr':1,
  'user_name': 'abd',
  'last_chat':'어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구',
  },
  {
  'incr':2,
  'user_name': 'abc',
  'last_chat':'샬라샤락',

  },
  {
  'incr':3,
  'user_name': '아이디',
  'last_chat':'콘텐츠',
  },
];

type MessageScreenProps = NativeStackScreenProps<
  MessageStackParamList,
  'Message'
>;

function Message({navigation}: MessageScreenProps) {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const userID = useSelector((state: RootState) => state.user.id);
  const [socket, disconnect] = useSocket();
  const [roomlist, setRoomlist] = useState<RoomProps[]>([]);
  const [roomID, setRoomID] = useState('');
  const [myMessage, setMyMessage] = useState('');
  const [chats, setChats] = useState<ChatProps[]>([]);

  const onChangeMessage = useCallback((text: string) => {
    setMyMessage(text);
  }, []);

  useEffect(() => {
    const getRoomlist = async () => {
      const response = await axios.get(
        `${Config.API_URL}/message/roomlist?id=${userID}`,
      );
      setRoomlist(response.data.roomlist);
      console.log(response.data.roomlist);
    };
    getRoomlist();
  }, []);

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

  const onLeave = () => {
    socket?.emit('leave room', roomID);
    setRoomID('');
  };

  return (
    <SafeAreaView style={styles.entire}>
      {roomID === '' ? (
        <FlatList
          data={roomlist}
          renderItem={({item}) => (
            <Pressable onPress={() => setRoomID(String(item.incr))}>
              <Text>
                {item.user_name} {item.last_chat}
              </Text>
            </Pressable>
          )}
          keyExtractor={Item => String(Item.incr)}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <View>
          <Text>{roomID}</Text>
          <FlatList
            data={chats}
            renderItem={({item}) => (
              <Text>
                {item.user_id}: {item.message}, {item.timestamp}
              </Text>
            )}
            keyExtractor={Item => Item.timestamp}
          />
          <TextInput onChangeText={onChangeMessage} value={myMessage} />
          <Pressable onPress={onSend}>
            <Text>전송</Text>
          </Pressable>
          <Pressable onPress={onLeave}>
            <Text>나가기</Text>
          </Pressable>
        </View>
      )}
      {/* <FlatList
        data={messageDATA}
        renderItem={({item}) => <MessageItem item={item} />}
        keyExtractor={Item => String(Item.incr)}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      /> */}
    </SafeAreaView>
  );
}
export default Message;

const styles = StyleSheet.create({
  entire:{
    backgroundColor: 'white',
    flex:1
  },
});