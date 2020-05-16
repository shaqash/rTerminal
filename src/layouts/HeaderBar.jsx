import React, { useContext } from 'react';
import {
  Image, Header,
} from 'semantic-ui-react';
import WindowContext from '../contexts/WindowContext';
import UserContext from '../contexts/UserContext';

const HeaderBar = () => {
  const { title } = useContext(WindowContext);
  const { githubUserData } = useContext(UserContext);

  return (
    <div>
      <Header as="h5" floated="left">
        <Header.Content>
          <Image src={githubUserData?.avatar_url} avatar circular />
          <span>
            {githubUserData?.name}
            :
            {title}
          </span>
        </Header.Content>
      </Header>
    </div>
  );
};
export default HeaderBar;
