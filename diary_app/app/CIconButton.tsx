import * as React from 'react';
import { IconButton, MD3Colors } from 'react-native-paper';
import { GestureResponderEvent } from "react-native"

interface Props {
  icon: string;
  iconColor: string;
  containerColor: string;
  size: number;
  onPress: (e: GestureResponderEvent) => void;
}

const CIconButton = ({ icon, iconColor, containerColor,  size, onPress }: Props) => (
  <IconButton
    icon={icon}
    iconColor={iconColor}
    containerColor={containerColor}
    size={size}
    onPress={onPress}
  />
);

export default CIconButton;