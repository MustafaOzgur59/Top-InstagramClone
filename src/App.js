import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import * as ROUTES from "./constants/routes";
import UserContext from "./context/user";
import useAuthListener from "./hooks/use-auth-listener";

const Login = lazy(() => import("../src/pages/Login"));
const SignUp = lazy(() => import("../src/pages/signUp"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
function App() {
  const { user } = useAuthListener();
  return (
    <UserContext.Provider value={user}>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route
              path={ROUTES.LOGIN}
              element={user ? <Navigate to={ROUTES.DASHBOARD} /> : <Login />}
            />
            <Route
              path={ROUTES.SIGN_UP}
              element={user ? <Navigate to={ROUTES.DASHBOARD} /> : <SignUp />}
            />
            <Route
              path={ROUTES.DASHBOARD}
              element={user ? <Dashboard /> : <Navigate to={ROUTES.LOGIN} />}
            />
            <Route path={ROUTES.PROFILE} element={<Profile />} />

            <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
