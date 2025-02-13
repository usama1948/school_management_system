import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Button } from '@mui/material';

const ExcelImport = ({ onDataImported,url }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImport = async () => {
    if (!file) {
      alert("الرجاء تحديد ملف Excel");
      return;
    }

     const reader = new FileReader();

      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        try {
           await axios.post(url,{data:jsonData})
        onDataImported();
        }catch(err){
          console.log(err);
        alert("حدث خطأ عند استيراد البيانات");
       }

      };
    reader.readAsArrayBuffer(file);

  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <Button variant="contained" color="primary" onClick={handleImport}>استيراد</Button>
    </div>
  );
};

export default ExcelImport;