import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
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
  deleteItemsByUserAction,
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
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CancelIcon from "@mui/icons-material/Cancel";
import ButtonGroup from "@mui/material/ButtonGroup";
import { gridColumnsTotalWidthSelector } from "@mui/x-data-grid";
import Items from "../items/Items";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const roles = {
  1: "User",
  2: "Admin",
  3: "SuperAdmin",
};

const SingleUserAds = () => {
  const dispatch = useDispatch();
  const currentUser =
  JSON.parse(window.localStorage.getItem("user") || null) || null;
const curruserId = currentUser?.id || null;
   const { userId } = useParams();
  console.log("Userid", userId);
  //const items = useSelector((state) => state.items.data);

  const state = useSelector((state) => state);
  // let items = state.items.data.filter((item) => item.userId == userId && item.userId == curruserId ) || null;
  let items = state.items.data.filter((item) => item.userId == userId ) || null;

  console.log("items", items);

  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [itemId, setItemId] = useState(0);


  const dispatchDeleteItem = async (itemData) => {
    await dispatch(deleteItemsByUserAction(itemData));
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
      !items && (await dispatch(getItemByUserIdAction(userId)));
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const fetchitems = async () => {
      await dispatch(getItemsAction());
    };
    fetchitems();
  }, []);
  const dispatchDeleteUser = async (user) => {
    await dispatch(deleteUserAction(user));
    setOpen(false);
  };

  return (
    <div className="list">
       <Navbar />
      <div className="listContainer">
      <br></br><br></br>
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

                      {curruserId == userId ? (
                      <TableCell align="right">
                        <Button
                          color="error"
                          variant="outlined"
                          startIcon={<DeleteIcon />}
                          onClick={() => {
                            setItemId(Item.id);
                            handleClickOpenDelete();
                          }}
                        >
                          Delete
                        </Button>
                        <Dialog
                          open={openDelete}
                          onClose={handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                          maxWidth="sm"
                          fullWidth={true}
                        >
                          <DialogTitle
                            id="alert-dialog-title"
                            className="text-center"
                          >
                            {"Are you sure you want to delete this Item?"}
                          </DialogTitle>
                          <DialogActions
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <Button
                              color="primary"
                              variant="outlined"
                              startIcon={<CancelIcon />}
                              onClick={handleCloseDelete}
                              autoFocus
                            >
                              Cancel
                            </Button>
                            <Button
                              color="error"
                              variant="outlined"
                              startIcon={<DeleteIcon />}
                              onClick={() => {
                                dispatchDeleteItem(itemId);
                                // setOpenDelete(false)
                              }}
                            >
                              Delete
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </TableCell> ): null}
                      
                    </>
                  </TableRow>
                ))
              ) : (
                <Typography align="center">This user does not have ads yet!  / You dont have access </Typography>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/*  */}
      </div>
    </div>
  );
};

export default SingleUserAds;






// <TableCell align="right">
//                         <Button
//                           color="error"
//                           variant="outlined"
//                           startIcon={<DeleteIcon />}
//                           onClick={() => {
//                             setItemId(Item.id);
//                             handleClickOpenDelete();
//                           }}
//                         >
//                           Delete
//                         </Button>
//                         <Dialog
//                           open={openDelete}
//                           onClose={handleClose}
//                           aria-labelledby="alert-dialog-title"
//                           aria-describedby="alert-dialog-description"
//                           maxWidth="sm"
//                           fullWidth={true}
//                         >
//                           <DialogTitle
//                             id="alert-dialog-title"
//                             className="text-center"
//                           >
//                             {"Are you sure you want to delete this Item?"}
//                           </DialogTitle>
//                           <DialogActions
//                             sx={{ display: "flex", justifyContent: "center" }}
//                           >
//                             <Button
//                               color="primary"
//                               variant="outlined"
//                               startIcon={<CancelIcon />}
//                               onClick={handleCloseDelete}
//                               autoFocus
//                             >
//                               Cancel
//                             </Button>
//                             <Button
//                               color="error"
//                               variant="outlined"
//                               startIcon={<DeleteIcon />}
//                               onClick={() => {
//                                 dispatchDeleteItem(itemId);
//                                 // setOpenDelete(false)
//                               }}
//                             >
//                               Delete
//                             </Button>
//                           </DialogActions>
//                         </Dialog>
//                       </TableCell>





// {items && items.length ? (
//   items.map((Item, index) => (
//     <TableRow key={index}>
//       <>
//         <TableCell>
//           <h4>{Item.id} hi</h4>
//           {Item.pictures && Item.pictures ? (
//             Item.pictures.map((pic, i) => (
//               <>
//                 <div key={i} className="photos">
//                   <img
//                     src={pic?.url}
//                     style={{ width: "5em", height: "auto" }}
//                   />
//                   <p>first pic {Item.pictures[0].url}</p>
//                 </div>
//               </>
//             ))
//           ) : (
//             <p>nopic</p>
//           )}
//         </TableCell>
//         <TableCell>
//           <Link to={`/items/item/${Item?.id}`}>
//             click here for details
//             <img
//               src={Item?.title}
//               style={{ width: "4em", height: "auto" }}
//             />
//           </Link>
//           <h4>{Item.title}kkkk</h4>
//           {Item?.pictures?.join(",")}
//         </TableCell>
//         <TableCell>
//           <img
//             src={Item?.pictures.join(", ")}
//             style={{ width: "15em", height: "auto" }}
//           />
//         </TableCell>
//         <Button
//           color="error"
//           variant="outlined"
//           value={Item.id}
//           startIcon={<DeleteIcon />}
//           onClick={() => {
//             dispatch(deleteItemsByUserAction(Item));
//             dispatch(getItemByUserIdAction(userId));
//           }}
//         >
//           Delete direct
//         </Button>
//         <TableCell align="right">
//           <Button
//             color="error"
//             variant="outlined"
//             startIcon={<DeleteIcon />}
//             onClick={handleClickOpenDelete}
//           >
//             Delete OK
//           </Button>
//           <Dialog
//             open={openDelete}
//             onClose={handleClose}
//             aria-labelledby="alert-dialog-title"
//             aria-describedby="alert-dialog-description"
//             maxWidth="sm"
//             fullWidth={true}
//           >
//             <DialogTitle
//               id="alert-dialog-title"
//               className="text-center"
//             >
//               {"Are you sure you want to delete this Item?"}
//             </DialogTitle>
//             <DialogActions
//               sx={{ display: "flex", justifyContent: "center" }}
//             >
//               <Button
//                 color="primary"
//                 variant="outlined"
//                 startIcon={<CancelIcon />}
//                 onClick={handleCloseDelete}
//                 autoFocus
//               >
//                 Cancel
//               </Button>
//               <Button
//                 color="error"
//                 variant="outlined"
//                 value={Item.id}
//                 startIcon={<DeleteIcon />}
//                 onClick={() => {
//                   dispatch(deleteItemsByUserAction(Item));
//                   //dispatch(getItemByUserIdAction(userId))
//                   dispatch(getItemsAction());
//                 }}
//               >
//                 Delete
//               </Button>
//             </DialogActions>
//           </Dialog>
//         </TableCell>
//       </>
//     </TableRow>
//   ))
// ) : (
//   <Typography align="center">
//     No items to show for this User{" "}
//   </Typography>
// )}