import React, {Component} from 'react';
import { connect } from 'react-redux';

import './Results.css'
import JournalItem from '../ListingsItem/JournalItem';


class Results extends Component {

    // state = {
    //     journals:[]
    // }

    render() {

        const journals = this.props.results.map(journal => {
            return <JournalItem journal={journal}/>;
        });

        return (
            <div>
                <p>Results Section:</p>
                <section className="Results">
                    {journals}
                </section>
            </div>
        );
    }
}

export default Results;