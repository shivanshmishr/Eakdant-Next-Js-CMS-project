import React from 'react';
import { Backdrop, CircularProgress } from "@mui/material";

const BackdropLoader = ({open}) => {
  return (
    <Backdrop open={open} sx={{zIndex:9999, color:"#111"}}>
      <CircularProgress color='inherit'/>
    </Backdrop>
  )
}

export default BackdropLoader
