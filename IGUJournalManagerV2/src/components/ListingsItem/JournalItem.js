import React from 'react';

const journal = (props) => {

    return(
        <div>
        <div className="result-view">
            <div>
                <div className="container">
                    <div className="row">
                        <div className="results_section col-md-12"> 
                            <h3>{props.journal.name_of_journal}</h3>
                        </div>
                        
                        <div className="results_info col-lg-8">
                            <span><a className="print" href="#">Country.</a> {props.journal.country} </span>
                            <span><a className="print" href="#">Print ISSN.</a> {props.journal.print_issn} </span>
                            <span><a className="print" href="#">e ISSN.</a> {props.journal.e_issn} </span>
                            <span><a className="print" href="#">City Published.</a> {props.journal.city_of_publication} </span>
                            <span> <a className="print" href="#">Publisher.</a> {props.journal.name_of_publishing_company}  </span>
                            <span><a className="print" href="#">Editor.</a> {props.journal.editor} </span>
                            <span><a className="print" href="#">Editor Information.</a> {props.journal.editor_info} </span>
                            <span><a className="print" href="#">Language.</a> {props.journal.language} </span>
                            <span><a className="print" href="#">Since.</a> {props.journal.since} </span>
                            <span><a className="print" href="#">Print.</a> - </span>
                            <span><a className="print" href="#">ISI.</a> {props.journal.isi} </span>                  
                            <span><a className="print" href="#">ISI Category.</a> {props.journal.isi_category} </span>
                            <span><a className="print" href="#">5 Year Impact Factor.</a> {props.journal[12]} </span>
                            <span><a className="print" href={props.journal.website}>Website.</a> Follow Link </span>
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