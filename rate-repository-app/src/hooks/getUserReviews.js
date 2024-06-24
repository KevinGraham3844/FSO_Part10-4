import { useState, useEffect } from 'react'; 
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';

const getUserReviews = () => {
    const [user, setUser] = useState('');
    const { data, error, loading, refetch } = useQuery(ME, {
      fetchPolicy: 'cache-and-network',
      variables: {
        includeReviews: true
      }
    });
    if (error) {
      console.log(`Error: ${error}`);
    }
    useEffect(() => {
      if(!loading) {
        setUser(data)
      }
    }, [loading]);
    
    return { user, refetch: refetch }
}



export default getUserReviews;