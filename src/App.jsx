import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Requests from "./components/Requests";
import Connections from "./components/Connections";
import SignUp from "./components/SignUp";

const App = () => {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed/>}/>
              <Route path="/signup" element={<SignUp/>}/>
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile/>} />
              <Route path="/requests" element={<Requests/>}/>
              <Route path="/connections" element={<Connections/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
