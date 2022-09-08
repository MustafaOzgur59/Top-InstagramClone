import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { getUserByUserId, getPhotos } from "../services/firebase";

const usePhotos = () => {
  const user = useContext(UserContext);
  const { uid: userId } = user;
  const [photos, setPhotos] = useState(null);
  console.log("User: ", user);
  useEffect(() => {
    async function getTimelinePhotos() {
      const [currentUser] = await getUserByUserId(userId);
      let followedUserPhotos = [];
      console.log("Current user following : ", currentUser.following);
      // is user follows anyone
      if (currentUser.following.length > 0) {
        followedUserPhotos = await getPhotos(userId, currentUser.following);
      }

      followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
      setPhotos(followedUserPhotos);
    }
    getTimelinePhotos();
  }, [userId]);

  return photos;
};

export default usePhotos;
