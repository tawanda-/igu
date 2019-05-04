import React, { Component } from 'react';
import { connect } from 'react-redux';
import Search from './components/Search/Search';
import { PROD_BASE_URL, DEV_BASE_URL, LOCAL_BASE_URL, WP_ACTION } from './api/settings';
import * as actionCreators from './store/actions';
import Results from './components/Results/Results';
import Loader from 'react-loader-spinner';

class App extends Component {

  state = {
    selectedLang: 'All Languages',
    selectedCountry: '',
    languages: []
  }

  componentDidMount() {
    this.initialDataLoad();
  }

  initialDataLoad = () => {
    var filter = "get";
    const querystring = require('querystring');
    const searchParams = {
        action: WP_ACTION,
        filter: filter
    };

   var self = this;
    const request = new Request(PROD_BASE_URL,{
      method: 'POST',
      headers: {'Accept':'*/*', 'Content-Type': 'application/x-www-form-urlencoded'},
      body: querystring.stringify(searchParams),
    });

    return fetch(request).then(response => response.json()).then(response => {
        self.props.onResultsLoading(true);
        self.props.onStoreResult(response);
    }
    ).catch(error => {
        return error;
    });
  }

  handleCountryChange = (event) => {
    this.setState({selectedCountry: event.target.value, selectedLang: ''});
    this.props.onResultsLoading(true);
    this.props.onFilterJournalsByCountry(event.target.value);
  }

  handleLanguageChange = (event) => {
    this.setState({selectedLang: event.target.value});
    this.props.onResultsLoading(true);
    this.props.onFilterJournalsByLanguage(this.state.selectedCountry , event.target.value);
    this.handleJournalNameFilterClicked = this.handleJournalNameFilterClicked.bind(this);
  }

  onItemClick = (event) => {
    event.preventDefault();
    this.props.onResultsLoading(true);
    this.props.onFilterJournalsByName(event.target.id);
  }
 
  render() {

    let topics = [], languages = [];
    topics = this.props.filterList;
    languages = this.props.languageList;

    return (

      <section id="about">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 welcome">
            <h2><b>WELCOME TO</b> IGU UGI JOURNAL DATABASE</h2>
        </div>
          <div className="col-lg-8 info_line lead">  
           <p>
           This is the IGU’s extensive list of Geography or Geography-related journals of the world. You can search by country, journal name, key word or other attributes.</p>
           <p>
           The database is periodically updated but if you have new journals to add or would like to update the entry for any journal, please contact IGU via the Secretary-General at rbsgeo@hotmail.com.
           </p>
           <p>
           The database was compiled initially by the University of Amsterdam. A recent analysis of publication practices in Geography may be found <a href="https://igu-online.org/wp-content/uploads/2014/08/IGU-JOURNAL-PROJECT.pdf" target="_blank" rel="noopener noreferrer">here</a>
           </p>
            <p>
            In listing titles in this database, IGU is in no way endorsing the contents therein, which remain entirely the responsibility of the editors of the journals in question.  Users are alerted to the problem of so-called ‘predatory’ journals and are directed to<br /> <a href="https://beallslist.weebly.com/standalone-journals.html" target="_blank" rel="noopener noreferrer">Beall’s list of Predatory Journals and Publishers</a> to check credibility of the entries.
            </p>
            <p>
            A critical analysis of publication practices in Geography, and their associated challenges, may be found <a href="https://igu-online.org/wp-content/uploads/2019/05/Meadows-et-al-2016-Geo.pdf" target="_blank" rel="noopener noreferrer">here</a> 
            </p>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">               
            <form>
              
            <Search />

            <div className="form-row align-items-center">
                <div className="col-auto my-1 col-md-2">
                 
                    <select 
                      className="custom-select mr-sm-2" 
                      id="inlineFormCustomSelect" 
                      onChange={this.handleCountryChange}
                      style={{borderRadius: '4px'}}
                    >
                      <option> ALL COUNTRIES</option
                      >
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

                </div>
                <div className="col-auto my-1 col-md-2">
                    
                    <select 
                      className="custom-select mr-sm-2" 
                      id="inlineFormCustomSelect"
                      value={this.state.selectedLang}
                      onChange={this.handleLanguageChange}
                      style={{borderRadius: '4px'}}
                    >
                      <option> ALL LANGUAGES</option>
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

                </div>
            </div>

            <ul 
              className="pagination table-responsive mb-2" 
              style={{
                marginLeft: 0,
                justifyContent: "flex-start"
              }}
            >
            {this.props.paginationList.map((character, index) =>
                <li 
                  className="page-item" 
                  key={index}
                >
                  <a className="page-link" href="#" id={character} onClick={this.onItemClick}>{character}</a>
                </li>
              )}
            </ul>

            </form>   
          </div>
        </div>
      </div>

      {
        this.props.isResultsLoading ? 
          (<Loader type="Oval" color="#4285f4" height={60} width={60} />) :
          (<Results results={this.props.data} />)
      }
    
    </section>
    );
  }
}

const mapStateToProps = state => {
  //console.log(state);
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
