import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContentText } from '@mui/material';
import { Marker,MapContainer,TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const customIcon=new Icon({
    iconUrl:require("./../../assets/images/marker.png"),
    iconSize:[38,38]
  })

export default function InfoDialog(props) {
    
  return (
    <div >
          <Dialog
          fullWidth={true}
          sx={{textAlign:"center"}}
          open={props.openMoreInfo}
          TransitionComponent={Transition}
          keepMounted
          onClose={props.handleCloseMoreInfo}
          aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"اطلاعات مسکن"}</DialogTitle>
        <DialogContent>
        <DialogContentText style={{ fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189" }}>
                        
                       
                        <div className="hidden font-bold md:flex md:justify-center mb-4">
                            <div className="w-full md:w-[70%] flex flex-col gap-2">
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className=" text-gray70 ">نام شهر</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  text-center  px-4">
                                        <div className="p-2">
                                            <span className=" ">{props.moreInfoTarget?.city==="TEHRAN"?"تهران":props.moreInfoTarget?.city==="TABRIZ"?"تبریز":props.moreInfoTarget?.city==="SHIRAZ"?"شیراز":props.moreInfoTarget?.city==="MASHHAD"?"مشهد":props.moreInfoTarget?.city==="QOM"?"قم":props.moreInfoTarget?.city==="ESFAHAN"?"اصفهان":props.moreInfoTarget?.city==="MAZANDARAN"?"مازندران":props.moreInfoTarget?.city==="KARAJ"?"کرج":props.moreInfoTarget?.city==="YAZD"?"یزد":""}</span>
                                        </div>
                                        
                                    </div>
                                </div>
                               
                                        <div className="text-center  py-1">
                                            <div className="mb-2">
                                                <span className=" text-gray70 ">شماره تماس مالک</span>
                                            </div>
                                            <div className="border border-[#D9D9D9]   px-4">
                                                <div className="p-2">
                                                    <span className=" ">{props.moreInfoTarget?.phoneNumber}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-center  py-1">
                                            <div className="mb-2">
                                                <span className=" text-gray70 "> آدرس خانه</span>
                                            </div>
                                            <div className="border border-[#D9D9D9]   px-4">
                                                <div className="p-2">
                                                    <span className=" ">{props.moreInfoTarget?.address}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div >
                                        <MapContainer center={[props.moreInfoTarget?.lat, props.moreInfoTarget?.lng]} zoom={5} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
       <Marker position={[props.moreInfoTarget?.lat, props.moreInfoTarget?.lng]} icon={customIcon}></Marker>
    </MapContainer>
                                        </div>

                                        <div className="text-center  py-1">
                                            <div className="mb-2">
                                                <span className=" text-gray70 ">توضیحات</span>
                                            </div>
                                            <div className="border border-[#D9D9D9]   px-4">
                                                <div className="p-2">
                                                    <span className=" ">{props.moreInfoTarget?.description}</span>
                                                </div>
                                            </div>
                                        </div>
                               
                              
                               
                               
                            </div>
                        </div>
                        <div className="md:hidden font-bold flex justify-center">
                            <div className="w-full md:w-[70%] flex flex-col gap-3">
                                <div>
                                    <span className="ml-1  ">
                                        نام شهر :
                                    </span>
                                    <span className=" ">
                                    {props.moreInfoTarget?.city==="TEHRAN"?"تهران":props.moreInfoTarget?.city==="TABRIZ"?"تبریز":props.moreInfoTarget?.city==="SHIRAZ"?"شیراز":props.moreInfoTarget?.city==="MASHHAD"?"مشهد":props.moreInfoTarget?.city==="QOM"?"قم":props.moreInfoTarget?.city==="ESFAHAN"?"اصفهان":props.moreInfoTarget?.city==="MAZANDARAN"?"مازندران":props.moreInfoTarget?.city==="KARAJ"?"کرج":props.moreInfoTarget?.city==="YAZD"?"یزد":""}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1  ">
                                        شماره تماس مالک :
                                    </span>
                                    <span className=" ">
                                        {props.moreInfoTarget?.phoneNumber}
                                    </span>
                                </div>
                               
                               <div>
                                    <span className="ml-1  ">
                                         آدرس خانه :
                                    </span>
                                    <span className=" ">
                                        {props.moreInfoTarget.address}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1  ">
                                          توضیحات :
                                    </span>
                                    <span className=" ">
                                        {props.moreInfoTarget.description}
                                    </span>
                                </div>
                                
                                
                                
                            </div>
                        </div>
                       
                    </DialogContentText>
        </DialogContent>
        <DialogActions>
        <div className='w-full flex justify-center gap-4 p-4 font-medium'>
        <button className='bg-lightBlue border border-textBlue text-textBlue font-bold rounded-lg py-1 px-3  hover:bg-hoverBlue '  onClick={props.handleCloseMoreInfo}>بستن</button>
        </div>
        </DialogActions>
      </Dialog>
    </div>
  )
}
