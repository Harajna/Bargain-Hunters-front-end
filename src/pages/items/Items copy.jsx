import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import * as React from "react";
import "./items.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import { Link } from 'react-router-dom';
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CancelIcon from "@mui/icons-material/Cancel";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Stack } from "@mui/material";
import {
  getItemsAction,
  deleteItemsAction,
} from "../../redux/actions/items";

const Items = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.data);
//console.log(items[9].pictures[0].url);
//console.log(items[9].pictures);
//console.log("item666666",items[1].pictures[0].url);


  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [itemId, setItemId] = useState(0);

  const dispatchDeleteItem = async (itemData) => {
    await dispatch(deleteItemsAction(itemData));
    console.log("delete77777777", itemData)
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
    const fetchitems = async () => {
      await dispatch(getItemsAction());
      setRefresh(false)
    };
    fetchitems();
  }, [refresh]);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Box
          sx={{
            backgroundColor: "#e4a500",
            marginTop: "30px",
            borderRadius: "20px",
          }}
          mx={10}
          mt={-3}
          py={2} // height
          px={60}
        >
          <Typography
            sx={{ flex: "1 1 50%" }}
            variant="h5"
            id="tableTitle"
            component="div"
            color="white"
          >
            Items
          </Typography>
        </Box>
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
              {items && items.length > 1 ? (
                items.map((Item, index) => (
                  <TableRow key= {index}>
                    <>
                    <TableCell> 
                    <h6>{Item.id}</h6>
                    </TableCell> 
                    <TableCell>  <img src= {Item?.pictures[0]?.url ||
                      "https://media.istockphoto.com/vectors/no-image-available-sign-vector-id936182806?k=20&m=936182806&s=612x612&w=0&h=pTQbzaZhCTxWEDhnJlCS2gj65S926ABahbFCy5Np0jg=" } style={{ width: "5em", height: "auto" , borderRadius:"30%"}} /></TableCell>
                      <TableCell>
                       
                        { Item.pictures && Item.pictures?(
                         Item.pictures.map((pic, i) => (
                         <> 
                         <div  key= {i} className="photos">
                         {/* <img src={pic?.url} style={{ width: "5em", height: "auto" }} /> */}
                          {/* <p>first pic {Item.pictures[0].url}</p> */}
</div>
</>
                         ))           )
                         :<p>nopic</p>
                         }
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
                       {<RemoveRedEyeIcon/>}   </Link> 
                       </TableCell>
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
                              onClick={() =>{
                                dispatchDeleteItem(itemId);
                                // setOpenDelete(false)
                              }
                              }
                            >
                              Delete
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </TableCell>
                    </>
                  </TableRow>
                ))
              ) : (
                <Typography align="center">No items currently</Typography>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Items;
//<img src={Item?.pictures.join(', ').url} style={{ width: "15em", height: "auto" }} />
