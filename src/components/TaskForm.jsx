// TaskForm.jsx
import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

const TaskForm = ({ firebaseConfig }) => {
  const [title, setTitle] = useState('');
  const [db, setDb] = useState(null);

  useEffect(() => {
    const app = firebase.initializeApp(firebaseConfig);
    const db = app.firestore();
    setDb(db);
  }, [firebaseConfig]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await db.collection('tasks').add({ title });
      setTitle('');
    } catch (error) {
      console.error('Error adding task:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

TaskForm.propTypes = {
  firebaseConfig: PropTypes.object.isRequired,
};

export default TaskForm;
