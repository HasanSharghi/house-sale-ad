import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { useState } from 'react';
import {useNavigate}  from 'react-router-dom';


export default function Login() {

  
    const theme = createTheme({
        direction: "rtl"
      });
      const [email,setEmail]=useState()
      const [password,setPassword]=useState()
      const navigate = useNavigate();
      const handleChangeEmail = (event) => {
        setEmail(event.target.value);
      };
      const handleChangePassword = (event) => {
        setPassword(event.target.value);
      };
      const loginHandler = async (event)=>{
 
        event.preventDefault()
      
       
       
        const userObj={
          email:email,
          password:password,
          
        }
      
          await fetch("http://localhost:3004/login",{
            method:"POST",
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify(userObj)
          }).then(
            (res)=>{return res.json()
             
            
            }
        ).then((data,status)=>{
          console.log(data)
          if(data.accessToken) {
            toast.success("وارد شدید");
            setEmail("")
            setPassword("")
            
            window.sessionStorage.setItem("isLogin",true)
            window.sessionStorage.setItem("firstName",data.user.firstName)
          window.sessionStorage.setItem("lastName",data.user.lastName)
          window.sessionStorage.setItem("userId",data.user.id)
          setTimeout(() => {
            
            navigate("/");
          }, "2000");
          } else{
           password!=="" && email!=="" &&  toast.warn("کاربری با این ایمیل و رمز عبور یافت نشد ")
          }
        }
          ).catch((error)=>{
          toast.error("خطا در وارد شدن به سایت !!!");
        })}

  return (
    <ThemeProvider theme={theme}>
      <Container dir="rtl"  maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 24,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent:"center",
            border:"2px solid #0ea5e9",
            borderRadius:"10px",
            padding:"16px",
            color:"#334155"
            
          }}
        >
          
          <Typography  component="h1" variant="h5">
            ورود 
          </Typography>
          <form method='POST'>
          

            <TextField
              margin="normal"
              fullWidth
              type="text"
              placeholder='آدرس ایمیل'
              name="email"
              required
              value={email}
              helperText={!window.sessionStorage.getItem("isLogin")  && email===""  && "ایمیل خود را وارد کنید"}
              onChange={handleChangeEmail}
              autoFocus
              inputProps={{style: {fontWeight:"bold"}}}
            />
           
            <TextField
              margin="normal"
              fullWidth
              helperText={!window.sessionStorage.getItem("isLogin")  && password===""  && "رمز عبور را وارد کنید"}
              name="password"
              placeholder="رمز عبور"
              type="password"
              value={password}
              onChange={handleChangePassword}
              id="password"
              inputProps={{style: {fontWeight:"bold"}}}
            />
        
         
            <button onClick={loginHandler} type='submit' className='w-full text-center font-bold py-2 my-8 rounded-lg  text-textBlue bg-lightBlue hover:bg-hoverBlue'>
                <p >ورود</p>
            </button>
            <Grid container>
              <Grid item>
                <span className='font-semibold '>حساب کاربری ندارید ؟</span>
                <Link to="/register" className='text-textBlue px-1 font-bold'>
                   ثبت نام کنید
                </Link>
              </Grid>
            </Grid>
            <ToastContainer
                position="bottom-center"
                autoClose={2000}
                style={{fontWeight:"bold"}}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={true}
                theme="colored"
              />
            </form>
        </Box>
       
      </Container>
     
      </ThemeProvider>
      
   
  );
}