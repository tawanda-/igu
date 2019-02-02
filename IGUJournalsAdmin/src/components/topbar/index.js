import React, {Component} from 'react';
import {Link} from 'react-router-dom';

const MainMenu = () => {
    return (
      <div>
        <Link to="/">
          <button>home</button>
        </Link>
        <Link to="/upload">
          <button>Upload CSV</button>
        </Link>
      </div>
    );
  };

class Topbar extends Component{

    render() {

        return(
            <MainMenu />
        );
    }
}
export default Topbar;