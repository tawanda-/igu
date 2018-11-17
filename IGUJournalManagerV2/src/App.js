import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'react-bootstrap';
import Loader from 'react-loader-spinner';

import './App.css';
import Search from './components/Search/Search';
import Results from './components/Results/Results';
import axiosInstance from './api/axios';
import { DEV_BASE_URL, WP_ACTION } from './api/settings';
import * as actionCreators from './store/actions';

class App extends Component {

  state = {
    selectedLang: 'All Languages',
    selectedCountry: '',
    languages: []
  }

  constructor(props) {
    super(props);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.handleJournalNameFilterClicked = this.handleJournalNameFilterClicked.bind(this);
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
        self.props.onResultsLoading(true);
        self.props.onStoreResult(response.data);
    })
    .catch(function(error) {
        self.props.onResultsLoading(false);
        console.log(error);
    });
  }

  handleCountryChange(event) {
    this.setState({selectedCountry: event.target.value, selectedLang: ''});
    this.props.onResultsLoading(true);
    this.props.onFilterJournalsByCountry(event.target.value);
  }

  handleLanguageChange(event) {
    this.setState({selectedLang: event.target.value});
    this.props.onResultsLoading(true);
    this.props.onFilterJournalsByLanguage(this.state.selectedCountry , event.target.value);
  }

  handleJournalNameFilterClicked(event) {
    this.props.onResultsLoading(true);
    this.props.onFilterJournalsByName(event.target.value);
  }

  render() {

    var topics = [], array = [], languages = [];
    array = this.props.paginationList;
    topics = this.props.filterList;
    languages = this.props.languageList;

    return (
      <div className="App">

      <div className="search-container">
        <Search />
      </div>

        <div className="filters-container">
          <select className="select-country"
            onChange={this.handleCountryChange}>
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

          <select className="select-language"
            value={this.state.selectedLang}
            onChange={this.handleLanguageChange}>
            <option>All Languages</option>
              {
                languages.map((language, index) => {
                  return (
                    <option key={index}>
                      {language}
                    </option>
                  );
                })
              }
          </select>

          <Loader type="Oval" color="#4285f4" height={60} width={60} />

          <Pagination className="filterPagination" bsSize="medium">
            {
              array.map((character, index) => {
                return (
                    <Pagination.Item
                      onClick={() => this.handleJournalNameFilterClicked}
                      key={index}
                      active={this.props.selectedPaginationChar === character}>
                      {character}
                    </Pagination.Item>
                );
              })
            }
          </Pagination>

        </div>

        <Results results={this.props.data} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.tempJournals,
    paginationList: state.paginationChars,
    filterList: state.filterTerms,
    languageList: state.languageTerms,
    selectedPaginationChar : state.topicFilter,
    isResultsLoading: state.resultsLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFilterJournalsByLanguage: (country, language) => dispatch(actionCreators.filterJournalsByLanguage(country, language)),
    onFilterJournalsByName: (character) => dispatch(actionCreators.filterJournalsByName(character)),
    onFilterJournalsByCountry: (country) => dispatch(actionCreators.filterJournalsByCountry(country)),
    onStoreResult: (data) => dispatch(actionCreators.storeResult(data)),
    onResultsLoading: (isLoading) => dispatch(actionCreators.resultsLoading(isLoading))
  };
};

export default connect(mapStateToProps, mapDispatchToProps) (App);
