import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { auth, firestore } from "./firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import * as yup from "yup";

async function LoginWithEmail(Credentials: string, Password: string) {
  const emailSchema = yup.string().email();
  interface User {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
  }
  try {
    emailSchema.validate({
      emailSchema,
    });
    const res = await signInWithEmailAndPassword(auth, Credentials, Password);
    return res;
  } catch (error) {
    try {
      if (error instanceof yup.ValidationError) {
        const q = query(
          collection(firestore, "users"),
          where("username", "==", Credentials)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const firstDoc = querySnapshot.docs[0];
          const data = firstDoc.data() as User;
          const email = data["email"];
          const res = await signInWithEmailAndPassword(auth, email, Password);
          return res;
        }
      }
    } catch (error) {}
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
        flightHours: 0,
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
