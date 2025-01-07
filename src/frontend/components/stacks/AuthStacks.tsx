import { createStackNavigator } from "@react-navigation/stack";
import Login from "@components/auth/Login";
import NewUser from "@components/auth/NewUser";

export type AuthStackParamsList = {
  Login: undefined;
  NewUser: undefined;
};
const Stack = createStackNavigator<AuthStackParamsList>();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="NewUser" component={NewUser} />
    </Stack.Navigator>
  );
}
