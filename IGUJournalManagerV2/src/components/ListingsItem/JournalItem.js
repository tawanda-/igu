import React from 'react';

const journal = (props) => {

    return(
        <div>
        <div className="result-view">
            <div>
                <div className="container">
                    <div className="row">
                        <div className="results_section col-md-12"> 
                            
                            {
                                props.journal.website ?
                                (<h3>
                                    <a className="header-link" href={props.journal.website}>{props.journal.name_of_journal} </a>
                                </h3>) :
                                (<h3>{props.journal.name_of_journal}</h3>)
                            }
                        </div>
                        
                        <div className="results_info col-lg-8">
                            <span><a className="print" href="#">Country.</a> {props.journal.country} </span>
                            {
                                props.journal.print_issn && 
                                <span><a className="print" href="#">Print ISSN.</a> {props.journal.print_issn} </span>
                            }
                            {
                                props.journal.e_issn && 
                                <span><a className="print" href="#">e ISSN.</a> {props.journal.e_issn} </span>
                            }
                            {
                                props.journal.city_of_publication &&
                                <span><a className="print" href="#">City Published.</a> {props.journal.city_of_publication} </span>
                            }
                            {
                                props.journal.name_of_publishing_company &&
                                <span> <a className="print" href="#">Publisher.</a> {props.journal.name_of_publishing_company}  </span>
                            }
                            {
                                props.journal.editor &&
                                <span><a className="print" href="#">Editor.</a> {props.journal.editor} </span>
                            }
                            {
                                props.journal.editor_info &&
                                <span><a className="print" href="#">Editor Information.</a> {props.journal.editor_info} </span>
                            }
                            {
                                props.journal.language &&
                                <span><a className="print" href="#">Language.</a> {props.journal.language} </span>
                            }
                            {
                                props.journal.since &&
                                <span><a className="print" href="#">Since.</a> {props.journal.since} </span>
                            }
                            {
                                props.journal.isi &&
                                <span><a className="print" href="#">ISI.</a> {props.journal.isi} </span>     
                            }
                            {
                                props.journal.isi_category &&
                                <span><a className="print" href="#">ISI Category.</a> {props.journal.isi_category} </span>
                            }
                            {
                                props.journal[12] &&
                                <span><a className="print" href="#">5 Year Impact Factor.</a> {props.journal[12]} </span>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br />
        <div className="mr-sm-2"></div>
        </div>
    );
}

export default journal;