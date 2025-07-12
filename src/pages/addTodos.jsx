import React, { useState } from 'react';
import axios from 'axios';

const CreateTodo = () => {
  const [todo, setTodo] = useState({ title: '', location: '', description: '' });
  const [image, setImage] = useState(null);

  const handleChange = e => setTodo({ ...todo, [e.target.name]: e.target.value });
  const handleImage = e => setImage(e.target.files[0]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!todo.title || !todo.location || !todo.description || !image) {
      return alert('All fields + image are required');
    }
    try {
      const fd = new FormData();
      Object.entries(todo).forEach(([k, v]) => fd.append(k, v));
      fd.append('image', image);
      await axios.post('http://localhost:5000/api/todos', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      alert('Created!');
      setTodo({ title: '', location: '', description: '' });
      setImage(null);
    } catch (err) {
      console.error(err);
      alert('Error');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
      <input name="title" value={todo.title} onChange={handleChange} placeholder="Title" required />
      <input name="location" value={todo.location} onChange={handleChange} placeholder="Location" required />
      <textarea name="description" value={todo.description} onChange={handleChange} placeholder="Description" required />
      <input type="file" accept="image/*" onChange={handleImage} required />
      <button type="submit">Create Todo</button>
    </form>
  );
};

export default CreateTodo;
