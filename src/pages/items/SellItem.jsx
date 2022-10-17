import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "bootstrap/dist/css/bootstrap.css";

import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
//import "./sellItem-style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import SimpleImageSlider from "react-simple-image-slider";
import PlaceIcon from "@mui/icons-material/Place";
import Categories from "../../pages/categories/Categories";

import {
  getItemsAction,
  getItemAction,
  deleteItemsAction,
} from "../../redux/actions/items";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CancelIcon from "@mui/icons-material/Cancel";
import ButtonGroup from "@mui/material/ButtonGroup";
import { gridColumnsTotalWidthSelector } from "@mui/x-data-grid";
import {
  deleteUserAction,
  deleteUserLinkAction,
  getUserAction,
  getUserLinksAction,
  getUsersAction,
} from "../../redux/actions/users";
import { addItemAction, addPictureAction } from "../../redux/actions/items";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

// import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";

// const roles = {
//     "1": "SuperAdmin",
//     "2": "Admin",
//     "3": "User"
// }

const SellItem = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const categories = useSelector((state) => state.categories.data);
  const [categoryId, setCategoryId] = useState(0);
  const state = useSelector((state) => state);
  const currentUser =
    JSON.parse(window.localStorage.getItem("user") || null) || null;
  const userId = currentUser?.id || null;
  console.log("currentuser", userId);

  const currentUserItems =
    state.items.data.filter((item) => item.userId == userId) || null;
  const currentUserLastItemId =
    currentUserItems[currentUserItems.length - 1]?.id;
  //const items = state.items.data;
  console.log("currentUserItems from add item", currentUserItems);
  console.log(
    "currentUser Last Added Item",
    currentUserItems[currentUserItems.length - 1]?.id
  );
  // let userId = item?.userId;
  // let user = state.users.data.find((user) => user.id == userId) || null;
  // console.log("33333333", user);

  // console.log("33333333", item);
  const [open, setOpen] = useState(false);

  const [itemData, setItemData] = useState({
    categoryId: "",
    title: "",
    description: "",
    price: "",
    tel: "",
    location: "",
  });
  console.log("item data ", itemData);
  const handleAddItem = async (e) => {
    e.preventDefault();
    await dispatch(addItemAction(itemData))
      // .then(() => navigate("/"))
      .catch((e) => console.error(e));
  };

  const [itemPictureData, setItemPictureData] = useState({
    itemId: currentUserLastItemId,
    file: null,
  });
  console.log("item picture data ", itemPictureData);

  console.log("item picture data ", itemPictureData);

  const handleAddItemPicture = async (e) => {
    e.preventDefault();
    setloading(true);
    await dispatch(addPictureAction(itemPictureData))
      .then(() => setloading(false))
      .catch((e) => setloading(false));
  };

  useEffect(() => {
    const fetchitems = async () => {
      await dispatch(getItemsAction());
    };
    fetchitems();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     !user && (await dispatch(getUsersAction()));
  //     await dispatch(getUserAction(userId));
  //   };
  //   fetchUsers();
  // }, []);

  const theme = createTheme();

  const handleInputChange = (e) => {
    itemData[e.target.name] = e.target.value;
  };

  return (
    <>
      <Navbar />

      <div className="d-flex row justify-content-center ">
        <div className="text-center">
          <h1>Hi, Welcome Bargain Hunters Add your Add here</h1>
        </div>
        <div
          className="col-12 col-md-8 m-3 "
          style={{ backgroundColor: "lightblue" }}
        >
          <div className="row ">
            <div className="col-12 m-2">
              <h2 className="text-center">Add Item</h2>
            </div>
          </div>
          <div className="row tm-edit-product-row ">
            <div className="col-xl-10 col-lg-8 col-md-6 m-5">
              <form action="" className="tm-edit-product-form">
                <div className="form-group mb-3">
                  <label htmlFor="title">Title</label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    className="form-control validate"
                    required=""
                    onChange={handleInputChange}
                  />
                </div>

                <label htmlFor="categoryId"> Category </label>
                <select
                  className="custom-select tm-select-accounts m-2 p-2"
                  id="categoryId"
                  onChange={(e) =>
                    setItemData({
                      ...itemData,
                      categoryId: e.target.value,
                    })
                  }
                >
                  {categories?.length ? (
                    categories.map((Category, i) => (
                      <option key={i} value={Category.id}>
                        {Category.name}
                      </option>
                    ))
                  ) : (
                    <p>No categories currently</p>
                  )}
                </select>
                <div className="form-group mb-3">
                  <label htmlFor="price">Price</label>
                  <input
                    id="price"
                    name="price"
                    type="text"
                    className="form-control validate"
                    required=""
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="tel">Tel</label>
                  <input
                    id="tel"
                    name="tel"
                    type="text"
                    className="form-control validate"
                    required=""
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="location">Location</label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    className="form-control validate"
                    onChange={handleInputChange}
                    required=""
                  />
                </div>

                <div className="form-group  mb-3 col-12">
                  <label htmlFor="description">Description</label>

                  <textarea
                    className="form-control validate"
                    id="description"
                    name="description"
                    onChange={handleInputChange}
                    rows="5"
                    cols="33"
                  ></textarea>
                </div>
                <div>
                </div>
              </form>
            </div>

            <div className="col-12 text-center">
              <button
                type="submit"
                onClick={handleAddItem}
                className="btn btn-primary btn-block text-uppercase"
              >
                Add Item Now
              </button>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12 mx-auto mb-4">
              <div className="tm-product-img-dummy mx-auto">
                <i className="fas fa-cloud-upload-alt tm-upload-icon"></i>
              </div>
              <div className="custom-file mt-3 mb-3">
                <input
                  id="file"
                  name="file"
                  type="file"
                  onChange={(e) =>
                    setItemPictureData({
                      itemId: currentUserLastItemId,
                      file: e.target.files[0],
                    })
                  }
                />
                <input
                  type="button"
                  // disabled={true}
                  className="btn btn-primary btn-block mx-auto"
                  onClick={(e) => handleAddItemPicture(e)}
                  value="UPLOAD ITEM IMAGE"
                />
                {loading && <CircularProgress color="success" />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellItem;



//  <nav className="navbar navbar-expand-xl">
// <div className="container h-100">

//   <button className="navbar-toggler ml-auto mr-0" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//     <i className="fas fa-bars tm-nav-icon"></i>
//   </button>

//   <div className="collapse navbar-collapse" id="navbarSupportedContent">
//     <ul className="navbar-nav mx-auto h-100">
//       <li className="nav-item">
//         <Link className="nav-link" href="index.html">
//           <i className="fas fa-tachometer-alt"></i> Dashboard
//           <span className="sr-only">(current)</span>
//         </Link>
//       </li>
//       <li className="nav-item dropdown">
//         <Link className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//           <i className="far fa-file-alt"></i>
//           <span> Reports <i className="fas fa-angle-down"></i> </span>
//         </Link>
//         <div className="dropdown-menu" aria-labelledby="navbarDropdown">
//           <Link className="dropdown-item" href="#">Daily Report</Link>
//           <Link className="dropdown-item" href="#">Weekly Report</Link>
//           <Link className="dropdown-item" href="#">Yearly Report</Link>
//         </div>
//       </li>
//       <li className="nav-item">
//         <Link className="nav-link active" href="products.html">
//           <i className="fas fa-shopping-cart"></i> Items
//         </Link>
//       </li>

//       <li className="nav-item">
//         <Link className="nav-link" href="accounts.html">
//           <i className="far fa-user"></i> Accounts
//         </Link>
//       </li>
//       <li className="nav-item dropdown">
//         <Link className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//           <i className="fas fa-cog"></i>
//           <span> Settings <i className="fas fa-angle-down"></i> </span>
//         </Link>
//         <div className="dropdown-menu" aria-labelledby="navbarDropdown">
//           <Link className="dropdown-item" href="#">Profile</Link>
//           <Link className="dropdown-item" href="#">Billing</Link>
//           <Link className="dropdown-item" href="#">Customize</Link>
//         </div>
//       </li>
//     </ul>
//     <ul className="navbar-nav">
//       <li className="nav-item">
//         <Link className="nav-link d-block" href="login.html">
//           Admin, <b>Logout</b>
//         </Link>
//       </li>
//     </ul>
//   </div>
// </div>
// </nav>
// <div className="container tm-mt-big tm-mb-big">
// <div className="row">
//   <div className="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">

//   </div>
// </div>
// </div>
// <footer className="tm-footer row tm-mt-small">
//   <div className="col-12 font-weight-light">
//     <p className="text-center text-white mb-0 px-4 small">
//       Copyright © <b>2018</b> All rights reserved.

//       Design: <Link rel="nofollow noopener" href="https://templatemo.com" className="tm-footer-link">Template Mo</Link>
//   </p>
//   </div>
// </footer>

// <div id="ui-datepicker-div" className="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>

{
  /* <div className="form-group mb-3"key={i} >
         
<label htmlFor="category">Category</label>
<select className="custom-select tm-select-accounts" id="category">
  <option selected="">Select category</option>
  <option value="1">New Arrival</option>
  <option value="2">Most Popular</option>
  <option value="3">Trending</option>
</select>
</div> */
}
