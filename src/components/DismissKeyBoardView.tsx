import React from 'react';
import {TouchableWithoutFeedback, Keyboard} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface Props {
  children: React.ReactNode;
}

const DismissKeyboardView = ({children, ...props}: Props) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <KeyboardAwareScrollView {...props}>{children}</KeyboardAwareScrollView>
  </TouchableWithoutFeedback>
);

export default DismissKeyboardView;
