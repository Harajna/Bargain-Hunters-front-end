import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { useEffect, useState } from 'react';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import User from '../../components/user/User';
import { createAdminAction, getAdminsAction } from '../../redux/actions/admins';
import { getUsersAction } from '../../redux/actions/users';


import { Box, Button, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack } from '@mui/material';



const ListAdmins = () => {
    const dispatch = useDispatch();
    //const admins = useSelector((state) => state.admins.data);
    // const admins = useSelector((state) => state.users.data.find(user => user.userRoleId == "admin"));
    const admins = useSelector((state) => state.users.data.filter(user => user.userRoleId == 2));
    console.log("getting admins from global state")

    const [open, setOpen] = React.useState(false);
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    });

    const handleCreateAdminAction = async (e) => {
        await dispatch(createAdminAction(userData))
            .catch((e) => console.error(e));
        setOpen(false);
    };

    const handleInputChange = (e) => {
        userData[e.target.name] = e.target.value;
    };


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        const fetchUsers = async () => {
            await dispatch(getUsersAction());
        }
        fetchUsers();
    }, []);


    // useEffect(() => {
    //     const fetchAdmins = async () => {
    //         await dispatch(getAdminsAction())
    //     }
    //     fetchAdmins();
    // }, []);


    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <Box sx={{
                    backgroundColor: "#2196f3",
                    marginTop: "-3",
                    borderRadius: "10px",
                }}
                    mx={5}
                    mt={-3}
                    py={3}
                    px={2}
                >
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                        color="white"
                    >
                        Admins
                    </Typography>
                </Box>
                <TableContainer component={Paper}>
                    <Table aria-label="admins table" stickyHeader sx={{ width: "60em", margin: "auto" }}>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell >Username</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Role</TableCell>
                                <TableCell align="right">isActive</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {admins && admins.length ? admins.map((admin, index) => (
                             
                                <>   <User user={admin} key={index} />
                                </>
                            ))
                                :
                                <Typography>No admins currently</Typography>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button variant="contained" onClick={handleClickOpen} sx={{ margin: "2em" }}>
                    Create new admin
                </Button>
                <Dialog open={open} onClose={handleClose} fullWidth="sm">
                    <DialogTitle>Create a new admin</DialogTitle>
                    <DialogContent>
                        <Stack
                            spacing={3}
                            initial={{ opacity: 0, y: 40 }}
                        >
                            <TextField
                                fullWidth
                                autoComplete="current-username"
                                type="string"
                                label="Username"
                                name="username"
                                onChange={handleInputChange}
                            />
                            <TextField
                                fullWidth
                                autoComplete="current-email"
                                type="email"
                                label="Email address"
                                name="email"
                                onChange={handleInputChange}
                            />

                            <TextField
                                fullWidth
                                autoComplete="current-password"
                                type="password"
                                label="Password"
                                name="password"
                                onChange={handleInputChange}
                            />

                            <TextField
                                fullWidth
                                autoComplete="current-passwordConfirmation"
                                type="password"
                                label="Password Confirmation"
                                name="passwordConfirmation"
                                onChange={handleInputChange}
                            />
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleCreateAdminAction}>Create</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}

export default ListAdmins;
