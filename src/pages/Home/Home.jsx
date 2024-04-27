import React from 'react'
import { useState,useEffect } from 'react'
import Cards from '../../components/Home/Card/Card'
import { Pagination } from '@mui/material'
import { FormControl,InputLabel,Select,MenuItem,FormGroup,FormControlLabel,Checkbox } from '@mui/material';



export default function Home() {
 
  const [data,setData]=useState([])
  const [count,setCount]=useState()
  const [sortOrder,setSetOrder]=useState("desc")
  const changeSortOrder=(event)=>{
    setSetOrder(event.target.value)
  }
  const [city, setCity] = useState("همه شهر ها");
  const handleChangeCity = (event) => {
    setCity(event.target.value);
  };
  const [page, setPage] = useState(1);
  const handlePagination = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3004/ads?_sort=id&_order=${sortOrder}${city !=="همه شهر ها" && "&city="+city}`);
      const jsonResult = await res.json();
      setCount(Math.ceil((jsonResult.length)/12));
    }
    fetchData();
  }, [city,sortOrder]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3004/ads?_sort=id&_order=${sortOrder}&_page=${page}&_limit=12${city !=="همه شهر ها" && "&city="+city}`);
      const jsonData = await response.json();
      setData(jsonData);
    }
    fetchData();
  }, [city,sortOrder,page]);
  
 

  return (
    
   <main className=''>
    <div className='text-center py-4 bg-hoverBlue  text-textBlue font-bold'>
      <h2> تمام آگهی های مسکن</h2>
    </div>
     <div className= ' flex md:flex-row flex-col px-4 py-8 gap-4  sm:justify-between justify-center'>
    <div className='xl:w-1/6 lg:w-1/5 md:w-[30%] space-y-4 flex md:flex-col   gap-4 '>
         <div   className='border border-darkBlue  w-1/2 md:w-full mt-4 flex flex-col justify-center items-center font-bold text-darkBlue  rounded-lg  px-3 py-2  '>
        <div className=''>
            <h3 className=' '>فیلتر</h3>
        </div>
        
      
        <div className=" w-[90%] my-6">
        
        <FormControl  fullWidth>
        <InputLabel  sx={{fontWeight:"bold"}}  id="demo-simple-select-label"><span className=' text-black'>شهر</span></InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={city}
          label="شهر"
          onChange={handleChangeCity}
          sx={{fontWeight:"bold"}}
        >
          <MenuItem sx={{fontWeight:"bold",direction:"rtl"}} value={"همه شهر ها"}>همه شهر ها</MenuItem>
          <MenuItem sx={{fontWeight:"bold",direction:"rtl"}} value={"TEHRAN"}>تهران</MenuItem>
          <MenuItem sx={{fontWeight:"bold",direction:"rtl"}} value={"TABRIZ"}>تبریز</MenuItem>
          <MenuItem sx={{fontWeight:"bold",direction:"rtl"}} value={"SHIRAZ"}>شیراز</MenuItem>
          <MenuItem sx={{fontWeight:"bold",direction:"rtl"}} value={"MASHHAD"}>مشهد</MenuItem>
          <MenuItem sx={{fontWeight:"bold",direction:"rtl"}} value={"QOM"}>قم</MenuItem>
          <MenuItem sx={{fontWeight:"bold",direction:"rtl"}} value={"ESFAHAN"}>اصفهان</MenuItem>
          <MenuItem sx={{fontWeight:"bold",direction:"rtl"}} value={"MAZANDARAN"}>مازندران</MenuItem>
          <MenuItem sx={{fontWeight:"bold",direction:"rtl"}} value={"KARAJ"}>کرج</MenuItem>
          <MenuItem sx={{fontWeight:"bold",direction:"rtl"}} value={"YAZD"}>یزد</MenuItem>
        </Select>
      </FormControl>
      
   
  
                                      
                                        </div>
                                      
   
    </div>
    
    
    
   
         <div   className='border border-darkBlue   w-1/2 md:w-full flex flex-col justify-center items-center font-bold text-darkBlue  rounded-lg  px-3 py-2 '>
        <div className=''>
            <h3 className=''>مرتب سازی</h3>
        </div>
        
      
        <div className=" w-[90%] my-6">
      
        <FormControl component="fieldset">
      
      <FormGroup aria-label="position" col>
      
        <FormControlLabel
          value={"desc"}
          onChange={changeSortOrder}
          control={<Checkbox checked={sortOrder==="desc"?true:false}  />}
          label="قدیمی ترین"
                  />
        <FormControlLabel
          value={"asc"}
          onChange={changeSortOrder}
          control={<Checkbox checked={sortOrder==="asc"?true:false} />}
          label="جدیدترین"
                  />

      </FormGroup>
    </FormControl>
    
      </div>                                     
    </div>
    
        
      
    
       </div>
    
       <div className='grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2   gap-x-4 gap-y-12 xl:w-5/6 lg:w-4/5 md:w-[70%] w-full '>
       {data?.map((data)=>(
        <Cards data={data}/>
       ))}
       </div>
       </div>
    
    <div
            className="flex justify-center pb-5 pt-7"
            dir='ltr'
          >
            <Pagination
              page={page}
              count={count}
              onChange={handlePagination}
              shape="rounded"
            />
          </div>
   </main>
  
  )
}
