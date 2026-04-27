import * as React from 'react';
import { Chip } from 'react-native-paper';
import { Animated, GestureResponderEvent, StyleProp, ViewStyle, TextStyle } from "react-native";

interface Props {
  onPress: (e: GestureResponderEvent) => void;
  label: string;
  mode: "flat" | "outlined";
  textStyle: StyleProp<TextStyle>;
  style: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
  buttonColor: string;
  children: React.ReactNode;
  icon: string;
}

const CChip = ({onPress, label, mode, children, icon}: Props) => (
  <Chip icon={icon} mode={mode} onPress={() => console.log('Pressed')} accessibilityLabel={label}>{children}</Chip>
);

export default CChip;