import React, {useRef, useState} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {Picker} from '@react-native-picker/picker';

function RecruitWriteEditor({
  title,
  body,
  onChangeTitle,
  onChangeBody,
  onChangePeople,
  onChangeSex,
  onChangeLocal,
}) {
  const bodyRef = useRef();
  const [peopleValue, setpeopleValue] = useState('명');
  const [sexValue, setSexValue] = useState('자');
  const [localValue, setLocalValue] = useState('도');

  onChangePeople(peopleValue);
  onChangeSex(sexValue);
  onChangeLocal(localValue);

  return (
    <View style={styles.block}>
      <TextInput
        placeholder="제목을 입력하세요"
        style={styles.titleInput}
        returnKeyType="next"
        onChangeText={onChangeTitle}
        value={title}
        onSubmitEditing={() => {
          bodyRef.current.focus();
        }}
      />
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
      <TextInput
        placeholder="내용을 입력하세요"
        style={styles.bodyInput}
        multiline
        textAlignVertical="top"
        onChangeText={onChangeBody}
        value={body}
        ref={bodyRef}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    padding: 16,
  },
  container: {
    flexDirection: 'row',
  },
  titleInput: {
    paddingVertical: 0,
    fontSize: 18,
    marginBottom: 16,
    color: '#263238',
    fontWeight: 'bold',
  },
  bodyInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
    color: '#263238',
  },
});

export default RecruitWriteEditor;
