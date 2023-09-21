import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useEffect } from "react";
import { getProducts, deleteProduct } from "../../store/product-actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function ProductData() {
  const dispatch = useDispatch();
  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);
  const products = useSelector((state) => state.product.products.products);

  const handleDelete = (id) => {
    deleteProduct(dispatch, id).then(() => {
      // Fetch the updated list of products after deletion
      getProducts(dispatch);
    });
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "product",
      headerName: "Product",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="flex items-center">
            <img
              className="w-8 h-8 rounded-sm object-cover mr-3"
              src={params.row.image}
              alt=""
            />
            <p className="line-clamp-1">{params.row.title}</p>
          </div>
        );
      },
    },
    { field: "category", headerName: "Category", width: 120 },
    {
      field: "inStock",
      headerName: "Stock",
      width: 100,
    },

    {
      field: "price",
      headerName: "Price",
      width: 100,
    },
    {
      field: "discount",
      headerName: "Discount",
      width: 100,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/admin/product/" + params.row._id}>
              <button className="rounded-[12px] px-1 py-3 text-zinc-500cursor-pointer mr-5">
                <ModeEditIcon />
              </button>
            </Link>
            <DeleteIcon
              className="text-zinc-500 cursor-pointer"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="flex mx-auto flex-col p-2">
      <h1 className="text-2xl font-semibold ">Products</h1>
      {products && (
        <DataGrid
          rows={products}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          getRowId={(row) => row._id}
          checkboxSelection
        />
      )}
    </div>
  );
}
