import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';

import { Card, CardContent, Typography, TextField, InputAdornment, FilledInput } from '@material-ui/core';

const styles = (theme) => ({
  card: {
    width: '40vw',
    minWidth: '500px',
    position: 'absolute',
    top: '40%',
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
    width: '35px',
  }
});

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      box: 0,
      cake: 0,
    }
  }

  handleChange(e) {
    this.setState({ value: e.target.value })
    this.calculate(e)
  }
  handleChangeCake(e) {
    if(e.target.value < 0){
      this.setState({ cake: 0 })
      this.setState({ box: this.state.value})
    }else if(this.state.value - e.target.value*3>=0){
      this.setState({ cake: e.target.value })
      this.setState({ box: this.state.value - e.target.value*3 })
    }
  }

  calculate(e) {
    this.setState({cake: Math.floor(e.target.value/3)});
    this.setState({box: e.target.value % 3});
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
            es
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
            id="Units"
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
            <div>
              <Typography>
                <br />
                {this.state.value} 0.33l Boks
              </Typography>
              <hr />
              <Typography>
                {this.state.box + " 0.33l Boks"}
                <br />
                <TextField
                  id="Cake"
                  value={this.state.cake}
                  onChange={(e) => this.handleChangeCake(e)}
                  type="number"
                  className={clsx(classes.textField, classes.dense, classes.cake)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                {" Toro kake"}
              </Typography>
            </div>
          }
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(App);
