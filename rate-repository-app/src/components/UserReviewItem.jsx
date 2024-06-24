import { View, StyleSheet, Pressable, Alert } from 'react-native';
import Text from './Text';
import { useNavigate } from 'react-router-native';
import useDeleteReview from '../hooks/useDeleteReview';

const styles = StyleSheet.create({
    reviewBodyContainer: {
        flexGrow: 1, 
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    reviewContainer: {
        backgroundColor: 'white',
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ratingContainer: {
        width: 50,
        height: 50,
        borderWidth: 2,
        borderColor: 'blue',
        padding: '5px',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10
    },
    descriptionText: {
        width: 0,
        flexGrow: 1,
        flex: 1
    },
    textMargin: {
        marginBottom: 5
    },
    repoButton: {
        padding: 20,
        margin: 10,
        borderWidth: StyleSheet.hairlineWidth,
        backgroundColor: '#0366d6',
        borderRadius: 5
    }, 
    deleteButton: {
        padding: 20,
        margin: 10,
        borderWidth: StyleSheet.hairlineWidth,
        backgroundColor: 'red',
        borderRadius: 5
    },
    buttonText: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }

});


const UserReviewItem = ({ review, refetch }) => {
    // eslint-disable-next-line no-unused-vars
    const [executeDelete, { data }] = useDeleteReview();
    const navigate = useNavigate();
    const extractedDate = /^(\d{4})-(\d{2})-(\d{2})/gm.exec(review.createdAt).slice(1, 4).join('.');
    
    const deleteReview = () => {
        Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
            {
                text: 'CANCEL',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            },
            {
                text: 'DELETE',
                onPress: () => {
                    executeDelete(review.id, refetch);
                }
            }
        ]);
    }

    return(
        <View style={styles.reviewBodyContainer}>
            <View style={styles.reviewContainer}>
                <View style={styles.ratingContainer}>
                    <Text>{review.rating}</Text>
                </View>
                <View style={styles.descriptionText}>
                    <Text fontWeight='bold' style={styles.textMargin}>{review.repositoryId}</Text>
                    <Text style={styles.textMargin}>{extractedDate}</Text>
                    <Text style={styles.textMargin}>{review.text}</Text>
                </View>
            </View>
            <View style={styles.buttonsContainer}>
                <Pressable
                    style={styles.repoButton}
                    onPress={() => navigate(`/${review.repositoryId}`)}
                >
                    <Text color='language' style={styles.buttonText}>View repository</Text>
                </Pressable>
                <Pressable
                    style={styles.deleteButton}
                    onPress={deleteReview}
                >
                    <Text color='language' style={styles.buttonText}>Delete review</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default UserReviewItem;