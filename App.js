import * as React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import SelfRecordView from "./components/SelfRecordView";
import PickVideoView from "./components/PickVideoView";
import ShowImagesView from "./components/ShowImagesView";

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
    </View>
  );
}

function PickVideoScreen() {
  return <PickVideoView />;
}

function SelfRecordScreen() {
  return <SelfRecordView />;
}

function ShowImagesScreen() {
  return <ShowImagesView />;
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused
                  ? "ios-information-circle"
                  : "ios-information-circle-outline";
              } else if (route.name === "Settings") {
                iconName = focused ? "ios-list-box" : "ios-list";
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: "tomato",
            inactiveTintColor: "gray",
          }}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="SelfRecord" component={SelfRecordScreen} />
          <Tab.Screen name="PickVideo" component={PickVideoScreen} />
          <Tab.Screen name="ShowImages" component={ShowImagesScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}
