import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import * as React from "react";
import "./items.scss";
import { useParams } from "react-router-dom";
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
import { Link } from "react-router-dom";
import PlaceIcon from '@mui/icons-material/Place';
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CancelIcon from "@mui/icons-material/Cancel";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Stack } from "@mui/material";
import { getItemsAction, deleteItemsAction, getItemByCategoryIdAction,
} from "../../redux/actions/items";

import {
  deleteUserAction,
  deleteUserLinkAction,
  getUserAction,
  getUserLinksAction,
  getUsersAction,
} from "../../redux/actions/users";
import FavoriteIcon from '@mui/icons-material/Favorite';

const Items = () => {
  const dispatch = useDispatch();
  const { categoryId } = useParams();
console.log("categoryId", categoryId)
  const state = useSelector((state) => state);
  // const items = useSelector((state) => state.items.data);
  const items = useSelector((state) => state.items.data);

  //  let items = state.items.data.filter((item) => item.categoryId == categoryId) || null;

  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [itemId, setItemId] = useState(0);
  const [search, setSearch] = useState("");

  const searchitem = items?.filter((item) => {
    return Object.keys(item)?.some((key) =>
      item[key]
        ?.toString()
        ?.toLowerCase()
        ?.includes(search?.toString().toLowerCase())
    );
  });

  const Truncate = (string, number) => {
    if (!string) {
      return null;
    }
    if (string.length <= number) {
      return string;
    }
    return string.slice(0, number) + "...";
  };

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

  // useEffect(() => {
  //   const fetchItems = async () => {
  //     !items && await dispatch(getItemsAction());
  //     await dispatch(getItemByCategoryIdAction(categoryId));
  //   };
  //   fetchItems();
  // }, []);


  useEffect(() => {
    const fetchitems = async () => {
      await dispatch(getItemsAction());
      setRefresh(false);
    };
    fetchitems();
  }, []);

  return (
    <>
     <Navbar/>

      <>
        <section className="item">
          <div className="container">
            <input
              className="item-input"
              placeholder="Search  Item"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <div className="grid" style={{gap:"20px"}}>
            {searchitem && searchitem.length ? (
              searchitem?.map((item) => (
                <div className="item-card" key={item.id}>
                                 

                  <img
                    className="card-image"
                    src={
                      item.pictures[0]?.url ||
                      "https://media.istockphoto.com/vectors/no-image-available-sign-vector-id936182806?k=20&m=936182806&s=612x612&w=0&h=pTQbzaZhCTxWEDhnJlCS2gj65S926ABahbFCy5Np0jg="
                    }   
                    style={{
                      width: "10em",
                      height: "auto",
                      borderRadius: "10%",
                    }}
                    alt={item.title}
                  /> 
                  <div className="card-body"
                  style={{
                    textAlign: "center", alignItems:"left" , margin:"0 auto"
                  }} 
                  >
                    <h5
                      className="card-title"
                      title={item.title.length >= 50 ? item.title : null}
                    >
                      {Truncate(item.title, 55)}
                    </h5>
                    <p className="card-description">
                      {Truncate(item.description, 55)}
                    </p>
                   
                    <h5 className="card-price text-success">${item.price}</h5>
                    <p className="text-center">
                   <PlaceIcon />{item?.location}</p>
                    <div className="card-detail" style={{textAlign:"center" , alignItems:"center", margin:" 0 auto" }}>
                      {/* <Link to={`/items/item/${item?.id}`}> */}
                      {/* <button className="btn btn-primary" onClick={<Link to={`/items/item/${item?.id}`}></Link>}>More Details</button> */}
                      {/* <button className="btn btn-primary"  onClick="location.herf = '/items/item/3"> More uuu Details</button>  */}
                      <Link to={`/items/item/${item?.id}`} style={{
                  textAlign: "center", alignItems:"center" ,
                }} >
                        <Button variant="contained">
                         More Details
                        </Button>
                      </Link>
                      {/* < FavoriteIcon/> */}
                      {/* </Link> */}
                      {/* <StarRatings
                      rating={item.rating.rate}
                      starDimension="16px"
                      starSpacing="1px"
                      starRatedColor="black"
                    /> */}
                      {/* <span>Stock:{1} </span> */}
                    </div>
                  </div>
                </div>
              ))
              
              
             ) : (
                <Typography align="center">
                  No items match your search
                </Typography>
              )}
            </div>
          </div>
        </section>
      </>
    </>
  );
};

export default Items;
//<img src={Item?.pictures.join(', ').url} style={{ width: "15em", height: "auto" }} />
