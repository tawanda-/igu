import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import {
  SearchState,
  IntegratedFiltering,
  EditingState,
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    Toolbar,
    SearchPanel,
    TableHeaderRow,
    TableEditRow, TableEditColumn,
    DragDropProvider, TableColumnReordering, VirtualTable,
} from '@devexpress/dx-react-grid-material-ui';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TableCell from '@material-ui/core/TableCell';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { withStyles } from '@material-ui/core/styles';

import { Loading } from '../../theme-sources/material-ui/components/loading';

import { Upload, Icon, message } from 'antd';

import { PROD_BASE_URL, DEV_BASE_URL, LOCAL_BASE_URL, WP_ACTION } from './settings';

const REQ_URL = PROD_BASE_URL;

const Dragger = Upload.Dragger;

const styles = theme => ({
    lookupEditCell: {
      paddingTop: theme.spacing.unit * 0.875,
      paddingRight: theme.spacing.unit,
      paddingLeft: theme.spacing.unit,
    },
    dialog: {
      width: 'calc(100% - 16px)',
    },
    inputRoot: {
      width: '100%',
    },
  });
  
const AddButton = ({ onExecute }) => (
  <div style={{ textAlign: 'center' }}>
    <Button
      color="primary"
      onClick={onExecute}
      title="Create new journal"
    >
      New
    </Button>
  </div>
);
  
const EditButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Edit row">
    <EditIcon />
  </IconButton>
);

const DeleteButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Delete row">
    <DeleteIcon />
  </IconButton>
);

const CommitButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Save changes">
    <SaveIcon />
  </IconButton>
);

const CancelButton = ({ onExecute }) => (
  <IconButton color="secondary" onClick={onExecute} title="Cancel changes">
    <CancelIcon />
  </IconButton>
);

const commandComponents = {
  add: AddButton,
  edit: EditButton,
  delete: DeleteButton,
  commit: CommitButton,
  cancel: CancelButton,
};

const Command = ({ id, onExecute }) => {
  const CommandButton = commandComponents[id];
  return (
    <CommandButton
      onExecute={onExecute}
    />
  );
};

