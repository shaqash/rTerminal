import React from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';

const Section = ({ children, headerTitle }) => (
  <section>
    <Header as="h2">
      {headerTitle}
    </Header>
    {children}
    <hr />
  </section>
);
Section.propTypes = {
  children: PropTypes.node.isRequired,
  headerTitle: PropTypes.string.isRequired,
};
export default Section;
