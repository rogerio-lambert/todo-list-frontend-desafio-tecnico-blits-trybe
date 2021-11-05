import React, { useContext } from 'react';
import ContextTasks from '../context/ContextTasks';
import { columnTitle } from '../context/ProviderTasks';

function Table() {
  const { filteredPlanets, updateSortKey, isLoading } = useContext(ContextTasks);
  return (
    <div>
      {
        isLoading
          ? <h1>Carregando</h1>
          : (
            <table>
              <thead>
                <tr>
                  {columnTitle.map((column, index) => (
                    <th key={ index }>
                      {column}
                      <button
                        type="button"
                        onClick={ () => updateSortKey({ column, sort: 'ASC' }) }
                      >
                        ^
                      </button>
                      <button
                        type="button"
                        onClick={ () => updateSortKey({ column, sort: 'DESC' }) }
                      >
                        v
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredPlanets.map((planet, index) => (
                  <tr key={ index }>
                    {Object.values(planet).map((info, index2) => (
                      <td
                        key={ index2 }
                        data-testid={ index2 === 0 ? 'planet-name' : '' }
                      >
                        {info}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )
      }
    </div>
  );
}

export default Table;
