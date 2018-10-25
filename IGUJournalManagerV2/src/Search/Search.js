import React, {Component} from 'react';
import axios from 'axios';
import './Search.css';

class Search extends Component {

    constructor() {
        super();
        this.state = {
            journals: []
        };
    }

    render() {
        return (
            <div>
                <p>Search Component</p>
                <input type="string" className="Searchbox"/>
                <button onClick={this.searchDataHandler} className="Searchbutton">Click to Search</button>
            </div>
        );
    }

   
    searchDataHandler = () => {
        var self = this;
        //var baseUrl = "https://igu-online.org/wp-admin/admin-ajax.php";
        var baseUrl = "http://160.153.133.192/~j3uhf7xswh45/wp-admin/admin-ajax.php";
        var action = "the_ajax_hook";
        var name = "china";
        var filter = "country";
       // var requestUrl = baseUrl + "?action=" + action + "&name=" + name + "&filter=" + filter; 

        const instance = axios.create({
            baseURL: baseUrl,
            timeout: 3000,
            headers: {'Accept':'*/*', 'Content-Type': 'application/x-www-form-urlencoded'}
          });

        const querystring = require('querystring');

        const searchParams = {
            action: action,
            name: name,
            filter: filter
        };

        instance.post(baseUrl, querystring.stringify(searchParams))
        .then(function (response){
            console.log(response);
            self.updateState(response);
        })
        .catch(function(error) {
            console.log(error);
        });

    }

    updateState = (response) => {
        this.setState({journals: response});
    }
}

export default Search;