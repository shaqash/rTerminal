import React, { useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import Prompt from './Prompt';
import useGit from '../hooks/useGit';
import WindowContext from '../contexts/WindowContext';
import CacheContext from '../contexts/CacheContex';
import {
  INITIAL_OUTPUT, OPTIONS, TIMEOUT_404, README_URL,
} from '../constants/consts';

export default function Shell() {
  const [buffer, setBuffer] = React.useState(INITIAL_OUTPUT);
  const { cache, ls, resetCache } = React.useContext(CacheContext);
  const { setTitle } = useContext(WindowContext);
  const setCacheToGit = useGit();
  const [help, setHelp] = React.useState(`${OPTIONS.map((file) => `${file} `)}`);

  React.useEffect(() => {
    fetch(README_URL)
      .then((data) => data.text())
      .then((text) => setHelp(text))
      .catch(() => setHelp(`${OPTIONS.map((file) => `${file} `)}`));
  }, []);

  const commandSwitch = ([cmd, param]) => {
    switch (cmd) {
      case 'ls':
        return `${ls}`;
      case 'cd':
        if (param && !ls.join(' ').includes(param)) throw new Error('Unknown directory');
        setTitle(!param ? '~' : param);
        if (!param) {
          resetCache();
          return INITIAL_OUTPUT;
        }
        return param === 'git-projects' && setCacheToGit();
      case 'echo':
        return param;
      case 'open':
        return JSON.stringify(cache.find((item) => item.name === param), null, 2);
      case 'help':
        return `${help}`;
      case 'clear':
        return '';
      default:
        throw new Error('Command not found');
    }
  };

  /**
   * Interprets user input
   * @param {String} userInput User input
   */
  const print = (userInput) => {
    try {
      const [cmd, param] = userInput.split(' ');
      const findOption = OPTIONS.find(
        (option) => option.includes(cmd) && option,
      );
      if (!findOption) throw new Error('Command not found');
      setBuffer(commandSwitch([cmd, param]));
    } catch (err) {
      const currOutput = buffer;
      setBuffer(err.message);
      setTimeout(() => {
        setBuffer(currOutput);
      }, TIMEOUT_404);
    }
  };

  return (
    <div>
      <ReactMarkdown className="code">
        {buffer}
      </ReactMarkdown>
      <Prompt print={print} />
    </div>
  );
}
