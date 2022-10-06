import React, {useRef, useState} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import ImageUploadButton from '../../components/ImageUploadButton';

function CertificationWriteEditor({
  title,
  body,
  onChangeTitle,
  onChangeBody,
  image,
  getImage,
}) {
  const bodyRef = useRef();
  const [imageUrl, setImageUrl] = useState('');
  const getImageUrl = imageUrl => {
    setImageUrl(imageUrl);
  };

  getImage(imageUrl);

  return (
    <View style={styles.block}>
      <TextInput
        placeholder="산을 입력하세요"
        style={styles.titleInput}
        returnKeyType="next"
        onChangeText={onChangeTitle}
        value={title}
        onSubmitEditing={() => {
          bodyRef.current.focus();
        }}
      />

      <ImageUploadButton getImageUrl={getImageUrl} />
      <TextInput
        placeholder="당신의 인증을 기록해보세요"
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
  titleInput: {
    paddingVertical: 0,
    fontSize: 18,
    marginBottom: 16,
    color: '#263238',
    fontWeight: 'bold',
  },
  imageInput: {
    fontSize: 16,
    marginBottom: 16,
    textDecorationLine: 'underline',
  },
  bodyInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
    color: '#263238',
  },
});

export default CertificationWriteEditor;
