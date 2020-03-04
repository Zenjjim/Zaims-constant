import React, { Component, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { Card, CardContent, Typography, TextField, InputAdornment, Snackbar, SnackbarContent, Button } from '@material-ui/core';

const styles = (theme) => ({
  card: {
    width: '40vw',
    minWidth: '400px',
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  container: {
    margin: '20px 40px'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 45,
    marginBottom: 0,
  },
  pos: {
    marginBottom: 12,
  },
  margin: {
    margin: 1,
  },
  textField: {
    flexBasis: 200,
    margin: 0,
  },
  cake: {
    width: '20px',
  },
  snackbar: {
    bottom: '0px',
    position: 'fixed',
    borderRadius: '4px',
    backgroundColor: 'white',
    color: 'black',
  },
});

class Calc extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      box: 0,
      cake: 0,
      open: false,
      snackbarMessage: "",
    }
  }

  handleChange(e) {
    if (e.target.value >= 0) {
      this.setState({ value: e.target.value })
      this.calculate(e)
    } else {
      this.setState({ snackbarMessage: "Fyfy! Can't have negative units!", open: true })
    }
  }
  handleChangeCake(e) {
    if (e.target.value < 0) {
      this.setState({ cake: 0, box: this.state.value, snackbarMessage: "Fyfyf! Can't have negative cakes", open: true })
    } else if (this.state.value - e.target.value * 3 < 0) {
      this.setState({ snackbarMessage: "Fyfy! Too many cakes! Max " + Math.floor(this.state.value / 3) + " cakes", open: true })
    } else {
      this.setState({ cake: e.target.value })
      this.setState({ box: this.state.value - e.target.value * 3 })
    }
  }

  calculate(e) {
    this.setState({ cake: Math.floor(e.target.value / 3) });
    this.setState({ box: e.target.value % 3 });
  }
  handleSnackbarClose = () => {
    this.setState({open: false});
  }

  render() {
    const { classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;
    return (
      <div>
      <Card className={classes.card}>
        <CardContent className={classes.container}>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Zaims Konstant
          </Typography>
          <Typography variant="h5" component="h2">
            zaa
            {bull}
            eim
            {bull}
            es
            {bull}
            kon
            {bull}
            stnt
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Imaginær enhet (₴)
          </Typography>
          <br />
          <TextField
            id="Units"
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
            label="Antall"
            type="tel"
            fullWidth
            placeholder="Total enheter"
            value={this.state.value}
            onChange={(e) => this.handleChange(e)}
            onClick={() => {this.setState({value: null})} }
            InputProps={{
              startAdornment: <InputAdornment position="start">₴</InputAdornment>,
            }}
          />
          {this.state.value !== null &&
            <div>
              <Typography>
                <br />
                {this.state.value} 0.33l boks Dahls
              </Typography>
              <hr />
              <Typography>
                {this.state.box + " 0.33l boks Dahls"}
                <br />
                <TextField
                  id="Cake"
                  value={this.state.cake}
                  onChange={(e) => this.handleChangeCake(e)}
                  type="tel"
                  className={clsx(classes.textField, classes.dense, classes.cake)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                {" Toro Kake"}
              </Typography>
              <hr />
            </div>
          }
        </CardContent>
      </Card>
      <Snackbar open={this.state.open} onClose={this.handleSnackbarClose} autoHideDuration={3000}>
        <SnackbarContent className={classes.snackbar} message={this.state.snackbarMessage} />
      </Snackbar>
      </div>
    );
  }
}

export default withStyles(styles)(Calc);
