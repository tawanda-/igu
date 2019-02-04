import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import './App.css';

import { Layout } from 'antd';
import UploadCSV from './components/uploadCSVJournals';
import viewJournals from './components/viewJournals';

const { Header, Content } = Layout;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Header>
            <Link to="/">
              <button>Home</button>
            </Link>
            <Link to="/viewJournals">
              <button>Search Journals</button>
            </Link>
            <Link to="/upload">
              <button>Upload CSV</button>
            </Link>
          </Header>
          <Content>
              <div>
                <Route exact path="/viewJournals" component={viewJournals} />
                <Route exact path="/upload" component={UploadCSV} />
              </div>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default App;
