import React, {Component} from 'react';
import JournalItem from '../ListingsItem/JournalItem';

class Results extends Component {

    render() {

        const journals = this.props.results.map(journal => {
            return <JournalItem key={journal.id} journal={journal}/>;
        });

        return (
            <div className="container">
                <div className="row">
                    <div className="results">
                        Results section
                    </div>
                </div>

                {journals}

            </div>
        );
    }
}

export default Results;