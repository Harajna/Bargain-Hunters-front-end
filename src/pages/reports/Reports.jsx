import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import * as React from "react";
import "./reports.scss";
import InfoIcon from "@mui/icons-material/InfoTwoTone";
import { Link } from "react-router-dom";
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
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Stack } from "@mui/material";
import {
  getReportsAction,
  deleteReportsAction,
} from "../../redux/actions/reports";
//import Report from "../../components/Report/Report";

const Reports = () => {
  const dispatch = useDispatch();
  const reports = useSelector((state) => state.reports.data);

  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [reportId, setReportId] = useState(0);



  const dispatchDeleteReport = async (reportData) => {
    await dispatch(deleteReportsAction(reportData));
    console.log(reportId);
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
    const fetchReports = async () => {
      await dispatch(getReportsAction());
    };
    fetchReports();
  }, []);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Box
          sx={{
            backgroundColor: "#f5003d",
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
            Reports
          </Typography>
        </Box>
        <TableContainer component={Paper}>
          <Table
            aria-label="admins table"
            stickyHeader
            sx={{ width: "70em", margin: "auto" }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <h3> Id</h3>
                </TableCell>
                <TableCell align="center">
                  <h3>Reporter Id</h3>
                </TableCell>
                <TableCell align="center">
                  <h3>
                    Reported <br></br>
                    item Id
                  </h3>
                </TableCell>
                <TableCell align="center">
                  <h3>Note</h3>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports && reports.length ? (
                reports.map((Report, i) => (
                  <TableRow key={i}>
                    <TableCell align="center">
                      <h6>{Report.id}</h6>
                    </TableCell>
                    <TableCell align="center">
                      <h6>{Report.userId}</h6>
                    </TableCell>
                    <TableCell align="center">
                      <h6>{Report.itemId}</h6>
                      <Link to={`/items/item/${Report?.itemId}`}>
                        <Button
                          color="info"
                          startIcon={<InfoIcon />}
                          variant="outlined"
                        >
                          Item details
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <p>{Report.note}</p>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        color="error"
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={() => {
                          setReportId(Report.id);
                          handleClickOpenDelete();
                        }}
                      >
                        Delete OK
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableCell>
                  <Typography align="center">No reports currently</Typography>
                </TableCell>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      
        <Dialog
          open={openDelete}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="sm"
          fullWidth={true}
        >
          <DialogTitle id="alert-dialog-title" className="text-center">
            {"Are you sure you want to delete this Report?"}
          </DialogTitle>
          <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
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
              onClick={() => dispatchDeleteReport(reportId)}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Reports;
