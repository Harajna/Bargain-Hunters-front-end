import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import * as React from "react";
import "./categories.scss";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import {
  addCategoryAction,
  getCategoriesAction,
  deleteCategoriesAction,
} from "../../redux/actions/categories";
import {
  getItemByCategoryIdAction
} from "../../redux/actions/items";

import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom";


const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.data);
console.log(categories);
const items = useSelector((state) => state.items.data);

  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [categoryId, setCategoryId] = useState(0);

  const handleCreateCategoryAction = async (e) => {
    await dispatch(addCategoryAction({ name: newCategory })).catch((e) =>
      console.error(e)
    );
    setOpen(false);
  };

  const dispatchDeleteCategory = async (categoryData) => {
    await dispatch(deleteCategoriesAction(categoryData));
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
  const fetchcategories = async () => {
    await dispatch(getCategoriesAction());
  };

  useEffect(() => {
    const fetchItems = async () => {
      //!item && await dispatch(getUsersAction());
     !items &&  await dispatch(getItemByCategoryIdAction(categoryId));
    };
    fetchItems();
  }, []);
  useEffect(() => {
    fetchcategories();
  }, []);

  return (
          <div>
            <NavDropdown  title="Categories" id="collasible-nav-dropdown">
              {categories?.length ? (
                categories.map((Category, i) => (
                       <NavDropdown.Item key={i}
                  >
                      <Link onClick={() => {setCategoryId(Category.id)}} to={`/categories/${Category.id}`}> {Category.name} </Link> 

                         </NavDropdown.Item>
                ))    
              ) : (
                  <Typography align="center"> No categories currently</Typography>
  )
}    </NavDropdown>
</div>
  );
}

export default Categories;
