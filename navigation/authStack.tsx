import LoginScreen from "@/screens/LoginScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import RegisterScreen from "@/screens/RegisterScreen";
import { createStackNavigator } from "@react-navigation/stack";


const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />

    </Stack.Navigator>
  );
}
