import React from 'react';
import CacheContext from '../contexts/CacheContex';
import UserContext from '../contexts/UserContext';
import { BASE_URL } from '../constants/consts';

const repoMap = (p) => ({
  name: p.name,
  url: p.html_url,
  description: p.description,
  updated_at: p.updated_at,
  language: p.language,
});

async function fetchProjects(ghUser, repoFilter, option = 'repos') {
  let projects = sessionStorage.getItem(`${ghUser}.starred`);
  if (!projects) {
    projects = await fetch(`${BASE_URL}${ghUser}/${option}`)
      .then((data) => data.json()) // Convert to JSON
      .then((json) => json.filter(repoFilter)) // Filter by owner = me
      .then((filtered) => filtered.map(repoMap)) // Map only required fields
      .catch((err) => new Error(err));
    sessionStorage.setItem(`${ghUser}.starred`, JSON.stringify(projects));
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
  const { githubUser } = React.useContext(UserContext);
  const repoFilter = (p) => p.owner.login === githubUser;
  const setCacheToGit = () => {
    fetchProjects(githubUser, repoFilter)
      .then((projects) => setCache(projects))
      .catch((err) => new Error(err));
  };

  return setCacheToGit;
};
export default Git;
