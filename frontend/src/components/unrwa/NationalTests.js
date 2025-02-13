import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import NationalQualityResults from './NationalQualityResults';
import AssessmentEducationResults from './AssessmentEducationResults';

function NationalTests() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <h2>الاختبارات الوطنية</h2>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="اختبار ضبط النوعية" />
            <Tab label="اختبار تقييم التعليم" />
        </Tabs>
      </Box>
        <TabPanel value={value} index={0}>
             <NationalQualityResults />
        </TabPanel>
        <TabPanel value={value} index={1}>
            <AssessmentEducationResults/>
        </TabPanel>
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
       <Box sx={{ p: 3 }}>
          {children}
       </Box>
      )}
    </div>
  );
}

export default NationalTests;