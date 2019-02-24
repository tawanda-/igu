import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import './App.css';

import { Layout } from 'antd';
import viewJournals from './components/viewJournals';

const { Header, Content } = Layout;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Header>
          <h1>IGU Journals Editor</h1>
          </Header>
          <Content>
              <div>
                <Route exact path="/" component={viewJournals} />
              </div>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default App;
