import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchPage from "./SearchPage";

const Stack = createNativeStackNavigator();

const details = () => {
  return <Text>Details Page</Text>;
};
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Search"
          component={SearchPage}
          options={{ title: "Search" }}
        />
        <Stack.Screen
          name="Details"
          component={details}
          options={{ title: "Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
