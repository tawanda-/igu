import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'react-bootstrap';

import './App.css';
import Search from './components/Search/Search';
import Results from './components/Results/Results';
import axiosInstance from './api/axios';
import { DEV_BASE_URL, WP_ACTION } from './api/settings';
import * as actionCreators from './store/actions'

class App extends Component {

  componentDidMount() {
    this.initialDataLoad();
  }

  initialDataLoad = () => {
    var name = "all";
    var filter = "all";
    const querystring = require('querystring');
    const searchParams = {
        action: WP_ACTION,
        name: name,
        filter: filter
    };

    //todo: configure setting baseUrl
    var self = this;
    axiosInstance.post(DEV_BASE_URL, querystring.stringify(searchParams))
    .then(function (response){
        self.props.onStoreResult(response.data);
    })
    .catch(function(error) {
        console.log(error);
    });
  }

  render() {

    //setup pagination: maybe move code
    //todo: prepopulate chars for pagination widget
    var array = [];
    array = this.props.paginationList;

    return (
      <div className="App">
        <Pagination bsSize="medium">{
             array.map((character, index) => {
              return (
                  <Pagination.Item
                    onClick={() => this.props.onFilterJournalsByName(character)}
                    key={index}>
                    {character}
                  </Pagination.Item>
              );
            })
          }
        </Pagination>
        <Search />
        <Results results={this.props.data} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.tempJournals,
    paginationList: state.paginationChars 
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFilterJournalsByName: (character) => dispatch(actionCreators.filterJournalsByName(character)),
    onFilterJournalsByTopic: () => dispatch(actionCreators.filterJournalsByTopic('topic')),
    onStoreResult: (data) => dispatch(actionCreators.storeResult(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps) (App);
