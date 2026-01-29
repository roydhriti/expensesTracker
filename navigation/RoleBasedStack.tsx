

import { createStackNavigator } from "@react-navigation/stack";
import { useState } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";

import AddExpenseScreen from "@/screens/AddExpenseScreen";
import ExpensesScreen from "@/screens/ExpensesScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import UserListScreen from "@/screens/UserListScreen";


const Stack = createStackNavigator();

type Props = {
  role: "admin" | "user";
};

export default function RoleBasedStack({ role }: Props) {
  const [profileVisible, setProfileVisible] = useState(false);

  const openProfile = () => setProfileVisible(true);
  const closeProfile = () => setProfileVisible(false);

  const screenHeader = () => ({
    headerRight: () => (
      <View style={{ flexDirection: "row", marginRight: 10 }}>
        {/* Profile Button */}
        <TouchableOpacity
          style={{
            backgroundColor: "#1976d2",
            paddingHorizontal: 12,
            paddingVertical: 6,
            height:30,
            borderRadius: 50, 
          }}
          onPress={openProfile}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>Profile</Text>
        </TouchableOpacity>

        <View style={{ width: 10 }} />

        {/* Logout Button */}
        {/* <TouchableOpacity
          style={{
            backgroundColor: "#d32f2f",
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 6,
          }}
          onPress={async () => {
            try {
              await logoutUser();
            } catch {
              Alert.alert("Error", "Failed to logout");
            }
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>Logout</Text>
        </TouchableOpacity> */}
      </View>
    ),
  });

  const initialRoute = role === "admin" ? "UserList" : "Expenses";

  return (
    <>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="Expenses"
          component={ExpensesScreen}
          options={screenHeader}
        />

        <Stack.Screen
          name="UserList"
          component={UserListScreen}
          options={screenHeader}
        />

        <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
      </Stack.Navigator>

      {/* Profile Modal */}
      <Modal
        visible={profileVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={closeProfile} 
      >
        {/* Detect outside click */}
        <TouchableWithoutFeedback onPress={closeProfile}>
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.5)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Stop outside click propagation */}
            <TouchableWithoutFeedback>
              <View
                style={{
                  width: "85%",
                  backgroundColor: "#fff",
                  borderRadius: 12,
                  padding: 20,
                }}
              >
                {/* Render the ProfileScreen content */}
                <ProfileScreen />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}
