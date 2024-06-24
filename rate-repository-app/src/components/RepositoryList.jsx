import useRepositories from '../hooks/useRepositories';
import RepositoryListContainer from './RepositoryListContainer';
import { View } from 'react-native'
import { useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import Text from './Text';
//import { RepositoryListHeader } from './RepositoryListContainer';


const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [selectedOrder, setSelectedOrder] = useState('Latest repositories')
  const [keywords, setKeywords] = useState('')
  const { repositories, fetchMore } = useRepositories({ first: 5, orderBy, orderDirection, keywords });
  
  const setRepoParams = (order) => {
    switch(order) {
      case 'Latest repositories':
        setOrderBy('CREATED_AT');
        setOrderDirection('DESC');
        break;
      case 'Highest rated repositories':
        setOrderBy('RATING_AVERAGE');
        setOrderDirection('DESC');
        break;
      case 'Lowest rated repositories':
        setOrderBy('RATING_AVERAGE');
        setOrderDirection('ASC');
        break;
      default:
        break;
    }
  }

  const onEndReach = () => {
    fetchMore();
  }
  
  if (!repositories) {
    return <View><Text>loading...</Text></View>
  }
  return (
    <View>
      <Picker
        prompt='Select an item...' 
        selectedValue={selectedOrder}
        // eslint-disable-next-line no-unused-vars
        onValueChange={(itemValue, itemIndex) => {
          console.log(itemValue)
          setSelectedOrder(itemValue)
          setRepoParams(itemValue)
      }}>
      <Picker.Item label="Latest repositories" value="Latest repositories" />
      <Picker.Item label="Highest rated repositories" value="Highest rated repositories" />
      <Picker.Item label="Lowest rated repositories" value="Lowest rated repositories" />
      </Picker>
      <RepositoryListContainer onEndReach={onEndReach} setKeywords={setKeywords} repositories={repositories} />
    </View>
  )
  
};

export default RepositoryList;