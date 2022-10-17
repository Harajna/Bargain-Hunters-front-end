import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Categories from "../../pages/categories/Categories";
import { logoutAction } from "../../redux/actions/auth";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

function Navbar1() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser =
    JSON.parse(window.localStorage.getItem("user") || null) || null;
  const userId = currentUser?.id || null;
  console.log("currentuser", userId);
  //you can get them from useSelector

  return (
    <div className="sticky" style={{ zIndex: "1030" }}>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark"  style={{ zIndex: "1030" }}>
        <Container  style={{ zIndex: "1030"  }}  bg="dark" >
          <Navbar.Brand href="/">
            <img
              alt=""
              src="https://firebasestorage.googleapis.com/v0/b/bargain-hunters-139d1.appspot.com/o/logo%20(4).png?alt=media&token=04c93dfa-54c6-4209-9f27-b46f3cf5ac37"
              height="28"
              width="150"
              className="d-inline-block align-top"
            />{" "}
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" id="categories">
              <Nav.Link href="/">Home</Nav.Link>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Categories />
              </Link>
            </Nav>

            <Nav>
              {!currentUser ? (
                <>
                  <Nav.Link href="/signup">Sign up</Nav.Link>
                  <Nav.Link href="/signin">Sign in</Nav.Link>
                </>
              ) : null}
              {currentUser ? (
                <>
                  <Nav.Link href="/profile">
                    <img
                      alt=""
                      src={currentUser?.profilePic}
                      style={{
                        width: "1.8em",
                        height: "auto",
                        borderRadius: "30%",
                      }}
                    />{" "}
                  </Nav.Link>
                  <Nav.Link href="/profile"> My Profile </Nav.Link>
                  <Nav.Link href={`/myads/${currentUser.id}`}>
                    {" "}
                    My Ads{" "}
                  </Nav.Link>
                  <Nav.Link
                    onClick={async () => {
                      await dispatch(logoutAction())
                        .then(() => navigate("/"))
                        .catch((err) => console.log(err));
                    }}
                  >
                    {" "}
                    Sign out <ExitToAppIcon className="icon" />
                  </Nav.Link>
                </>
              ) : null}
              {/* <Nav.Link href="/signin" >Sign out <ExitToAppIcon className="icon" /></Nav.Link> */}

              <li
                onClick={async () => {
                  await dispatch(logoutAction())
                    .then(() => navigate("/signin"))
                    .catch((err) => console.log(err));
                }}
              ></li>
            </Nav>
            <Nav.Link href="/sell" className="center">
              {" "}
              <Button variant="outline-success">
                {" "}
                <CameraAltIcon /> Sell{" "}
              </Button>
            </Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navbar1;

// <NavDropdown title="Dropdownfdg" id="collasible-nav-dropdown">
// <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
// <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
// <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
//  <Categories/>
// <NavDropdown.Divider />
// <NavDropdown.Item href="#action/3.4">
//   Separated link
// </NavDropdown.Item>
// </NavDropdown>
