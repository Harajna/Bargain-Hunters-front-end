import * as React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import "./profile.css";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfileAction,
  getUsersAction,
  updatePasswordAction,
  getUserAction
} from "../../redux/actions/users";
import CircularProgress from "@mui/material/CircularProgress";




const Profile = () => {
  const dispatch = useDispatch();

const state = useSelector((state) => state);
const currentUser =
JSON.parse(window.localStorage.getItem("user") || null) || null;
const userId = currentUser?.id || null;
console.log("currentuser", userId);

let user = state.users.data
console.log("user", user)

const [loading, setloading] = useState(false);
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [newItem, setNewItem] = useState("");


    const [profileData, setProfileData] = useState({
    file: null,
    address :"",
    fullName: "" ,
    tel: 0,
    email: "",
    profileName:"",
    Profilefile: null ,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    password: "",
  });

console.log("profileData", profileData);
console.log("passwordData", passwordData);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setloading(true);
    await dispatch(updateProfileAction(profileData))
      .then(() => setRefresh(true))
      .then(() => setloading(false))
      .catch((e) => console.error(e))
      .then(() => setloading(false));
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setloading(true);
    await dispatch(updatePasswordAction(passwordData))
      .then(() => setRefresh(true))
      .then(() => setloading(false))
      .catch((e) => console.error(e))
      .then(() => setloading(false));
  };
  // const dispatchDeleteItem = async (itemData) => {
  //   await dispatch(deleteItemsAction(itemData));
  //   console.log("delete77777777", itemData)
  //   setOpenDelete(false);
  // };

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
  //   const fetchitems = async () => {
  //     await dispatch(getItemsAction());
  //     setRefresh(false)
  //   };
  //   fetchitems();
  // }, [refresh]);

  const handleInputChange = (e) => {
    passwordData[e.target.name] = e.target.value;
  };


  const fetchUsers = async () => {
     const res = await fetch(process.env.REACT_APP_API_URL+"/users/profile/" + userId);
     if(res.ok){
      const json = await res.json();
      console.log(json);
      setProfileData({
        file: json.data.profilePic,
        Profilefile: json.data.profilePic,
        address : json?.data?.address,
        fullName: json?.data?.fullName,
        profileName: json?.data?.fullName,
        tel: json?.data?.tel,
        email: json?.data?.User?.email
      })
     }
     
  };

  useEffect(() => {
      fetchUsers();
  }, [refresh]);



  return (

    <>    
      <Navbar />
      
<div class="container rounded bg-white mt-5 mb-5">
    <div className="row justify-content-center" style={{ backgroundColor: "rgb(237 237 237)" , borderRadius: "10%"}} >
        <div class="col-md-3 border-right">
        <div className="custom-file mt-3 mb-5">
        <div class="d-flex flex-column align-items-center text-center p-3 py-5">
          <img class="rounded-circle mt-4" width="150px"
           src={profileData?.Profilefile}/>
           <span class="font-weight-bold">Hi, {profileData?.profileName}</span><span class="text-black-50">{profileData?.email}</span><span> </span>
           </div>
           
                <input
                  id="file"
                  type="file"
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      file: e.target.files[0],
                    })
                  }
                />
                <input
                  type="button"
                  // disabled={true}
                  className="btn btn-primary btn-block mx-auto m-1"
                  onClick={(e) => handleUpdateProfile(e)}
                  value="Update Profile Information"
                />   
                {loading && <CircularProgress color="success" />}
              </div>
              
        </div>
        <div class="col-md-5 border-right">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-center"> Profile Settings </h4>
                </div>
                <div class="row mt-2">
                    <div class="col-md-12">
                      <label class="labels"> Full Name</label>
                      <input 
                      type="text"
                       class="form-control"
                        placeholder="full name"
                        value= {profileData?.fullName}
                         id="fullName"
                          name="fullName"
                          onChange={(e)=> setProfileData({
                            ...profileData,
                            fullName: e.target.value
                          })}
                          />
                    </div>
                    {/* <div class="col-md-6"><label class="labels">Surname</label><input type="text" class="form-control" value="" placeholder="surname"/></div> */}
                </div>
                <div class="row mt-3">
                <div class="col-md-12">
                      <label class="labels">Mobile Number </label>
                      <input 
                      type="text"
                       class="form-control"
                        placeholder="tel"
                        value={profileData?.tel} 
                         id="tel"
                          name="tel"
                          // onChange={(e)=>handleInputChange(e)}
                          onChange={(e)=> setProfileData({
                            ...profileData,
                            tel: e.target.value
                          })}
                          />
                    </div>
                    <div class="col-md-12">
                      <label class="labels">Adress</label>
                      <input 
                      type="text"
                       class="form-control"
                        placeholder="address"
                        value={profileData?.address}                          
                        id="address"
                          name="address"
                          // onChange={(e)=>handleInputChange(e)}
                          onChange={(e)=> setProfileData({
                            ...profileData,
                            address: e.target.value
                          })}
                          />

                          
                    </div>

                    {/* <div class="col-md-12"><label class="labels">Mobile Number</label><input type="text" class="form-control" placeholder="enter phone number" value=""/></div>
                    <div class="col-md-12"><label class="labels">Address Line 1</label><input type="text" class="form-control" placeholder="enter address line 1" value=""/></div>
                    <div class="col-md-12"><label class="labels">Address Line 2</label><input type="text" class="form-control" placeholder="enter address line 2" value=""/></div>
                    <div class="col-md-12"><label class="labels">Postcode</label><input type="text" class="form-control" placeholder="enter address line 2" value=""/></div>
                    <div class="col-md-12"><label class="labels">State</label><input type="text" class="form-control" placeholder="enter address line 2" value=""/></div>
                    <div class="col-md-12"><label class="labels">Area</label><input type="text" class="form-control" placeholder="enter address line 2" value=""/></div>
                    <div class="col-md-12"><label class="labels">Email ID</label><input type="text" class="form-control" placeholder="enter email id" value=""/></div>
                    <div class="col-md-12"><label class="labels">Education</label><input type="text" class="form-control" placeholder="education" value=""/></div> */}
                </div>

            </div>
        </div>
        <div class="col-md-4 ">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center"><h4>Change password</h4></div><br/>
                <div class="col-md-12">
                  <label class="labels">Current Password</label>
                  <input 
                  type="password"
                   class="form-control" 
                   id="currentPassword"
                   name="currentPassword"
                   placeholder="current password"
                   onChange={handleInputChange}
                    />
                    </div> 

                    <br/>

                <div class="col-md-12">
                  <label class="labels">New Password</label>
                  <input 
                  type="password"
                  id="password"
                  name="password"
                   class="form-control"
                    placeholder="new password"
                    onChange={handleInputChange}
                    />
                     </div>

                <input
                  type="button"
                  // disabled={true}
                  className="btn btn-primary btn-block mx-auto m-1"
                  onClick={(e) => handleUpdatePassword(e)}
                  value="Change Password"
                />   
                {loading && <CircularProgress color="success" />}
            </div>
        </div>
    </div>
