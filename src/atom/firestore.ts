import { IResult } from "./user";
import { IUser } from "@/atom/user";
import {
  addDoc,
  db,
  getDocs,
  collection,
  setDoc,
  doc,
  query,
  where,
} from "@/fbase";

export async function addUser({
  uid,
  email,
  nickname,
  createdAt,
  status,
  role,
}: IUser) {
  const result = { status: 200, message: "" };
  try {
    const user = await setDoc(doc(db, "users", uid), {
      email,
      nickname,
      createdAt,
      updatedAt: new Date().getTime() + "",
      status,
      role,
    });
  } catch (error) {
    console.log("ERR: ", error);
    result.status = 999;
    result.message = error + "";
  }
  return result;
}

export async function findUser(email: string) {
  let message = {};
  const q = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  try {
    querySnapshot.forEach((doc) => {
      message = { ...doc.data() };
    });
  } catch (error) {
    console.log("ERR: ", error);
  }
  return Object.keys(message).length === 0
    ? { status: 999, message }
    : { status: 200, message };
}

export async function getUser() {
  const querySnapshot = await getDocs(collection(db, "bbs"));
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
    // console.log(`${doc.id} => ${doc.data()}`);
  });
}

// 소문자, 특수문자 포함, 8~ 24
