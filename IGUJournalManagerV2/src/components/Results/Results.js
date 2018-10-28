import React, {Component} from 'react';

import './Results.css'
import JournalItem from '../ListingsItem/JournalItem';


class Results extends Component {

    render() {

        const journals = this.props.results.map(journal => {
            return <JournalItem key={journal.id} journal={journal}/>;
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