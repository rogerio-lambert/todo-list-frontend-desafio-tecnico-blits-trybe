import React, { useContext, useState } from 'react';
import ContextTasks from '../context/ContextTasks';
import PropTypes from 'prop-types';


function Task({ task }) {
  const { deleteTask, updateTask } = useContext(ContextTasks);
  const [content, setContent] = useState(task.content);
  const [status, setStatus] = useState(task.status);
  const { timeStamp, id } = task
  const statusOptions = ['pendente', 'fazendo', 'concluída', 'garrada']
  return (
    <tr>
      <td>
        <form
          className="form"
          onSubmit={ async (e) => {
            e.preventDefault();
              await updateTask(id, content, status);
            }
          }
        >
          <input 
            type="text"
            value={content}
            onChange={ (e) => setContent(e.target.value) }
            name="content"
            id="input-task"
          />
        </form>
      </td>
      <td>{timeStamp}</td>
      <td>
        <select
          id="status"
          data-testid="column-filter"
          value={ status }
          onChange={ async ({ target: { value } }) => {
            setStatus(value);
            await updateTask(id, content, status);
          } }
        >
          {statusOptions.map((statusOption, index) => (
            <option key={ index }>{statusOption}</option>
          ))}
        </select>
      </td>
      <td>
        <button
          onClick={async () => await deleteTask(task.id)}
        >
          x
        </button>
      </td>
    </tr>
  );
}

Task.propTypes = {
  task: PropTypes.objectOf(PropTypes.shape(
    PropTypes.object,
  )),
}.isRequired;

export default Task;
