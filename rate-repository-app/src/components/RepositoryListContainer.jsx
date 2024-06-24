import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useNavigate } from 'react-router-native';
import { Searchbar } from 'react-native-paper';
import { useState } from 'react';
import React from 'react'
import { useDebouncedCallback } from 'use-debounce'


const styles = StyleSheet.create({
    separator: {
      height: 10,
    },
  });
  
const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = ({ setKeywords }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const debounced = useDebouncedCallback(
    () => {
      setKeywords(searchQuery)
    },
    1000
  );

  const handleSearch = (query) => {
    setSearchQuery(query); 
    debounced(query);
  }

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={handleSearch}
      value={searchQuery}
    />
  )
}

const RepositoryListContainer = ({ repositories, setKeywords, onEndReach }) => {
  const navigate = useNavigate()
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
    
    return (
      <View>
        <FlatList
          data={repositoryNodes}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => 
            <Pressable 
              onPress={() => {
                navigate(`/${item.id}`)
              }}>
              <RepositoryItem item={item}/>
            </Pressable>
          }
          keyExtractor={item => item.id}
          onEndReached={onEndReach}
          onEndReachedThreshold={0.5}
          ListHeaderComponent={<RepositoryListHeader setKeywords={setKeywords}/>}
        />
    </View>
    );
};



export default RepositoryListContainer