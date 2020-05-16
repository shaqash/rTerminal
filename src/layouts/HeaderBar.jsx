import React, { useContext } from 'react';
import {
  Image, Header,
} from 'semantic-ui-react';
import WindowContext from '../contexts/WindowContext';

const author = 'Shaked Ashkenazi';
// const socialLinks = {
//   github: 'shaqash',
//   linkedin: 'shaked-ashkenazi',
//   rss: '',
// };

// const menuItems = [
//   { link: `https://github.com/${socialLinks.github}`, iconName: 'github', color: 'black' },
//   { link: `https://www.linkedin.com/in/${socialLinks.linkedin}`, iconName: 'alternate linkedin', color: 'blue' },
//   { link: '', iconName: 'rss', color: 'orange' },
// ];

const HeaderBar = () => {
  const { title } = useContext(WindowContext);
  return (
    <div>
      <Header as="h5" floated="left">
        <Header.Content>
          <Image src="https://avatars.githubusercontent.com/u/18087805" avatar circular />
          <span>
            {author}
            :
            {title}
          </span>
        </Header.Content>
      </Header>
    </div>
  );
};
export default HeaderBar;
