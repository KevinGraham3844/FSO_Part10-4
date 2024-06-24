import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_SINGLE_REPO } from '../graphql/queries';

const findRepo = (id) => {
    console.log('find repo is being accessed')
    const [repository, setRepository] = useState();
    const { data, error, loading, refetch } = useQuery(GET_SINGLE_REPO, {
        fetchPolicy: 'cache-and-network',
        variables: { repositoryId: id }
    });
    if (error) {
        console.log(`Error: ${error}`);
    }
    useEffect(() => {
        if(!loading) {
            setRepository(data.repository);
        }
    }, [loading])
    return { repository, loading, refetch: refetch}
}

export default findRepo;