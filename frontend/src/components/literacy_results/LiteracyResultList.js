import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddLiteracyResultForm from './AddLiteracyResultForm';
import EditLiteracyResultForm from './EditLiteracyResultForm';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const LiteracyResultList = () => {
     const [literacyResults, setLiteracyResults] = useState([]);
      const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
      const [showAddForm, setShowAddForm] = useState(false);
       const [selectedLiteracyResult, setSelectedLiteracyResult] = useState(null);

    const fetchLiteracyResults = async () => {
         setLoading(true);
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/literacy_results/');
                 setLiteracyResults(response.data);
                   setError(null);
            } catch (err) {
                setError(err.message);
                   setLiteracyResults([]);
            } finally{
                setLoading(false);
            }
        };

    useEffect(() => {
        fetchLiteracyResults();
    }, []);


     const handleLiteracyResultAdded = () => {
        fetchLiteracyResults();
         setShowAddForm(false);
      };
      const handleLiteracyResultEdit = (literacyResultId) => {
         setSelectedLiteracyResult(literacyResultId);
      };

     const handleCloseForm = () => {
        setSelectedLiteracyResult(null);
      };
    const handleLiteracyResultDelete = async (literacyResultId) => {
        if (window.confirm("هل أنت متأكد من أنك تريد حذف هذه النتيجة؟")) {
           try {
             await axios.delete(`http://127.0.0.1:8000/api/literacy_results/${literacyResultId}/`);
             fetchLiteracyResults();
             alert('Literacy Result deleted successfully');
            }
         catch (error) {
           console.error("Error deleting literacy result:", error);
           alert('Error deleting literacy result. Please try again.');
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
            <h1>قائمة نتائج القرائية</h1>
              <Button variant="contained" color="primary" onClick={() => setShowAddForm(true)}>إضافة نتيجة قرائية جديدة</Button>
                 {showAddForm && <AddLiteracyResultForm onLiteracyResultAdded={handleLiteracyResultAdded} />}
              {selectedLiteracyResult && <EditLiteracyResultForm literacyResultId={selectedLiteracyResult} onLiteracyResultUpdated={handleLiteracyResultAdded} onClose={handleCloseForm}/>}
           <TableContainer component={Paper}>
                <Table  sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">المدرسة</TableCell>
                        <TableCell align="center">السنة</TableCell>
                        <TableCell align="center">الصف</TableCell>
                         <TableCell align="center">متوسط القراءة الأدائية</TableCell>
                         <TableCell align="center">متوسط القراءة الاستيعابية</TableCell>
                        <TableCell align="center">العلامة</TableCell>
                          <TableCell align="center">إجراءات</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {literacyResults.map(literacyResult => (
                        <TableRow key={literacyResult.id}>
                             <TableCell align="center">{literacyResult.school}</TableCell>
                            <TableCell align="center">{literacyResult.year}</TableCell>
                            <TableCell align="center">{literacyResult.grade}</TableCell>
                            <TableCell align="center">{Math.round(literacyResult.reading_performance_avg)}</TableCell>
                            <TableCell align="center">{Math.round(literacyResult.reading_comprehension_avg)}</TableCell>
                             <TableCell align="center">{Math.round(literacyResult.score)}</TableCell>
                              <TableCell align="center">
                                 <IconButton aria-label="edit" onClick={()=> handleLiteracyResultEdit(literacyResult.id)} ><EditIcon /></IconButton>
                                 <IconButton  aria-label="delete"  onClick={()=>handleLiteracyResultDelete(literacyResult.id)}><DeleteIcon /></IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
    );
};

export default LiteracyResultList;