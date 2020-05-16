import React from 'react';
import {
  Container,
} from 'semantic-ui-react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import PageLayout from './layouts/PageLayout';
import { WindowProvider } from './contexts/WindowContext';
import Shell from './components/Shell';
import { CacheProvider } from './contexts/CacheContex';

const App = () => (
  <div className="App">
    <Container>
      <WindowProvider>
        <CacheProvider>
          <PageLayout>
            <Shell />
          </PageLayout>
        </CacheProvider>
      </WindowProvider>
    </Container>
  </div>
);

export default App;
