import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import ExcelExport from '../ExcelExport';

const SchoolResults = ({ schoolIds, onClose }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/schools/results/', {
          school_ids: schoolIds,
        });
         setResults(response.data);
         setError(null);
      } catch (err) {
        setError(err.message);
        setResults([]);
      } finally {
         setLoading(false);
      }
    };
    fetchResults();
  }, [schoolIds]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>نتائج الاختبارات للمدارس المحددة</h1>
        <ExcelExport url={'http://127.0.0.1:8000/api/schools/results/'}  fileName={'school_results_data'} schoolIds={schoolIds} />
     <TableContainer component={Paper}>
                <Table  sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">اسم المدرسة</TableCell>
                        <TableCell align="center">نوع الاختبار</TableCell>
                        <TableCell align="center">السنة</TableCell>
                        <TableCell align="center">المادة</TableCell>
                        <TableCell align="center">الصف</TableCell>
                        <TableCell align="center">العلامة</TableCell>
                        <TableCell align="center">الفصل</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {results.map((result) => (
                  <TableRow key={result.id}>
                        <TableCell align="center">{result.school}</TableCell>
                        <TableCell align="center">{result.test_type}</TableCell>
                        <TableCell align="center">{result.year}</TableCell>
                        <TableCell align="center">{result.subject}</TableCell>
                        <TableCell align="center">{result.grade}</TableCell>
                        <TableCell align="center">{Math.round(result.score)}</TableCell>
                        <TableCell align="center">{result.semester}</TableCell>
                  </TableRow>
                 ))}
                </TableBody>
            </Table>
             </TableContainer>
        <Button variant="contained" color="error" onClick={onClose}>إغلاق</Button>
    </div>
  );
};

export default SchoolResults;