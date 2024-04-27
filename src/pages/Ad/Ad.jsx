import React from "react"
import { useState,useEffect } from "react"
import home from "../../assets/images/home.svg"
import { useParams } from "react-router-dom"
import { MapContainer, TileLayer,Marker } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css"


export default function Ad() {
  let params=useParams()
  const [data,setData]=useState([])
 
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3004/ads/${params.id}`);
      const jsonData = await response.json();
      setData(jsonData);
    }
    fetchData()
  },[]);
  const customIcon=new Icon({
    iconUrl:require("./../../assets/images/marker.png"),
    iconSize:[38,38]
  })
 
  return (
<div className='flex justify-center'>
<div className='text-center xl:w-1/2 lg:w-3/5 md:w-3/4 sm:w-4/5 w-5/6 justify-center  py-8 font-bold'>
    
<div className="  shadow ">
        <div className='flex justify-center'>
        <img class="w-2/5 opacity-20" src={home} alt="home" />
        </div>
    <div className="p-5">
            <h5 className="mb-2 text-2xl  tracking-tight text-gray-900 ">خانه</h5>
            <p className="mb-3  text-gray-700 "> شهر :{data.city==="TEHRAN"?"تهران":data.city==="TABRIZ"?"تبریز":data.city==="SHIRAZ"?"شیراز":data.city==="MASHHAD"?"مشهد":data.city==="QOM"?"قم":data.city==="ESFAHAN"?"اصفهان":data.city==="MAZANDARAN"?"مازندران":data.city==="KARAJ"?"کرج":data.city==="YAZD"?"یزد":""}</p>
        <p className="mb-3  text-gray-700 ">آدرس خانه :{data.address}</p>
        <p className="mb-3  text-gray-700 ">شماره تلفن تماس با مالک  : {data.phoneNumber}</p>
        <p className="mb-3  text-gray-700 ">   توضیحات مالک  : {data.description} </p>
        
    </div>
    <div   className="p-5">
    <MapContainer center={[data.lat ? data.lat :32.661343 ,data.lng ? data.lng :51.680374 ]} zoom={5} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
       <Marker position={[data.lat ? data.lat :32.661343 ,data.lng ? data.lng :51.680374 ]} icon={customIcon}></Marker>
    </MapContainer>
   </div>
</div></div>
</div>

    
  )
}
