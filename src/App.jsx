import React, { Component, useState } from 'react';

import { Card, CardContent, Typography, TextField, InputAdornment, Snackbar, SnackbarContent, Button } from '@material-ui/core';


import Form from './Form'
import Tabell from './Tabell'
import Calc from './Calc'

export default () => {
  const [state, setstate] = useState(0);

  return(
    <div>
      <Button color={"inherit"} style={{color:"white"}} onClick={()=>setstate(0)}>Kalkulator</Button>
      <Button color={"inherit"} style={{color:"white"}} onClick={()=>setstate(1)}>Skjema</Button>
      <Button color={"inherit"} style={{color:"white"}} onClick={()=>setstate(2)}>Tabell</Button>
      <Button color={"inherit"} style={{color:"#ccac00"}} onClick={()=> window.location.href="https://ntnui.slab.com/posts/det-hellige-lovverket-0qy5nrpb"}>Det Hellige Lovverket</Button>
      {state==0
      ?
      <Calc />
      : state==1
      ?
      <Form />
      :
      <Tabell />
      }
    </div>
  )
}