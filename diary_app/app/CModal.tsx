import * as React from 'react';
import { Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';
import { StyleProp, ViewStyle } from "react-native";
import CButton from './CButton';

interface Props {
    visible: boolean;
    hideModal: () => void;
    showModal: () => void;
    style: StyleProp<ViewStyle>;
    children: React.ReactNode;  
}
const CModal = ({visible, hideModal, showModal, style, children}: Props) => {
  
  const containerStyle = { backgroundColor: 'white', padding: 20, margin: 10, borderRadius: 10 };

  return (<>
      <Portal>
        <Modal style={style} visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          {children}
          <Text>Add a diary entry or click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
      <CButton msg="Add entry" variant="contained" textColor="white" labelStyle="" style={{ marginTop: 3 }} buttonColor="#534DB3" onPress={showModal} />
      </>
  );
};

export default CModal;