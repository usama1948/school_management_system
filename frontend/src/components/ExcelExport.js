import React from 'react';
import * as XLSX from 'xlsx';
import { Button } from '@mui/material';
import axios from 'axios';

const ExcelExport = ({ url ,fileName, schoolIds}) => {


    const handleExport = async () => {
         try {
               const response = await axios.post(url,{school_ids:schoolIds});
              const data = response.data;
             const workbook = XLSX.utils.book_new();
             const sheet = XLSX.utils.json_to_sheet(data);
             XLSX.utils.book_append_sheet(workbook, sheet, "Sheet1");
             XLSX.writeFile(workbook, `${fileName}.xlsx`);
          } catch(err){
            console.log(err);
             alert("Error exporting data to Excel");
         }
    };
    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleExport}>تصدير</Button>
        </div>
    );
};

export default ExcelExport;