import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const EditTestResultForm = ({ testResultId, onTestResultUpdated,onClose }) => {
   const [school, setSchool] = useState('');
   const [test, setTest] = useState('');
  const [year, setYear] = useState('');
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [score, setScore] = useState('');
  const [semester, setSemester] = useState('');
   const [schools, setSchools] = useState([]);
  const [tests, setTests] = useState([]);


  useEffect(() => {
      const fetchTestResult = async () => {
           try {
                const response = await axios.get(`http://127.0.0.1:8000/api/test_results/${testResultId}`);
                 setSchool(response.data.school);
                 setTest(response.data.test);
                   setYear(response.data.year);
                 setSubject(response.data.subject);
                   setGrade(response.data.grade);
                 setScore(response.data.score);
                  setSemester(response.data.semester);

            } catch (err) {
                 console.log(err)
                alert("There is a problem fetching the test result data, please try again");
            }
         };
         const fetchSchools = async () => {
             try {
                  const response = await axios.get('http://127.0.0.1:8000/api/schools/');
                   setSchools(response.data);
             } catch (err) {
                 console.log(err)
                  alert("There is a problem fetching the schools, please try again");
             }
       };
      const fetchTests = async () => {
        try {
              const response = await axios.get('http://127.0.0.1:8000/api/tests/');
               setTests(response.data);
        } catch (err) {
            console.log(err)
             alert("There is a problem fetching the tests, please try again");
        }
      };
        fetchTestResult();
        fetchSchools();
        fetchTests();
     }, [testResultId]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.put(`http://127.0.0.1:8000/api/test_results/${testResultId}/`, {
           school: school,
           test: test,
          year,
          subject,
          grade,
          score,
           semester
      });
      onTestResultUpdated();
        onClose();
    } catch (err) {
        console.log(err)
      alert("There is a problem updating the test result data, please try again");
    }
  };

  return (
    <div>
      <h1>تعديل نتيجة اختبار</h1>
      <form onSubmit={handleSubmit}>
         <FormControl fullWidth margin="normal" required>
          <InputLabel id="school-label">المدرسة</InputLabel>
          <Select labelId="school-label" value={school} onChange={(e) => setSchool(e.target.value)} label="المدرسة">
                    <option value="" disabled>اختر المدرسة</option>
                     {schools.map(school => (
                        <MenuItem key={school.id} value={school.name_ar}>{school.name_ar}</MenuItem>
                    ))}
                </Select>
         </FormControl>
           <FormControl fullWidth margin="normal" required>
          <InputLabel id="test-label">الاختبار</InputLabel>
             <Select labelId="test-label" value={test} onChange={(e) => setTest(e.target.value)} label="الاختبار">
                    <option value="" disabled>اختر الاختبار</option>
                     {tests.map(test => (
                        <MenuItem key={test.id} value={test.name}>{test.name}</MenuItem>
                    ))}
                </Select>
        </FormControl>
          <TextField label="السنة" variant="outlined" type="number" value={year} onChange={(e) => setYear(e.target.value)} fullWidth margin="normal" required />
        <TextField label="المادة" variant="outlined" value={subject} onChange={(e) => setSubject(e.target.value)} fullWidth margin="normal" required />
        <TextField label="الصف" variant="outlined" value={grade} onChange={(e) => setGrade(e.target.value)} fullWidth margin="normal" required />
        <TextField label="العلامة" variant="outlined" type="number" step="0.01" value={score} onChange={(e) => setScore(e.target.value)} fullWidth margin="normal" required />
        <TextField label="الفصل" variant="outlined" value={semester} onChange={(e) => setSemester(e.target.value)} fullWidth margin="normal"  />
        <Button type="submit" variant="contained" color="primary">حفظ</Button>
         <Button onClick={onClose} variant="contained" color="error">إلغاء</Button>
      </form>
    </div>
  );
};

export default EditTestResultForm;