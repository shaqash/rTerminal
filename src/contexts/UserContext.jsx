import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { USERNAME, BASE_URL } from '../constants/consts';

const UserContext = createContext({
  githubUser: String,
  setGithubUser: Function,
  githubUserData: Object,
});

async function fetchUserData(ghUser = USERNAME) {
  let user = sessionStorage.getItem(`${ghUser}.userdata`);
  if (!user) {
    user = await fetch(`${BASE_URL}${ghUser}`)
      .then((json) => json.json());
    sessionStorage.setItem(`${ghUser}.userdata`, JSON.stringify(user));
  } else {
    user = JSON.parse(user);
  }
  return user;
}

/**
 * User context provider
 * @param {React.Props} param0 props
 */
export function UserProvider({ children }) {
  const [githubUser, setGithubUser] = useState(USERNAME);
  const fetch = React.useCallback(
    async () => fetchUserData(githubUser),
    [githubUser],
  );
  const [isLoading, setLoading] = React.useState(false);
  const [githubUserData, setGithubUserData] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetch();
      if (res.message === 'Not Found') setGithubUser(USERNAME);
      setGithubUserData(res);
    })();
  }, [fetch]);

  return (
    <UserContext.Provider value={{ githubUser, setGithubUser, githubUserData }}>
      {!isLoading ? <>Loading</> : children}
    </UserContext.Provider>
  );
}
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default UserContext;
