import React from "react";
import Navbar from "../../components/navbar/Navbar";
import "./singleitem.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import moment from "moment";
import { format } from "fecha";
import { Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import PlaceIcon from "@mui/icons-material/Place";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  getItemsAction,
  getItemAction,
  deleteItemsAction,
} from "../../redux/actions/items";
import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { getUserAction, getUsersAction } from "../../redux/actions/users";
import { reportItemAction } from "../../redux/actions/reports";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import { Link } from "react-router-dom";
import ReportIcon from "@mui/icons-material/Report";
import "@splidejs/react-splide/css";

const SingleItem = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const [newReport, setNewReport] = useState("");
  const [open, setOpen] = useState(false);
  const state = useSelector((state) => state);
  const reports = useSelector((state) => state.reports.data);
  let item = state.items.data.find((item) => item.id == itemId) || null;
  let userId = item?.userId;
  // let user = state.users.data.find((user) => user.id == userId) || null;
  let user = state.users.data;
  console.log("user", user);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchitems = async () => {
    !item && (await dispatch(getItemsAction()));
    await dispatch(getItemAction(itemId));
  };

  const fetchUsers = async () => {
    // (await dispatch(getUsersAction()));
    await dispatch(getUserAction(userId));
  };

  useEffect(() => {
    fetchUsers();
  }, [userId]);

  useEffect(() => {
    fetchitems();
  }, []);

  const handleReportItemAction = async (e) => {
    await dispatch(
      reportItemAction({
        itemId: itemId,
        note: newReport,
      })
    ).catch((e) => console.error(e));
    setOpen(false);
  };

  console.log(item);
  console.log(user);

  return (
    <>
      <Navbar />

      <div className="list1">
        <div className="list-Container">
          <div className="item">
            <div className="item-pic">
              {item?.pictures && item?.pictures.length > 0 ? (
                <Splide className="splide__list">
                  {item?.pictures?.map((pic, i) => (
                    <SplideSlide className="splide__slide" key={i}>
                      <img src={pic.url} className="card-image" />
                    </SplideSlide>
                  ))}
                </Splide>
              ) : (
                <Splide className="splide__list">
                  <SplideSlide className="splide__slide">
                    <img
                      src={
                        "https://media.istockphoto.com/vectors/no-image-available-sign-vector-id936182806?k=20&m=936182806&s=612x612&w=0&h=pTQbzaZhCTxWEDhnJlCS2gj65S926ABahbFCy5Np0jg="
                      }
                      className="card-image"
                    />
                  </SplideSlide>
                </Splide>
              )}
            </div>
            <div className="all-details">
              <div className="seller-info">
                <h3 className="header">{item?.title}</h3>
                <Link className="link" to={`/users/profile/${item?.userId}`}>
                  <img
                    src={user?.profilePic}
                    style={{
                      width: "4em",
                      height: "4em",
                      marginBottom: "10px",
                      borderRadius: "50%",
                    }}
                  />
                  <div className="name">
                    {user?.fullName} <br></br>
                    {<RemoveRedEyeIcon />}{" "}
                  </div>
                </Link>
                <p className="location">
                  <PlaceIcon />

                  {user?.address}
                </p>
              </div>
              <div className="item-info ">
                <p>
                  <b>Category:</b> {item?.category?.name}
                </p>
                <p>
                  <b>Description:</b> {item?.description}
                </p>
                <p>
                  <b>Price:</b> {item?.price}$
                </p>
                <p>
                  <b>Tel:</b> {item?.tel}
                </p>
                <p>
                  <b>Adress:</b> {item?.location}
                </p>
                <p>
                  <b>publishing date: </b>
                  {moment(`${item?.createdAt}`).format("llll")}{" "}
                </p>
              </div>

              <div className="item-button">
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleClickOpen}
                >
                  <ReportIcon /> report
                </Button>
              </div>
            </div>
          </div>

          <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>Report Item</DialogTitle>
            <DialogContent>
              <Stack spacing={3} initial={{ opacity: 0, y: 40 }}>
                <TextField
                  fullWidth
                  type="string"
                  label="Note"
                  name="type"
                  onChange={(e) => {
                    setNewReport(e.target.value);
                  }}
                />
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleReportItemAction}>Report</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default SingleItem;
