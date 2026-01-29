import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebaseConfig";

export const AuthContext = createContext<{
  user: User | null;
  role: string | null;
  setRole: (role: string | null) => void;
}>({
  user: null,
  role: null,
  setRole: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);

      if (u) {
        const snap = await getDoc(doc(db, "users", u.uid));
        if (snap.exists()) {
          setRole(snap.data().role);
        } else {
          setRole(null);
        }
      } else {
        setRole(null);
      }

      setLoading(false);
    });

    return unsub;
  }, []);

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};
