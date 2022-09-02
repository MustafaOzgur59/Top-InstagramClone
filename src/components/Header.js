import React, { useContext } from "react";
import FirebaseContext from "../context/firebase";
import UserContext from "../context/user";
import * as ROUTES from "../constants/routes";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { firebase } = useContext(FirebaseContext);
  const user = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <div>
      <header className="h-16 bg-white border-b border-gray-primary mb-8">
        <div className="container mx-auto max-w-screen-lg h-full">
          <div className="flex justify-between h-full">
            <div className="text-gray-700 text-center flex items-center align-items">
              <h1 className="flex justfiy-center w-full">
                <Link to={ROUTES.DASHBOARD} aria-label="Instagram Logo">
                  <img src="/images/logo.png" alt="Instagram Logo" />
                </Link>
              </h1>
            </div>
            <div className="text-gray-700 text-center flex items-center align-items">
              {user ? (
                // have a user
                <>
                  <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                    <svg
                      className="w-8 mr-6 text-black-light cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>
                  </Link>
                  <button
                    type="button"
                    title="Sign Out"
                    onClick={() => {
                      firebase.auth().signOut();
                      navigate(ROUTES.LOGIN);
                    }}
                    onKeyDown={(event) => {
                      if (event.keyCode === "Enter") {
                        firebase.auth().signOut();
                        navigate(ROUTES.LOGIN);
                      }
                    }}
                  >
                    <svg
                      className="w-8 mr-6 text-black-light cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                      />
                    </svg>
                  </button>
                  <div className="flex items-center cursor-pointer">
                    <Link to={`/p/${user.displayName}`}>
                      <img
                        src={`/images/avatars/${user.displayName}.jpg`}
                        className="rounded-full h-8 w-8 flex"
                        alt={`${user.displayName} profile`}
                      />
                    </Link>
                  </div>
                </>
              ) : (
                // dont have a user
                <>
                  <Link to={ROUTES.LOGIN}>
                    <button
                      type="button"
                      className="bg-blue-medium fon-bold text-sm rounded text-white w-20 h-8"
                    >
                      Log In
                    </button>
                  </Link>
                  <Link to={ROUTES.SIGN_UP}>
                    <button
                      type="button"
                      className="font-bold rounded text-blue-medium text-sm w-20 h-8"
                    >
                      Sign Up
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
