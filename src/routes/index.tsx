import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useAuth } from "../hooks";
import { SignIn } from "../screens/SignIn";

import { AppRoutes } from "./app-routes";

export function Routes() {
  const { isLogged } = useAuth();

  return (
    <NavigationContainer>
      {isLogged ? <AppRoutes /> : <SignIn />}
    </NavigationContainer>
  );
}
