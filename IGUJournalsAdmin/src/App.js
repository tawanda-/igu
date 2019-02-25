import React, { Component } from 'react';
import './App.css';

import { Layout } from 'antd';
import ViewJournals from './components/viewJournals';

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
              <ViewJournals {...this.props} />
          </Content>
        </Layout>
      </div>
    );
  }
}

export default App;
