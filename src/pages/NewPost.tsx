import { View, StyleSheet } from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigations/BoardNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';

type NewPostScreenProps = NativeStackScreenProps<RootStackParamList, 'NewPost'>;

function NewPost({navigation}: NewPostScreenProps) {
  return (
    <SafeAreaView>
        <View style={styles.body}></View>
        <View style={styles.comment}></View>
        <View style={styles.myComment}></View>
    </SafeAreaView>
  );
}

export default NewPost;

const styles = StyleSheet.create({
    body: {

    },
    comment: {

    },
    myComment: {
        
    }
});