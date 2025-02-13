import React, { useState, useEffect , useCallback } from 'react';
import axios from 'axios';
import AddTestResultForm from './AddTestResultForm';
import EditTestResultForm from './EditTestResultForm';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Pagination, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
const TestResultList = () => {
    const [testResults, setTestResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedTestResult, setSelectedTestResult] = useState(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
      const [totalCount, setTotalCount] = useState(0);


    const fetchTestResults = useCallback(async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/test_results/?page=${page}&page_size=${pageSize}`);
                 setTestResults(response.data.results);
                  setTotalCount(response.data.count)
                  setError(null);
            } catch (err) {
                setError(err.message);
                   setTestResults([]);
            } finally{
                 setLoading(false);
            }
        }, [page,pageSize]);
      useEffect(() => {
        fetchTestResults();
      }, [fetchTestResults]);


      const handleTestResultAdded = () => {
         fetchTestResults();
         setShowAddForm(false);
      };
        const handleTestResultEdit = (testResultId) => {
        setSelectedTestResult(testResultId);
    };

     const handleCloseForm = () => {
       setSelectedTestResult(null);
    };
    const handleTestResultDelete = async (testResultId) => {
        if (window.confirm("هل أنت متأكد من أنك تريد حذف هذه النتيجة؟")) {
           try {
             await axios.delete(`http://127.0.0.1:8000/api/test_results/${testResultId}/`);
             fetchTestResults();
             alert('Test Result deleted successfully');
            }
         catch (error) {
           console.error("Error deleting test result:", error);
           alert('Error deleting test result. Please try again.');
         }
       }
    };

       if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
     const handlePageChange = (event, value) => {
         setPage(value);
    };
    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
    };

    return (
        <div>
            <h1>قائمة نتائج الاختبارات</h1>
              <Button variant="contained" color="primary" onClick={() => setShowAddForm(true)}>إضافة نتيجة اختبار جديدة</Button>
                 {showAddForm && <AddTestResultForm onTestResultAdded={handleTestResultAdded} />}
                  {selectedTestResult && <EditTestResultForm testResultId={selectedTestResult} onTestResultUpdated={handleTestResultAdded} onClose={handleCloseForm} />}
           <TableContainer component={Paper}>
                <Table  sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">المدرسة</TableCell>
                        <TableCell align="center">الاختبار</TableCell>
                        <TableCell align="center">السنة</TableCell>
                        <TableCell align="center">المادة</TableCell>
                        <TableCell align="center">الصف</TableCell>
                        <TableCell align="center">العلامة</TableCell>
                        <TableCell align="center">الفصل</TableCell>
                         <TableCell align="center">إجراءات</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {testResults.map(testResult => (
                        <TableRow key={testResult.id}>
                           <TableCell align="center">{testResult.school}</TableCell>
                            <TableCell align="center">{testResult.test}</TableCell>
                            <TableCell align="center">{testResult.year}</TableCell>
                            <TableCell align="center">{testResult.subject}</TableCell>
                            <TableCell align="center">{testResult.grade}</TableCell>
                            <TableCell align="center">{Math.round(testResult.score)}</TableCell>
                            <TableCell align="center">{testResult.semester}</TableCell>
                             <TableCell align="center">
                                 <IconButton aria-label="edit"  onClick={()=> handleTestResultEdit(testResult.id)}  ><EditIcon /></IconButton>
                                 <IconButton  aria-label="delete"  onClick={()=>handleTestResultDelete(testResult.id)}><DeleteIcon /></IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
             </TableContainer>
              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <Pagination
                 count={Math.ceil(totalCount / pageSize)}
                 page={page}
                  onChange={handlePageChange}
                 color="primary"
                 />
               </Box>
              <FormControl fullWidth margin="normal">
             <InputLabel id="page-size-label">عدد العناصر في الصفحة</InputLabel>
                  <Select labelId="page-size-label" value={pageSize} onChange={handlePageSizeChange} label="عدد العناصر في الصفحة">
                    <MenuItem value={5}>5</MenuItem>
                     <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                     <MenuItem value={50}>50</MenuItem>
               </Select>
         </FormControl>
        </div>
    );
};

export default TestResultList;