const LookupEditCellBase = ({availableColumnValues, value, onValueChange, classes}) => (
  <TableCell
    className={classes.lookupEditCell}
  >
    <Select
      value={value}
      onChange={event => onValueChange(event.target.value)}
      input={(
        <Input
          classes={{ root: classes.inputRoot }}
        />
)}
    >
      {availableColumnValues.map(item => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
  </TableCell>
);

export const LookupEditCell = withStyles(styles, { name: 'ControlledModeDemo' })(LookupEditCellBase);

const Cell = (props) => {
  return <Table.Cell {...props} />;
};

const EditCell = (props) => {
  return <TableEditRow.Cell {...props} />;
};

  const getRowId = row => row.id;

class viewJournals extends Component{

  constructor(props) {
    super(props);

    this.state = {

      columns : [
          { name: 'id' , title: 'id', allowEditing: false},
          { name: 'country' , title: 'Country'},
          { name: 'name_of_journal' , title: 'Journal Name'},
          { name: 'print_issn' , title: 'Print ISSN'},
          { name: 'e_issn' , title: 'eISSN'},
          { name: 'city_of_publication' , title: 'City of Publication'},
          { name: 'name_of_publishing_company' , title: 'Publishing Company'},
          { name: 'editor' , title: 'Editor'},
          { name: 'editor_email_address' , title: 'Editor email Addres'},
          { name: 'language' , title: 'Publication language'},
          { name: 'since' , title: 'Since'},
          { name: 'isi' , title: 'ISI'},
          { name: 'isi_category' , title: 'ISI Category'},
          { name: '5_year_impact_factor' , title: '5 Year Impact Factor'}
      ],
      tableColumnExtensions: [
        /*{ columnName: 'country', width: 100 },
        { columnName: 'name_of_journal', width: 100 },
        { columnName: 'name_of_publishing_company', width: 100 },*/
      ],
      rows: [],
      sorting: [{ columnName: 'name_of_journal', direction: 'asc' }],
      totalCount: 0,
      pageSize: 10,
      pageSizes: [5, 10, 15],
      currentPage: 0,
      loading: true,

      editingRowIds: [],
      addedRows: [],
      rowChanges: {},
      deletingRows: [],
      selection: [],

      showUploadModal: false
      
    };

    this.changeSelection = selection => this.setState({ selection });

    this.changeSorting = this.changeSorting.bind(this);

    const getStateDeletingRows = () => {
      const { deletingRows } = this.state;
      return deletingRows;
    };
    
    const getStateRows = () => {
      const { rows } = this.state;
      return rows;
    };
  
  this.changeSorting = sorting => this.setState({ sorting });

  this.changeEditingRowIds = editingRowIds => this.setState({ editingRowIds });

  this.changeAddedRows = addedRows => this.setState({
    addedRows: addedRows.map(row => (Object.keys(row).length ? row : {
        country:'',
        name_of_journal:'',
        print_issn:'',
        e_issn:'',
        city_of_publication:'',
        name_of_publishing_company:'',
        editor:'',
        editor_email_address:'',
        language:'',
        since:0,
        isi:0,
        isi_category:'',
    })),
  });

  this.changeRowChanges = rowChanges => this.setState({ rowChanges });

  this.commitChanges = ({ added, changed, deleted }) => {

    let { rows } = this.state;

    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      rows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];

      const querystring = require('querystring');
      
      const searchParams = {
        action: 'the_ajax_hook',
        filter: 'insert'
      };

      Object.keys(added).map(key => {
        searchParams['id'] = key;
        Object.keys(added[key]).map( k => {
          searchParams[k] = added[key][k];
        });
      });
  
      const request = new Request(
        REQ_URL,{
          method: 'POST',
          headers: {'Accept':'*/*', 'Content-Type': 'application/x-www-form-urlencoded'},
          body: querystring.stringify(searchParams),
        }
      );
  
      return fetch(request)
        .then(response => response.json())
        .then(response => {
          this.setState({rows:response, loading: false});
        }
        ).catch(error => {
          return error;
        });
    }

    if (changed) {

      rows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));

      const querystring = require('querystring');

      const searchParams = {
        action: 'the_ajax_hook',
        filter: 'update',      
      };

      Object.keys(changed).map(key => {
        searchParams['id'] = key;
        Object.keys(changed[key]).map( k => {
          searchParams[k] = changed[key][k];
        });
      });

      const request = new Request(
        REQ_URL,{
          method: 'POST',
          headers: {'Accept':'*/*', 'Content-Type': 'application/x-www-form-urlencoded'},
          body: querystring.stringify(searchParams),
        }
      );

      this.setState({loading: true});
  
      return fetch(request)
        .then(response => response.json())
        .then(response => {
          this.setState({rows:response, loading: false});
        }
        ).catch(error => {
          return error;
        });
    }

    if(deleted){
      this.setState({ rows, deletingRows: deleted || getStateDeletingRows() });
    }
  };

  this.cancelDelete = () => this.setState({ deletingRows: [] });

  this.deleteRows = () => {
    const rows = getStateRows().slice();
    getStateDeletingRows().forEach((rowId) => {
      const index = rows.findIndex(row => row.id === rowId);
      if (index > -1) {
        rows.splice(index, 1);
        
        const querystring = require('querystring');

        const searchParams = {
          action: 'the_ajax_hook',
          filter: 'delete',
          payload: rowId
        };

        const request = new Request(
          REQ_URL,{
            method: 'POST',
            headers: {'Accept':'*/*', 'Content-Type': 'application/x-www-form-urlencoded'},
            body: querystring.stringify(searchParams),
          }
        );

        this.setState({loading: true});

        return fetch(request)
        .then(response => response.json())
        .then(response => {
          this.setState({rows:response, loading: false});
        })
        .catch(error => {
          return error;
        });
      }
    });
    this.setState({ rows, deletingRows: [] });
  };

  this.changeColumnOrder = (order) => {
    this.setState({ columnOrder: order });
  };

  this.onClickUploadButton = () => {
    this.setState({
      showUploadModal: true,
    });
  }

  this.uploadModalHandleOk = (e) => {
    this.setState({
      visible: false,
    });
  }

  this.uploadModalHandleCancel = (e) => {
    this.setState({
      showUploadModal: false,
    });
  }
}

  componentDidMount() {
    this.loadData();
  }

  changeSorting(sorting) {
    this.setState({
      loading: true,
      sorting,
    });
  }

  getData() {
    const queryString = this.queryString();
    if (queryString === this.lastQuery) {
      this.setState({ loading: false });
      return;
    }

    fetch(queryString)
      .then(response => response.json())
      .then(data => this.setState({
        rows: data.items,
        totalCount: data.totalCount,
        loading: false,
      }))
      .catch(() => this.setState({ loading: false }));
    this.lastQuery = queryString;
  }

  loadData(){

    const querystring = require('querystring');

    const searchParams = {
      action: 'the_ajax_hook',
      filter: 'get'
    };

    const request = new Request(
      REQ_URL,{
        method: 'POST',
        headers: {'Accept':'*/*', 'Content-Type': 'application/x-www-form-urlencoded'},
        body: querystring.stringify(searchParams),
      }
    );

    return fetch(request)
      .then(response => response.json())
      .then(response => {
        this.setState({rows:response, loading: false});
      })
      .catch(() => this.setState({ loading: false }));
  }

  handleChange = (info) => {

    console.log("pano");
    console.log(info);
    const status = info.file.status;
    if (status === 'done') {

      this.setState({
        showUploadModal: false,
      });

    } else if (status === 'error') {

      this.setState({
        showUploadModal: false,
      });
      
    }
  }
  
  render() {
    const {
        classes,
      } = this.props;
    const {
      rows,
      columns,
      tableColumnExtensions,
      loading,
      editingRowIds,
      addedRows,
      rowChanges,
      deletingRows,
    } = this.state;

    const bulkUploadProps = {
      name: 'file',
      multiple: false,
      action: REQ_URL,
      headers: {'Accept':'*/*'},
      data: {
        action: 'the_ajax_hook',
        filter: 'bulk'
      },
      onChange: this.handleChange,
      /*
      onChange(info) { 
        const status = info.file.status;
        if (status === 'done') {
          //this.uploadModalHandleCancel;
          this.setState({
            showUploadModal: false,
          });
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          this.setState({
            showUploadModal: false,
          });
          message.error(`${info.file.name} file upload failed.`);
        }
      },*/
    };

    return (
      <Paper style={{ position: 'relative' }}>

        <Button onClick={this.onClickUploadButton} color="primary">Bulk Upload</Button>

        <Grid
          rows={rows}
          columns={columns}
          getRowId={getRowId}
        >

          <DragDropProvider />

          <SearchState />

          <EditingState
            editingRowIds={editingRowIds}
            onEditingRowIdsChange={this.changeEditingRowIds}
            rowChanges={rowChanges}
            onRowChangesChange={this.changeRowChanges}
            addedRows={addedRows}
            onAddedRowsChange={this.changeAddedRows}
            onCommitChanges={this.commitChanges}
          />

          <IntegratedFiltering />

          <VirtualTable
            columnExtensions={tableColumnExtensions}
            cellComponent={Cell}
            height={800}
          />

          <TableHeaderRow />

          <TableColumnReordering defaultOrder={columns.map(column => column.name)} />

          <Toolbar />

          <SearchPanel />

          <TableEditRow
            cellComponent={EditCell}
          />

          <TableEditColumn
            width={170}
            showAddCommand={!addedRows.length}
            showEditCommand
            showDeleteCommand
            commandComponent={Command}
          />
        
        {loading && <Loading />}
        </Grid>

        <Dialog
          open={!!deletingRows.length}
          onClose={this.cancelDelete}
          classes={{ paper: classes.dialog }}
        >
          <DialogTitle>
            Delete Row
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete the following row?
            </DialogContentText>
            <Paper>
              <Grid
                rows={rows.filter(row => deletingRows.indexOf(row.id) > -1)}
                columns={columns}
              >
                <Table
                  columnExtensions={tableColumnExtensions}
                  cellComponent={Cell}
                />
                <TableHeaderRow />
              </Grid>
            </Paper>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.cancelDelete} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteRows} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.showUploadModal}
          onClose={this.uploadModalHandleCancel}
          classes={{ paper: classes.dialog }}
        >
          <DialogTitle>
            Bulk Upload
          </DialogTitle>
          <DialogContent>
            <Dragger {...bulkUploadProps}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
            </Dragger>
          </DialogContent>
        </Dialog>

      </Paper>
    );
  }
}
export default withStyles(styles, { name: 'ControlledModeDemo' })(viewJournals);
