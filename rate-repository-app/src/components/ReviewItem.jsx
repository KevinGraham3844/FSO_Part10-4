import { View, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
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
    }
});


const ReviewItem = ({ review }) => {
    const extractedDate = /^(\d{4})-(\d{2})-(\d{2})/gm.exec(review.createdAt).slice(1, 4).join('.');
    
    return (
        <View style={styles.reviewContainer}>
            <View style={styles.ratingContainer}>
                <Text>{review.rating}</Text>
            </View>
            <View style={styles.descriptionText}>
                <Text fontWeight='bold' style={styles.textMargin}>{review.user.username}</Text>
                <Text style={styles.textMargin}>{extractedDate}</Text>
                <Text style={styles.textMargin}>{review.text}</Text>
            </View>
        </View>
    )
};

export default ReviewItem