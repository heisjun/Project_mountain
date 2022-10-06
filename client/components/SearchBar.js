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

function SearchBar({classification}) {
  const {width} = useWindowDimensions();
  const [keyword, setKeyword] = useState('');
  const InputRef = useRef();
  const navigation = useNavigation();
  const onGoSearch = () => {
    navigation.navigate('FreeSearch', {id: keyword, classify: classification}); //검색페이지로 키워드와 분류 전송
    Keyboard.dismiss();
  };

  return (
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
});

export default SearchBar;
