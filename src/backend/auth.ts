import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { auth, firestore } from "./firebase";
import { addDoc, collection } from "firebase/firestore";

async function LoginWithEmail(Credentials: string, Password: string) {
  try {
    const res = await signInWithEmailAndPassword(auth, Credentials, Password);
    return res;
  } catch (error) {
    console.error("Error logging in with email and password:", error);
  }
}

async function CreateAccount(
  firstname: string,
  lastname: string,
  username: string,
  email: string,
  password: string
) {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    if (res) {
      const docRef = await addDoc(collection(firestore, "users"), {
        firstname: firstname,
        lastname: lastname ?? "",
        username: username,
        email: email,
      });
      if (docRef) {
        return true;
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export { LoginWithEmail, CreateAccount };
