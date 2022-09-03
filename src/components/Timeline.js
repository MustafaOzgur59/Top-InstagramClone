import React from "react";
import { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import UserContext from "../context/user";
import usePhotos from "../hooks/usePhotos";

const Timeline = () => {
  const photos = usePhotos();
  console.log("Photos from timeline : ", photos);
  console.log("Photos length : ", photos.length);
  return (
    <div className="container col-span-2">
      {!photos ? (
        <>
          {[...new Array(4)].map((item, index) => (
            <Skeleton key={index} count={1} height={400} width={320} />
          ))}
        </>
      ) : photos?.length > 0 ? (
        photos.map((content, index) => {
          return <p key={content.docId}>{content.imageSrc}</p>;
        })
      ) : (
        <p className="text-center text-2xl">Follow people to see photos</p>
      )}
    </div>
  );
};

export default Timeline;
