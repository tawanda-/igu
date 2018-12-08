import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'react-bootstrap';
import Loader from 'react-loader-spinner';
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

      <section id="about">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 welcome">
            <h2><b>WELCOME TO</b> IGU UGI JOURNAL DATABASE</h2>
        </div>

          <div class="col-lg-8 info_line lead">  
           <p>
               Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. <a href="#" class="nav-toggle read">Readmore</a>
            </p>
          </div>
        
        </div>
        
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-12">               
            <form>
              
            <div class="container">
                <div class="row">
                  <div class="input-group search col-md-8">
                      <input type="text" class="form-control" placeholder="SEARCH BY JOURNAL NAME" />
                      <div class="input-group col-md-3">
                          <button type="button" class="btn"> CLICK SEARCH</button>
                      </div>
                  </div>
              </div>
            </div> 



            <div class="form-row align-items-center">
                <div class="col-auto my-1 col-md-2">
                 
                    <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
                      <option selected> ALL COUNTRIES</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>

                </div>
                <div class="col-auto my-1 col-md-2">
                    
                    <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
                      <option selected> ALL LANGUAGES</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select> 

                </div>
            </div>


<ul class="pagination table-responsive mb-2">
              <li class="page-item active"><a class="page-link" href="#">A</a></li>
              <li class="page-item"><a class="page-link" href="#">B</a></li>
              <li class="page-item"><a class="page-link" href="#">D</a></li>
              <li class="page-item"><a class="page-link" href="#">E</a></li>
              <li class="page-item"><a class="page-link" href="#">F</a></li>
              <li class="page-item"><a class="page-link" href="#">G</a></li>
              <li class="page-item"><a class="page-link" href="#">H</a></li>
              <li class="page-item"><a class="page-link" href="#">I</a></li>
              <li class="page-item"><a class="page-link" href="#">J</a></li>
              <li class="page-item"><a class="page-link" href="#">K</a></li>
              <li class="page-item"><a class="page-link" href="#">L</a></li>
              <li class="page-item"><a class="page-link" href="#">M</a></li>
              <li class="page-item"><a class="page-link" href="#">N</a></li>
              <li class="page-item"><a class="page-link" href="#">O</a></li>
              <li class="page-item"><a class="page-link" href="#">P</a></li>
              <li class="page-item"><a class="page-link" href="#">Q</a></li>
              <li class="page-item"><a class="page-link" href="#">R</a></li>
              <li class="page-item"><a class="page-link" href="#">S</a></li>
              <li class="page-item"><a class="page-link" href="#">T</a></li>
              <li class="page-item"><a class="page-link" href="#">U</a></li>
              <li class="page-item"><a class="page-link" href="#">V</a></li>
              <li class="page-item"><a class="page-link" href="#">W</a></li>
              <li class="page-item"><a class="page-link" href="#">X</a></li>
              <li class="page-item"><a class="page-link" href="#">Y</a></li>
              <li class="page-item"><a class="page-link" href="#">Z</a></li>
            </ul>



            </form>   
          </div>
        </div>
      </div>      
 
      <div class="container">
        <div class="row">
          <div class="results">
            Results section
          </div>
        </div>
        
        <div class="result-view">
          <div>
            <div class="container">
              <div class="row">
                  <div class="results_section col-md-12">
                    
                    <h3>Australian forestry jounal</h3>
                  </div>
                  
                  <div class="results_info col-lg-8">
                    <span><a class="print" href="#">Country.</a> Australia</span>
                    <span><a class="print" href="#">Print ISSN.</a> 14486563</span>
                    <span><a class="print" href="#">e ISSN.</a> 21595356</span>
                    <span><a class="print" href="#">City Published.</a> Melbourne</span>
                   <span> <a class="print" href="#">Publisher.</a> Environment Institute of Australia and New Zealand and Taylor and Francis</span>
                    <span><a class="print" href="#">Editor.</a> Helen Ross (University of Queensland) and R. W. (Bill) Carter (University of the Sunshine Coast)</span>
                    <span><a class="print" href="#">Editor Information.</a> ajem@uq.edu.au </span>
                    <span><a class="print" href="#">Language.</a> English</span>
                    <span><a class="print" href="#">Since.</a> 2003</span>
                    <span><a class="print" href="#">Print.</a> 0 </span>
                    <span><a class="print" href="#">ISI.</a> -</span>                  
                    <span><a class="print" href="#">ISI Category.</a> </span>
                    <span><a class="print" href="#">5 Year Impact Factor.</a> 0</span>
                    <span><a class="print" href="#">Website.</a> Follow Link</span>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div class="mr-sm-2"></div>
        
        <div class="result-view">
          <div>
            <div class="container">
              <div class="row">
                  <div class="results_section col-md-12">
                    
                    <h3>Australian geographer</h3>
                  </div>
                  
                  <div class="results_info col-lg-8">
                    <span><a class="print" href="#">Country.</a> Australia</span>
                    <span><a class="print" href="#">Print ISSN.</a> 00049158 </span>
                    <span><a class="print" href="#">e ISSN.</a> -</span>
                    <span><a class="print" href="#">City Published.</a> Perth</span>
                   <span> <a class="print" href="#">Publisher.</a> Institute of Foresters of Australia </span>
                    <span><a class="print" href="#">Editor.</a> Dr Brian Turner</span>
                    <span><a class="print" href="#">Editor Information.</a> ifa@forestry.org.au </span>
                    <span><a class="print" href="#">Language.</a> English</span>
                    <span><a class="print" href="#">Since.</a> 1936 </span>
                    <span><a class="print" href="#">Print.</a> 0</span>
                    <span><a class="print" href="#">ISI.</a> 0</span>                  
                    <span><a class="print" href="#">ISI Category.</a> - </span>
                    <span><a class="print" href="#">5 Year Impact Factor.</a> 0  </span>
                    <span><a class="print" href="#">Website.</a> Follow Link</span>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mr-sm-2"></div>
        <br />
        
        
        <div class="result-view">
          <div>
            <div class="container">
              <div class="row">
                  <div class="results_section col-md-12">
                    
                    <h3>Australasian Journal of Environmental Management</h3>
                  </div>
                  
                  <div class="results_info col-lg-8">
                    <span><a class="print" href="#">Country.</a> Australia</span>
                    <span><a class="print" href="#">Print ISSN.</a> 00049158 </span>
                    <span><a class="print" href="#">e ISSN.</a> -</span>
                    <span><a class="print" href="#">City Published.</a> Perth</span>
                   <span> <a class="print" href="#">Publisher.</a> Institute of Foresters of Australia </span>
                    <span><a class="print" href="#">Editor.</a> Dr Brian Turner</span>
                    <span><a class="print" href="#">Editor Information.</a> ifa@forestry.org.au </span>
                    <span><a class="print" href="#">Language.</a> English</span>
                    <span><a class="print" href="#">Since.</a> 1936 </span>
                    <span><a class="print" href="#">Print.</a> 0</span>
                    <span><a class="print" href="#">ISI.</a> 0</span>                  
                    <span><a class="print" href="#">ISI Category.</a> - </span>
                    <span><a class="print" href="#">5 Year Impact Factor.</a> 0  </span>
                    <span><a class="print" href="#">Website.</a> Follow Link</span>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>





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
