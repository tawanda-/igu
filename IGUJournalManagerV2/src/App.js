import React, { Component } from 'react';
import { connect } from 'react-redux'

import './App.css';
import Search from './Search/Search';
import Results from './Results/Results';
import axiosInstance from './api/axios';
import { DEV_BASE_URL, WP_ACTION } from './api/settings';
import * as actionTypes from './store/actions'

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
    axiosInstance.post(DEV_BASE_URL, querystring.stringify(searchParams))
    .then(function (response){
        console.log(response.data);
        console.log(response.data.length); //todo: remove

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
    data: state.tempJournals
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFilterJournalsByName: () => dispatch({type: actionTypes.FILTER_JOURNALS_BY_NAME, payload:'B'}),
    onFilterJournalsByTopic: () => dispatch({type: actionTypes.FILTER_JOURNALS_BY_TOPIC, payload:'topic'}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps) (App);
