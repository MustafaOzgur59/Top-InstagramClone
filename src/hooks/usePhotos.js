import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { getUserByUserId, getPhotos } from "../services/firebase";

const usePhotos = () => {
  const user = useContext(UserContext);
  const { uid: userId } = user;
  const [photos, setPhotos] = useState(null);
  console.log("user : ", userId);

  useEffect(() => {
    async function getTimelinePhotos() {
      const [{ following }] = await getUserByUserId(userId);
      let followedUserPhotos = [];
      console.log("Following : ", following);
      // is user follows anyone
      if (following.length > 0) {
        followedUserPhotos = await getPhotos(userId, following);
      }

      followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
      console.log("Followed user photos : ", followedUserPhotos);
      setPhotos(followedUserPhotos);
    }

    console.log(userId);
    getTimelinePhotos();
  }, [userId]);

  return photos;
};

export default usePhotos;
