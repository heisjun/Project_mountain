import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import CommentList from './CommentListItem';
import {BASE_URL} from '../../config';
import {useIsFocused} from '@react-navigation/native';

function CommentScreen({detailId, board}) {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  var dataToSend = {
    _id: detailId,
  };

  useEffect(() => {
    fetch(`${BASE_URL}/api/community/${board}/commentList`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then(response => response.json())
      .then(json => setLists(json))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, [isFocused]);

  return (
    <View style={styles.block}>
      <View style={styles.item}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          lists
            .reverse()
            .map(comment => (
              <CommentList
                date={comment.date}
                body={comment.Text}
                nickname={comment.nickname}
                userImage={comment.commentImage}
                id={detailId}
                board={board}
              />
            ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },

  item: {
    flex: 1,
  },
  semiblock: {
    alignItems: 'center',
  },
  block2: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
});

export default CommentScreen;
