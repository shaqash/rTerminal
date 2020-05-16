import React from 'react';
import CacheContext from '../contexts/CacheContex';

const user = 'shaqash';
const url = `https://api.github.com/users/${user}`;

const repoMap = (p) => ({
  name: p.name,
  url: p.html_url,
  description: p.description,
  updated_at: p.updated_at,
  language: p.language,
});

const repoFilter = (p) => p.owner.login === user;

async function fetchProjects() {
  let projects = sessionStorage.getItem('shaq.starred');
  if (!projects) {
    projects = await fetch(`${url}/starred`)
      .then((data) => data.json()) // Convert to JSON
      .then((json) => json.filter(repoFilter)) // Filter by owner = me
      .then((filtered) => filtered.map(repoMap)); // Map only required fields
    sessionStorage.setItem('shaq.starred', JSON.stringify(projects));
  } else {
    projects = JSON.parse(projects);
  }
  return projects;
}

/**
 * Custom hook for fetching git info and set cache
 * @returns {Function}
 */
const Git = () => {
  const { setCache } = React.useContext(CacheContext);
  const setCacheToGit = () => {
    fetchProjects().then((projects) => {
      setCache(projects);
    });
  };

  return setCacheToGit;
};
export default Git;
