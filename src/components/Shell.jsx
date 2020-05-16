import React, { useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import Prompt from './Prompt';
import useGit from '../hooks/useGit';
import WindowContext from '../contexts/WindowContext';
import CacheContext from '../contexts/CacheContex';
import {
  INITIAL_OUTPUT, OPTIONS, TIMEOUT_404, README_URL,
} from '../constants/consts';
import UserContext from '../contexts/UserContext';

export default function Shell() {
  const [buffer, setBuffer] = React.useState(INITIAL_OUTPUT);
  const { setGithubUser, githubUser } = React.useContext(UserContext);
  const { cache, ls, resetCache } = React.useContext(CacheContext);
  const { setTitle } = useContext(WindowContext);
  const setCacheToGit = useGit();
  const [help, setHelp] = React.useState(`${OPTIONS.map((file) => `${file} `)}`);

  const fetchReadme = async (url) => fetch(url)
    .then((data) => data.text());

  React.useEffect(() => {
    fetchReadme(README_URL)
      .then((text) => setHelp(text))
      .catch(() => setHelp(OPTIONS.join(' ')));
  }, []);

  const commandSwitch = ([cmd, param]) => {
    switch (cmd) {
      case 'ls':
        return `${ls}`;
      case 'cd':
        if (param && !ls.includes(param)) throw new Error('Unknown directory');
        setTitle(!param ? '~' : param);
        if (!param) {
          resetCache();
          return INITIAL_OUTPUT;
        }
        return param === 'projects' && setCacheToGit();
      case 'echo':
        return param;
      case 'open':
        if (param && !ls.includes(param)) throw new Error('File not found');
        return JSON.stringify(cache.find((item) => item.name === param), null, 2);
      case 'read':
        if (param && !ls.includes(param)) throw new Error('File not found');
        return fetchReadme(`https://raw.githubusercontent.com/${githubUser}/${param}/master/README.md`);
      case 'help':
        return `${help}`;
      case 'clear':
        return '';
      case 'su':
        resetCache();
        setGithubUser(param);
        return INITIAL_OUTPUT;
      default:
        throw new Error('Command not found');
    }
  };

  /**
   * Interprets user input
   * @param {String} userInput User input
   */
  const print = async (userInput) => {
    try {
      const [cmd, param] = userInput.split(' ');
      const findOption = OPTIONS.find(
        (option) => option.includes(cmd) && option,
      );
      if (!findOption) throw new Error('Command not found');
      const res = await commandSwitch([cmd, param]);
      setBuffer(res);
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
