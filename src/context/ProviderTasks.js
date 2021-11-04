import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ContextTasks from './ContextTasks';

function ProviderTasks({ children }) {
  const [tasks, loaldTasks] = useState([]);
  const [user, setUser] = useState([]);
  const [token, setToken] = useState('');
  const [allowed, setAllowed] = useState(true)


  const getAllTasks = async () => {
    const fetchConfig = {
      method: 'GET',
      header: {
        authorication: token,
      },
    };
    const urlBase = process.env.URL_BACKEND
    loaldTasks(
      fetch(`${urlBase}/tasks`, fetchConfig)
        .then((response) => response.json())
        .catch((error) => console.log(error))
    );
  };

  const makeLogin = async (email, password) => {
    const fetchConfig = {
      method: 'POST',
      body: { email, password },
    };
    const urlBase = process.env.URL_BACKEND
    setAllowed(true);
    const { token: newToken, user: newUser, error } = await fetch(
      `${urlBase}/users/login`, fetchConfig)
        .then((response) => response.json())
        .catch((error) => console.log(error));
    if (!error) {
      console.log(error);
      return setAllowed(false);
    }
    setToken(newToken);
    setUser(newUser);
  };

  const createUser = async (name, email, password) => {
    const fetchConfig = {
      method: 'POST',
      body: { name, email, password },
    };
    const urlBase = process.env.URL_BACKEND
    const { token: newToken, user: newUser, error } = await fetch(
      `${urlBase}/users/register`, fetchConfig)
        .then((response) => response.json())
        .catch((error) => console.log(error));
    setToken(newToken);
    setUser(newUser);
  };


  return (
    <ContextTasks.Provider
      value={ {
        tasks,
        getAllTasks,
        user,
        makeLogin,
        token,
        allowed,
      } }
    >
      { children }
    </ContextTasks.Provider>
  );
}

ProviderTasks.propTypes = {
  children: PropTypes.objectOf(PropTypes.shape(
    PropTypes.object,
  )),
}.isRequired;

export const columnTitle = [
  'name',
  'rotation_period',
  'orbital_period',
  'diameter',
  'climate',
  'gravity',
  'terrain',
  'surface_water',
  'population',
  'films',
  'created',
  'edited',
  'url',
];

export const comparisonOptions = [
  'maior que',
  'igual a',
  'menor que',
];

export default ProviderTasks;
