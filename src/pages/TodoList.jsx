import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(null);
  const [newImg, setNewImg] = useState(null);

  const fetch = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/todos');
      setTodos(res.data);
    } catch {
      alert('Fetch failed');
    }
  };

  useEffect(fetch, []);

  const del = async id => {
    if (!window.confirm('Delete?')) return;
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    fetch();
  };

  const save = async () => {
    const formData = new FormData();
    formData.append('title', edit.title);
    formData.append('location', edit.location);
    formData.append('description', edit.description);
    if (newImg) formData.append('image', newImg);

    await axios.put(`http://localhost:5000/api/todos/${edit._id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    setEdit(null);
    setNewImg(null);
    fetch();
  };

  return (
    <div>
      <h2>Todos</h2>
      {todos.map(todo => (
        <div key={todo._id} style={{ border: '1px solid #ccc', padding: 15, marginBottom: 20 }}>
          {edit && edit._id === todo._id ? (
            <>
              <input name="title" value={edit.title} onChange={e => setEdit({ ...edit, title: e.target.value })} />
              <input name="location" value={edit.location} onChange={e => setEdit({ ...edit, location: e.target.value })} />
              <textarea name="description" value={edit.description} onChange={e => setEdit({ ...edit, description: e.target.value })} />
              <input type="file" accept="image/*" onChange={e => setNewImg(e.target.files[0])} />
              <button onClick={save}>Save</button>
              <button onClick={() => setEdit(null)}>Cancel</button>
            </>
          ) : (
            <>
              <h3>{todo.title}</h3>
              <p>📍 {todo.location}</p>
              <p>📝 {todo.description}</p>
              {todo.image && <img src={todo.image + '?t=' + Date.now()} alt="" style={{ width: '100%', maxHeight: 250, objectFit: 'cover', borderRadius: 6 }} />}
              <button onClick={() => setEdit(todo)}>Edit</button>
              <button onClick={() => del(todo._id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
