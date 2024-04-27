import React from 'react'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import DialogTitle from '@mui/material/DialogTitle';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
export default function DeleteDialog(props) {
    const handleDelete=async(event)=>{
      event.preventDefault()
      const res=await fetch(`http://localhost:3004/ads/${props.deleteTargetId}`,
      {
        method:"DELETE"
      })
      props.handleCloseDelete()
      console.log(res)
    }
  return (
    <div>
          <Dialog
          fullWidth={true}
          sx={{textAlign:"center"}}
          open={props.openDelete}
          TransitionComponent={Transition}
          keepMounted
          onClose={props.handleCloseDelete}
          aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"آیا از حذف کردن آگهی مطمئن هستید؟"}</DialogTitle>
        <DialogContent>
        </DialogContent>
        <DialogActions>
        <div className='w-full flex justify-center gap-4 p-4 font-medium'>
        <button className='bg-lightBlue border border-textBlue text-textBlue rounded-lg py-1 px-3  hover:bg-hoverBlue '  onClick={props.handleCloseDelete}>انصراف</button>
          <button className='bg-[#f77e8a]  text-white rounded-lg py-1 px-3 border border-[#f56974] hover:bg-[#f36679] ' onClick={handleDelete}>حذف</button>
        </div>
        </DialogActions>
      </Dialog>
    </div>
  )
}
