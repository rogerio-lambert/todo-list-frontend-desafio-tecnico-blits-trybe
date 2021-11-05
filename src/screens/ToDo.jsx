import React, { useContext } from 'react';
import ContextTasks from '../context/ContextTasks';


function ToDo() {
  const { tasks } = useContext(ContextTasks);
  return (
    <div>
      {tasks}
    </div>
  );
}

export default ToDo;