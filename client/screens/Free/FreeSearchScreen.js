import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import SearchBar from '../../components/SearchBar';
import FreeList from './FreeListItem';
import CertificationList from '../Certification/CertificationListItem';
import RecruitList from '../Recruit/RecruitListItem';
import QuestionList from '../Question/QuestionListItem';
import {BASE_URL} from '../../config';
import {useIsFocused} from '@react-navigation/native';

function FreeSearchScreen({route}) {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const routing = route.params.classify;

  if (routing === 'recruit') {
    var dataToSend = {
      num: route.params.people,
      gender: route.params.sex,
      loc: route.params.local,
    };
  } else {
    var dataToSend = {
      search: route.params.id,
    };
  }

  if (routing === 'recruit') {
    useEffect(() => {
      console.log(dataToSend);
      fetch(`${BASE_URL}/api/community/${routing}/condition`, {
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
  } else {
    useEffect(() => {
      fetch(`${BASE_URL}/api/community/${routing}/search`, {
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
  }

  return (
    <View style={styles.block}>
      <View style={styles.semiblock}>
        <SearchBar />
      </View>

      <ScrollView>
        <View style={styles.item}>
          {loading ? (
            <Text>Loading...</Text>
          ) : routing === 'certify' ? (
            lists
              .reverse()
              .map(certify => (
                <CertificationList
                  date={certify.time}
                  title={certify.title}
                  body={certify.text}
                  id={certify._id}
                  token={certify.token}
                  nickname={certify.nickname}
                  userImage={certify.userImage}
                  boardImage={certify.imagepath}
                />
              ))
          ) : routing === 'recruit' ? (
            lists
              .reverse()
              .map(recruit => (
                <RecruitList
                  date={recruit.time}
                  title={recruit.title}
                  body={recruit.text}
                  id={recruit._id}
                  token={recruit.token}
                  nickname={recruit.nickname}
                  userImage={recruit.userImage}
                  local={recruit.loc}
                  gender={recruit.gender}
                  people={recruit.num}
                />
              ))
          ) : routing === 'question' ? (
            lists
              .reverse()
              .map(question => (
                <QuestionList
                  date={question.time}
                  title={question.title}
                  body={question.text}
                  id={question._id}
                  token={question.token}
                  nickname={question.nickname}
                  userImage={question.userImage}
                />
              ))
          ) : (
            lists
              .reverse()
              .map(free => (
                <FreeList
                  date={free.time}
                  title={free.title}
                  body={free.text}
                  id={free._id}
                  token={free.token}
                  nickname={free.nickname}
                  userImage={free.userImage}
                />
              ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
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
  date: {
    color: '#546e7a',
    fontSize: 12,
    marginBottom: 8,
  },
  title: {
    color: '#263238',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  body: {
    color: '#37474f',
    fontSize: 16,
    lineHeight: 21,
  },
});

export default FreeSearchScreen;
