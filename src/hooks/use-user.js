import { useState, useEffect, useContext } from "react";
// call firebase firestore to get user data to show in the sidebar
import UserContext from "../context/user";
import { getUserByUserId } from "../services/firebase";

import React from "react";

const useUser = () => {
  const [activeUser, setActiveUser] = useState({});
  const user = useContext(UserContext);

  useEffect(() => {
    async function getUserObjByUserId() {
      // query users from firestore
      const [response] = await getUserByUserId(user.uid);
      setActiveUser(response);
    }
    if (user?.uid) {
      getUserObjByUserId();
    }
  }, [user]);

  return { user: activeUser };
};

export default useUser;
