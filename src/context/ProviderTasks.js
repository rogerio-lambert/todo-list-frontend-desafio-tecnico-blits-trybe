import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ContextTasks from './ContextTasks';
import axios from 'axios';

function ProviderTasks({ children }) {
  const [tasks, loaldTasks] = useState([]);
  const [user, setUser] = useState([]);
  const [token, setToken] = useState('');
  const [allowed, setAllowed] = useState(true)
  const urlBase = 'http://localhost:3000';

  const getAllTasks = async () => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    console.log(headers);
    const { data } = await axios.get(`${urlBase}/tasks`, { headers })
    console.log(data);
    loaldTasks(data.tasks);
  };

  const makeLogin = async (email, password) => {
    setAllowed(true);
    const { data: { token: newToken, user: newUser, error } }= await axios
      .post('http://localhost:3000/users/login', { email, password })
        .catch((er) => console.log(er));
    console.log(newToken, newUser, error);
    if (error !== undefined) {
      console.log(error);
      return setAllowed(false);
    }
    setToken(newToken);
    setUser(newUser);
  };

  const createUser = async (name, email, password) => {
    console.log(name, email, password);
    await axios.post('http://localhost:3000/users/register', {
      name, email, password,
    }

    )
    // const fetchConfig = {
    //   method: 'POST',
    //   body: { name, email, password },
    // };
    // await fetch(`http://localhost:3000/users/register`, fetchConfig)
    //     .then((response) => response.json())
    //     .catch((error) => console.log(error));
  };


  return (
    <ContextTasks.Provider
      value={ {
        tasks,
        getAllTasks,
        user,
        createUser,
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



export default ProviderTasks;
