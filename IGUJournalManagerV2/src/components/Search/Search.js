import React, {Component} from 'react';
import { connect } from 'react-redux';
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
            <div className="container">
                <div className="row">
                    <div className="input-group search col-md-8">
                        <input 
                            className="form-control"
                            type="text"
                            style={{borderRadius: '4px', fontFamily: "Roboto Condensed", fontWeight: 40, height: '100%'}}
                            placeholder="SEARCH BY JOURNAL NAME"
                            value={this.state.searchTerm}
                            onChange={this.handleChange} 
                        />
                        <div className="input-group col-md-3">
                            <button 
                                style={{borderRadius: '4px'}}
                                type="button" 
                                className="btn"
                                value={this.state.searchTerm}
                                onClick={() => this.props.onSearchJournalsByName(this.state.searchTerm)}>
                                    CLICK SEARCH
                            </button>
                        </div>
                    </div>
                </div>
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