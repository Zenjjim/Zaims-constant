import React, { useState, useEffect } from 'react'
import { Grid, TextField, Paper, Button, Typography, MenuItem, Input, Select, FormControl, InputLabel, Chip, Slide } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles';

import {getNames, getLaws, post} from './service'

const useStyles = makeStyles(theme => ({
    paper: {
      width: '400px',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '15px'
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 250,
      maxWidth: 250,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }),
);


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default () => {
  const classes = useStyles();
  const theme = useTheme();

  const [name, setName] = useState("")
  const [personName, setPersonName] = React.useState([]);
  const [law, setLaw] = useState("")
  const [fine, setFine] = useState(0)
  const [comment, setComment] = useState("")
  const [names, setNames] = useState([])
  const [laws, setLaws] = useState([])
  const [feil, setFeil] = useState(false)
  const [bra, setBra] = useState(false)

  useEffect(() => {
    getLaws()
    .then(data => setLaws(data))
    getNames()
    .then(data => setNames(data))
  }, [])

  const handleChange = event => {
    setPersonName(event.target.value);
  };

  const handleChangeMultiple = event => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setPersonName(value);
  };

  const postFine = () => {
    if(name!=="" && Array.isArray(personName) && personName.length && law!=="" && fine!==0){
      personName.forEach(to => {
        post(name, to, fine, law, comment)
        setName("")
        setPersonName([])
        setLaw("")
        setFine(0)
        setComment("")
        setFeil(false)
        setBra(true)
      });
    } else {
      setFeil(true)
    }
  }

  return (
    <Paper className={classes.paper}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Typography variant="h5">
            Botregistrering
          </Typography>
        </Grid>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Mitt navn</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={name}
              onChange={e=>setName(e.target.value)}
            >
              {
                names.map(n => (
                  <MenuItem value={n}>{n}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-chip-label">Skyldige</InputLabel>
            <Select
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              multiple
              value={personName}
              onChange={handleChange}
              input={<Input id="select-multiple-chip" />}
              renderValue={selected => (
                <div className={classes.chips}>
                  {selected.map(value => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {names.map(name => (
                <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Lov</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={law}
              onChange={e=>setLaw(e.target.value)}
            >
              {
                laws.map(n => (
                  <MenuItem value={n}>{n}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <TextField
              required
              className={classes.formControl}
              id="outlined-required"
              label="Forslag til antall bøter"
              type="number"
              value={fine}
              onChange={e=>{e.target.value < -1 ? setFine(0) : setFine(e.target.value)}}
          />
        </Grid>
        <Grid item>
          <TextField
              className={classes.formControl}
              id="outlined-required"
              label="Kommentar"
              value={comment}
              onChange={e=>{setComment(e.target.value)}}
          />
        </Grid>
        {feil &&
          <Grid item>
            <Typography color={"error"}>
              Noe gikk galt, dobbelsjekk alt over
            </Typography>
          </Grid>
        }
        {bra &&
          <Grid item>
            <Typography color={"primary"}>
              Boten er meldt! Du er flink
            </Typography>
          </Grid>
        }
        <Grid item>
          <Button variant="contained" onClick={()=>(postFine())}>Send</Button>
        </Grid>
      </Grid>
    </Paper>
  )
}