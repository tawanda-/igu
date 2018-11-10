import React from 'react';
import './JournalItem.css';

const journal = (props) => (
    <article className="Journal">
        <p>Journal Name: <b>{props.journal.name_of_journal}</b> - Country: <b>{props.journal.country}</b>  - Language: <b>{props.journal.language}</b> </p>
    </article>
);

export default journal;