import React, { useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { FormControl,Select,InputLabel, MenuItem } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { MapContainer, TileLayer,Marker } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css"


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

export default function EditDialog(props) {
  const [markerPos, setMarkerPos] = useState([]);
  const [city, setCity] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');

  
  useEffect(()=>{
    setCity(props.editInfoTarget.city)
    setPhoneNumber(props.editInfoTarget.phoneNumber)
    setAddress(props.editInfoTarget.address)
    setDescription(props.editInfoTarget.description)
    setMarkerPos([props.editInfoTarget.lat,props.editInfoTarget.lng])
  },[props.openEditInfo])
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
 
  
      const editHandler = async (event)=>{
 
        event.preventDefault()
        setCity("")
        setPhoneNumber("")
        setAddress("")
        setDescription("")
       
        const editAdObj={
          city:city,
          phoneNumber:phoneNumber,
          address:address,
          lat:markerPos[0],
          lng:markerPos[1],
          description:description,
          userId:sessionStorage?.getItem("userId")
        }
        const res = await fetch(`http://localhost:3004/ads/${props.editInfoTarget.id}`,{
          method:"PUT",
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(editAdObj)
        })
        console.log(res)
        const newAdResult=await(res.json())
        console.log(newAdResult)
        props.handleCloseEditInfo()
      }
  return (
    <div>
        <Dialog
        dir='rtl'
        open={props.openEditInfo}
        fullWidth
        onClose={props.handleCloseEditInfo}
      >

         <DialogTitle sx={{textAlign:"center"}}>ویرایش آگهی</DialogTitle>
        
         <form   method="POST">
        <DialogContent >
        <div className='className=" flex flex-col gap-7 "'>
            
       <div className='flex sm:flex-row flex-col  gap-2 items-center'>
       <div className='sm:w-2/5 w-full'>
       <FormControl fullWidth>
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
       </div>
      <div className="sm:w-3/5 w-full">
      <TextField
                                            fullWidth
                                            placeholder=" شماره تلفن همراه"
                                            type="text"
                                            value={phoneNumber}
                                            onChange={handleChangePhoneNumber}
                                            name="phoneNumber"
                                            inputProps={{style: {fontWeight:"bold"}}}
                                          />
                                    </div>
       </div>
      <div className="">
      <TextField
                                            fullWidth
                                            placeholder="آدرس خانه"
                                            type="text"
                                            value={address}
                                            onChange={handleChangeAddress}
                                            name="address"
                                            inputProps={{style: {fontWeight:"bold"}}}/>
                                    </div>
                                   
                                    <div >
                                    <MapContainer center={[32.661343,51.680374]} zoom={5} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker onMove={setMarkerPos} pos={markerPos} />
      
    </MapContainer>
                                    </div>
                                    <div className=''>
                                    <TextField
                                        multiline
                                        minRows={5}
                                        maxRows={8}
                                        fullWidth
                                        value={description}
                                            onChange={handleChangeDescription}
                                        placeholder="توضيحات"
                                        type="text"
                                        name="description"
                                        inputProps={{style: {fontWeight:"bold"}}}
                                       
                                        />
                                </div>
                                <div className='flex gap-4 justify-center items-center p-4 font-medium'>
        <button  className='bg-lightBlue border border-textBlue text-textBlue rounded-lg py-1 px-3  hover:bg-hoverBlue 'onClick={editHandler} >ویرایش</button>
        <button className='bg-lightGray border border-darkBlue text-darkBlue rounded-lg py-1 px-3 hover:bg-hoverGray' onClick={props.handleCloseEditInfo}>انصراف</button>
          
        </div>
        </div>
        </DialogContent>
        </form>
       
      </Dialog>
    </div>
  )
}
