import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LugaresScreen from "../screens/LugaresScreen";
import DetalleLugarScreen from "../screens/DetalleLugarScreen";

const Stack = createStackNavigator();

const LugaresNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "transparent" },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTransparent: true,
      }}
    >
      <Stack.Screen name="LugaresForm" component={LugaresScreen} />
      <Stack.Screen name="DetalleLugar" component={DetalleLugarScreen} />
    </Stack.Navigator>
  );
};

export default LugaresNavigation;
