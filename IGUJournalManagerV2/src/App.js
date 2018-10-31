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

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

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
        console.log(response.data);
        self.props.onStoreResult(response.data);
    })
    .catch(function(error) {
        console.log(error);
    });
  }

  handleChange(event) {
    this.props.onFilterJournalsByTopic(event.target.value.toLowerCase());
  }

  render() {

    //setup pagination: maybe move code
    var topics = [], array = [];
    array = this.props.paginationList;
    topics = this.props.filterList;

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

        <select className="select-topic"
          onChange={this.handleChange}>
          <option>All Countries</option>
            {
              topics.map((topicName, index) => {
                return (
                  <option key={topicName}>
                    {topicName}
                  </option>
                );
              })
            }
        </select>

        <Results results={this.props.data} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.tempJournals,
    paginationList: state.paginationChars,
    filterList: state.filterTerms

  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFilterJournalsByName: (character) => dispatch(actionCreators.filterJournalsByName(character)),
    onFilterJournalsByTopic: (topic) => dispatch(actionCreators.filterJournalsByTopic(topic)),
    onStoreResult: (data) => dispatch(actionCreators.storeResult(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps) (App);