</div>

    
    
      </>
  );
};

export default Profile;





{/* <div class="container rounded bg-white mt-5 mb-5">
    <div class="row">
        <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"><span class="font-weight-bold">Edogaru</span><span class="text-black-50">edogaru@mail.com.my</span><span> </span></div>
        </div>
        <div class="col-md-5 border-right">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="text-right">Profile Settings</h4>
                </div>
                <div class="row mt-2">
                    <div class="col-md-6"><label class="labels">Name</label><input type="text" class="form-control" placeholder="first name" value=""></div>
                    <div class="col-md-6"><label class="labels">Surname</label><input type="text" class="form-control" value="" placeholder="surname"></div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-12"><label class="labels">Mobile Number</label><input type="text" class="form-control" placeholder="enter phone number" value=""></div>
                    <div class="col-md-12"><label class="labels">Address Line 1</label><input type="text" class="form-control" placeholder="enter address line 1" value=""></div>
                    <div class="col-md-12"><label class="labels">Address Line 2</label><input type="text" class="form-control" placeholder="enter address line 2" value=""></div>
                    <div class="col-md-12"><label class="labels">Postcode</label><input type="text" class="form-control" placeholder="enter address line 2" value=""></div>
                    <div class="col-md-12"><label class="labels">State</label><input type="text" class="form-control" placeholder="enter address line 2" value=""></div>
                    <div class="col-md-12"><label class="labels">Area</label><input type="text" class="form-control" placeholder="enter address line 2" value=""></div>
                    <div class="col-md-12"><label class="labels">Email ID</label><input type="text" class="form-control" placeholder="enter email id" value=""></div>
                    <div class="col-md-12"><label class="labels">Education</label><input type="text" class="form-control" placeholder="education" value=""></div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6"><label class="labels">Country</label><input type="text" class="form-control" placeholder="country" value=""></div>
                    <div class="col-md-6"><label class="labels">State/Region</label><input type="text" class="form-control" value="" placeholder="state"></div>
                </div>
                <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button">Save Profile</button></div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center experience"><span>Edit Experience</span><span class="border px-3 p-1 add-experience"><i class="fa fa-plus"></i>&nbsp;Experience</span></div><br>
                <div class="col-md-12"><label class="labels">Experience in Designing</label><input type="text" class="form-control" placeholder="experience" value=""></div> <br>
                <div class="col-md-12"><label class="labels">Additional Details</label><input type="text" class="form-control" placeholder="additional details" value=""></div>
            </div>
        </div>
    </div>
</div>
</div>
</div> */}




