import React, { useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserByUsername } from "../services/firebase";
import * as ROUTES from "../constants/routes";
import Header from "../components/Header";
import UserProfile from "../components/profile/index";

export default function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [userExists, setUserExists] = useState(undefined);
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function checkUserExists() {
      const user = await getUserByUsername(username);
      if (user.length > 0) {
        setUserExists(true);
        setUser(user[0]);
      } else {
        setUserExists(false);
        navigate(ROUTES.NOT_FOUND);
      }
    }
    checkUserExists();
  }, [navigate, username]);
  return userExists ? (
    <div className="bg-gray-background ">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <UserProfile user={user} />
      </div>
    </div>
  ) : null;
}
