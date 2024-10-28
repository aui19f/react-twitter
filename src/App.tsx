import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, db, getDocs, collection } from "@/fbase";
import { addUser, getUser } from "@/atom/firestore";

function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const init = async () => {
    setIsLoading((prev) => !prev);
    setTimeout(() => setIsLoading((prev) => !prev), 50000);
  };
  useEffect(() => {
    init();
  }, []);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      // console.log("IF");
      // getUser();
      // addUser();
      // ...
    } else {
      navigate("/login");
      // console.log("ELSE");
      // User is signed out
      // ...
    }
  });

  return <>{isLoading ? <Loading /> : <Outlet />}</>;
}

export default App;
