import React from "react";
import Skeleton from "react-loading-skeleton";
import usePhotos from "../hooks/usePhotos";
import Post from "./post/Post";

const Timeline = () => {
  const photos = usePhotos();
  return (
    <div className="container col-span-2">
      {!photos ? (
        <>
          {[...new Array(4)].map((item, index) => (
            <Skeleton key={index} count={1} height={500} width={640} />
          ))}
        </>
      ) : photos?.length > 0 ? (
        photos.map((content, index) => {
          return (
            <Post key={content.docId} content={content}>
              {content.imageSrc}
            </Post>
          );
        })
      ) : (
        <p className="text-center text-2xl">Follow people to see photos</p>
      )}
    </div>
  );
};

export default Timeline;
