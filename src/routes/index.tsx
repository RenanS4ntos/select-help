import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { SignIn } from "../screens/SignIn";

import { AppRoutes } from "./app-routes";

export function Routes() {
  // const { user } = useAuth();
  const user = true;

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <SignIn />}
    </NavigationContainer>
  );
}
