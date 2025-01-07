import Login from "@components/auth/Login";
import UnderDevelopment from "@customComponents/Underdevelopment";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
function MainStacks() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="temp" component={UnderDevelopment} />
    </Stack.Navigator>
  );
}

export default MainStacks;
