import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import colors from "../colors";
import LoginScreen from "../screens/Authentication/LoginScreen";

const Stack = createStackNavigator();

const AuthenticationStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: colors.YELLOW,
        },
        headerTintColor: colors.WHITE,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthenticationStack;
