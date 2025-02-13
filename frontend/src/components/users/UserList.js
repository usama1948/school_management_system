import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddUserForm from './AddUserForm';
import EditUserForm from './EditUserForm';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const UserList = () => {
    const [users, setUsers] = useState([]);
      const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
     const [showAddForm, setShowAddForm] = useState(false);
     const [selectedUser, setSelectedUser] = useState(null);

    const fetchUsers = async () => {
         setLoading(true);
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/users/');
                 setUsers(response.data);
                setError(null);
            } catch (err) {
                setError(err.message);
                 setUsers([]);
            }finally{
               setLoading(false);
            }
        };
    useEffect(() => {
        fetchUsers();
    }, []);

     const handleUserAdded = () => {
        fetchUsers();
       setShowAddForm(false);
      };
      const handleUserEdit = (userId) => {
        setSelectedUser(userId);
      };

     const handleCloseForm = () => {
          setSelectedUser(null);
      };
    const handleUserDelete = async (userId) => {
        if (window.confirm("هل أنت متأكد من أنك تريد حذف هذا المستخدم؟")) {
           try {
             await axios.delete(`http://127.0.0.1:8000/api/users/${userId}/`);
             fetchUsers();
             alert('User deleted successfully');
            }
         catch (error) {
           console.error("Error deleting user:", error);
           alert('Error deleting user. Please try again.');
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
            <h1>قائمة المستخدمين</h1>
              <Button variant="contained" color="primary" onClick={() => setShowAddForm(true)}>إضافة مستخدم جديد</Button>
                 {showAddForm && <AddUserForm onUserAdded={handleUserAdded} />}
              {selectedUser && <EditUserForm userId={selectedUser} onUserUpdated={handleUserAdded} onClose={handleCloseForm}/>}
            <TableContainer component={Paper}>
                <Table  sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">اسم المستخدم</TableCell>
                        <TableCell align="center">الصلاحية</TableCell>
                         <TableCell align="center">إجراءات</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <TableCell align="center">{user.username}</TableCell>
                             <TableCell align="center">{user.role}</TableCell>
                             <TableCell align="center">
                                 <IconButton aria-label="edit"  onClick={()=> handleUserEdit(user.id)}  ><EditIcon /></IconButton>
                                 <IconButton  aria-label="delete"  onClick={()=> handleUserDelete(user.id)}><DeleteIcon /></IconButton>
                            </TableCell>
                        </tr>
                    ))}
                </TableBody>
            </Table>
             </TableContainer>
        </div>
    );
};

export default UserList;