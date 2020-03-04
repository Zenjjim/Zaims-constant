import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { AutoSizer, Column, Table } from 'react-virtualized';
import {getFines, updateFine, deleteFine} from './service'
import { Checkbox, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  table: {
    '& .ReactVirtualized__Table__headerRow': {
      flip: false,
      paddingRight: theme.direction === 'rtl' ? '0px !important' : undefined,
    },
  },
  tableRow: {
    cursor: 'pointer',
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: 'initial',
  },
});

class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48,
  };

  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({ cellData, columnIndex, rowData }) => {
    const { columns, classes, rowHeight, onRowClick, setUpdated } = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
      >
      {typeof cellData == "boolean"
        ?
        <Checkbox
          checked={cellData}
          onChange={(e)=>{
            updateFine(rowData.id, e.target.checked)
            .then(()=> setUpdated(true))
          }}
          value="secondary"
          color="primary"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
        :
        cellData
      }
      {(typeof cellData == "boolean" && !cellData) &&
        <IconButton
          onClick={()=>{
            deleteFine(rowData.id)
            .then(()=> setUpdated(true))
          }}
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      }
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns, classes } = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  render() {
    const { classes, columns, rowHeight, headerHeight, ...tableProps } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight}
            gridStyle={{
              direction: 'inherit',
            }}
            headerHeight={headerHeight}
            className={classes.table}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={headerProps =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      width: PropTypes.number.isRequired,
    }),
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number,
};

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);



export default function ReactVirtualizedTable() {
  const [rows, setRows] = useState([])
  const [updated, setUpdated] = useState(true)
  useEffect(() => {
    if(updated){
      setUpdated(false)
      getFines()
      .then(data=>setRows(data))
    }
  }, [updated])
  return (
    <Paper style={{
      width: '800px',
      height: '400px',
      padding: '15px',
      margin: '50px auto',
    }}>
      <VirtualizedTable
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        setUpdated={setUpdated}
        columns={[
          {
            width: 160,
            label: 'Navn',
            dataKey: 'accused',
          },
          {
            width: 160,
            label: 'Anklager',
            dataKey: 'accuser',
          },
          {
            width: 200,
            label: 'Lov',
            dataKey: 'alaw',
          },
          {
            width: 100,
            label: 'Antall bøter',
            dataKey: 'afine',
            numeric: true,
          },
          {
            width: 200,
            label: 'Kommentarer',
            dataKey: 'acomment',
          },
          {
            width: 160,
            label: 'Judged',
            dataKey: 'accepted',
          },
        ]}
      />
    </Paper>
  );
}
