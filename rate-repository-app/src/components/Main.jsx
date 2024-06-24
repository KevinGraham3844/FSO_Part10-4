import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import SignIn from './SignIn';
import theme from '../theme';
import useMeQuery from '../hooks/useMeQuery';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SingleRepo from './SingleRepo';
import ReviewForm from './ReviewForm';
import SignUpForm from './SignUpForm';
import UserReviewList from './UserReviewList';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: Constants.statusBarHeight,
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: '#e1e4e8',
        fontFamily: theme.fonts.main
    }
});

const Main = () => {
    const { user, refetch } = useMeQuery();
    return (
        <View style={styles.container} font=''>
            <AppBar user={user} refetch={refetch} />
            <Routes>
                <Route path="/" element={<RepositoryList />} />
                <Route path="/:id" element={<SingleRepo />} />
                <Route path="*" element={<Navigate to="/" replace />} />
                <Route path="/signin" element={<SignIn refetch={refetch} />} />
                <Route path="/reviewForm" element={<ReviewForm />} />
                <Route path="/signup" element={<SignUpForm refetch={refetch}/>} />
                <Route path="/userReviewList" element={<UserReviewList />} />
            </Routes>
        </View>
    );
};

export default Main;