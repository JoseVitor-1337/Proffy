import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import TeacherList from "../pages/TeacherList";
import Favorites from "../pages/Favorites";

const { Navigator, Screen } = createBottomTabNavigator();

export default function App() {
  return (
    <Navigator
      screenOptions={{
        tabBarStyle: {
          elevation: 0,
          shadowOpacity: 0,
          height: 64,
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarIconStyle: {
          flex: 0,
          width: 20,
          height: 20,
        },
        tabBarLabelStyle: {
          fontFamily: "ArchivoBold",
          fontSize: 13,
          marginLeft: 16,
        },
        tabBarInactiveBackgroundColor: "#Fafafc",
        tabBarActiveBackgroundColor: "#ebebf5",
        tabBarInactiveTintColor: "#c1bccc",
        tabBarActiveTintColor: "#32264d",
        headerShown: false,
      }}
    >
      <Screen
        name="TeacherList"
        component={TeacherList}
        options={{
          tabBarLabel: "Proffys",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="ios-easel"
              size={size}
              color={focused ? "#8257e5" : color}
            />
          ),
        }}
      />
      <Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarLabel: "Favoritos",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="ios-heart"
              size={size}
              color={focused ? "#8257e5" : color}
            />
          ),
        }}
      />
    </Navigator>
  );
}
