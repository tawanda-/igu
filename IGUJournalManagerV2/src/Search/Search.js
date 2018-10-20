import React, {Component} from 'react';
import axios from 'axios';
import './Search.css';

class Search extends Component {

    state = {
        journals: []
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
        var baseUrl = "https://igu-online.org/wp-admin/admin-ajax.php";
        //var action = "the_ajax_hook";
        //var name = "china";
        //var filter = "country";
       // var requestUrl = baseUrl + "?action=" + action + "&name=" + name + "&filter=" + filter; 

        const searchParams = {
            action: 'the_ajax_hook',
            name: 'china',
            filter: 'country'
        };

        const headers = {
            headers : {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };

        axios.post(baseUrl, searchParams)
        .then(response => {
            console.log(response);
            this.setState({journals: response});
        })
        .catch(function(error) {
            console.log(error);
        });
    }
}

export default Search;