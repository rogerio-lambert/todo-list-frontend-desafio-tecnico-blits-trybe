import React, { useContext, useState, useEffect } from 'react';
import ContextTasks from '../context/ContextTasks';
import Task from '../components/Task';


function ToDo() {
  const { tasks, user, updateSortKey, createTask, getAllTasks } = useContext(ContextTasks);
  const [newTask, setNewTask] = useState('');
  const columnTitle = [ 'Tarefa', 'Data de criação', 'Status' ];

  useEffect(async () => {
    await getAllTasks(user.id)
  }, [tasks]);

  return (
    <section>
      <h1>{`Olá ${user.name}! O que temos de tarefa para hoje?`}</h1>
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
          {tasks.map((task, index) => (
            <Task task={task} key={index} />
          ))}
        </tbody>
      </table>
      <form
        className="form"
        onSubmit={ async (e) => {
          e.preventDefault();
          await createTask(newTask);
          setNewTask('');
        } }
      >
        <input
          className="input-login"
          type="text"
          value={ newTask }
          onChange={ (e) => setNewTask(e.target.value) }
          placeholder="Digite uma nova tarefa e clica em salvar para registar"
        />
        <button
          className="loginBtn"
          type="submit"
        >
          Salvar
        </button>
      </form>
    </section>
  );
}

export default ToDo;