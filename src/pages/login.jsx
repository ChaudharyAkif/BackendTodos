import React, { useState, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/authContext';
const Login = ({ history }) => {
  const [form, setForm] = useState({ email:'', password:'' });
  const { login } = useContext(AuthContext);

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/api/auth/login', form);
      const token = res.data.token;
      login(token);
      history.push('/todos');
    } catch (err) {
      alert(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Log In</h2>
      <input name="email" type="email" value={form.email} onChange={handle} placeholder="Email" required />
      <input name="password" type="password" value={form.password} onChange={handle} placeholder="Password" required />
      <button type="submit">Log In</button>
    </form>
  );
};

export default Login;
