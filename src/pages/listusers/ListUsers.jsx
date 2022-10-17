import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { useEffect } from 'react';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersAction } from '../../redux/actions/users';
import User from '../../components/user/User';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";


const ListUsers = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.data.filter(user => user.userRoleId == 1));
    // const admins = useSelector((state) => state.users.data.filter(user => user.userRoleId == 2));

    console.log("getting users from global state")

    useEffect(() => {
        const fetchUsers = async () => {
            await dispatch(getUsersAction());
        }
        fetchUsers();
    }, []);

    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <Box sx={{
                    backgroundColor: "#052d14",
                    marginTop: "30px",
                    borderRadius: "20px",
                }}
                    py={3}
                    mx={10}
                    px={60}
                >
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h5"
                        id="tableTitle"
                        component="div"
                        color="white"
                    >
                        Users
                    </Typography>
                </Box>
                <TableContainer component={Paper}>
                    <Table aria-label="Users table" stickyHeader sx={{ width: "60em", margin: "auto" }}>
                        <TableHead>
                            <TableRow>
                                <TableCell ><h4>Picture</h4></TableCell>
                                <TableCell ><h4>Full Name</h4></TableCell>
                                <TableCell align="center"><h4>Email</h4></TableCell>
                                <TableCell align="center"><h4>Role</h4></TableCell>
                                <TableCell align="center">isReported</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users && users.length ? users.map((user, index) => (
                                <User user={user} key={index} />
 
                            

                            ))
                                :
                                <Typography>No users currently</Typography>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

export default ListUsers;
