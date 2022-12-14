import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { updateFollowedUserFollowers } from "../../services/firebase";
import { updateLoggedInUserFollowing } from "../../services/firebase";

const SuggestedProfile = ({
  profileDocId,
  username,
  profileId,
  userId,
  loggedInUserDocId,
  loggedInUserProfileId,
}) => {
  const [followed, setFollowed] = useState(false);

  const handleFollowUser = async () => {
    setFollowed(true);

    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
    await updateFollowedUserFollowers(profileDocId, userId, false);
  };

  useEffect(() => {}, []);

  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <img
          src={`/images/avatars/${username}.jpg`}
          alt="profile photoo"
          className="rounded-full w-8 flex mr-3"
        />
        <Link to={`/p/${username}`} className="font-bold text-sm">
          {username}
        </Link>
      </div>
      <div>
        <button
          onClick={handleFollowUser}
          className="text-xs font-bold text-blue-medium"
        >
          Follow
        </button>
      </div>
    </div>
  ) : null;
};

SuggestedProfile.propTypes = {
  profileDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  loggedInUserDocId: PropTypes.string.isRequired,
};

export default SuggestedProfile;
