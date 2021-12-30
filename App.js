import React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchPage from "./screens/SearchPage";
import DetailsPage from "./screens/DetailsPage";
import ReviewsPage from "./screens/ReviewsPage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Search"
          component={SearchPage}
          options={{
            title: "Search",
            headerStyle: {
              backgroundColor: "gold",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            },
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsPage}
          options={{
            title: "Details",
            headerStyle: {
              backgroundColor: "gold",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            },
          }}
        />
        <Stack.Screen
          name="Reviews"
          component={ReviewsPage}
          options={{
            title: "User Reviews",
            headerStyle: {
              backgroundColor: "gold",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
