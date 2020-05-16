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
import { UserProvider } from './contexts/UserContext';

const App = () => {
  function randomBgColor() {
    const x = Math.floor(Math.random() * 50);
    const y = Math.floor(Math.random() * 100);
    const z = Math.floor(Math.random() * 256);
    const bgColor = `rgb(${x},${y},${z})`;

    document.body.style.background = bgColor;
  }

  React.useEffect(() => {
    randomBgColor();
  }, []);
  return (
    <div className="App">
      <Container>
        <WindowProvider>
          <UserProvider>
            <CacheProvider>
              <PageLayout>
                <Shell />
              </PageLayout>
            </CacheProvider>
          </UserProvider>
        </WindowProvider>
      </Container>
    </div>
  );
};

export default App;
