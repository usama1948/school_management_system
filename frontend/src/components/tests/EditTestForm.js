import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

const EditTestForm = ({ testId, onTestUpdated,onClose }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');


    useEffect(() => {
        const fetchTest = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/tests/${testId}`);
                 setName(response.data.name);
                 setType(response.data.type);

            } catch (err) {
                console.log(err)
                 alert("There is a problem fetching the test data, please try again");
            }
        };
       fetchTest();
    }, [testId]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/tests/${testId}/`, {
          name,
        type,
      });
      onTestUpdated();
       onClose();
    } catch (err) {
        console.log(err)
         alert("There is a problem updating the test data, please try again");
    }
  };

  return (
    <div>
      <h1>تعديل بيانات الاختبار</h1>
       <form onSubmit={handleSubmit}>
          <TextField label="اسم الاختبار" variant="outlined"  value={name} onChange={(e) => setName(e.target.value)} fullWidth margin="normal" required/>
        <TextField label="نوع الاختبار" variant="outlined"  value={type} onChange={(e) => setType(e.target.value)} fullWidth margin="normal" required/>
         <Button type="submit" variant="contained" color="primary">حفظ</Button>
          <Button onClick={onClose} variant="contained" color="error">إلغاء</Button>
      </form>
    </div>
  );
};

export default EditTestForm;