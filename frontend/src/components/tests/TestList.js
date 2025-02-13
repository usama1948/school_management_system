import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTestForm from './AddTestForm';
import EditTestForm from './EditTestForm';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TestList = () => {
    const [tests, setTests] = useState([]);
     const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
     const [showAddForm, setShowAddForm] = useState(false);
      const [selectedTest, setSelectedTest] = useState(null);

    const fetchTests = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/tests/');
                 setTests(response.data);
                  setError(null);
            } catch (err) {
                setError(err.message);
                 setTests([]);
            } finally{
                 setLoading(false);
            }
        };


    useEffect(() => {
        fetchTests();
    }, []);


    const handleTestAdded = () => {
         fetchTests();
         setShowAddForm(false);
      };
     const handleTestEdit = (testId) => {
        setSelectedTest(testId);
    };

     const handleCloseForm = () => {
        setSelectedTest(null);
     };

    const handleTestDelete = async (testId) => {
        if (window.confirm("هل أنت متأكد من أنك تريد حذف هذا الاختبار؟")) {
           try {
             await axios.delete(`http://127.0.0.1:8000/api/tests/${testId}/`);
             fetchTests();
             alert('Test deleted successfully');
            }
         catch (error) {
           console.error("Error deleting test:", error);
           alert('Error deleting test. Please try again.');
         }
       }
    };


      if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>قائمة الاختبارات</h1>
               <Button variant="contained" color="primary" onClick={() => setShowAddForm(true)}>إضافة اختبار جديد</Button>
                 {showAddForm && <AddTestForm onTestAdded={handleTestAdded} />}
                  {selectedTest && <EditTestForm testId={selectedTest} onTestUpdated={handleTestAdded} onClose={handleCloseForm} />}
           <TableContainer component={Paper}>
                <Table  sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">اسم الاختبار</TableCell>
                        <TableCell align="center">نوع الاختبار</TableCell>
                         <TableCell align="center">إجراءات</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tests.map(test => (
                        <TableRow key={test.id}>
                            <TableCell align="center">{test.name}</TableCell>
                            <TableCell align="center">{test.type}</TableCell>
                            <TableCell align="center">
                                 <IconButton aria-label="edit"  onClick={()=>handleTestEdit(test.id)}  ><EditIcon /></IconButton>
                                 <IconButton  aria-label="delete"  onClick={()=> handleTestDelete(test.id)}><DeleteIcon /></IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
             </TableContainer>
        </div>
    );
};

export default TestList;