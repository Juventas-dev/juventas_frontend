import React, {useState} from 'react';
import {
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ScrollView
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../AppInner';

type TermIDScreenProps = NativeStackScreenProps<RootStackParamList, 'Term'>;

function Term() {
  const [open0, setOpen0] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);
  const [open7, setOpen7] = useState(false);
  const [open8, setOpen8] = useState(false);

  return (
    <SafeAreaView style={styles.entire}>
      <ScrollView style={styles.viewOut} contentContainerStyle={styles.view}>
        <Text style={styles.header}>서비스 이용약관 및 개인정보 처리방침</Text>
        <Pressable onPress={() => setOpen0(!open0)} style={styles.pages}>
          <Text style={styles.pagesHeader}>0. 서비스 이용약관</Text>
          {open0 && <Text style={styles.pagesTxt}>어쩌고저쩌고</Text>}
        </Pressable>
        <Pressable onPress={() => setOpen1(!open1)} style={styles.pages}>
          <Text style={styles.pagesHeader}>1. 개인정보의 수집 이용 목적</Text>
          {open1 && <Text style={styles.pagesTxt}>어쩌고저쩌고</Text>}
        </Pressable>
        <Pressable onPress={() => setOpen2(!open2)} style={styles.pages}>
          <Text style={styles.pagesHeader}>2. 개인정보의 수집 이용 목적</Text>
          {open2 && <Text style={styles.pagesTxt}>어쩌고저쩌고</Text>}
        </Pressable>
        <Pressable onPress={() => setOpen3(!open3)} style={styles.pages}>
          <Text style={styles.pagesHeader}>3. 개인정보의 수집 이용 목적</Text>
          {open3 && <Text style={styles.pagesTxt}>어쩌고저쩌고</Text>}
        </Pressable>
        <Pressable onPress={() => setOpen4(!open4)} style={styles.pages}>
          <Text style={styles.pagesHeader}>4. 개인정보의 수집 이용 목적</Text>
          {open4 && <Text style={styles.pagesTxt}>어쩌고저쩌고</Text>}
        </Pressable>
        <Pressable onPress={() => setOpen5(!open5)} style={styles.pages}>
          <Text style={styles.pagesHeader}>5. 개인정보의 수집 이용 목적</Text>
          {open5 && <Text style={styles.pagesTxt}>어쩌고저쩌고</Text>}
        </Pressable>
        <Pressable onPress={() => setOpen6(!open6)} style={styles.pages}>
          <Text style={styles.pagesHeader}>6. 개인정보의 수집 이용 목적</Text>
          {open6 && <Text style={styles.pagesTxt}>어쩌고저쩌고</Text>}
        </Pressable>
        <Pressable onPress={() => setOpen7(!open7)} style={styles.pages}>
          <Text style={styles.pagesHeader}>7. 개인정보의 수집 이용 목적</Text>
          {open7 && <Text style={styles.pagesTxt}>어쩌고저쩌고</Text>}
        </Pressable>
        <Pressable onPress={() => setOpen8(!open8)} style={styles.pages}>
          <Text style={styles.pagesHeader}>8. 개인정보의 수집 이용 목적</Text>
          {open8 && <Text style={styles.pagesTxt}>어쩌고저쩌고</Text>}
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  entire: {
    backgroundColor: '#F5F5F5',
    flex: 1,
    alignItems: 'center',
  },
  view:{
    flexGrow: 1,
    alignItems: 'center',
  },
  viewOut: {
    width: '100%'
  },
  header: {
    color: '#346627',
    fontWeight: '400',
    fontSize: 16,
    marginTop: 25,
    marginBottom: 18
  },
  pages: {
    backgroundColor: 'white',
    width: '85%',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20
  },
  pagesHeader: {
    color: '#346627',
    fontWeight: '400',
    fontSize: 18
  },
  pagesTxt: {
    marginTop: 10
  }
});

export default Term;
