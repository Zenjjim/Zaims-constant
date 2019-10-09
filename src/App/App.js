import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';

import { Card, CardActions, CardContent, Typography, TextField, InputAdornment } from '@material-ui/core';

const styles = (theme) => ({
  card: {
    width: '40vw',
    minWidth: '500px',
    position: 'absolute',
    top: '30%',
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
});

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0
    }
  }

  handleChange(e) {
    this.setState({ value: e.target.value })
    console.log(this.state.value);

  }

  render() {
    const { classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;
    return (
      <Card className={classes.card}>
        <CardContent className={classes.container}>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Zaim's Constant
          </Typography>
          <Typography variant="h5" component="h2">
            zaa
            {bull}
            eim
            {bull}
            s
            {bull}
            kon
            {bull}
            stnt
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Imaginary unit (₴)
          </Typography>
          <br />
          <TextField
            id="units"
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
            label="Amount"
            type="number"
            fullWidth
            placeholder="Enter total units"
            value={this.state.value}
            onChange={(e) => this.handleChange(e)}
            InputProps={{
              startAdornment: <InputAdornment position="start">₴</InputAdornment>,
            }}
          />
          {this.state.value !== 0 &&
            <Typography>
              <br />
              he
            </Typography>
          }
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(App);
