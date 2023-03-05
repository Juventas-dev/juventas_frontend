import React, {useCallback, useState, useEffect} from 'react';
import {View, Text, FlatList, Pressable, TextInput} from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
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

function Message() {
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
    <View>
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
    </View>
  );
}
export default Message;
