import * as React from 'react';
import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link,useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from "yup";

export default function Register() {
 
  const navigate=useNavigate()
  const theme = createTheme({
    direction: "rtl"
  });
 const [firstName,setFirstName]=useState("")
 const [lastName,setLastName]=useState("")
 const [phoneNumber,setPhoneNumber]=useState("")
 const [email,setEmail]=useState("")
 const [password,setPassword]=useState("")



 const [errors,setErrors]=useState({})
  const validationSchema = Yup.object().shape({
    firstName:Yup.string().matches(/^[\u0600-\u06FF\s]+$/, 'لطفا فقط حرف فارسی وارد کنید').required("لطفا نام خود را وارد کنید"),
    lastName:Yup.string().matches(/^[\u0600-\u06FF\s]+$/, 'لطفا فقط حرف فارسی وارد کنید').required("لطفا نام خانوادگی خود را وارد کنید"),
    email:Yup.string().required("لطفا ایمیل خود را وارد کنید").email("فرمت ایمیل وارد شده صحیح نمیباشد"),
    phoneNumber:Yup.string().matches(
      /^[۰۱۲۳۴۵۶۷۸۹0-9]+$/,
      "لطفا فقط عدد وارد نمایید"
    ).min(11, "تعداد رقم وارد شده کم می باشد").max(11, "تعداد رقم وارد شده زیاد می باشد").required("لطفا شماره همراه را وارد نمایید"),
    password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,"رمز عبور حداقل 8 و حداکثر 16 کاراکتر و شامل حداقل یک حرف کوچک انگلیسی و  حداقل یک حرف بزرگ انگلیسی و  حداقل یک عدد و حداقل یک کاراکتر خاص باشد").required("لطفا رمز خود را وارد کنید"),
  
  
  });


 const handleChangeFirstName = (event) => {
  setFirstName(event.target.value);
};
const handleChangeLastName = (event) => {
  setLastName(event.target.value);
};
const handleChangePhoneNumber = (event) => {
  setPhoneNumber(event.target.value);
};
const handleChangeEmail = (event) => {
  setEmail(event.target.value);
};
const handleChangePassword = (event) => {
  setPassword(event.target.value);
};

const registerHandler = async (event)=>{
 
  event.preventDefault()
 
 
  const newUserObj={
    email:email,
    password:password,
    firstName:firstName,
    lastName:lastName,
    phoneNumber:phoneNumber
  }
  try{
     await validationSchema.validate(newUserObj,{
      abortEarly:false
    })
     await fetch("http://localhost:3004/users",{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(newUserObj)
    })
    .then(
      (res)=>{toast.success(" حساب کاربری شما با موفقیت ثبت شد ");
      setFirstName("")
    setLastName("")
    setPhoneNumber("")
    setEmail("")
    setPassword("")
    setErrors({})
    setTimeout(() => {
        navigate("/login");
      }, "2000");}
  ).catch((error)=>{
      toast.error(" حساب کاربری شما ثبت نشد ! ")
  });
  }
  catch(err){
    let errors=err.inner.reduce((acc,err)=>({
      ...acc,[err.path]:err.message
    }),{})
    setErrors(errors)
}
 

}

  return (
 
      <ThemeProvider theme={theme}>
      <Container dir='rtl' component="main" maxWidth="xs">
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
            padding:"16px"
          }}
        >
        
          <Typography component="h1" variant="h5">
           ساخت حساب کاربری
          </Typography>
          <form method='POST' className='my-4'>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField        
                  name="firstName"
                  fullWidth
                  id="firstName"
                  placeholder="نام"
                  autoFocus
                  helperText={errors.firstName && errors.firstName}
                  value={firstName}
                  onChange={handleChangeFirstName}
                  inputProps={{style: {fontWeight:"bold"}}}
                />
              </Grid>              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  placeholder="نام خانوادگی"
                  name="lastName"
                  helperText={errors.lastName && errors.lastName}
                  value={lastName}
                  onChange={handleChangeLastName}
                  inputProps={{style: {fontWeight:"bold"}}}
                />                  
              </Grid>         
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  placeholder="شماره تلفن همراه"
                  name="phoneNumber"
                  value={phoneNumber}
                  helperText={errors.phoneNumber && errors.phoneNumber}
                  onChange={handleChangePhoneNumber}
                  inputProps={{style: {fontWeight:"bold"}}}
                />
              </Grid>           
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  placeholder="آدرس ایمیل"
                  value={email}
                  helperText={errors.email && errors.email}
                  onChange={handleChangeEmail}
                  name="email"
                  inputProps={{style: {fontWeight:"bold"}}}
                />
              </Grid>            
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  placeholder="رمز عبور"
                  value={password}
                  helperText={errors.password && errors.password}
                  onChange={handleChangePassword}
                  type="password"
                  id="password"
                  inputProps={{style: {fontWeight:"bold"}}}
                />
              </Grid>
                
            </Grid>
            <button  onClick={registerHandler} type='submit ' className='w-full text-center py-2 my-8 rounded-lg text-textBlue font-bold bg-lightBlue hover:bg-hoverBlue'>
                <p>ُساخت حساب کاربری</p>
            </button>
              
            <Grid container justifyContent="">
              <Grid item>
              <span className='font-semibold'>حساب کاربری دارد ؟</span>
                <Link to="/login" className='text-textBlue px-1 font-bold'>
                     وارد شوید 
                </Link>
              </Grid>
            </Grid>
            <ToastContainer
                position="bottom-center"
                autoClose={2000}
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