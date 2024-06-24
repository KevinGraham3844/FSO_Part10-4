import { View, Pressable, StyleSheet, FlatList } from "react-native"
import { useParams } from "react-router-native"
import findRepo from "../hooks/findRepo";
import getReviews from "../hooks/getReviews";
import RepositoryItem from "./RepositoryItem";
import * as Linking from 'expo-linking';
import Text from "./Text";
import ReviewItem from "./ReviewItem";

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

const SingleRepo = () => {
    const id = useParams().id;
    const { repository } = findRepo(id);
    const { reviews, fetchMore } = getReviews({ first: 4, repositoryId: id});
    
    const reviewNodes = reviews 
        ? reviews.edges.map((edge) => edge.node)
        : []

    const onEndReach = () => {
        fetchMore();
    }    
    if (!repository) {
        return (
            <View>
                <Text>loading...</Text>
            </View>
        )
    }
    return (
        <View style={{flex: 1}}>

            <FlatList
                data={reviewNodes}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({ item }) => <ReviewItem review={item}/>}
                keyExtractor={item => item.id}
                onEndReached={onEndReach}
                onEndReachedThreshold={0.5}
                ListHeaderComponent={() => {
                    return (
                        <View style={styles.repoContainer}>
                            <RepositoryItem item={repository} />
                            <View style={styles.container}>
                                <Pressable 
                                    onPress={() => Linking.openURL(`${repository.url}`)}
                                    style={styles.button}
                                >
                                    <Text color='language' style={styles.gitHubText}>Open in GitHub</Text>
                                </Pressable>
                            </View>
                        </View>
                    )
                }}
            />
        </View>
        
    )
}

export default SingleRepo