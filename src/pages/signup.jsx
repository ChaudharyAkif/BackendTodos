import React, { useState, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/authContext';

const Signup = ({ history }) => {
  const [form, setForm] = useState({ firstName:'', lastName:'', email:'', password:'' });
  const { login } = useContext(AuthContext);

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/api/auth/signup', form);
      const token = res.data.token;
      login(token);
      history.push('/todos');
    } catch (err) {
      alert(err.response?.data?.msg || 'Signup failed');
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Sign Up</h2>
      {['firstName','lastName','email','password'].map(field => (
        <input key={field} name={field} type={field==='password'?'password':'text'}
          value={form[field]} placeholder={field} onChange={handle} required />
      ))}
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
