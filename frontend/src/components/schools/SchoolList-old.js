import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import AddSchoolForm from './AddSchoolForm';
import EditSchoolForm from './EditSchoolForm';
import SchoolResults from './SchoolResults';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper,TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExcelImport from '../ExcelImport';
import ExcelExport from '../ExcelExport';

const SchoolList = () => {
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedSchool, setSelectedSchool] = useState(null);
    const [showResults, setShowResults] = useState(false);
     const [selectedSchoolIds, setSelectedSchoolIds] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('');

     const fetchSchools = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/schools/?search=${searchTerm}&sort=${sortBy}`);
            console.log("Data from API:", JSON.stringify(response.data, null, 2));
            setSchools(response.data);
            setError(null);
        } catch (err) {
            setError(err.message);
            setSchools([]);
        } finally {
            setLoading(false);
        }
    }, [searchTerm,sortBy]);

    useEffect(() => {
        fetchSchools();
    }, [fetchSchools]);

 const handleSchoolAdded = () => {
    fetchSchools();
    setShowAddForm(false);
  };

  const handleSchoolUpdated = () => {
    fetchSchools();
     setSelectedSchool(null);
  };
    const handleSchoolEdit = (schoolId) => {
        setSelectedSchool(schoolId);
    };

      const handleCloseForm = () => {
         setSelectedSchool(null);
      };
    const handleSchoolDelete = async (schoolId) => {
        if (window.confirm("هل أنت متأكد من أنك تريد حذف هذه المدرسة؟")) {
           try {
             await axios.delete(`http://127.0.0.1:8000/api/schools/${schoolId}/`);
             fetchSchools();
             alert('School deleted successfully');
            }
         catch (error) {
           console.error("Error deleting school:", error);
           alert('Error deleting school. Please try again.');
         }
       }
    };
   const handleShowResults = (schoolIds)=>{
      setSelectedSchoolIds(schoolIds);
         setShowResults(true);
    }
    const handleCloseResults = () => {
      setShowResults(false);
         setSelectedSchoolIds([]);
    };
      const handleSchoolSelect = (schoolId) => {
    if (selectedSchoolIds.includes(schoolId)) {
      setSelectedSchoolIds(selectedSchoolIds.filter(id => id !== schoolId));
    } else {
      setSelectedSchoolIds([...selectedSchoolIds, schoolId]);
    }
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>قائمة المدارس</h1>
             <ExcelImport url={'http://127.0.0.1:8000/api/schools/upload/'} onDataImported={fetchSchools}  />
              <ExcelExport url={'http://127.0.0.1:8000/api/schools/'}  fileName={'schools_data'} />
            <TextField label="بحث عن مدرسة" variant="outlined" value={searchTerm} onChange={handleSearchChange} fullWidth margin="normal" />
           <FormControl fullWidth margin="normal">
                <InputLabel id="sort-label">ترتيب حسب</InputLabel>
                <Select labelId="sort-label" value={sortBy} onChange={handleSortChange} label="ترتيب حسب">
                    <MenuItem value="name_ar">اسم المدرسة بالعربية</MenuItem>
                    <MenuItem value="name_en">اسم المدرسة بالإنجليزية</MenuItem>
                    <MenuItem value="school_code">الرقم الخاص</MenuItem>
                    <MenuItem value="region">المنطقة</MenuItem>
                </Select>
            </FormControl>
            <Button variant="contained" color="primary" onClick={() => setShowAddForm(true)}>إضافة مدرسة جديدة</Button>
             {showAddForm && <AddSchoolForm onSchoolAdded={handleSchoolAdded} />}
             {selectedSchool && <EditSchoolForm  schoolId={selectedSchool}  onSchoolUpdated={handleSchoolUpdated} onClose={handleCloseForm} />}
               <Button variant="contained" color="success" onClick={()=>handleShowResults(selectedSchoolIds)}>عرض النتائج للمدارس المحددة</Button>
             {showResults && <SchoolResults  schoolIds={selectedSchoolIds} onClose={handleCloseResults} />}
            <TableContainer component={Paper}>
                <Table  sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                     <TableCell align="center">تحديد</TableCell>
                        <TableCell align="center">اسم المدرسة بالعربية</TableCell>
                        <TableCell align="center">اسم المدرسة بالإنجليزية</TableCell>
                        <TableCell align="center">الرقم الخاص</TableCell>
                        <TableCell align="center">المنطقة</TableCell>
                         <TableCell align="center">إجراءات</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {schools.map(school => (
                        <TableRow key={school.id}>
                             <TableCell align="center">
                             <input
                                    type="checkbox"
                                   checked={selectedSchoolIds.includes(school.id)}
                                    onChange={() => handleSchoolSelect(school.id)}
                             />
                            </TableCell>
                            <TableCell align="center">{school.name_ar}</TableCell>
                            <TableCell align="center">{school.name_en}</TableCell>
                            <TableCell align="center">{school.school_code}</TableCell>
                            <TableCell align="center">{school.region}</TableCell>
                             <TableCell align="center">
                                 <IconButton aria-label="edit"  onClick={()=>handleSchoolEdit(school.id)}  ><EditIcon /></IconButton>
                                 <IconButton  aria-label="delete"  onClick={()=> handleSchoolDelete(school.id)}><DeleteIcon /></IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
             </TableContainer>
        </div>
    );
};

export default SchoolList;