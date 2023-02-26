import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, Image, SafeAreaView } from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../AppInner';
const IconWelcome = require('../../assets/image/welcome.png');
const IconLoading = require('../../assets/image/loading.png');

type FirstSettingScreenProps = NativeStackScreenProps<RootStackParamList, 'FirstSetting'>;

function FirstSetting({navigation}: FirstSettingScreenProps) {
	const [firstScreen, setFirstScreen] = useState(0);
	const nextScreen = useCallback(() => {
		setFirstScreen(firstScreen + 1);
	}, [firstScreen]);
	return <SafeAreaView style={styles.entire}>
		{!firstScreen && <View style={styles.header}>
			<Image source={IconWelcome} style={styles.image} />
			<Text style={styles.headerText}>환영합니다 <Text style={styles.headerTextBold}>동글이</Text> 님!</Text>
		</View>}
		{firstScreen == 1 && <Text>카테고리 블라블라</Text>}
		{firstScreen == 2 && <View style={styles.header}>
			<Image source={IconLoading} style={styles.imageSmall} />
			<Text style={styles.headerTextSmall}>동글이님의 취향에 맞게 설정하고 있어요</Text>
		</View>}
		<View style={styles.body}>
			{!firstScreen && <Text style={styles.bodyText}>도전을 시작하기 위해 동글이님에 대해 알려주세요</Text>}
			{firstScreen <= 1 && <Pressable style={styles.setUpBtn} onPress={nextScreen}>
				<Text style={styles.setUpBtnText}>기본 사항 설정하기</Text>
			</Pressable>}
		</View>
	</SafeAreaView>
};

const styles = StyleSheet.create({
	entire: {
		flex: 1,
		backgroundColor: '#F5F5F5',
		alignItems: 'center'
	},
	header: {
		alignItems: 'center',
		marginTop: 30
	},
	image: {
		width: 300,
		height: 370
	},
	imageSmall: {
		width: 180,
		height: 180,
		marginTop: '40%'
	},
	headerText: {
		fontSize: 24,
		fontWeight: '800',
		marginTop: 20,
		color: '#346627'
	},
	headerTextSmall: {
		fontSize: 16,
		fontWeight: '800',
		marginTop: 20,
		color: '#346627'
	},
	headerTextBold: {
		fontSize: 30,
		fontWeight: '900'
	},
	body: {
		marginTop: 60,
		alignItems: 'center',
		width: '100%',
		paddingHorizontal: 20
	},
	bodyText:{
		fontSize: 16,
		fontWeight: '700',
		color: '#346627'
	},
	setUpBtn: {
		backgroundColor: '#346627',
		width: '100%',
		height: 35,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20
	},
	setUpBtnText: {
		fontSize: 16,
		fontWeight: '700',
		color: 'white'
	},
});
  
export default FirstSetting;
  