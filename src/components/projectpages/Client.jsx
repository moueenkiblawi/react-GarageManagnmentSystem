import React, { useEffect, useState } from 'react';
import { Box, Heading, Select, Table, TableBody, TableCell, TableHeader, TableRow } from 'grommet';
import axios from 'axios';
import Sidebar from '../Layout/partials/Sidebar';

const ServiceCostPage = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [monthlyTotals, setMonthlyTotals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   const fetchData = async () => {
     try {
       setLoading(true);

       setTimeout(async () => {
         const response1 = await axios.get(
           `http://localhost:8081/totalSalary/${year}`
         );
         const data1 = response1.data;
         setMonthlyTotals(data1);
         setLoading(false);
       }, 2000);
     } catch (error) {
       console.error(error);
       setLoading(false);
     }
   };

   fetchData();
 }, [year]);

   



  const getMonthName = (monthNumber) => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return monthNames[monthNumber - 1];
  };

  return (
    <div  className="home-sidebar">
      <Sidebar />
      <div  className="homeContainer">
      <div  className="container">
        <Box width="large" pad="medium">
          <Heading level={1} size="large" margin="none">
          Total Service Costs 
          </Heading>
          <Box margin={{ bottom: 'medium' }}>
            <label htmlFor="year">Select Year:</label>
            <Select
              id="year"
              options={[2021, 2022, 2023,2024,2025,2026,2027,2028]}
              value={year}
              onChange={({ option }) => setYear(option)}
            />
          </Box>
          {loading ? (
            <h3>Loading...</h3>
          ) : (
            <Table>
              <TableHeader>
                <TableRow style={{backgroundColor:" rgb(9, 3, 99)",color:"white"}}>
                  <TableCell scope="col">Month</TableCell>
                  <TableCell scope="col">Total Salary</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monthlyTotals.map((total, index) => (
                  <TableRow key={index}>
                    <TableCell>{getMonthName(total.month)}</TableCell>
                    <TableCell>{total.totalSales}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Box>
      </div>
    </div>
    </div>
  );
};

export default ServiceCostPage;
