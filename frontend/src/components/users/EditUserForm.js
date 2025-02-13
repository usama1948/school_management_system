import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

const EditUserForm = ({ userId, onUserUpdated, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/users/${userId}`);
                  setUsername(response.data.username);
                   setPassword(response.data.password);
                    setRole(response.data.role);
            } catch (err) {
                  console.log(err)
                  alert("There is a problem fetching the user data, please try again");
            }
        };
        fetchUser();
    }, [userId]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/users/${userId}/`, {
        username,
        password,
        role,
      });
       onUserUpdated();
       onClose();
    } catch (err) {
      console.log(err);
       alert("There is a problem updating the user data, please try again");
    }
  };

  return (
    <div>
      <h1>تعديل بيانات المستخدم</h1>
      <form onSubmit={handleSubmit}>
         <TextField label="اسم المستخدم" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth margin="normal" required />
        <TextField label="كلمة المرور" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth margin="normal" required />
          <TextField label="الصلاحية" variant="outlined" value={role} onChange={(e) => setRole(e.target.value)} fullWidth margin="normal" required />
        <Button type="submit" variant="contained" color="primary">حفظ</Button>
           <Button onClick={onClose} variant="contained" color="error">إلغاء</Button>
      </form>
    </div>
  );
};

export default EditUserForm;