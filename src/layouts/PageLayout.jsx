import PropTypes from 'prop-types';
import {
  Segment, SegmentGroup,
} from 'semantic-ui-react';
import React from 'react';
import HeaderBar from './HeaderBar';

const PageLayout = ({ children }) => (
  <SegmentGroup raised>
    <Segment clearing basic tertiary>
      <HeaderBar />
    </Segment>
    <Segment inverted>
      <div style={{ height: '75vh' }}>
        {children}
      </div>
    </Segment>
  </SegmentGroup>
);
PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default PageLayout;
