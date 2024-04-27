import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import home from "../../../assets/images/home.svg"
import { Link } from 'react-router-dom';


export default function Cards(props) {
 
  return (
   
    <Link to={`/ad/${props?.data?.id}`}>
    <Card sx={{ maxWidth: 300,direction:'rtl',backgroundColor:"transparent",border:"2px solid #ddd"  }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={home}
          sx={{width:"75%",opacity:"20%",mx:"auto"}}
          
          alt="خانه"
        />
        <CardContent sx={{borderTop:"1px solid #ddd" }}>
          <Typography sx={{fontWeight:"bold"}} gutterBottom variant="h5" component="div">
            <span className='text-black ]'>مسکن</span>
          </Typography>
          <Typography sx={{fontWeight:"bold"}}  variant="body2" color="text.secondary">
          <span className='text-black ]'>شهر :</span> <span className='text-black ]'>{props?.data?.city==="TEHRAN"?"تهران":props?.data?.city==="TABRIZ"?"تبریز":props?.data?.city==="SHIRAZ"?"شیراز":props?.data?.city==="MASHHAD"?"مشهد":props?.data?.city==="QOM"?"قم":props?.data?.city==="ESFAHAN"?"اصفهان":props?.data?.city==="MAZANDARAN"?"مازندران":props?.data?.city==="KARAJ"?"کرج":props?.data?.city==="YAZD"?"یزد":""}</span>
          </Typography>
          <Typography sx={{fontWeight:"bold"}}  variant="body2" color="text.secondary">
          <span className='text-black ]'>آدرس :</span> <span className='text-black ]'>{props?.data?.address}</span>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
 
  );
}