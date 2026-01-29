import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider } from "./context/AuthContext";
import RootNavigator from "./navigation/RootNavigator";
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
        <Toast />
      </NavigationContainer>
    </AuthProvider>
  );
}
