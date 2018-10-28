import React, {Component} from 'react';
import { connect } from 'react-redux';

import './Search.css';
import * as actionCreators from '../../store/actions'

class Search extends Component {
    
    //todo: textinput sanity checks

    state = {
        searchTerm: ''
    }

    constructor(props) {
        super(props);
        this.searchTerm = '';
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({searchTerm: event.target.value});
    }

    render() {
        return (
            <div>
                <p>Search Component</p>
                <input className="Searchbox"
                    type="text"
                    placeholder='Enter Search Term'
                    value={this.state.searchTerm}
                    onChange={this.handleChange} />

                <button className="Searchbutton"
                        onClick={() => this.props.onSearchJournalsByName(this.state.searchTerm)}>
                        Click to Search
                </button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onSearchJournalsByName: (searchTerm) => dispatch(actionCreators.searchJournalsByName(searchTerm)),
    };
  };

export default connect(null, mapDispatchToProps) (Search);