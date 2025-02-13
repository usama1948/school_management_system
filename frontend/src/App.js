import React, { useState } from 'react';
import SchoolList from './components/schools/SchoolList';
import TestList from './components/tests/TestList';
import TestResultList from './components/test_results/TestResultList';
import UserList from './components/users/UserList';
import LiteracyResultList from './components/literacy_results/LiteracyResultList';
import InternationalTests from './components/unrwa/InternationalTests';
import NationalTests from './components/unrwa/NationalTests';
import { AppBar, Tabs, Tab, Toolbar, Typography, Box } from '@mui/material';

function App() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="App">
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                    Assessment Unit
                </Typography>
            </Toolbar>
        </AppBar>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="المدارس" />
          <Tab label="الاختبارات" />
          <Tab label="نتائج الاختبارات" />
          <Tab label="المستخدمين" />
          <Tab label="نتائج القرائية" />
           <Tab label="وكالة الغوث الدولية" />
        </Tabs>
      </Box>
     <TabPanel value={value} index={0}>
        <SchoolList />
      </TabPanel>
       <TabPanel value={value} index={1}>
        <TestList/>
       </TabPanel>
        <TabPanel value={value} index={2}>
        <TestResultList/>
      </TabPanel>
      <TabPanel value={value} index={3}>
         <UserList/>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <LiteracyResultList/>
      </TabPanel>
        <TabPanel value={value} index={5}>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <InternationalTests/>
          <NationalTests/>
        </Box>
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
export default App;