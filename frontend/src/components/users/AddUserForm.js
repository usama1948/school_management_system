import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

const AddUserForm = ({ onUserAdded }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/users/add/', {
        username,
        password,
        role,
      });
      setUsername('');
      setPassword('');
      setRole('');
       onUserAdded();
    } catch (err) {
         console.log(err)
        alert("There is a problem adding the user, please try again");
    }
  };

  return (
    <div>
      <h1>إضافة مستخدم جديد</h1>
      <form onSubmit={handleSubmit}>
         <TextField label="اسم المستخدم" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth margin="normal" required />
         <TextField label="كلمة المرور" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth margin="normal" required />
          <TextField label="الصلاحية" variant="outlined" value={role} onChange={(e) => setRole(e.target.value)} fullWidth margin="normal" required/>
        <Button type="submit" variant="contained" color="primary">حفظ</Button>
      </form>
    </div>
  );
};

export default AddUserForm;