//https://bbbootstrap.com/snippets/bootstrap-5-myprofile-90806631





{/* <div className="list">
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
//       <TableCell align="left">
//             <h3>Title</h3>
//           </TableCell>
//           <TableCell align="left">
//             <h3>Price</h3>
//           </TableCell>
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {items && items.length > 1 ? (
//           items.map((Item, index) => (
//             <TableRow key= {index}>
//               <>
//               <TableCell> 
//               <h6>{Item.id}</h6>
//               </TableCell> 
//               <TableCell>  <img src= {Item?.pictures[0]?.url ||
//                 "https://media.istockphoto.com/vectors/no-image-available-sign-vector-id936182806?k=20&m=936182806&s=612x612&w=0&h=pTQbzaZhCTxWEDhnJlCS2gj65S926ABahbFCy5Np0jg=" } style={{ width: "5em", height: "auto" , borderRadius:"30%"}} /></TableCell>
//                 <TableCell>
                 
//                   { Item.pictures && Item.pictures?(
//                    Item.pictures.map((pic, i) => (
//                    <> 
//                    <div  key= {i} className="photos">
//                    {/* <img src={pic?.url} style={{ width: "5em", height: "auto" }} /> */}
//                     {/* <p>first pic {Item.pictures[0].url}</p> */}
// </div>
// </>
//                    ))           )
//                    :<p>nopic</p>
//                    }
//                 </TableCell>
//                 <TableCell>
//                <h4>{Item.title}</h4>
//                       </TableCell>
//                 <TableCell>
//                <h4>${Item.price}</h4>
//                           </TableCell>
//                           <TableCell align="center">
//                 <p> See details</p>  
//                 <Link to={`/items/item/${Item?.id}`}>
//                  {<RemoveRedEyeIcon/>}   </Link> 
//                  </TableCell>
//                 <TableCell align="right">
//                   <Button
//                     color="error"
//                     variant="outlined"
//                     startIcon={<DeleteIcon />}
//                     onClick={() => {
//                       setItemId(Item.id);
//                       handleClickOpenDelete();
//                     }}
//                   >
//                     Delete
//                   </Button>
//                   <Dialog
//                     open={openDelete}
//                     onClose={handleClose}
//                     aria-labelledby="alert-dialog-title"
//                     aria-describedby="alert-dialog-description"
//                     maxWidth="sm"
//                     fullWidth={true}
//                   >
//                     <DialogTitle
//                       id="alert-dialog-title"
//                       className="text-center"
//                     >
//                       {"Are you sure you want to delete this Item?"}
//                     </DialogTitle>
//                     <DialogActions
//                       sx={{ display: "flex", justifyContent: "center" }}
//                     >
//                       <Button
//                         color="primary"
//                         variant="outlined"
//                         startIcon={<CancelIcon />}
//                         onClick={handleCloseDelete}
//                         autoFocus
//                       >
//                         Cancel
//                       </Button>
//                       <Button
//                         color="error"
//                         variant="outlined"
//                         startIcon={<DeleteIcon />}
//                         onClick={() =>{
//                           dispatchDeleteItem(itemId);
//                           // setOpenDelete(false)
//                         }
//                         }
//                       >
//                         Delete
//                       </Button>
//                     </DialogActions>
//                   </Dialog>
//                 </TableCell>
//               </>
//             </TableRow>
//           ))
//         ) : (
//           <Typography align="center">No items currently</Typography>
//         )}
//       </TableBody>
//     </Table>
//   </TableContainer>
// </div>
// </div>  */}





