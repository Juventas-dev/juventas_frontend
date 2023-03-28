import React from 'react';
import {View, Pressable, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MypageStackParamList} from '../navigations/MypageNavigation';
import {PieChart} from 'react-native-chart-kit';
type MypageScreenProps = NativeStackScreenProps<
  MypageStackParamList,
  'SetCategory'
>;

const SetCategory = ({navigation}: MypageScreenProps) => {
  const chartConfig = {
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  const data = [
    {name: '여가', value: 10, color: '#0096D7'},
    {name: '건강', value: 20, color: '#F6DD55'},
    {name: '학습', value: 30, color: '#129971'},
    {name: '관계', value: 40, color: '#E3800A'},
  ];

  return (
    <SafeAreaView style={styles.entire}>
      <View style={styles.Prefer}>
        <View style={styles.Head}>
          <Text style={styles.FontSt}>선호 카테고리</Text>
        </View>
        <View style={styles.CategoryName}>
          <View style={styles.CategoryBox1}>
            <Text>등산</Text>
          </View>
          <View style={styles.CategoryBox2}>
            <Text>일본어 공부</Text>
          </View>
          <View style={styles.CategoryBox3}>
            <Text>공부</Text>
          </View>
        </View>
      </View>
      <View style={styles.chart}>
        <PieChart
          data={data}
          width={349}
          height={349}
          accessor={'value'}
          chartConfig={chartConfig}
          backgroundColor={'transparent'}
          paddingLeft={'15'}
          absolute
        />
      </View>
    </SafeAreaView>
  );
};

export default SetCategory;

const styles = StyleSheet.create({
  entire: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 5,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  Prefer: {
    flex: 1,
    marginVertical: 5,
  },
  Head: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B7CBB2',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  CategoryName: {
    flex: 1.5,
    flexDirection: 'row',
    backgroundColor: '#F9FAF8',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  CategoryBox1: {
    flex: 1,
    borderRightWidth: 2,
    borderRightColor: '#B7CBB2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  CategoryBox2: {
    flex: 0.8,
    borderRightWidth: 2,
    borderRightColor: '#B7CBB2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  CategoryBox3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chart: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  FontSt: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
