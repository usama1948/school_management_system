import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

const AddTestForm = ({ onTestAdded }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/tests/add/', {
          name,
        type,
      });
      setName('');
      setType('');
       onTestAdded();
    } catch (err) {
      console.log(err)
       alert("There is a problem adding the test, please try again");
    }
  };

  return (
    <div>
      <h1>إضافة اختبار جديد</h1>
      <form onSubmit={handleSubmit}>
          <TextField label="اسم الاختبار" variant="outlined"  value={name} onChange={(e) => setName(e.target.value)} fullWidth margin="normal" required/>
        <TextField label="نوع الاختبار" variant="outlined"  value={type} onChange={(e) => setType(e.target.value)} fullWidth margin="normal" required/>
         <Button type="submit" variant="contained" color="primary">حفظ</Button>
      </form>
    </div>
  );
};

export default AddTestForm;