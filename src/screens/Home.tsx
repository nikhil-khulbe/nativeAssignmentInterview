import {View, Text, ActivityIndicator, StyleSheet,StatusBarStyle, StatusBar, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [currentPage,setCurrentPage] = useState(1)
  const [jobData, setJobData] = useState<any[]>([]);
  useEffect(() => {
    console.log(loading);
    
    const fetchData = async () => {
      setLoading(true)
      try {
        let data = await fetch(
          `https://testapi.getlokalapp.com/common/jobs?${currentPage}`,
        );
        let jsonData = await data.json();
        console.log(jsonData.results)
        setJobData((prev)=>[...prev,...jsonData.results])
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData()
  }, [currentPage]);
  const renderItem = ({ item }: { item: any }) => (
    <View key={item.id} style={styles.jobDetailsCtn}>
      <Text style={styles.textSty}>{item.title}</Text>
      <Text >City: {item.city_location}</Text>
      <Text > State: {item.job_location_slug}</Text>

    </View>
  )
  return (
    <View style={styles.MainCtn}>
      <StatusBar barStyle={'dark-content'} />
      {loading && <ActivityIndicator size={70} style={styles.loadingAni} />}
      <FlatList initialNumToRender={10} renderItem={renderItem} data={jobData} keyExtractor={item => item.id}
      onEndReached={()=>setCurrentPage((prev)=>prev+1)} onEndReachedThreshold={0.5} ListFooterComponent={()=>loading && <ActivityIndicator size='large'/>}/>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  loadingAni: {
    
  },
  MainCtn: {
    
    
    height:'100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  jobDetailsCtn: {
    backgroundColor: 'rgba(109,165,36,0.2)',
    margin: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius:10
  },
  textSty: {
    fontSize: 15,
    fontWeight:'bold'
  }
});
