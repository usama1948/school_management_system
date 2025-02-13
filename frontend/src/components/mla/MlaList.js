import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const MlaList = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/mla_results/');
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
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h3> نتائج تقييم مخرجات التعليم </h3>
       <TableContainer component={Paper}>
                <Table  sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">اسم المدرسة</TableCell>
                        <TableCell align="center">السنة</TableCell>
                        <TableCell align="center">المادة</TableCell>
                        <TableCell align="center">الصف</TableCell>
                         <TableCell align="center">Not Achieved</TableCell>
                        <TableCell align="center">Partial Achieved</TableCell>
                        <TableCell align="center">Achieved</TableCell>
                         <TableCell align="center">Advanced</TableCell>
                         <TableCell align="center">Mean</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {results.map(result => (
                  <TableRow key={result.id}>
                        <TableCell align="center">{result.School_Name}</TableCell>
                        <TableCell align="center">{result.Year}</TableCell>
                         <TableCell align="center">{result.Subject}</TableCell>
                           <TableCell align="center">{result.grade}</TableCell>
                        <TableCell align="center">{result.Not_Achieved}</TableCell>
                         <TableCell align="center">{result.Partial_Achieved}</TableCell>
                          <TableCell align="center">{result.Achieved}</TableCell>
                            <TableCell align="center">{result.Advanced}</TableCell>
                             <TableCell align="center">{result.Mean}</TableCell>
                  </TableRow>
                 ))}
                </TableBody>
            </Table>
             </TableContainer>
    </div>
  );
};

export default MlaList;