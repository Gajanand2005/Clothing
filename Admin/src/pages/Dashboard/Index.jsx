import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { FaPlus } from "react-icons/fa6";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import DashboardBoxes from "../../Components/DashboardBoxes";
import dashboard from "../../assets/dashboard.webp";
import ProgressBar from "../../Components/ProgressBar";
import { FaEdit } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";
import TooltipMUI from "@mui/material/Tooltip";
import { IconButton } from "@mui/material";
import { Collapse, Box, Typography } from "@mui/material";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { PiExportBold } from "react-icons/pi";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area } from 'recharts';
import Badge from '../../Components/Badge/Index.jsx';



const columns = [
  { id: "id", label: "ID", minWidth: 50 },
  { id: "product", label: "Product Name", minWidth: 80 },
  { id: "category", label: "Category", minWidth: 100 },
  { id: "subCategory", label: "Sub Category", minWidth: 100 },
  { id: "price", label: "Price", minWidth: 80 },
  { id: "sales", label: "Sales", minWidth: 120 },
  { id: "action", label: "Action", minWidth: 100 },
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

  const action = (
    <div className="flex items-center gap-1">
      <TooltipMUI title="Edit Product" placement="top">
        <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#ccc]">
          <FaEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
        </Button>
      </TooltipMUI>
      <TooltipMUI title="View Product Details" placement="top">
        <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#ccc]">
          <IoEyeOutline className="text-[rgba(0,0,0,0.7)] text-[24px]" />
        </Button>
      </TooltipMUI>
      <TooltipMUI title="Remove Product" placement="top">
        <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#ccc]">
          <AiTwotoneDelete className="text-[rgba(0,0,0,0.7)] text-[25px]" />
        </Button>
      </TooltipMUI>
    </div>
  );

  const priceColumn = (
    <div className="flex flex-col gap-1">
      <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">{oldPrice}</span>
      <span className="price text-blue-600 text-[14px] font-[600]">{currentPrice}</span>
    </div>
  );

  const productName = (
    <div className="flex items-center gap-4 w-[220px]">
      <Link to="/products/485789">
        <div className="img w-[55px] h-[55px] rounded-md overflow-hidden group">
          <img
            src="https://m.media-amazon.com/images/I/71i6Cc-hFQL._AC_SY200_.jpg"
            className="w-full group-hover:scale-105 transition-all"
          />
        </div>
      </Link>
      <div className="info w-[75%] text-[#696969]">
        <h3 className="font-[600] text-[12px] leading-4 hover:text-blue-600">
          <Link to="/products/485789">{product}</Link>
        </h3>
        <span className="text-[11px]">Kitchen Appliances</span>
      </div>
    </div>
  );

  return { id, product: productName, category, subCategory, price: priceColumn, sales, action };
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

const Dashboard = () => {
    const [isOpenOrderProduct, setIsOpenOrderProduct]= useState(null);
  
  const isShowOrderdProduct =(index)=>{
    if(isOpenOrderProduct===index){
      setIsOpenOrderProduct(null);
    }else{
      setIsOpenOrderProduct(index);
  
    }
  }

  const [openRow, setOpenRow] = React.useState(null);
  const [rows, setRows] = React.useState([
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

  const [page, setPage] = React.useState(0);

  const [chart1Data, setChart1Data] = useState([
    {
      name: 'Jan',
      Total_Users: 4000,
      Total_Sales: 2400,
      amt: 2400,
    },
    {
      name: 'Feb',
      Total_Users: 3000,
      Total_Sales: 1398,
      amt: 2210,
    },
    {
      name: 'Mar',
      Total_Users: 2000,
      Total_Sales: 9800,
      amt: 2290,
    },
    {
      name: 'Apr',
      Total_Users: 2780,
      Total_Sales: 3908,
      amt: 2000,
    },
    {
      name: 'May',
      Total_Users: 1890,
      Total_Sales: 4800,
      amt: 2181,
    },
    {
      name: 'Jun',
      Total_Users: 2390,
      Total_Sales: 3800,
      amt: 2500,
    },
    {
      name: 'Jul',
      Total_Users: 7490,
      Total_Sales: 4300,
      amt: 2100,
    },
     {
      name: 'Aug',
      Total_Users: 4490,
      Total_Sales: 8300,
      amt: 2100,
    },
     {
      name: 'Sep',
      Total_Users: 3490,
      Total_Sales: 6300,
      amt: 2100,
    },
     {
      name: 'Oct',
      Total_Users: 5090,
      Total_Sales: 3300,
      amt: 2100,
    },
     {
      name: 'Nov',
      Total_Users: 0,
      Total_Sales: 0,
      amt: 0,
    },
     {
      name: 'Dec',
      Total_Users: 0,
      Total_Sales: 0,
      amt: 0,
    },
  ])

  const [rowsPerPage, setRowsPerPage] = React.useState(10);
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

  const [orderRows, setOrderRows] = React.useState([
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

  const [categoryFilterValue, setcategoryFilterValue] = React.useState('');

  const handleChangecatFilter = (event) => {
    setcategoryFilterValue(event.target.value);
  };

  return (
    <>
      <div className="w-full py-2 px-5 border border-[rgba(0,0,0,0.1)] rounded-md bg-white flex items-center justify-between mb-6 gap-8">
        <div className="info">
          <h1 className="text-[30px] font-[600] leading-18">
            Good Morning, <br />S-Mal Couture <span>👋</span>
          </h1>
          <p className="leading-10">
            Here's what's happening on your store today. See the statistics at once.
          </p>
          <Button className="btn-blue !capitalize mt-4 flex items-center gap-2" variant="contained">
            <FaPlus /> Add Product
          </Button>
        </div>
        <img src={dashboard} className="w-[250px]" alt="Dashboard" />
      </div>

      <DashboardBoxes />

      <div className="card my-5 shadow-md sm:rounded-lg bg-white">
        <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
          <h2 className="text-[18px] font-[600]">Products</h2>
        </div>

        <div className="flex items-center w-full pl-5 justify-between pr-5">
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
          <div className="col w-[15%] ml-auto flex items-center gap-2">
            <TooltipMUI title="Export" placement="top">
              <Button className="!w-[35px] !h-[35px] btn btn-sm flex items-center !rounded-full !text-black !hover:bg-black-300 hover:scale-105">
                <PiExportBold />
              </Button>
            </TooltipMUI>
            <TooltipMUI title="Add Product" placement="top">
              <Button className="!w-[35px] !h-[35px] btn btn-sm flex items-center !rounded-full !text-black hover:bg-black-300 hover:scale-105">
                <span className="text-[18px]"><FaPlus /></span>
              </Button>
            </TooltipMUI>
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

      <div className="card my-5 shadow-md sm:rounded-lg bg-white">
        <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
          <h2 className="text-[18px] font-[600]">Recent Orders</h2>
        </div>
          <div className="col2 w-full">
           <div className="shadow-md rounded-md  bg-white">
              <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)]">
                <h2 className="text-[18px] font-[600]">My Order</h2>
                <p className="!mt-0">
                  There are
                  <span className="font-bold text-orange-600 ">2</span> Order
                </p>
                  <div className="relative overflow-x-auto !mt-5">
                <table className="w-full text-sm text-left rtl:text-right text-black ">
                  <thead className="text-xs text-black uppercase  ">
                    <tr>
                       <th scope="col" className="px-6 py-3">
                        &nbsp;
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Order Id
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                       Payment Id
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                       Name
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                       Number
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                       Address
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                       PinCode
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                       Total
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                       Email
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                       User Id
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                       Order Status
                      </th>
                       <th scope="col" className="px-6 py-3 whitespace-nowrap">
                       Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b  dark:border-gray-700 border-gray-200 font-[600]">
                      <td className="px-6 py-4">
                        <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]' onClick={()=>isShowOrderdProduct(0)} >
                          {
                            isOpenOrderProduct === 0 ? <FaAngleUp className='text-[18px] text-[#000]' /> : <FaAngleDown className='text-[18px] text-[#000]' />
                          }
                         </Button>
                      </td>
                      <td className="px-6 py-4">123456</td>
                      <td className="px-6 py-4">4564tyut56</td>
                      <td className="px-6 py-4">Gagan</td>
                      <td className="px-6 py-4">4564564564</td>
                      <td className="px-6 py-4 "><span className='block w-[300px]'>MOnn H.NO 29 outside the earth</span> </td>
                      <td className="px-6 py-4">12345</td>
                      <td className="px-6 py-4">1200</td>
                      <td className="px-6 py-4">Gagan@gmail.com</td>
                      <td className="px-6 py-4">12345646</td>
                      <td className="px-6 py-4"><Badge status="delivered" /></td>
                      <td className="px-6 py-4 whitespace-nowrap">12-2-2025</td>
                    </tr>
                    {
                      isOpenOrderProduct=== 0 && (
                        <tr>
                      <td className='bg-[#f1f1f1] pl-20' colSpan={6}>
                        <div className='relative overflow-x-auto'>
                        <table className="w-full text-sm text-left rtl:text-right text-black ">
                  <thead className="text-xs text-black uppercase  ">
                    <tr>
                     
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Product Id
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                       Product Title 
                       </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                       Image
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                       Qty
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                       Price
                      </th>
                     
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                       Sub total 
                      </th>
                     </tr>
                     
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b  dark:border-gray-700 border-gray-200 font-[600]">
                      
                      <td className="px-6 py-4">123456</td>
                      <td className="px-6 py-4 whitespace-nowrap">A -lien color Blue shari for ladiys this is cool</td>
                      <td className="px-6 py-4">
                        <img src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/90-home_default/hummingbird-cushion.jpg" alt="" className='w-[40px] h-[40px] object-cover rounded-md'/>
                      </td>
                      <td className="px-6 py-4">2</td>
                      <td className="px-6 py-4 ">1200 </td>
                      <td className="px-6 py-4">1200</td>
                     
                    </tr>

                    <tr>
                      <td className='bg-[#f1f1f1]' colSpan={6}>
                        
                      </td>
                    </tr>
                    
                  </tbody>
              
                  
                </table>
                </div>
                      </td>
                    </tr>
                      )
                    }
                    
                    
                  </tbody>
                </table>
             
              </div>
              </div>
            </div>
           
            
        </div>
        
      </div>

      <div className="card my-5 shadow-md sm:rounded-lg bg-white">

        <div className="px-4 py-5 sm:px-6 flex items-center justify-between pb-0">
          <h2 className="text-[18px] font-[600]">Total Users and Total Sales</h2>
        </div>

        <div className="px-4 py-5 sm:px-6 flex items-center gap-5 ">
          <span className="flex items-center gap-1 text-[15px]">
            <span className="block w-[8px] h-[8px] rounded-full bg-green-600"></span>
            Total Users
          </span>

          <span className="flex items-center gap-1 text-[15px]">
            <span className="block w-[8px] h-[8px] rounded-full bg-blue-600"></span>
            Total Sales
          </span>
        </div>

        <LineChart
          style={{ width: '100%', maxWidth: '900px', height: '100%', maxHeight: '200vh', aspectRatio: 1.618 }}
          responsive
          data={chart1Data}
          margin={{
            top: 5,
            right: 0,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke='none' />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis width="auto" tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Total_Sales" stroke="#0045d0ff" strokeWidth={3} activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="Total_Users" stroke="#00b309ff" strokeWidth={3} />
        </LineChart>
      </div>
    </>
  );
};

export default Dashboard;
