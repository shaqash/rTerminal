import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const INITIAL_CACHE = [
  { name: 'projects' },
  { name: 'posts' },
];

const CacheContext = createContext({
  cache: Object,
  setCache: Function,
  ls: String,
  resetCache: Function,
});
export default CacheContext;

export function CacheProvider({ children }) {
  const [cache, setCache] = useState(INITIAL_CACHE);
  const lsFunc = (c) => c.map((item) => item.name).join(' ');
  const ls = React.useCallback(
    lsFunc(cache),
    [cache],
  );
  const resetCache = () => setCache(INITIAL_CACHE);
  return (
    <CacheContext.Provider value={{
      cache, setCache, ls, resetCache,
    }}
    >
      {children}
    </CacheContext.Provider>
  );
}
CacheProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
