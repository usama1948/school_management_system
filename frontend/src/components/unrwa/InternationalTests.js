import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import TimssResults from './TimssResults';
import PisaResults from './PisaResults';
import PirlsResults from './PirlsResults';
import MlaList from '../mla/MlaList'; // Import MlaList

function InternationalTests() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <h2>الاختبارات الدولية</h2>
       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="TIMSS" />
          <Tab label="PISA" />
           <Tab label="PIRLS" />
           <Tab label="MLA" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TimssResults />
      </TabPanel>
       <TabPanel value={value} index={1}>
        <PisaResults/>
      </TabPanel>
        <TabPanel value={value} index={2}>
        <PirlsResults/>
      </TabPanel>
      <TabPanel value={value} index={3}>
         <MlaList/>
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


export default InternationalTests;