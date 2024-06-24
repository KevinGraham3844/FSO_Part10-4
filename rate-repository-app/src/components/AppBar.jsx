import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import { Link, useNavigate } from 'react-router-native';
//import useMeQuery from '../hooks/useMeQuery';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';



const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    paddingBottom: 20,
    marginBottom: 12,
    paddingLeft: 6
  },
  contentContainer: {
    flexGrow: 1,
    flexDirection: 'row', 
    justifyContent: 'space-around',
    rowGap: 10
  },
  userBar: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});

const AppBar = ({ user, refetch }) => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();
  
  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate('/')
    refetch();
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.contentContainer}>
        <Pressable
          onPress={() => {
            navigate('/')
          }}>
          <Text fontWeight="bold" fontSize="subheading" color="appHeader">
              Repositories
          </Text>
        </Pressable>
        {user.me === null && (
          <View style={styles.userBar}>
            <Link to="/signin">
              <Text fontSize="subheading" fontWeight='bold' color="appHeader">Sign-in</Text>
            </Link>
            <Link to="/signup">
                <Text fontSize="subheading" fontWeight="bold" color="appHeader">Sign-up</Text>
            </Link>
          </View>
        )}
        {user.me !== null && (
          <View style={styles.userBar}>
            <Link to="/reviewForm">
              <Text fontSize="subheading" fontWeight="bold" color="appHeader">Create a review</Text>
            </Link>
            <Link to="/userReviewList">
              <Text fontSize="subheading" fontWeight="bold" color="appHeader">My Reviews</Text>
            </Link>
            <Pressable onPress={signOut}>
              <Text fontSize="subheading" color="appHeader">Sign-out</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </View>
  )
};

export default AppBar;