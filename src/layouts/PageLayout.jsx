import PropTypes from 'prop-types';
import { Grid, Segment } from 'semantic-ui-react';
import React from 'react';
import Panel from './Panel';

const PageLayout = ({ children }) => (
  <Segment raised padded>
    <Grid divided inverted stackable columns="2">
      <Grid.Column only="computer" width="4" textAlign="center">
        <Panel />
      </Grid.Column>
      <Grid.Column stretched width="12">
        {children}
      </Grid.Column>
    </Grid>
  </Segment>
);
PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default PageLayout;
