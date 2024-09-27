import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button, Grid, Typography, Box } from '@mui/material';
import axiosInstance from 'api/axiosInstance';
import { Bar, Pie } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import { format } from 'date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { IconFileTypePdf, IconPhotoDown, IconReportAnalytics } from '@tabler/icons-react';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);



const ReportCard2 = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [monthlyData, setMonthlyData] = useState([]);
  const [totalData, setTotalData] = useState([]);
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);

  const fetchData = async () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const months = [];

    while (start <= end) {
      const monthStart = new Date(start.getFullYear(), start.getMonth(), 1);
      const monthEnd = new Date(start.getFullYear(), start.getMonth() + 1, 0);
      months.push({
        start: format(monthStart, 'yyyy-MM-dd'),
        end: format(monthEnd, 'yyyy-MM-dd'),
      });
      start.setMonth(start.getMonth() + 1);
    }

    const monthlyPromises = months.map(({ start, end }) =>
      axiosInstance.get(`/api/v1/reports/tickets?start_date=${start}&end_date=${end}`)
    );

    try {
      const monthlyResponses = await Promise.all(monthlyPromises);
      const monthlyData = monthlyResponses.map((response, index) => ({
        month: months[index].start.slice(0, 7),
        data: response.data,
      }));
      setMonthlyData(monthlyData);

      const totalResponse = await axiosInstance.get(`/api/v1/reports/tickets?start_date=${startDate}&end_date=${endDate}`);
      setTotalData(totalResponse.data);
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
  };

  const getBarChartData = () => {
    const labels = monthlyData.map(d => d.month);
    const statuses = ['pending', 'in progress', 'done', 'cancelled'];
    const datasets = statuses.map((status, index) => ({
      label: status,
      data: monthlyData.map(d => {
        const item = d.data.find(item => item.ticket_status === status);
        return item ? +item.count : 0;
      }),
      backgroundColor: ['#ff7f0e', '#2ca02c', '#1f77b4', '#d62728'][index],
    }));

    return {
      labels,
      datasets,
    };
  };

  const getPieChartData = () => {
    const labels = ['pending', 'in progress', 'done', 'cancelled'];
    const data = labels.map(label => {
      const item = totalData.find(item => item.ticket_status === label);
      return item ? +item.count : 0;
    });

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: ['#ff7f0e', '#2ca02c', '#1f77b4', '#d62728'],
        },
      ],
    };
  };

  const exportToPNG = () => {
    const barChart = barChartRef.current;
    const pieChart = pieChartRef.current;

    if (barChart && pieChart) {
      const barChartImage = barChart.toBase64Image('image/png', 1.0);
      const pieChartImage = pieChart.toBase64Image('image/png', 1.0);

      downloadImage(barChartImage, 'bar_chart.png');
      downloadImage(pieChartImage, 'pie_chart.png');
    }
  };

  const exportToPDF = () => {
    const barChart = barChartRef.current;
    const pieChart = pieChartRef.current;

    if (barChart && pieChart) {
      const barChartImage = barChart.toBase64Image('image/png', 1.0);
      const pieChartImage = pieChart.toBase64Image('image/png', 1.0);

      const doc = new jsPDF();
      const title = `Ticket Report from ${startDate} to ${endDate}`;
      // Set font size and style
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(title, 20, 10);

      doc.text('Monthly Ticket Status', 30, 30);
      doc.addImage(barChartImage, 'PNG', 15, 40, 120, 60);
      doc.text('Ticket Status Distribution', 30, 115);
      doc.addImage(pieChartImage, 'PNG', 15, 125, 80, 80);
      // doc.autoTable({
      //   head: [['Ticket Status', 'Count']],
      //   body: totalData.map((item) => [item.ticket_status, item.count]),
      // });

      doc.save('report.pdf');
    }
  };

  const downloadImage = (dataUrl, filename) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    link.click();
  };

  return (
    <Box p={3} boxShadow={3} borderRadius={2}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Ticket Reports
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          {/* <Button variant="contained" color="secondary" onClick={fetchData}>
            Generate Report
          </Button> */}

          <Button variant="contained" color="secondary" onClick={fetchData} >
            <IconReportAnalytics />
            <Typography variant="body1" fontWeight="bold" sx={{ ml: 1 }}>
            Generate Report
          </Typography>
        </Button>

        </Grid>
      </Grid>

      <Grid container spacing={2} mt={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Monthly Ticket Status
          </Typography>
          <Box style={{ width: '90%', height: '300px' }}>
            <Bar ref={barChartRef} data={getBarChartData()} options={{ responsive: true, plugins: { tooltip: { enabled: true } } }} />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Ticket Status Distribution
          </Typography>
          <Box style={{ width: '70%', height: '300px' }}>
            <Pie ref={pieChartRef} data={getPieChartData()} options={{ responsive: true, plugins: { tooltip: { enabled: true } } }} />
          </Box>
        </Grid>
      </Grid>

      <Box mt={4}>
        

        {/* <Button variant="contained" color="secondary" onClick={exportToPNG}>
          Export to PNG
        </Button> */}
        
        <Button variant="contained" color="warning" onClick={exportToPNG} >
            <IconPhotoDown />
            <Typography variant="body1" fontWeight="bold" sx={{ ml: 1 }}>
            Export to PNG
          </Typography>
        </Button>

        <Button variant="contained" color="warning" onClick={exportToPDF} sx={{ ml: 2 }} >
            <IconFileTypePdf />
            <Typography variant="body1" fontWeight="bold" sx={{ ml: 1 }}>
            Export to PDF
          </Typography>
        </Button>

        {/* <Button variant="contained" color="secondary" onClick={exportToPDF} sx={{ ml: 2 }}>
          Export to PDF
        </Button> */}
      </Box>
    </Box>
  );
};

export default ReportCard2;