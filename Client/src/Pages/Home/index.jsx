import React from 'react'
import HomeSlider from '../../Components/HomeSlider/Index.jsx'
import HomeCatSlider from '../../Components/HomeCatSlider/Index.jsx'

import AdsBannerSlider from '../../components/AdsBannerSlider/Index';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ProductSlider from '../../Components/ProductSlider/Index';
const Home = () => {
 const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }; 
  return (
    <div>
      <HomeCatSlider />
      <HomeSlider />


      <section className='bg-white py-8'>
        <div className='container'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
          <div className='leftSec p-4 md:p-10 text-center md:text-left w-full md:w-auto'>
          <h2 className='text-[18px] md:text-[22px] font-[600]'>Popular Products</h2>
          </div>

          <div className='rightSec w-full md:w-[57%]'>
            <Box sx={{ maxWidth: { xs: 320, sm: 780 }, bgcolor: 'background.paper' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        className="w-full"
      >
        <Tab label="Ethnic" className="!text-sm md:!text-base" />
        <Tab label="West Wear" className="!text-sm md:!text-base" />
        <Tab label="Co-Ords" className="!text-sm md:!text-base" />

      </Tabs>
    </Box>
          </div>
        </div>

       <ProductSlider items={5} />


        </div>
      </section>

       <section className='py-16 bg-white  '>
        <div className='container'> 
       

        <AdsBannerSlider items={4}/>

        </div>
       </section>

       <br /><br /><br /><br /><br /><br />
    </div>
  )
}

export default Home
