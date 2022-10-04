import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Issues } from "../screens/Issues";
import { Projects } from "../screens/Projects";
import { Register } from "../screens/Register";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Projects} />
      <Screen name="issues" component={Issues} />
      <Screen name="new" component={Register} />
    </Navigator>
  );
}
