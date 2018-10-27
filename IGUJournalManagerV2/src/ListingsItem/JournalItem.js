import React from 'react';
import './JournalItem.css';

const journal = (props) => (
    <article className="Journal">
        <p>Journal Name: {props.journal.name}</p>
    </article>
);

export default journal;