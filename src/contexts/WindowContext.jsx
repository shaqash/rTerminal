import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const INITIAL_TITLE = '~';

const WindowContext = createContext({
  title: INITIAL_TITLE,
  setTitle: () => { },
  input: '',
  setInput: () => { },
});
export default WindowContext;

export function WindowProvider({ children }) {
  const [title, setTitle] = useState(INITIAL_TITLE);
  const [input, setInput] = useState('');
  return (
    <WindowContext.Provider value={{
      title, setTitle, input, setInput,
    }}
    >
      {children}
    </WindowContext.Provider>
  );
}
WindowProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
