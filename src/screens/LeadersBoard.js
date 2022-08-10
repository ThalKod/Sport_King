import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView, FlatList, ActivityIndicator,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TopTierLeaderBoards from "../components/TopTierLeaderBoard";
import LeadersBoardsSingle from "../components/LeadersBoardSingle";
import {moderateScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {useQuery, useLazyQuery} from '@apollo/client';
import { GET_STANDING } from '../graph-operations';
import numeral from 'numeral';


const Tab = createMaterialTopTabNavigator();

const WeeklyBoards = ({ navigation }) => {
  const user = useSelector(state => state.user);
  const [standingData, setStandingData] = useState("");
  const [topStandingData, setTopStandingData] = useState("");

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log("loading");
      getStanding();
    });

    return () => {
      unsubscribe();
    }
  }, []);

  const [getStanding, { loading }] = useLazyQuery(GET_STANDING, {
    fetchPolicy: 'no-cache',
    variables: {
      jsWebToken: user.jsWebToken,
      orderBy: {
        weekly_count: "desc"
      }
    },
    onCompleted(data){
      console.log("Data weekly", data);
      setStandingData(data.standing.splice(3));
      setTopStandingData(data.standing.slice(0,4));
    }
  });

  const renderItems = ({ item, index }) => {
    return (
        <LeadersBoardsSingle position={index + 4} name={item.user_name} coins={numeral(item.weekly_count).format("0,0[.]00")}/>
    )
  };

  if(loading || topStandingData.length <= 0){
    return (
        <View style={{ backgroundColor: "#1C0C4F", flex: 1, alignItems: "center", justifyContent: "center"}}>
          <ActivityIndicator size="large" color="#fff"/>
        </View>
    )
  }


  return (
      <View style={styles.container}>
        <TopTierLeaderBoards weekly topData={topStandingData}/>
        <FlatList
            data={standingData}
            keyExtractor={(items) => items.id.toString()}
            renderItem={renderItems}
            ItemSeparatorComponent={() => (
                <View style={styles.separator} />
            )}
        />
      </View>
  )
};

const MonthlyBoards = ({ navigation }) => {
  const user = useSelector(state => state.user);
  const [standingData, setStandingData] = useState("");
  const [topStandingData, setTopStandingData] = useState("");

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log("loading");
      getStanding();
    });

    return () => {
      unsubscribe();
    }
  }, []);

  const [getStanding, { loading }] = useLazyQuery(GET_STANDING, {
    fetchPolicy: 'no-cache',
    variables: {
      jsWebToken: user.jsWebToken,
      orderBy: {
        monthly_count: "desc"
      }
    },
    onCompleted(data){
      console.log("Data monthly", data);
      setStandingData(data.standing.splice(3));
      setTopStandingData(data.standing.slice(0,4));
    }
  });

  const renderItems = ({ item, index }) => {
    return (
        <LeadersBoardsSingle position={index + 4} name={item.user_name} coins={numeral(item.monthly_count).format("0,0[.]00")}/>
    )
  };

  if(loading || topStandingData.length <= 0){
    return (
        <View style={{ backgroundColor: "#1C0C4F", flex: 1, alignItems: "center", justifyContent: "center"}}>
          <ActivityIndicator size="large" color="#fff"/>
        </View>
    )
  }
  console.log("Standing Data", standingData);

  return (
      <View style={styles.container}>
        <TopTierLeaderBoards monthly topData={topStandingData}/>
        <FlatList
            data={standingData}
            keyExtractor={(items) => items.id.toString()}
            renderItem={renderItems}
            ItemSeparatorComponent={() => (
                <View style={styles.separator} />
            )}
        />
      </View>
  )
};

const AllTimeBoards = ({ navigation }) => {
  const user = useSelector(state => state.user);
  const [standingData, setStandingData] = useState("");
  const [topStandingData, setTopStandingData] = useState("");

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log("loading");
      getStanding();
    });

    return () => {
      unsubscribe();
    }
  }, []);

  const [getStanding, { loading }] = useLazyQuery(GET_STANDING, {
    fetchPolicy: 'no-cache',
    variables: {
      jsWebToken: user.jsWebToken,
      orderBy: {
        alltime_count: "desc"
      }
    },
    onCompleted(data){
      console.log("Data alltime", data);
      setStandingData(data.standing.splice(3));
      setTopStandingData(data.standing.slice(0,4));
    }
  });

  const renderItems = ({ item, index }) => {
    return (
        <LeadersBoardsSingle position={index + 4} name={item.user_name} coins={numeral(item.alltime_count).format("0,0[.]00")}/>
    )
  };

  if(loading || topStandingData.length <= 0){
    return (
        <View style={{ backgroundColor: "#1C0C4F", flex: 1, alignItems: "center", justifyContent: "center"}}>
          <ActivityIndicator size="large" color="#fff"/>
        </View>
    )
  }

  return (
      <View style={styles.container}>
        <TopTierLeaderBoards alltime topData={topStandingData}/>
        <FlatList
            data={standingData}
            keyExtractor={(items) => items.id.toString()}
            renderItem={renderItems}
            ItemSeparatorComponent={() => (
                <View style={styles.separator} />
            )}
        />
      </View>
  )
};

const LeadersBoards = () => {
  return (
      <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: "#fff",
            tabBarStyle: { backgroundColor: '#140A35' },
          }}
      >
        <Tab.Screen name="Semaine" component={WeeklyBoards} />
        <Tab.Screen name="Mois" component={MonthlyBoards} />
        <Tab.Screen name="All-Time" component={AllTimeBoards} />
      </Tab.Navigator>
  )
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#1C0C4F"
  },
  separator: {
    height: moderateScale(0.5),
    backgroundColor: "#A9B8CC",
    width: "100%",
  },
});

export default LeadersBoards;
