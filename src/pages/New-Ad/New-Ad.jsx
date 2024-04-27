import React from 'react'
import { TextField } from '@mui/material'
import { FormControl,InputLabel,Select,MenuItem } from '@mui/material';
import { useState } from 'react';
import { MapContainer, TileLayer,Marker } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css"
import * as Yup from "yup";


function LocationMarker({ pos, onMove }) {
  const customIcon=new Icon({
    iconUrl:require("./../../assets/images/marker.png"),
    iconSize:[38,38]
  })
  return (
    <Marker
      position={pos}
      draggable
      autoPan
      eventHandlers={{
        moveend: (event) => {
          onMove([event.target.getLatLng().lat, event.target.getLatLng().lng]);
        }
      }}
      icon={customIcon}
    />
  );
}
export default function NewAd() {
 

  const [errors,setErrors]=useState({})
  const [markerPos, setMarkerPos] = useState([35.715298, 51.404343]);
  const [city, setCity] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');

  
  
  const handleChangeCity = (event) => {
    setCity(event.target.value);
  };
  const handleChangePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };
  const handleChangeAddress = (event) => {
    setAddress(event.target.value);
  };
  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };
  const validationSchema = Yup.object().shape({
    city:Yup.string().required("لطفا شهر را انتخاب کنید"),
    address:Yup.string().required("آدرس را وارد کنید"),
    phoneNumber:Yup.string().required("لطفا شماره همراه را وارد نمایید").matches(/^(\+98|0)?9\d{9}$/,"فرمت شماره تلفن (الگوی درست شماره تلفن ایران) وارد شده صحیح نمیباشد"),
    description: Yup.string().required("لطفا توضیحات خود را وارد کنید"),
  });
  const registerHandler = async (event)=>{
 
    event.preventDefault()
    
    const newAdObj={
      city:city,
      phoneNumber:phoneNumber,
      address:address,
      lat:markerPos[0],
      lng:markerPos[1],
      description:description,
      userId:sessionStorage?.getItem("userId")
    }
    try{
       await validationSchema.validate(newAdObj,{
        abortEarly:false
      })
      const res = await fetch("http://localhost:3004/ads",{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(newAdObj)
    })
    console.log(res)
    const newAdResult=await(res.json())
    console.log(newAdResult)
    setCity("")
    setPhoneNumber("")
    setAddress("")
    setDescription("")
    setErrors({})
    }
     catch(err){
         let errors=err.inner.reduce((acc,err)=>({
           ...acc,[err.path]:err.message
         }),{})
         setErrors(errors)
     }
    
    
  }
 

  return (
    
    <div className=''>
       <div className='text-center py-4  bg-hoverBlue text-textBlue font-bold'>
      <h2> ثبت آگهی  </h2>
    
    </div>
      <form className="flex flex-col gap-4 items-center py-8 sm:px-4 px-8"  method="POST">
      <div className='flex sm:flex-row flex-col gap-2 items-center lg:w-1/2 md:w-3/5 sm:w-4/5 w-full'>
       <div className='sm:w-2/5 w-full'>
       <FormControl
        fullWidth>
        <InputLabel sx={{fontWeight:"bold"}}  id="demo-simple-select-label">شهر</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={city}
          label="شهر"
          
          onChange={handleChangeCity}
          sx={{fontWeight:"bold"}}
        >
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
      {errors.city && city==="" && <p className='text-red-500 my-0.5 font-semibold text-sm'>{ errors.city}</p>}
       </div>
      <div className="sm:w-3/5 w-full">
                                        <TextField
                                            fullWidth
                                            placeholder=" شماره تلفن همراه"
                                            type="text"
                                            helperText={errors.phoneNumber && errors.phoneNumber}
                                            value={phoneNumber}
                                            onChange={handleChangePhoneNumber}
                                            name="phoneNumber"
                                            inputProps={{style: {fontWeight:"bold"}}}
                                          />
                                                    
                                    </div>
       </div>
      <div className="lg:w-1/2 md:w-3/5 sm:w-4/5 w-full">
                                        <TextField
                                            fullWidth
                                            placeholder="آدرس خانه"
                                            type="text"
                                            value={address}
                                            helperText={errors.address && errors.address}
                                            onChange={handleChangeAddress}
                                            name="address"
                                            inputProps={{style: {fontWeight:"bold"}}}/>
                                            
                                    </div>
                                    
                                    <div className='lg:w-1/2 md:w-3/5 sm:w-4/5 w-full '>
                                      
                                    <MapContainer center={markerPos} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker onMove={setMarkerPos} pos={markerPos} />
      
    </MapContainer>
 
                                    </div>
                                    <div className='lg:w-1/2 md:w-3/5 sm:w-4/5 w-full'>
                                    <TextField
                                        multiline
                                        minRows={5}
                                        maxRows={8}
                                        fullWidth
                                        value={description}
                                        helperText={errors.description && errors.description}
                                            onChange={handleChangeDescription}
                                        placeholder="توضيحات"
                                        type="text"
                                        name="description"
                                        inputProps={{style: {fontWeight:"bold"}}}
                                       
                                        />
                                        
                                </div>
                                <button onClick={registerHandler} type='submit'>
                                <div className='bg-lightBlue py-2 px-6 rounded-lg text-textBlue font-bold hover:bg-hoverBlue '>
                                  ثبت آگهی
                                </div>
                                </button>
      </form>
    </div>
   
  )
}
