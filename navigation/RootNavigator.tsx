import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AuthStack from "./authStack";
import RoleBasedStack from "./RoleBasedStack";


export default function RootNavigator() {
  const { user, role } = useContext(AuthContext);

  if (!user) return <AuthStack />;

  if (role !== "admin" && role !== "user") return <AuthStack />;

  return <RoleBasedStack role={role} />;
}

