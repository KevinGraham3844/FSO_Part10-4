//import { useState, useEffect } from 'react'; 
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

/*
const useRepositories = ({ orderBy, orderDirection, keywords }) => {
    const [repositories, setRepositories] = useState();
    const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
        variables: {
            searchKeyword: keywords,
            orderBy: orderBy,
            orderDirection: orderDirection
        }
    });
    if (error) {
        console.log(`Error: ${error}`);
    }
    useEffect(() => {
        if(!loading) {
            setRepositories(data.repositories);
        }
    }, [loading])
    return { repositories, loading, refetch: refetch};
}
*/
const useRepositories = (variables) => {
    //const [repositories, setRepositories] = useState();
    const { data, error, loading, refetch, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
        variables
    });
    if (error) {
        console.log(`Error: ${error}`);
    }
    const handleFetchMore = () => {
        console.log(data.repositories.pageInfo)
        const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
        console.log(canFetchMore)
        
        if(!canFetchMore) {
            console.log('returning')
            return;
        }
        
        fetchMore({
            variables: {
                after: data.repositories.pageInfo.endCursor,
                ...variables,
            }
        })
    }
    /*
    useEffect(() => {
        if(!loading) {
            setRepositories(data.repositories);
        }
    }, [loading])
*/
    return { repositories: data?.repositories, loading, refetch: refetch, fetchMore: handleFetchMore, ...result};
}



export default useRepositories;