//<img src={Item?.pictures.join(', ').url} style={{ width: "15em", height: "auto" }} />



// import * as React from "react";
// import { useState } from "react";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// // import { Link } from "react-router-dom";
// import SignupForm from "../../components/SignUpForm/SignUpForm";
// import { signupAction } from "../../redux/actions/users";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="/">
//         Bargain Hunters
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// const theme = createTheme();

// export default function Profile() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [userData, setUserData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });
//   ///from mui
// //   const handleSubmit = (event) => {
// //     event.preventDefault();
// //     const data = new FormData(event.currentTarget);
// //     console.log({
// //       email: data.get("email"),
// //       password: data.get("password"),
// //     });
// //   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     await dispatch(signupAction(userData))
//       .then(() => navigate("/signin"))
//       .catch((e) => console.error(e));
//   };
//   const handleInputChange = (e) => {
//     userData[e.target.name] = e.target.value;
//   };


//   return (
//     //  style={{
//     //       backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/bargain-hunters-139d1.appspot.com/o/LogoSample_ByTailorBrands_auto_x2.jpg?alt=media&token=ec4b18b7-be8d-46c5-9316-f4f999a303c9')`
//     //     }}
//     <div className="has-bg-img bg-purple bg-blend-screen">
//       {/* <img className="bg-img" src="https://firebasestorage.googleapis.com/v0/b/bargain-hunters-139d1.appspot.com/o/LogoSample_ByTailorBrands_auto_x2.jpg?alt=media&token=ec4b18b7-be8d-46c5-9316-f4f999a303c9" alt="..."/> */}

//       <ThemeProvider theme={theme}>
//         <Container component="main" maxWidth="xs">
//           <CssBaseline />
//           <Box
//             sx={{
//               marginTop: 8,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <img
//               className="bg-img"
//               src="https://firebasestorage.googleapis.com/v0/b/bargain-hunters-139d1.appspot.com/o/LogoSample_ByTailorBrands_auto_x2.jpg?alt=media&token=ec4b18b7-be8d-46c5-9316-f4f999a303c9"
//               alt="..."
//               style={{ width: "15em", height: "auto", borderRadius: "10%" }}
//             />

//             <Typography component="h1" variant="h5">
//               Sign up
//             </Typography>
//             <Box
//               component="form"
//               noValidate
//             //   onSubmit={handleSubmit}
//             onSubmit={handleSignup} 
//               sx={{ mt: 3 }}
//             >
//               <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                   <TextField
//                     autoComplete="given-name"
//                     name="username"
//                     required
//                     fullWidth
//                     id="username"
//                     label="User Name"
//                     onChange={handleInputChange}
//                     autoFocus
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     required
//                     fullWidth
//                     id="email"
//                     label="Email Address"
//                     name="email"
//                     autoComplete="email"
//                     onChange={handleInputChange}

//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     required
//                     fullWidth
//                     name="password"
//                     label="Password"
//                     type="password"
//                     id="password"
//                     autoComplete="new-password"
//                     onChange={handleInputChange}

//                   />
//                 </Grid>
//               </Grid>
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 3, mb: 2 }}
//               >
//                 Sign Up
//               </Button>
//               <Grid container justifyContent="flex-end">
//                 <Grid item>
//                   <Link href="/signin" variant="body2">
//                     Already have an account? Sign in
//                   </Link>
//                 </Grid>
//               </Grid>
//             </Box>
//           </Box>
//           <Copyright sx={{ mt: 5 }} />
//         </Container>
//       </ThemeProvider>
//       {/* <img className="bg-img" src="https://firebasestorage.googleapis.com/v0/b/bargain-hunters-139d1.appspot.com/o/LogoSample_ByTailorBrands_auto_x2.jpg?alt=media&token=ec4b18b7-be8d-46c5-9316-f4f999a303c9" alt="..."/> */}
//       {/* <SignupForm /> */}
//     </div>
//   );
// }



