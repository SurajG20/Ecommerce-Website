import { publicRequest, userRequest } from "../request-methods";
import {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  deleteProductStart,
  deleteProductFailure,
  deleteProductSuccess,
  addProductStart,
  addProductSuccess,
  addProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
} from "./product-slice";

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (error) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (dispatch, id) => {
  dispatch(deleteProductStart());
  try {
    await userRequest.delete("/products/" + id);
    dispatch(deleteProductSuccess({ id }));
  } catch (error) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (dispatch, id, data) => {
  dispatch(updateProductStart());
  try {
    await userRequest.patch("/products/" + id, data);
    dispatch(updateProductSuccess({ id, data }));
  } catch (error) {
    dispatch(updateProductFailure());
  }
};

export const addProduct = async (dispatch, data) => {
  dispatch(addProductStart());
  try {
    await userRequest.post("/products/", data);
    dispatch(addProductSuccess(data));
  } catch (error) {
    dispatch(addProductFailure());
  }
};
