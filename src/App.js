import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import RequireAuth from "./RequireAuth";
import Signin from "./pages/signin/Signin";
import SignUp from "./pages/signUp/SignUp";
import Profile from "./pages/profile/Profile";
import Notifications from "./components/notifications/Notifications";
import ListUsers from "./pages/listusers/ListUsers";
import SingleUser from "./pages/singleuser/SingleUser"
import ListAdmins from "./pages/listadmins/ListAdmins"
import Categories from "./pages/categories/Categories"
import Reports from "./pages/reports/Reports"
import Items from "./pages/items/Items"
import SingleItem from "./pages/singleitem/SingleItem"
import CategoryItems from "./pages/items/CategoryItems"
import SellItem from "./pages/items/SellItem";
import { Slider } from "@mui/material";
import SliderApp from "./pages/slider/SliderApp";
import SingleUserAds from "./pages/singleuser/SingleUserAds";



function App() {
  const { darkMode } = useContext(DarkModeContext);
  const currentUser =
    JSON.parse(window.localStorage.getItem("user") || null) || null;
  const userId = currentUser?.id || null;


  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>

          <Route path="signin" element={<Signin />} />

          <Route element={<RequireAuth />}>
            <Route path="/sell" element={<SellItem />} />
            <Route path="/home" element={<Home />} />
            <Route path={`/myads/:userId`} element={<SingleUserAds />} />
          </Route>

          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/slider" element={<SliderApp />} />

          <Route path="/">
            <Route index element={<Home />} />
          </Route>

          <Route path="users">
            {/* <Route index element={<ListUsers />} /> */}
            <Route path="/users/profile/:userId" element={<SingleUser />} />
          </Route>
          <Route path="admins">
            <Route index element={<ListAdmins />} />
          </Route>

          <Route path="categories">
            <Route index element={<Categories />} />
            <Route path="/categories/:categoryId" element={<CategoryItems />} />
          </Route>

          <Route path="items">
            <Route index element={<Items />} />
            <Route path="/items/item/:itemId" element={<SingleItem />} />
          </Route>

          <Route path="reports">
            <Route index element={<Reports />} />
          </Route>

        </Routes>
        <Notifications />
      </BrowserRouter>
    </div>
  );
}

export default App;
