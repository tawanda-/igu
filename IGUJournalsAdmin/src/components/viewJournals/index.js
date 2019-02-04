import React, {Component} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const columns = [
    { dataField: 'id' , text: 'id'},
    { dataField: 'country' , text: 'Country', editor: {type: Type.TEXTAREA}, sort: true},
	{ dataField: 'name_of_journal' , text: 'Journal Name', editor: {type: Type.TEXTAREA}, sort: true},
	{ dataField: 'print_issn' , text: 'Print ISSN', sort: true},
	{ dataField: 'e_issn' , text: 'eISSN', sort: true},
	{ dataField: 'city_of_publication' , text: 'City of Publication', editor: {type: Type.TEXTAREA}, sort: true},
	{ dataField: 'name_of_publishing_company' , text: 'Publishing Company', editor: {type: Type.TEXTAREA}, sort: true},
	{ dataField: 'editor' , text: 'Editor', editor: {type: Type.TEXTAREA}, sort: true},
	{ dataField: 'editor_email_address' , text: 'Editor email Addres', editor: {type: Type.TEXTAREA}, sort: true},
	{ dataField: 'language' , text: 'Publication language', editor: {type: Type.TEXTAREA}, sort: true},
	{ dataField: 'since' , text: 'Since', editor: {type: Type.TEXTAREA}, sort: true},
	{ dataField: 'isi' , text: 'ISI', sort: true},
	{ dataField: 'isi_category' , text: 'ISI Category', sort: true},
	{ dataField: '5_year_impact_factor' , text: '5 Year Impact Factor', sort: true}
];

const defaultSorted = [{
    dataField: 'name',
    order: 'desc'
  }];

const selectRow = {
    mode: 'checkbox',
    clickToSelect: true,
    clickToEdit: true,
  };

const { SearchBar, ClearSearchButton } = Search;

class viewJournals extends Component{
    

    state = {
        rows:[]
    };

    componentWillMount(){

        const querystring = require('querystring');

        const searchParams = {
            action: 'the_ajax_hook',
            name: 'all',
            filter: 'all'
        };

        const request = new Request(
            'http://www.esikolweni.co.za/wp-admin/admin-ajax.php',{
                method: 'POST',
                headers: {'Accept':'*/*', 'Content-Type': 'application/x-www-form-urlencoded'},
                body: querystring.stringify(searchParams),
            });
      
          return fetch(request)
          .then(response => response.json())
          .then(response => {
              console.log(response);
              this.setState({rows:response});
            }
          ).catch(error => {
              return error;
          });
    }

    onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        this.setState(state => {
          const rows = state.rows.slice();
          for (let i = fromRow; i <= toRow; i++) {
            rows[i] = { ...rows[i], ...updated };
          }
          return { rows };
        });
      };


    render() {

        return(
            <div>
                <ToolkitProvider
                keyField='id' 
                data={ this.state.rows } 
                columns={ columns } 
                search
                selectRow={ selectRow }
                cellEdit={ cellEditFactory({ 
                    mode: 'dbclick',
                    beforeSaveCell: (oldValue, newValue, row, column, done) => {
                        setTimeout(() => {
                            if (window.confirm('Do you want to accept this change?')) {
                            done(true);
                            //perform query
                            } else {
                            done(false);
                            }
                        }, 0);
                        return { async: true };
                        }
                }) }
                pagination={ paginationFactory() }
                >
                {
    props => (
      <div>
        <SearchBar { ...props.searchProps } />
        <ClearSearchButton { ...props.searchProps } />
        <hr />
                <BootstrapTable 
                keyField='id' 
                data={ this.state.rows } 
                columns={ columns } 
                search
                selectRow={ selectRow }
                cellEdit={ cellEditFactory({ 
                    mode: 'dbclick',
                    beforeSaveCell: (oldValue, newValue, row, column, done) => {
                        setTimeout(() => {
                            if (window.confirm('Do you want to accept this change?')) {
                            done(true);
                            //perform query
                            } else {
                            done(false);
                            }
                        }, 0);
                        return { async: true };
                        }
                }) }
                pagination={ paginationFactory() }
                defaultSorted={ defaultSorted } 
                    { ...props.baseProps }
                />
                </div>
    )
}
                </ToolkitProvider>
            </div>
        );
    }

}
export default viewJournals;