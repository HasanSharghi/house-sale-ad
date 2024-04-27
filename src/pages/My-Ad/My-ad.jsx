import React from 'react'
import { useState,useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import home from "../../assets/images/home.svg"
import DeleteDialog from '../../components/My-Ad/DeleteDialog';
import EditDialog from '../../components/My-Ad/EditDialog';
import InfoDialog from '../../components/My-Ad/InfoDialog';
import { Pagination } from '@mui/material'
export default function MyAd() {

  const [data,setData]=useState([])
  const [openDelete, setOpenDelete] =useState(false);
  const [openEditInfo, setOpenEditInfo] = useState(false);
  const [count,setCount]=useState()
  const [deleteTargetId, setDeleteTargetId] = useState("");
  const [page, setPage] = useState(1);
  const handlePagination = (event, value) => {
    setPage(value);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3004/ads?userId=${sessionStorage.getItem("userId")}&_sort=id&_order=desc`);
      const jsonData = await response.json(); 
      setCount(Math.ceil((jsonData.length)/12));
    }
    fetchData();
  },[openDelete,openEditInfo]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3004/ads?userId=${sessionStorage.getItem("userId")}&_sort=id&_order=desc&_page=${page}&_limit=12`);
      const jsonData = await response.json();
      setData(jsonData);
      
      
    }
    fetchData();
  },[openDelete,openEditInfo,page]);
  console.log(data)
  
  const handleClickOpen = (id) => {
    setDeleteTargetId(id);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setDeleteTargetId("");
    setOpenDelete(false);
  };
  const [openMoreInfo, setOpenMoreInfo] = useState(false);
  const [moreInfoTarget, setMoreInfoTarget] = useState({
    id: "",
    city:"",
    address: "",
    phoneNumber: "",
    lat:"",
    lng:"",
    description: "",
  });
  const handleOpenMoreInfo = (info) => {
    setMoreInfoTarget(info);
    setOpenMoreInfo(true);
  };

  const handleCloseMoreInfo = () => {
    setMoreInfoTarget({
      id: "",
    city:"",
    address: "",
    phoneNumber: "",
    lat:"",
    lng:"",
    description: "",
    });
    setOpenMoreInfo(false);
  };
  const [editInfoTarget, setEditInfoTarget] = useState({
    id: "",
    city:"",
    address: "",
    phoneNumber: "",
    lat:"",
    lng:"",
    description: "",
  });

  const handleOpenEditInfo = (info) => {
    setEditInfoTarget(info);
    setOpenEditInfo(true);
  };
  const handleCloseEditInfo = () => {
    setEditInfoTarget({
      id: "",
      city:"",
      address: "",
      phoneNumber: "",
      lat:"",
      lng:"",
      description: "",
    });
    setOpenEditInfo(false);
  };
  return (
 
    <div>
      <div className='text-center  py-4 bg-hoverBlue text-textBlue font-bold'>
      <h2> تمام آگهی های من</h2>
    
    </div>
    <div className='sm:grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 flex flex-col w-full   gap-x-4 gap-y-12  px-4 py-8'>
      {data?.map((data)=>(
          <Card sx={{ backgroundColor:"transparent",border:"2px solid #ddd"   }}>
          <CardMedia
            component="img"
            alt="مسکن"
            height="140"
            image={home}
            sx={{opacity:"20%"}}
          />
          <CardContent sx={{borderTop:"1px solid #ddd"}}>
          <div className='flex gap-2 pt-3 pb-6 justify-center items-center'>
                <div>
                <button
                              onClick={() => {
                                handleOpenMoreInfo(data);
                              }}
                              className="border border-1 border-solid border-gray70 rounded p-[0.4rem] hover:bg-neutral-100"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                              >
                                <path
                                  d="M9 4.56442V4.55554"
                                  stroke="#797979"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M9 13.4445V7.22223"
                                  stroke="#797979"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                                  stroke="#797979"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </button>
                </div>
                <div>
                <button  onClick={() => {
                                      handleOpenEditInfo(data);
                                    }}
                                    
                                    className="border border-1 border-solid border-[#2492FF] rounded p-[0.4rem] hover:bg-blue-100"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                    >
                                      <g clip-path="url(#clip0_197_250)">
                                        <path
                                          d="M7.3335 2.66666H4.5335C3.41339 2.66666 2.85334 2.66666 2.42552 2.88464C2.04919 3.07639 1.74323 3.38235 1.55148 3.75867C1.3335 4.1865 1.3335 4.74655 1.3335 5.86666V11.4667C1.3335 12.5868 1.3335 13.1468 1.55148 13.5746C1.74323 13.951 2.04919 14.2569 2.42552 14.4487C2.85334 14.6667 3.41339 14.6667 4.5335 14.6667H10.1335C11.2536 14.6667 11.8137 14.6667 12.2415 14.4487C12.6178 14.2569 12.9238 13.951 13.1155 13.5746C13.3335 13.1468 13.3335 12.5868 13.3335 11.4667V8.66666M5.33348 10.6667H6.44984C6.77596 10.6667 6.93902 10.6667 7.09247 10.6298C7.22852 10.5972 7.35858 10.5433 7.47788 10.4702C7.61243 10.3877 7.72773 10.2724 7.95833 10.0418L14.3335 3.66666C14.8858 3.11437 14.8858 2.21894 14.3335 1.66666C13.7812 1.11437 12.8858 1.11437 12.3335 1.66665L5.95832 8.04182C5.72772 8.27242 5.61241 8.38772 5.52996 8.52228C5.45685 8.64157 5.40298 8.77163 5.37032 8.90768C5.33348 9.06113 5.33348 9.22419 5.33348 9.55031V10.6667Z"
                                          stroke="#2492FF"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_197_250">
                                          <rect
                                            width="16"
                                            height="16"
                                            fill="white"
                                          />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  </button>
                </div>
                <div>
                <button onClick={()=>[
                  handleClickOpen(data?.id)
                ]}
                                   
                                    className="border border-1 border-solid border-[#FE4949] rounded p-[0.4rem] hover:bg-red-100"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                    >
                                      <path
                                        d="M10.6667 3.99998V3.46665C10.6667 2.71991 10.6667 2.34654 10.5213 2.06133C10.3935 1.81044 10.1895 1.60647 9.93865 1.47864C9.65344 1.33331 9.28007 1.33331 8.53333 1.33331H7.46667C6.71993 1.33331 6.34656 1.33331 6.06135 1.47864C5.81046 1.60647 5.60649 1.81044 5.47866 2.06133C5.33333 2.34654 5.33333 2.71991 5.33333 3.46665V3.99998M6.66667 7.66665V11M9.33333 7.66665V11M2 3.99998H14M12.6667 3.99998V11.4666C12.6667 12.5868 12.6667 13.1468 12.4487 13.5746C12.2569 13.951 11.951 14.2569 11.5746 14.4487C11.1468 14.6666 10.5868 14.6666 9.46667 14.6666H6.53333C5.41323 14.6666 4.85318 14.6666 4.42535 14.4487C4.04903 14.2569 3.74307 13.951 3.55132 13.5746C3.33333 13.1468 3.33333 12.5868 3.33333 11.4666V3.99998"
                                        stroke="#FE4949"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                    </svg>
                                  </button>
                                
                </div>
              </div>
            <div className='flex justify-between items-center '>
              
              <div>
              <Typography sx={{fontWeight:"bold"}} gutterBottom variant="h5" component="div">
            <span className='text-black '>مسکن</span>
          </Typography>
              </div>
            
            </div>
            <Typography sx={{fontWeight:"bold"}}  variant="body2" color="text.secondary">
          <span className='text-black '>شهر :</span> <span className='text-black '>{data.city==="TEHRAN"?"تهران":data.city==="TABRIZ"?"تبریز":data.city==="SHIRAZ"?"شیراز":data.city==="MASHHAD"?"مشهد":data.city==="QOM"?"قم":data.city==="ESFAHAN"?"اصفهان":data.city==="MAZANDARAN"?"مازندران":data.city==="KARAJ"?"کرج":data.city==="YAZD"?"یزد":""}</span>
          </Typography>
          <Typography sx={{fontWeight:"bold"}}  variant="body2" color="text.secondary">
          <span className='text-black '>آدرس :</span> <span className='text-black '>{data.address}</span>
          </Typography>
            
          </CardContent>
    
    
        
     
    
    
        </Card>     
      ))}
          <DeleteDialog 
          handleClickOpen={handleClickOpen}
            deleteTargetId={deleteTargetId}
            openDelete={openDelete}
            handleCloseDelete={handleCloseDelete} />
          <EditDialog
             editInfoTarget={editInfoTarget}
             handleCloseEditInfo={handleCloseEditInfo}
             openEditInfo={openEditInfo}
         />
           <InfoDialog
        
          moreInfoTarget={moreInfoTarget}
          openMoreInfo={openMoreInfo}
          handleCloseMoreInfo={handleCloseMoreInfo}
        />
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
    </div>
    
  )
}
