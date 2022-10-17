import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { deleteAdminAction } from "../../redux/actions/admins";
import {
  deleteUserAction,
} from "../../redux/actions/users";
import {
  getItemByUserIdAction,
  deleteItemsAction,
  getItemsAction,
} from "../../redux/actions/items";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";
import { gridColumnsTotalWidthSelector } from "@mui/x-data-grid";
import Items from "../items/Items";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const roles = {
  1: "User",
  2: "Admin",
  3: "SuperAdmin",
};

const SingleUserItems = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  console.log("Userid", userId);
  //const items = useSelector((state) => state.items.data);

  const state = useSelector((state) => state);
  let items = state.items.data.filter((item) => item.userId == userId) || null;
  console.log("items", items);

  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [itemId, setItemId] = useState(0);


  const dispatchDeleteItem = async (itemData) => {
    await dispatch(deleteItemsAction(itemData));
    console.log("delete77777777", itemData);
    setOpenDelete(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  useEffect(() => {
    const fetchItems = async () => {
      //!item && await dispatch(getUsersAction());
       !items && await dispatch(getItemByUserIdAction(userId));
    };
    fetchItems();
  }, []);

  const dispatchDeleteUser = async (user) => {
    await dispatch(deleteUserAction(user));
    setOpen(false);
  };

  return (
    <div className="list">
      {/* //  <Sidebar /> */}
      <div className="listContainer">
      <br></br><br></br>

        {/* <Navbar /> */}
        <TableContainer component={Paper}>
          <Table
            aria-label="admins table"
            stickyHeader
            sx={{ width: "60em", margin: "auto" }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <h3> Id</h3>
                </TableCell>
                <TableCell align="center">
                  <h3></h3>
                </TableCell>
                <TableCell align="center">
                  <h3></h3>
                </TableCell>
                {/* <TableCell align="center">
                  <h3>isReported <br></br>
                    item Id</h3>
                </TableCell> */}
                <TableCell align="left">
                  <h3>Title</h3>
                </TableCell>
                <TableCell align="left">
                  <h3>Price</h3>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items && items.length > 0 ? (
                items.map((Item, index) => (
                  <TableRow key={index}>
                    <>
                      <TableCell>
                        <h6>{Item.id}</h6>
                      </TableCell>
                      <TableCell>
                        {" "}
                        <img
                          src={
                            Item?.pictures[0]?.url ||
                            "https://media.istockphoto.com/vectors/no-image-available-sign-vector-id936182806?k=20&m=936182806&s=612x612&w=0&h=pTQbzaZhCTxWEDhnJlCS2gj65S926ABahbFCy5Np0jg="
                          }
                          style={{
                            width: "5em",
                            height: "auto",
                            borderRadius: "30%",
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        {Item.pictures && Item.pictures ? (
                          Item.pictures.map((pic, i) => (
                            <>
                              <div key={i} className="photos">
                                {/* <img src={pic?.url} style={{ width: "5em", height: "auto" }} /> */}
                                {/* <p>first pic {Item.pictures[0].url}</p> */}
                              </div>
                            </>
                          ))
                        ) : (
                          <p>nopic</p>
                        )}
                      </TableCell>
                      <TableCell>
                        <h4>{Item.title}</h4>
                      </TableCell>
                      <TableCell>
                        <h4>${Item.price}</h4>
                      </TableCell>
                      <TableCell align="center">
                        <p> See details</p>
                        <Link to={`/items/item/${Item?.id}`}>
                          {<RemoveRedEyeIcon />}{" "}
                        </Link>
                      </TableCell>
                      
                    </>
                  </TableRow>
                ))
              ) : (
                <Typography align="center">No items to show for this User</Typography>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/*  */}
      </div>
    </div>
  );
};

export default SingleUserItems;