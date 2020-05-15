import React from 'react';
import {
  Container, Header, Icon, Segmenet, Label, SegmentGroup, Loader,
} from 'semantic-ui-react';
import './App.css';
import PageLayout from './layouts/PageLayout';
import Section from './layouts/Section';
import 'semantic-ui-css/semantic.min.css';

function App() {
  return (
    <div className="App">
      <Container>
        <PageLayout>
          <Section headerTitle="./recentPosts">
            <SegmentGroup stacked>
              <p>Posts data</p>
            </SegmentGroup>
          </Section>
          <Section headerTitle=".git">
            <Loader active inline disabled>

            </Loader>
          </Section>
        </PageLayout>
      </Container>
    </div>
  );
}

export default App;
