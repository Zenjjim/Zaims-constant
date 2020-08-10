import React, { Component, useState } from 'react';

import { Card, CardContent, Typography, TextField, InputAdornment, Snackbar, SnackbarContent, Button } from '@material-ui/core';


import Form from './Form'
import Tabell from './Tabell'
import Calc from './Calc'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


export default () => {
  const [state, setstate] = useState(0);

  return(
    <Router>
      <Button color={"inherit"} style={{color:"white"}} onClick={()=>window.location.href="/"}>Kalkulator</Button>
      <Button color={"inherit"} style={{color:"white"}} onClick={()=>window.location.href="/form"}>Skjema</Button>
      <Button color={"inherit"} style={{color:"white"}} onClick={()=>window.location.href="/tabell"}>Tabell</Button>
      <Button color={"inherit"} style={{color:"#ccac00"}} onClick={()=> window.location.href="https://ntnui.slab.com/posts/det-hellige-lovverket-0qy5nrpb"}>Det Hellige Lovverket</Button>
      <Switch>
        {/* If the current URL is /about, this route is rendered
            while the rest are ignored */}
        <Route path="/form">
          <Form />
        </Route>

        {/* Note how these two routes are ordered. The more specific
            path="/contact/:id" comes before path="/contact" so that
            route will render when viewing an individual contact */}
        <Route path="/tabell">
          <Tabell />
        </Route>

        {/* If none of the previous routes render anything,
            this route acts as a fallback.

            Important: A route with path="/" will *always* match
            the URL because all URLs begin with a /. So that's
            why we put this one last of all */}
        <Route path="/">
          <Calc />
        </Route>
      </Switch>
    </Router>
  )
}