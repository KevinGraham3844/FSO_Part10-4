import { View, FlatList, StyleSheet } from 'react-native';
import Text from './Text';
import getUserReviews from '../hooks/getUserReviews';
import UserReviewItem from './UserReviewItem';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },
    button: {
        padding: 20,
        margin: 10,
        borderWidth: StyleSheet.hairlineWidth,
        backgroundColor: '#0366d6'
    },
    gitHubText: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    separator: {
        height: 10,
    },
    repoContainer: {
        marginBottom: 10
    }
});

const ItemSeparator = () => <View style={styles.separator} />;

const UserReviewList = () => {
    const { user, refetch } = getUserReviews(); 
    
    if (!user) {
        console.log('this was undefined for a moment')
        return <View><Text>...loading</Text></View>
    }
    //console.log(user.me.reviews);
    
    const reviewNodes = user.me.reviews
        ? user.me.reviews.edges.map((edge) => edge.node)
        : []
    //console.log(reviewNodes)
    
    return (
        <View style={{flex: 1}}>
            <FlatList 
                data={reviewNodes}
                renderItem={({ item }) => <UserReviewItem review={item} refetch={refetch}/>}
                ItemSeparatorComponent={ItemSeparator}
                keyExtractor={item => item.repositoryId}
            />
        </View>
    )
}

export default UserReviewList;