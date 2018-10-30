import React, { Component } from 'react';
import { connect } from 'react-redux'

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
    return (
      <div className="App">
        <button onClick={this.props.onFilterJournalsByName}> Filter </button>
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
    onFilterJournalsByName: () => dispatch(actionCreators.filterJournalsByName('B')),
    onFilterJournalsByTopic: () => dispatch(actionCreators.filterJournalsByTopic('topic')),
    onStoreResult: (data) => dispatch(actionCreators.storeResult(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps) (App);
