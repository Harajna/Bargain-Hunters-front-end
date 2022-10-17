import React from "react";
import Navbar from "../../components/navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import {
  deleteUserAction,
  deleteUserLinkAction,
  getUserAction,
  getUserLinksAction,
  getUsersAction,
} from "../../redux/actions/users";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import CancelIcon from "@mui/icons-material/Cancel";
import SingleUserItems from "./SingleUserItems";
import "./singleuser.scss";

const roles = {
  1: "User",
  2: "Admin",
  3: "Super Admin",
};

const SingleUser = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const state = useSelector((state) => state);
  let user = state.users.data || null;
  console.log("user", user);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const fetchUsers = async () => {
      !user && (await dispatch(getUsersAction()));
      await dispatch(getUserAction(userId));
    };
    fetchUsers();
  }, []);

  const dispatchDeleteUser = async (user) => {
    await dispatch(deleteUserAction(user));
    setOpen(false);
  };

  return (
    <div className="list">
      <Navbar />
      <div className="listContainer">
        {user ? (
          <div className="p-2 m-2">
            <div className="m-6" id="hammoud">
              <div>
                <img
                  src={user?.profilePic}
                  style={{ width: "12em", height: "auto", borderRadius: "30%" }}
                />
              </div>
              <div className="info">
                <p>
                  <b>Full Name:</b> {user?.fullName}
                </p>
                <p>
                  <b>Email: </b>
                  <a href={`mailto:${user?.User?.email}`}>
                    {user?.User?.email}
                  </a>
                </p>
                <p>
                  <b>Tel:</b> {user?.tel}
                </p>
                <p>
                  <b>Adress:</b> {user?.address}
                </p>

                <p>
                  <b>Role:</b> {roles[user?.User?.userRoleId]}
                </p>
              </div>
            </div>
            {/* <div className="deleteBtn"> // this is just for admin 
              <Button
                color="error"
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={handleClickOpen}
              >
                Delete User
              </Button>
            </div> */}
            <div className="d-flex bg-info w-50">
              <div className="flex w-50 bg-info justify-content-center">
                <div className="d-flex">
                  <div className=" justify-content-center align-items-end m-12 "></div>
                </div>
              </div>
            </div>

            <SingleUserItems />

            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              maxWidth="sm"
              fullWidth={true}
            >
              <DialogTitle id="alert-dialog-title" className="text-center">
                {"Are you sure you want to delete this user?"}
              </DialogTitle>
              <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  color="primary"
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  onClick={handleClose}
                  autoFocus
                >
                  Cancel
                </Button>
                <Button
                  color="error"
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={() => dispatchDeleteUser(user.id)}
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        ) : (
          <h1> User does not exist</h1>
        )}
      </div>
    </div>
  );
};

export default SingleUser;
