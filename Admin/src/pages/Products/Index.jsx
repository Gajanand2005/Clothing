import { Button } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TooltipMUI from "@mui/material/Tooltip";
import { PiExportBold } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
import Checkbox from "@mui/material/Checkbox";
import ProgressBar from "../../Components/ProgressBar";
import SearchBox from "../../Components/SearchBox/Index";
import { MyContext } from "../../App";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";
import { deleteData, fetchDataFromApi } from "../../../Utlis/Api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const columns = [
  { id: "id", label: "ID", minWidth: 50 },
  { id: "product", label: "Product Name", minWidth: 80 },
  { id: "category", label: "Category", minWidth: 100 },
  { id: "subCategory", label: "Sub Category", minWidth: 100 },
  { id: "price", label: "Price", minWidth: 80 },
  { id: "sales", label: "Sales", minWidth: 120 },
  { id: "action", label: "Action", minWidth: 100 },
];

function createData(product, index, deleteProduct, context) {
  const salesPercent = 50; // Default sales percent; adjust if API provides this
  const sales = (
    <div className="flex items-center gap-3">
      <ProgressBar
        value={salesPercent}
        type={
          salesPercent >= 70
            ? "success"
            : salesPercent >= 40
            ? "warning"
            : "error"
        }
      />
      <span className="text-gray-700 font-medium">{salesPercent}%</span>
    </div>
  );

  const action = (

    <div className="flex items-center gap-1">
      <TooltipMUI title="Edit Product" placement="top">
        <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#ccc]" onClick={()=>context.setIsOpenFullScreenPanel({
          open: true,
          model: 'Edit Product',
          id:product?._id
        })} >
          <FaEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
        </Button>
      </TooltipMUI>
      <TooltipMUI title="View Product Details" placement="top">
        <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#ccc]">
          <IoEyeOutline className="text-[rgba(0,0,0,0.7)] text-[24px]" />
        </Button>
      </TooltipMUI>
      <TooltipMUI title="Remove Product" placement="top">
        <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#ccc]" onClick={() => deleteProduct(product?._id)}>
          <AiTwotoneDelete className="text-[rgba(0,0,0,0.7)] text-[25px]" />
        </Button>
      </TooltipMUI>
    </div>
  );

  const priceColumn = (
    <div className="flex flex-col gap-1">
      <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
        ₹{product.oldPrice}
      </span>
      <span className="price text-blue-600 text-[14px] font-[600]">
        ₹{product.price}
      </span>
    </div>
  );

  const productName = (
    <div className="flex items-center gap-4 w-[220px]">
      <Link to={`/products/${product._id}`}>
        <div className="img w-[55px] h-[55px] rounded-md overflow-hidden group">
          <LazyLoadImage
            alt={"image"}
            effect="blur"
            wrapperProps={{
              style: { transitionDelay: "1s" },
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-all"
            src={product.images && product.images[0]}
          />
        </div>
      </Link>
      <div className="info w-[75%] text-[#696969]">
        <h3 className="font-[600] text-[12px] leading-4 hover:text-blue-600">
          <Link to={`/products/${product._id}`}>{product.name}</Link>
        </h3>
        <span className="text-[11px]">{product.catName}</span>
      </div>
    </div>
  );

  return {
    id: index + 1,
    product: productName,
    category: product.catName,
    subCategory: product.subCat,
    price: priceColumn,
    sales,
    action,
  };
}

const orderColumns = [
  { id: "orderId", label: "Order ID", minWidth: 100 },
  { id: "paymentId", label: "Payment ID", minWidth: 150 },
  { id: "name", label: "Name", minWidth: 150 },
  { id: "amount", label: "Amount", minWidth: 80 },
  { id: "ph_no", label: "Phone Number", minWidth: 120 },
  { id: "address", label: "Address", minWidth: 150 },
  { id: "date", label: "Ordered date", minWidth: 150 },
];

const Product = () => {
  const context = useContext(MyContext);
  const [productData, setProductData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [categoryFilterValue, setcategoryFilterValue] = React.useState("");


  const getProducts = async () => {
    fetchDataFromApi("/api/product/getAllProducts").then((res) => {
      if (res?.error === false) {
        setProductData(res?.products);
      }
    });
  };

  const deleteProduct = (id) => {
    deleteData(`/api/product/${id}`).then((res) => {
      getProducts();
      context.alertBox("success", "Product Delete");
    });
  };

  useEffect(() => {
    getProducts();
  }, [context?.isOpenFullScreenPanel]);

  useEffect(() => {
    setRows(productData.map(() => ({ isSelected: false })));
  }, [productData]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSelectAll = (event) => {
    const checked = event.target.checked;
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    const updatedRows = rows.map((row, index) => {
      if (index >= start && index < end) return { ...row, isSelected: checked };
      return row;
    });
    setRows(updatedRows);
  };

  const allPageRowsSelected = rows
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .every((row) => row.isSelected);

  const handleChangecatFilter = (event) => {
    setcategoryFilterValue(event.target.value);
  };

  return (
    <>
      <div className="card my-5 shadow-md sm:rounded-lg bg-white">
        <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
          <h2 className="text-[18px] font-[600]">Products</h2>
          <div className="col w-[15%] ml-auto flex items-center gap-2">
            <TooltipMUI title="Export" placement="top">
              <Button className="!w-[35px] !h-[35px] btn btn-sm flex items-center !rounded-full !text-black !hover:bg-black-300 hover:scale-105">
                <PiExportBold />
              </Button>
            </TooltipMUI>
            <TooltipMUI title="Add Product" placement="top">
              <Button
                className="!w-[35px] !h-[35px] btn btn-sm flex items-center !rounded-full !text-black hover:bg-black-300 hover:scale-105"
                onClick={() =>
                  context.setIsOpenFullScreenPanel({
                    open: true,
                    model: "Add Product",
                  })
                }
              >
                <span className="text-[18px]">
                  <FaPlus />
                </span>
              </Button>
            </TooltipMUI>
          </div>
        </div>

        <div className="flex items-center w-full px-5 justify-between pr-5">
          <div className="col w-[25%]">
            <h4 className="font-[600] text-[13px] pl-3"> Category by </h4>

            <Select
              className="w-full"
              size="small"
              labelId="Category"
              id="Category"
              value={categoryFilterValue}
              onChange={handleChangecatFilter}
              label="Category"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Organza</MenuItem>
              <MenuItem value={20}>Georgette</MenuItem>
              <MenuItem value={30}>Silk</MenuItem>
              <MenuItem value={40}>Banarsi</MenuItem>
              <MenuItem value={50}>Cotton</MenuItem>
              <MenuItem value={60}>Chinnon</MenuItem>
              <MenuItem value={70}>Woollen</MenuItem>
              <MenuItem value={80}>Lucknowi</MenuItem>
              <MenuItem value={90}>Crepe</MenuItem>
              <MenuItem value={100}>Net</MenuItem>
              <MenuItem value={110}>Winter Wear</MenuItem>
              <MenuItem value={120}>Summer Wear</MenuItem>
              <MenuItem value={130}>Western Co-ords</MenuItem>
              <MenuItem value={140}> Ethnic Co-ords</MenuItem>
            </Select>
          </div>
          <br />

          <div className="col w-[25%] ml-auto">
            <SearchBox />
          </div>
        </div>

        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox" sx={{ pl: 2 }}>
                    <Checkbox
                      checked={allPageRowsSelected}
                      onChange={handleSelectAll}
                      color="primary"
                    />
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                      sx={{ fontWeight: "bold" }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {productData?.length !== 0 &&
                  productData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((product, index) => {
                      const row = createData(product, page * rowsPerPage + index, deleteProduct, context);
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                        >
                          <TableCell padding="checkbox" sx={{ pl: 2 }}>
                            <Checkbox
                              checked={row.isSelected || false}
                              onChange={(e) => {
                                const updatedRows = [...rows];
                                updatedRows[page * rowsPerPage + index] = {
                                  ...updatedRows[page * rowsPerPage + index],
                                  isSelected: e.target.checked,
                                };
                                setRows(updatedRows);
                              }}
                              color="primary"
                            />
                          </TableCell>
                          {columns.map((column) => (
                            <TableCell key={column.id} align={column.align}>
                              {row[column.id]}
                            </TableCell>
                          ))}
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={productData?.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </>
  );
};

export default Product;
