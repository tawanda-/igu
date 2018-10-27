import React, {Component} from 'react';
import { connect } from 'react-redux';

import './Search.css';
import * as actionTypes from '../store/actions';

class Search extends Component {

    constructor() {
        super();
        this.state = {
            journals: [{name: 'journal'}],
        };
    }

    render() {
        return (
            <div>
                <p>Search Component</p>
                <input type="string" className="Searchbox"/>
                <button onClick={this.props.onSearchJournalsByName} className="Searchbutton">Click to Search</button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onSearchJournalsByName: () => dispatch({type: actionTypes.SEARCH_JOURNALS_BY_NAME, payload:'journalName'}),
    };
  };

export default connect(null, mapDispatchToProps) (Search);