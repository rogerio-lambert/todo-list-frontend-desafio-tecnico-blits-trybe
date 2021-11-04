import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ContextTasks from './ContextTasks';

function ProviderTasks({ children }) {
  const [tasks, loaldTasks] = useState([]);
  const [user, setUser] = useState([]);
  



  return (
    <ContextTasks.Provider
      value={ {
        tasks,
        user,
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
