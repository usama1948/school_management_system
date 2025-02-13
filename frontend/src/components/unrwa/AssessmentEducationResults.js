import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const AssessmentEducationResults = () => {
  const [results, setResults] = useState([]);
   const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


  useEffect(() => {
    const fetchResults = async () => {
       setLoading(true);
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/assessment_test_results/');
        setResults(response.data);
           setError(null);
      } catch (err) {
          setError(err.message);
         setResults([]);
      } finally{
           setLoading(false);
      }
    };
    fetchResults();
  }, []);
      if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

  return (
    <div>
      <h3>نتائج اختبار تقييم التعليم</h3>
       <TableContainer component={Paper}>
                <Table  sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">السنة</TableCell>
                        <TableCell align="center">المبحث</TableCell>
                        <TableCell align="center">متوسط وكالة الغوث</TableCell>
                         <TableCell align="center">متوسط الأردن</TableCell>
                        <TableCell align="center">متوسط المدارس الخاصة</TableCell>
                         <TableCell align="center">متوسط الثقافة العسكرية</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {results.map(result => (
                  <TableRow key={result.id}>
                        <TableCell align="center">{result.year}</TableCell>
                        <TableCell align="center">{result.subject}</TableCell>
                         <TableCell align="center">{result.unrwa_avg}</TableCell>
                         <TableCell align="center">{result.jordan_avg}</TableCell>
                         <TableCell align="center">{result.private_schools_avg}</TableCell>
                         <TableCell align="center">{result.military_culture_avg}</TableCell>
                  </TableRow>
                 ))}
                </TableBody>
            </Table>
             </TableContainer>
    </div>
  );
};

export default AssessmentEducationResults;