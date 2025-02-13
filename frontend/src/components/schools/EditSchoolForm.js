import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel } from '@mui/material';

const EditSchoolForm = ({ schoolId, onSchoolUpdated,onClose }) => {
    const [name_ar, setNameAr] = useState('');
    const [name_en, setNameEn] = useState('');
    const [school_code, setSchoolCode] = useState('');
    const [national_code, setNationalCode] = useState('');
    const [region, setRegion] = useState('');
    const [manager_name, setManagerName] = useState('');
    const [manager_email, setManagerEmail] = useState('');
    const [manager_phone, setManagerPhone] = useState('');
    const [highest_grade, setHighestGrade] = useState('');
    const [lowest_grade, setLowestGrade] = useState('');
    const [gender, setGender] = useState('');
    const [ownership, setOwnership] = useState('');
    const [camp, setCamp] = useState(false);

   useEffect(() => {
        const fetchSchool = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/schools/${schoolId}`);
                 setNameAr(response.data.name_ar);
                  setNameEn(response.data.name_en);
                   setSchoolCode(response.data.school_code);
                  setNationalCode(response.data.national_code);
                  setRegion(response.data.region);
                  setManagerName(response.data.manager_name);
                  setManagerEmail(response.data.manager_email);
                  setManagerPhone(response.data.manager_phone);
                  setHighestGrade(response.data.highest_grade);
                  setLowestGrade(response.data.lowest_grade);
                  setGender(response.data.gender);
                  setOwnership(response.data.ownership);
                  setCamp(response.data.camp);

            } catch (err) {
                console.log(err)
                 alert("There is a problem fetching the school data, please try again");
            }
        };
       fetchSchool();
    }, [schoolId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.put(`http://127.0.0.1:8000/api/schools/${schoolId}/`, {
            name_ar,
            name_en,
            school_code,
            national_code,
            region,
            manager_name,
            manager_email,
            manager_phone,
            highest_grade,
            lowest_grade,
            gender,
            ownership,
            camp,
      });
      onSchoolUpdated();
      onClose();

    } catch (err) {
        console.log(err)
      alert("There is a problem updating the school data, please try again");
    }
  };

  return (
    <div>
        <h1>تعديل بيانات مدرسة</h1>
        <form onSubmit={handleSubmit}>
            <TextField label="اسم المدرسة بالعربية" variant="outlined" value={name_ar} onChange={(e) => setNameAr(e.target.value)} fullWidth margin="normal" required/>
            <TextField label="اسم المدرسة بالإنجليزية" variant="outlined" value={name_en} onChange={(e) => setNameEn(e.target.value)} fullWidth margin="normal" required/>
             <TextField label="الرقم الخاص" variant="outlined" type="number" value={school_code} onChange={(e) => setSchoolCode(e.target.value)} fullWidth margin="normal" required/>
            <TextField label="الرقم الوطني" variant="outlined" value={national_code} onChange={(e) => setNationalCode(e.target.value)} fullWidth margin="normal" required/>
              <TextField label="المنطقة" variant="outlined" value={region} onChange={(e) => setRegion(e.target.value)} fullWidth margin="normal" required/>
           <TextField label="اسم مدير المدرسة" variant="outlined" value={manager_name} onChange={(e) => setManagerName(e.target.value)} fullWidth margin="normal" required/>
            <TextField label="ايميل مدير المدرسة" variant="outlined" type="email" value={manager_email} onChange={(e) => setManagerEmail(e.target.value)} fullWidth margin="normal" required/>
            <TextField label="رقم هاتف مدير المدرسة" variant="outlined" type="tel" value={manager_phone} onChange={(e) => setManagerPhone(e.target.value)} fullWidth margin="normal" required />
             <TextField label="أعلى صف" variant="outlined" value={highest_grade} onChange={(e) => setHighestGrade(e.target.value)} fullWidth margin="normal" required/>
              <TextField label="أدنى صف" variant="outlined" value={lowest_grade} onChange={(e) => setLowestGrade(e.target.value)} fullWidth margin="normal" required/>
             <FormControl fullWidth margin="normal" required>
                <InputLabel id="gender-label">جنس المدرسة</InputLabel>
                <Select labelId="gender-label" value={gender} onChange={(e) => setGender(e.target.value)} label="جنس المدرسة">
                    <MenuItem value="ذكور">ذكور</MenuItem>
                    <MenuItem value="إناث">إناث</MenuItem>
                    <MenuItem value="مختلطة">مختلطة</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" required>
                 <InputLabel id="ownership-label">مستأجرة أم ملك</InputLabel>
                <Select labelId="ownership-label" value={ownership} onChange={(e) => setOwnership(e.target.value)} label="مستأجرة أم ملك" >
                    <MenuItem value="مستأجرة">مستأجرة</MenuItem>
                     <MenuItem value="ملك">ملك</MenuItem>
                 </Select>
            </FormControl>

            <FormControlLabel
             control={<Checkbox checked={camp} onChange={(e) => setCamp(e.target.checked)}/>}
                label="مخيم أم لا"
            />
            <Button type="submit" variant="contained" color="primary">حفظ</Button>
            <Button onClick={onClose} variant="contained" color="error">إلغاء</Button>
        </form>
    </div>
  );
};

export default EditSchoolForm;