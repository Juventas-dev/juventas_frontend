import {View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigations/BoardNavigation';

type PostDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'PostDetail'>;

function PostDetail({navigation}: PostDetailScreenProps) {
    return <View></View>
}

export default PostDetail;