import React from 'react';
import './JournalItem.css';

const journal = (props) => (
    <article className="Journal">
        <p>Journal Name: <b>{props.journal.name_of_journal} </b></p>
    </article>
);

export default journal;