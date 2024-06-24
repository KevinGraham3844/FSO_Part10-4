//import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REVIEWS } from '../graphql/queries';

const getReviews = (variables) => {
    console.log('get reviews is being accessed')
    //const [reviews, setReviews] = useState();
    const { data, error, loading, refetch, fetchMore } = useQuery(GET_REVIEWS, {
        fetchPolicy: 'cache-and-network',
        variables
    });
    if (error) {
        console.log(`Error: ${error}`);
    }

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;
        console.log(data?.repository)
        if (!canFetchMore) {
            console.log('no more pages')
            return;
        }

        fetchMore({
            variables: {
                after: data.repository.reviews.pageInfo.endCursor,
                ...variables
            }
        })
    }
    /*
    useEffect(() => {
        if(!loading) {
            setReviews(data.repository.reviews)
            console.log(data.repository.reviews.pageInfo.endCursor)
        }
    }, [loading]);
    */
    return { reviews: data?.repository.reviews, loading, refetch: refetch, fetchMore: handleFetchMore};
};

export default getReviews

