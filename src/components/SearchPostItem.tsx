import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BoardStackNavigationProp} from '../navigations/BoardNavigation';

type ItemProps = {
  incr: number;
  c_id: number;
  title: string;
};

const SearchPostItem = ({
  item,
  searchKeyword,
}: {
  item: ItemProps;
  searchKeyword: string;
}) => {
  const navigation = useNavigation<BoardStackNavigationProp>();

  const category = (c_id: number): string => {
    switch (c_id) {
      case 0:
        return '건강';
      case 1:
        return '여가';
      case 2:
        return '학습';
      case 3:
        return '관계';
      default:
        return '기타';
    }
  };

  const textBold = (title: string, keyword: string) => {
    const keywordIndex = title.search(keyword);
    const textStart = title.slice(0, keywordIndex);
    const textEnd = title.slice(keywordIndex + keyword.length);

    return (
      <Text>
        {textStart}
        <Text style={styles.postContentBoldTitle}>{keyword}</Text>
        {textEnd}
      </Text>
    );
  };

  return (
    <Pressable
      style={styles.posting}
      onPress={() => navigation.navigate('PostDetail', {postID: item.incr})}>
      <Text style={styles.postContentCategory} numberOfLines={1}>
        {category(item.c_id)}
      </Text>
      <Text style={styles.postContentTitle} numberOfLines={2}>
        {textBold(item.title, searchKeyword)}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  posting: {
    borderTopWidth: 1,
    borderTopColor: '#EBEFEA',
    height: 80,
    justifyContent: 'center',
    paddingLeft: 35,
  },
  postContentCategory: {
    fontSize: 14,
    color: '#5F5D5D',
  },
  postContentTitle: {
    fontSize: 18,
    color: '#878787',
  },
  postContentBoldTitle: {
    fontSize: 18,
    color: '#878787',
    fontWeight: '700',
  },
});

export default SearchPostItem;
