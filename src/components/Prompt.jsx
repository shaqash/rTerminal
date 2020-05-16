import React from 'react';
import PropTypes from 'prop-types';
import WindowContext from '../contexts/WindowContext';

const Prompt = ({
  print,
}) => {
  const [localInput, setLocalInput] = React.useState('');
  const { setInput } = React.useContext(WindowContext);
  const runCommand = (event) => {
    const { key, target: { value } } = event;
    if (key === 'Enter' || key === 'Tab') {
      setInput(localInput);
      setLocalInput('');
      print(value);
    }
  };
  return (
    <code>
      $
      <input
        style={{
          backgroundColor: 'transparent',
          border: 0,
          color: 'white',
          marginLeft: 10,
        }}
        placeholder="..."
        value={localInput}
        type="text"
        onChange={({ target: { value } }) => setLocalInput(value)}
        onKeyDown={runCommand}
      />
      <br />
    </code>
  );
};
Prompt.propTypes = {
  print: PropTypes.func.isRequired,
};
export default Prompt;
