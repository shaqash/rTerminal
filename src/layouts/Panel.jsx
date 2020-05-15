import React from 'react';
import {
  Image, Header, Icon, Menu,
} from 'semantic-ui-react';

const author = 'Shaked Ashkenazi';
const title = 'Software Developer';
const socialLinks = {
  github: 'shaqash',
  linkedin: 'shaked-ashkenazi',
  rss: '',
};

const menuItems = [
  { link: `https://github.com/${socialLinks.github}`, iconName: 'github', color: 'black' },
  { link: `https://www.linkedin.com/in/${socialLinks.linkedin}`, iconName: 'alternate linkedin', color: 'blue' },
  { link: '', iconName: 'rss', color: 'orange' },
];

const Panel = () => (
  <div>
    <Image src="https://avatars.githubusercontent.com/u/18087805" floated verticalAlign="middle" size="small" dimmer circular />
    <Header as="h2">
      {author}
      <Header.Subheader>{title}</Header.Subheader>
    </Header>
    <Menu compact icon>
      {menuItems.map((item) => (
        <Menu.Item key={JSON.stringify(item)} link={item.link}>
          <Icon name={item.iconName} color={item.color} />
        </Menu.Item>
      ))}
    </Menu>
  </div>
);
export default Panel;
