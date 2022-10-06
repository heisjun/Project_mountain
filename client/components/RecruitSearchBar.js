import React, {useState, useRef} from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';

function RecruitSearchBar({classification}) {
  const [peopleValue, setpeopleValue] = useState('명');
  const [sexValue, setSexValue] = useState('자');
  const [localValue, setLocalValue] = useState('도');

  const {width} = useWindowDimensions();
  const [keyword, setKeyword] = useState('');
  const InputRef = useRef();
  const navigation = useNavigation();
  const onGoSearch = () => {
    navigation.navigate('FreeSearch', {
      id: keyword,
      people: peopleValue,
      sex: sexValue,
      local: localValue,
      classify: classification,
    }); //검색페이지로 키워드와 분류 전송
    Keyboard.dismiss();
  };

  return (
    <>
      <View style={[styles.block, {width: width - 32}]}>
        <TextInput
          style={styles.input}
          placeholder="검색어를 입력하세요"
          onChangeText={setKeyword}
          autoFocus
          ref={InputRef}
        />
        <Pressable
          style={({pressed}) => [styles.button, pressed && {opacity: 0.5}]}
          onPress={() => {
            InputRef.current.clear();
          }}>
          <Icon name="cancel" size={20} color="#9e9e9e" />
        </Pressable>
        <Pressable
          style={({pressed}) => [styles.button, pressed && {opacity: 0.5}]}
          onPress={onGoSearch}>
          <Icon name="search" size={20} color="#9e9e9e" />
        </Pressable>
      </View>
      <View style={styles.container}>
        <Picker
          selectedValue={peopleValue}
          style={{height: 50, width: 130}}
          onValueChange={(itemValue, itemIndex) => setpeopleValue(itemValue)}>
          <Picker.Item label="인원" value="명 " />
          <Picker.Item label="1명" value="1명" />
          <Picker.Item label="2명" value="2명" />
          <Picker.Item label="3명" value="3명" />
          <Picker.Item label="4명" value="4명" />
          <Picker.Item label="5명" value="5명" />
        </Picker>
        <Picker
          selectedValue={sexValue}
          style={{height: 50, width: 130}}
          onValueChange={(itemValue, itemIndex) => setSexValue(itemValue)}>
          <Picker.Item label="성별" value=" 자" />
          <Picker.Item label="남성" value="남자" />
          <Picker.Item label="여성" value="여자" />
        </Picker>
        <Picker
          selectedValue={localValue}
          style={{height: 50, width: 130}}
          onValueChange={(itemValue, itemIndex) => setLocalValue(itemValue)}>
          <Picker.Item label="지역" value="도 " />
          <Picker.Item label="경기도" value="경기도" />
          <Picker.Item label="강원도" value="강원도" />
          <Picker.Item label="충청북도" value="충청북도" />
          <Picker.Item label="충청남도" value="충청남도" />
          <Picker.Item label="경상북도" value="경상북도" />
          <Picker.Item label="경상남도" value="경상남도" />
          <Picker.Item label="전라북도" value="전라북도" />
          <Picker.Item label="전라남도" value="전라남도" />
          <Picker.Item label="제주도" value="제주도" />
        </Picker>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
  },
  button: {
    marginLeft: 8,
  },
  container: {
    flexDirection: 'row',
  },
});

export default RecruitSearchBar;
