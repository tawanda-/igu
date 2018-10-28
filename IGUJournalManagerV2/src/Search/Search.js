import React, {Component} from 'react';
import { connect } from 'react-redux';

import './Search.css';
import * as actionTypes from '../store/actions';

class Search extends Component {
    
    //todo: textinput sanity checks

    constructor(props) {
        super(props);
        this.searchTerm = '';
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.searchTerm = event.target.value;
    }

    render() {
        return (
            <div>
                <p>Search Component</p>
                <input className="Searchbox" type="text" onChange={this.handleChange}/>
                <button onClick={() => this.props.onSearchJournalsByName(this.searchTerm)} className="Searchbutton">Click to Search</button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onSearchJournalsByName: (searchTerm) => dispatch({type: actionTypes.SEARCH_JOURNALS_BY_NAME, payload: searchTerm}),
    };
  };

export default connect(null, mapDispatchToProps) (Search);