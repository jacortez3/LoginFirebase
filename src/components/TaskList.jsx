// TaskList.jsx
import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';


const TaskList = ({ firebaseConfig }) => {
  const [tasks, setTasks] = useState([]);
  const db = firebase.firestore();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const querySnapshot = await db.collection('tasks').orderBy('id').get();
        const tasks = [];
        querySnapshot.forEach((doc) => {
          tasks.push({ id: doc.id, ...doc.data() });
        });
        setTasks(tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error.message);
      }
    };

    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }

    fetchTasks();
  }, [firebaseConfig]);

  async function deleteTask(id) {
    try {
      await db.collection('tasks').doc(id).delete();
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error.message);
    }
  }

  async function updateTask(id) {
    try {
      const taskRef = db.collection('tasks').doc(id);
      const { title } = await taskRef.get();
      const newTitle = prompt('Enter new task title', title);
      if (!newTitle.trim()) return;

      await taskRef.update({ title: newTitle });

      setTasks(
        tasks.map((task) => (task.id === id ? { ...task, title: newTitle } : task))
      );
    } catch (error) {
      console.error('Error updating task:', error.message);
    }
  }

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            <button onClick={() => updateTask(task.id)}>Actualizar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

TaskList.propTypes = {
  firebaseConfig: PropTypes.object.isRequired,
};

export default TaskList;