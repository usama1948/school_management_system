import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const EditLiteracyResultForm = ({ literacyResultId, onLiteracyResultUpdated, onClose }) => {
    const [school, setSchool] = useState('');
    const [year, setYear] = useState('');
    const [grade, setGrade] = useState('');
    const [reading_performance_avg, setReadingPerformanceAvg] = useState('');
    const [reading_comprehension_avg, setReadingComprehensionAvg] = useState('');
    const [score, setScore] = useState('');
      const [schools, setSchools] = useState([]);

   useEffect(() => {
        const fetchLiteracyResult = async () => {
            try {
                 const response = await axios.get(`http://127.0.0.1:8000/api/literacy_results/${literacyResultId}`);
                 setSchool(response.data.school);
                   setYear(response.data.year);
                 setGrade(response.data.grade);
                  setReadingPerformanceAvg(response.data.reading_performance_avg);
                 setReadingComprehensionAvg(response.data.reading_comprehension_avg);
                   setScore(response.data.score);
            } catch (err) {
                 console.log(err)
                 alert("There is a problem fetching the literacy result data, please try again");
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
       fetchLiteracyResult();
         fetchSchools();
    }, [literacyResultId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/literacy_results/${literacyResultId}/`, {
            school: school,
        year,
        grade,
        reading_performance_avg,
         reading_comprehension_avg,
        score,
      });
      onLiteracyResultUpdated();
      onClose();
    } catch (err) {
        console.log(err)
      alert("There is a problem updating the literacy result data, please try again");
    }
  };

  return (
    <div>
      <h1>تعديل نتيجة قرائية</h1>
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
         <TextField label="السنة" variant="outlined" type="number" value={year} onChange={(e) => setYear(e.target.value)} fullWidth margin="normal" required />
        <TextField label="الصف" variant="outlined" value={grade} onChange={(e) => setGrade(e.target.value)} fullWidth margin="normal" required/>
        <TextField label="متوسط القراءة الأدائية" variant="outlined" type="number" step="0.01" value={reading_performance_avg} onChange={(e) => setReadingPerformanceAvg(e.target.value)} fullWidth margin="normal" required />
           <TextField label="متوسط القراءة الاستيعابية" variant="outlined" type="number" step="0.01" value={reading_comprehension_avg} onChange={(e) => setReadingComprehensionAvg(e.target.value)} fullWidth margin="normal" required />
         <TextField label="العلامة" variant="outlined" type="number" step="0.01" value={score} onChange={(e) => setScore(e.target.value)} fullWidth margin="normal" required />
        <Button type="submit" variant="contained" color="primary">حفظ</Button>
        <Button onClick={onClose} variant="contained" color="error">إلغاء</Button>
      </form>
    </div>
  );
};

export default EditLiteracyResultForm;