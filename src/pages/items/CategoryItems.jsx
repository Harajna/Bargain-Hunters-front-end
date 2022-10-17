import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import * as React from "react";
import "./items.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import PlaceIcon from '@mui/icons-material/Place';
import { getItemsAction, deleteItemsAction , getItemByCategoryIdAction} from "../../redux/actions/items";

import {
  deleteUserAction,
  deleteUserLinkAction,
  getUserAction,
  getUserLinksAction,
  getUsersAction,
} from "../../redux/actions/users";
import FavoriteIcon from '@mui/icons-material/Favorite';

const CategoryItems = () => {
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const state = useSelector((state) => state);
  // const items = useSelector((state) => state.items.data);
  const  items = state.items.data.filter((item) => item.categoryId == categoryId) || null;
console.log(items);
console.log("categoryId",categoryId);

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

    useEffect(() => {
    const fetchItems = async () => {
      !items && await dispatch(getItemsAction());
      await dispatch(getItemByCategoryIdAction(categoryId));
    };
    fetchItems();
  }, [categoryId]);

  // useEffect(() => {
  //   const fetchitems = async () => {
  //     await dispatch(getItemsAction());
  //     setRefresh(false);
  //   };
  //   fetchitems();
  // }, []);

  return (
    <>
      <>
      <Navbar/>
        <section className="item">
          <div className="container">
            <input
              className="item-input"
              placeholder="Search  Item"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <div className="grid">
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
                  <div className="card-body">
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
                < PlaceIcon />{item?.location}</p>
                    <div className="card-detail">
                      {/* <Link to={`/items/item/${item?.id}`}> */}
                      {/* <button className="btn btn-primary" onClick={<Link to={`/items/item/${item?.id}`}></Link>}>More Details</button> */}
                      {/* <button className="btn btn-primary"  onClick="location.herf = '/items/item/3"> More uuu Details</button>  */}
                      <Link to={`/items/item/${item?.id}`}>
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
                <h6 align="center">
                  No items match your search!
                </h6>
              
              )}
            </div>
          </div>
        </section>
      </>
    </>
  );
};

export default CategoryItems;
//<img src={Item?.pictures.join(', ').url} style={{ width: "15em", height: "auto" }} />
