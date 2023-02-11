import React, { useCallback, useState, useRef } from 'react';
import { View, Pressable, StyleSheet, TextInput, Text, FlatList } from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import {RootStackParamList} from '../navigations/BoardNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const DATA = [
  {
    id: '1234',
    c_id: '0',
    q_id: '0',
    Is_qna: 'F',
    title: '줄넘기 하는 법',
    content: '줄넘기는 이렇게!',
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

type SearchPostScreenProps = NativeStackScreenProps<RootStackParamList, 'SearchPost'>;
type ItemProps = {title: string, c_id:string, id: string};

function SearchPost({navigation}: SearchPostScreenProps) {
  const toBoard = useCallback(() => {navigation.pop();}, [navigation]);
	const SearchRef = useRef<TextInput | null>(null);
	const Item = ({title, c_id, id}: ItemProps) => (
    <Pressable style={styles.posting} onPress={() => navigation.navigate('PostDetail', {postID: id})}>
			<Text style={styles.postContentCategory} numberOfLines={1}>{c_id}</Text>
			<Text style={styles.postContentTitle} numberOfLines={2}>{title}</Text>
    </Pressable>
  );
	useFocusEffect(useCallback(() => {SearchRef.current?.focus();}, []));
  return (
    <SafeAreaView style={styles.entire}>
			<View style={styles.headerSearchingArea}>
				<View style={styles.headerSearch}>
					<FontAwesomeIcon
						name="search"
						size={22}
						color='#DAE2D8'
						style={styles.headerSearchIcon}
					/>
					<TextInput 
						style={styles.headerSearchInput} 
						placeholder="노하우 검색"
						placeholderTextColor={'#DAE2D8'}
						// onFocus={}
						ref={SearchRef}
						// onChangeText={onChangeSearch}
					/>
				</View>
				<Pressable 
					style={styles.headerSearchCancelBtn}
					onPress={toBoard}>
					<Text style={styles.headerSearchCancelBtnText}>취소</Text>
				</Pressable>
			</View>
			<FlatList
				data={DATA}
				renderItem={({item}) => <Item title={item.title} c_id={item.c_id} id={item.id} />}
				keyExtractor={Item => Item.id}
			/>
    </SafeAreaView>
    );
}

export default SearchPost;

const styles = StyleSheet.create({
	entire: {
		backgroundColor: 'white',
		flex: 1
	},
	headerSearchingArea: {
		flexDirection: 'row',
		paddingHorizontal: 15,
		alignItems: 'center',
		paddingVertical: 15,
		backgroundColor: '#F9FAF8'
	},
	headerSearch: {
		flexDirection: 'row',
		backgroundColor: '#EBEFEA',
		borderRadius: 10,
		alignItems: 'center',
		height: 40,
		flex: 4,
	},
	headerSearchIcon: {
		marginLeft: 15
	},
	headerSearchInput: {
		backgroundColor: 'transparent',
		color: '#1F6733',
		fontSize: 18,
		padding: 0,
		width: '88%',
		paddingLeft: 10
	},
	headerSearchCancelBtn: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
	headerSearchCancelBtnText: {
		color: '#1F6733',
		fontSize: 18
	},
	posting: {
    borderTopWidth: 1,
    borderTopColor: '#EBEFEA',
    height: 80,
    justifyContent: 'center',
		paddingLeft: 35
  },
  postContentCategory:{
    fontSize: 14,
    color: '#5F5D5D'
  },
  postContentTitle: {
    fontSize: 18,
    color: '#878787'
  }
});