import React, { useState } from 'react'
import { Grid, TextField, Paper, Button, Typography, MenuItem, Input, Select, FormControl, InputLabel, Chip } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    paper: {
      width: '40vw',
      minWidth: '400px',
      position: 'absolute',
      top: '45%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '15px'
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
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

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

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

  const [name, setName] = useState("")
  const [law, setLaw] = useState("")
  const [fine, setFine] = useState(0)

  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

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


  return (
    <Paper className={classes.paper}>
      <Typography variant="h6">
        Botregistrering
      </Typography>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <TextField
              required
              id="outlined-required"
              label="Ditt Navn"
              value={name}
              onChange={e=>setName(e.target.value)}
              variant="outlined"
          />
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
          <TextField
              required
              id="outlined-required"
              label="Lov"
              value={law}
              onChange={e=>setLaw(e.target.value)}
              variant="outlined"
          />
        </Grid>
        <Grid item>
          <TextField
              required
              id="outlined-required"
              label="Forslag til antall bøter"
              type="number"
              value={fine}
              onChange={e=>{e.target.value < 0 ? setFine(0) : setFine(e.target.value)}}
              variant="outlined"
          />
        </Grid>
        <Grid item>
          <Button variant="contained">Send</Button>
        </Grid>
      </Grid>
    </Paper>
  )
}