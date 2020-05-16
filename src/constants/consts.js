export const INITIAL_OUTPUT = 'Welcome home \nUse **help** command for more info';
export const OPTIONS = [
  'help', 'ls', 'echo', 'cd', 'open', 'clear', 'read', 'su',
];
export const TIMEOUT_404 = 3000;
export const USERNAME = 'shaqash';
export const BASE_URL = 'https://api.github.com/users/';
export const README_URL = `https://raw.githubusercontent.com/${USERNAME}/rTerminal/master/README.md`;

export default {
  INITIAL_OUTPUT,
  OPTIONS,
  TIMEOUT_404,
  README_URL,
};
