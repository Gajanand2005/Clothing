import { Button } from '@mui/material'
import React, { useState, useMemo, useContext } from 'react'
import { MdOutlineAddAlarm } from "react-icons/md";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TooltipMUI from "@mui/material/Tooltip";
import { PiExportBold } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
import Checkbox from "@mui/material/Checkbox";
import ProgressBar from "../../Components/ProgressBar";
import SearchBox from '../../Components/SearchBox/Index';
import { MyContext } from '../../App';




const Product = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const columns = [
    { id: 'id', label: 'ID', minWidth: 50 },
    { id: 'product', label: 'Product', minWidth: 200 },
    { id: 'category', label: 'Category', minWidth: 150 },
    { id: 'subCategory', label: 'Sub Category', minWidth: 150 },
    { id: 'oldPrice', label: 'Old Price', minWidth: 100 },
    { id: 'currentPrice', label: 'Current Price', minWidth: 100 },
    { id: 'salesPercent', label: 'Sales', minWidth: 100 },
  ];

  function createData(id, product, category, subCategory, oldPrice, currentPrice, salesPercent) {
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
    return { id, product, category, subCategory, oldPrice, currentPrice, salesPercent: sales };
  }

   const [openRow, setOpenRow] = useState(null);
    const [rows, setRows] = useState([
      createData(1, "Vegetable Steamer for Cooking", "Kitchen Appliances", "Steamers", "₹499", "₹299", 85),
      createData(2, "Vegetable Steamer for Cooking", "Kitchen Appliances", "Steamers", "₹499", "₹299", 35),
      createData(3, "Vegetable Steamer for Cooking", "Kitchen Appliances", "Steamers", "₹499", "₹299", 75),
      createData(4, "Vegetable Steamer for Cooking", "Kitchen Appliances", "Steamers", "₹499", "₹299", 55),
      createData(5, "Vegetable Steamer for Cooking", "Kitchen Appliances", "Steamers", "₹499", "₹299", 15),
      createData(6, "Vegetable Steamer for Cooking", "Kitchen Appliances", "Steamers", "₹499", "₹299", 5),
      createData(7, "Vegetable Steamer for Cooking", "Kitchen Appliances", "Steamers", "₹499", "₹299", 40),
      createData(8, "Vegetable Steamer for Cooking", "Kitchen Appliances", "Steamers", "₹499", "₹299", 20),
      createData(9, "Vegetable Steamer for Cooking", "Kitchen Appliances", "Steamers", "₹499", "₹299", 90),
      createData(10, "Vegetable Steamer for Cooking", "Kitchen Appliances", "Steamers", "₹499", "₹299", 70),
      createData(11, "Vegetable Steamer for Cooking", "Kitchen Appliances", "Steamers", "₹499", "₹299", 40),
      createData(12, "Vegetable Steamer for Cooking", "Kitchen Appliances", "Steamers", "₹499", "₹299", 39),
      createData(13, "Vegetable Steamer for Cooking", "Kitchen Appliances", "Steamers", "₹499", "₹299", 69),
    ]);

    

   const allPageRowsSelected = useMemo(() => rows
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .every((row) => row.isSelected), [rows, page, rowsPerPage]);

    const [orderRows, setOrderRows] = useState([
        {
          orderId: "67514d9914da0b327345f1e6",
          paymentId: "pay_xxxxxxxxxxxx",
          name: "John Doe",
          amount: 498,
          ph_no: "9876543210",
          address: "123, Elm Street, Springfield",
          date: "2025-10-28",
          products: "Product 1, Product 2",
          status: "Pending",
          deliveryDate: "2025-11-01",
          modified: "2025-10-28",
        },
        {
          orderId: "67514d9914da0b327345f1e7",
          paymentId: "pay_xxxxxxxxxxxx",
          name: "Jane Smith",
          amount: 799,
          ph_no: "9876543211",
          address: "456, Oak Street, Springfield",
          date: "2025-10-27",
          products: "Product 3, Product 4",
          status: "Pending",
          deliveryDate: "2025-11-02",
          modified: "2025-10-27",
        },
      ]);

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

 
  

  const [categoryFilterValue, setcategoryFilterValue] = useState('');

   const handleChangecatFilter = (event) => {
    setcategoryFilterValue(event.target.value);
  };

  const context =useContext(MyContext);

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
              <Button className="!w-[35px] !h-[35px] btn btn-sm flex items-center !rounded-full !text-black hover:bg-black-300 hover:scale-105" onClick={()=>context.setIsOpenFullScreenPanel({
                open: true,
                 model: 'Add Product',
              })}>
                <span className="text-[18px]"><FaPlus /></span>
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
            <SearchBox/>
           </div>
          
        </div>

        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox" sx={{ pl: 2 }}>
                    <Checkbox checked={allPageRowsSelected} onChange={handleSelectAll} color="primary" />
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }} sx={{ fontWeight: "bold" }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell padding="checkbox" sx={{ pl: 2 }}>
                        <Checkbox
                          checked={row.isSelected || false}
                          onChange={(e) => {
                            const updatedRows = [...rows];
                            updatedRows[page * rowsPerPage + index].isSelected = e.target.checked;
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
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>


    </>
  )
}

export default Product
