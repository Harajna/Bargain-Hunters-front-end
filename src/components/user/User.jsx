import React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import LoadingButton from '@mui/lab/LoadingButton';
import Switch from '@mui/material/Switch';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleActivityAction } from '../../redux/actions/users';
import { deleteUserAction } from '../../redux/actions/users';
import ChangeRole from '../ChangeRole/ChangeRole';
import { deleteAdminAction } from '../../redux/actions/admins';
import { Link } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CancelIcon from '@mui/icons-material/Cancel';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';

const User = ({ user }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // const dispatchDeleteUser = async (user) => {
    //     if (user.roleId === 3)
    //         await dispatch(deleteUserAction(user));
    //     else {
    //         await dispatch(deleteAdminAction(user));
    //     }
    //     setOpen(false);
    // }
    const dispatchDeleteUser = async (user) => {
            await dispatch(deleteUserAction(user));
        setOpen(false);
    }

    return (
        <TableRow>
            <TableCell>
                    <Link to={`/users/profile/${user?.user_info?.userId}`}>
                        <img src={user?.user_info?.profilePic} style={{ width: "4em", height: "auto" , borderRadius: "50%"}} />
                    </Link>
            </TableCell>
            <TableCell align="center" component="th" scope="row">
                {user?.user_info?.fullName}
            </TableCell>
            <TableCell align="center">{user.email}</TableCell>
            <TableCell  sx={{ color:"darkGreen", fontSize:"18px", justifyContent: "center" }}  align="center">
                {user.userRoleId === 2 ? 
                "Admin" 
                : user.userRoleId === 3? 
                "Admin11111"
                :"User" }          
                </TableCell>
            <TableCell align="right"><ChangeRole user={user} /></TableCell>
            {/* <TableCell align="right">{<Switch defaultChecked={user.isActive} onChange={() => dispatch(toggleActivityAction(user))} />}</TableCell> */}

            <TableCell align="right">
                <Button color="error" variant="outlined" startIcon={<DeleteIcon />} onClick={handleClickOpen}>
                    Delete and {user?.user_info?.userId}
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    maxWidth='sm'
                    fullWidth={true}
                >
                    <DialogTitle id="alert-dialog-title" className='text-center'>
                        {"Are you sure you want to delete this user?"}
                    </DialogTitle>
                    <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
                        <Button color="primary" variant="outlined" startIcon={<CancelIcon />} onClick={handleClose} autoFocus>
                            Cancel
                        </Button>
                        <Button color="error" variant="outlined" startIcon={<DeleteIcon />} onClick={() => dispatchDeleteUser(user.id)}>Delete</Button>
                    </DialogActions>
                </Dialog>

            </TableCell>
        </TableRow >
    );
}

export default User;
