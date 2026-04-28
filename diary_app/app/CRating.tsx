import React from 'react';
import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, IconButton, PaperProvider, Checkbox } from 'react-native-paper';
import { Chip, RadioButton, List, Icon } from 'react-native-paper';
import { TextInput, Button, Text } from 'react-native-paper';

interface Props {
  color: string
}

const rate = [0, 1, 2, 3, 4, 5];
const emotions = [
  'emoticon',
  'emoticon-happy',
  'emoticon-neutral',
  'emoticon-sad',
  'emoticon-confused',
  'emoticon-angry',
];

const _ = ({ color }: Props) => {
  const [checked, setChecked] = React.useState('rate_2');

  return (
    <View style={{ display: "flex", width: "100%" }}>
    <View
    //   className={styles.mood}
      style={{ backgroundColor: "#BBB0D1", alignSelf: "stretch", borderRadius: 10, marginHorizontal: 20, marginTop: 5 }}>
      <Text
        style={{ color: "white", padding: 10 }}>
        Humeur du jour
      </Text>
      <View style={{ display: 'flex', flexDirection: 'row', width: "100%" }}>
        {rate &&
          !!rate.length &&
          rate.map((_, i) => {
            return (
              <View key={`rate_${i}`} style={{ flex: 1 }}>
                <IconButton
                  key={`rate_${i}`}
                  containerColor={`none`}
                  icon={emotions[i]}
                  iconColor={
                    checked === `rate_${i}` ? color : 'white'
                  }
                  mode={'contained'}
                  onPress={() => setChecked(`rate_${i}`)}
                />
              </View>
            );
          })}
      </View>
    </View>
    </View>
  );
};

export default _;