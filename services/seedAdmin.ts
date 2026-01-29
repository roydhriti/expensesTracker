// services/seedAdmin.ts
import { db } from "../firebase/firebaseConfig";
import { setDoc, doc } from "firebase/firestore";

export const seedAdmin = async () => {
  const adminUid = "default-admin-uid";

  await setDoc(doc(db, "users", adminUid), {
    uid: adminUid,
    name: "Admin",
    email: "admin@dhriti.com",
    role: "admin",
    password: "admin123",
  });

  console.log("Admin user created");
};