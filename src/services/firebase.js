import { firebase, FieldValue } from "../lib/firebase";

export async function doesUserNameExist(userName) {
  const res = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", userName)
    .get();
  console.log(res);
  return res.docs.map((user) => user.data().length > 0);
}

export async function getUserByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docID: item.id,
  }));

  return user;
}

export async function getSuggestedProfiles(userId, following) {
  const result = await firebase.firestore().collection("users").limit(10).get();
  // docId == document id of the suggested profile not the user's id
  // profile.userId is the id ıf the suggested profile
  // following and followers array holds document ids not user ids
  return result.docs
    .map((user) => {
      console.log("User id", user.data().userId);
      return { ...user.data(), docId: user.id };
    })
    .filter(
      (profile) =>
        profile.userId !== userId && !following.includes(profile.userId)
    );
}

export async function updateLoggedInUserFollowing(
  loggedInUserDocId, // logged in users doc id
  profileId, // followed users profile id
  isFollowingProfile // boolean indicating whether logged in user is following the profile
) {
  return firebase
    .firestore()
    .collection("users")
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId),
    });
}

export async function updateFollowedUserFollowers(
  profileDocId,
  loggedInUserProfileId,
  isFollowingProfile
) {
  return firebase
    .firestore()
    .collection("users")
    .doc(profileDocId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(loggedInUserProfileId)
        : FieldValue.arrayUnion(loggedInUserProfileId),
    });
}

export async function getPhotos(userId, following) {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "in", following)
    .get();
  console.log("Result in getPhotos : ", result);

  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }
      const user = await getUserByUserId(userId);
      const { username } = user[0];
      return { username, ...photo, userLikedPhoto };
    })
  );
  return photosWithUserDetails;
}
