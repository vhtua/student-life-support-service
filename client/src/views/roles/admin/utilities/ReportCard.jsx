import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Box } from '@mui/material';
import axiosInstance from 'api/axiosInstance';
import * as d3 from 'd3';
import { format } from 'date-fns';

const ReportCard = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [monthlyData, setMonthlyData] = useState([]);
  const [totalData, setTotalData] = useState([]);

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

  useEffect(() => {
    if (monthlyData.length > 0) {
      drawBarChart();
    }
  }, [monthlyData]);

  useEffect(() => {
    if (totalData.length > 0) {
      drawPieChart();
    }
  }, [totalData]);

  const drawBarChart = () => {
    const svg = d3.select('#barChart');
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const x0 = d3.scaleBand()
      .domain(monthlyData.map(d => d.month))
      .rangeRound([0, width])
      .paddingInner(0.1);

    const x1 = d3.scaleBand()
      .domain(['pending', 'in progress', 'done', 'cancelled'])
      .rangeRound([0, x0.bandwidth()])
      .padding(0.05);

    const y = d3.scaleLinear()
      .domain([0, d3.max(monthlyData, d => d3.max(d.data, d => +d.count))])
      .nice()
      .rangeRound([height, 0]);

    const color = d3.scaleOrdinal()
      .domain(['pending', 'in progress', 'done', 'cancelled'])
      .range(['#ff7f0e', '#2ca02c', '#1f77b4', '#d62728']);

    const xAxis = d3.axisBottom(x0);
    const yAxis = d3.axisLeft(y);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    g.append('g')
      .selectAll('g')
      .data(monthlyData)
      .enter().append('g')
      .attr('transform', d => `translate(${x0(d.month)},0)`)
      .selectAll('rect')
      .data(d => d.data)
      .enter().append('rect')
      .attr('x', d => x1(d.ticket_status))
      .attr('y', d => y(d.count))
      .attr('width', x1.bandwidth())
      .attr('height', d => height - y(d.count))
      .attr('fill', d => color(d.ticket_status));

    g.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis);

    g.append('g')
      .attr('class', 'axis')
      .call(yAxis);
  };

  const drawPieChart = () => {
    const svg = d3.select('#pieChart');
    svg.selectAll('*').remove();

    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    const color = d3.scaleOrdinal()
      .domain(['pending', 'in progress', 'done', 'cancelled'])
      .range(['#ff7f0e', '#2ca02c', '#1f77b4', '#d62728']);

    const pie = d3.pie()
      .value(d => d.count)
      .sort(null);

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    const g = svg.append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const path = g.selectAll('path')
      .data(pie(totalData))
      .enter().append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.ticket_status));

    g.selectAll('text')
      .data(pie(totalData))
      .enter().append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('dy', '0.35em')
      .text(d => `${d.data.ticket_status}: ${d.data.count}`);
  };

  return (
    <Box p={3} boxShadow={3} borderRadius={2}>
      <Typography variant="h4" gutterBottom>
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
          <Button variant="contained" color="primary" onClick={fetchData}>
            Generate Report
          </Button>
        </Grid>
      </Grid>
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Monthly Ticket Status
        </Typography>
        <svg id="barChart" width="800" height="400"></svg>
      </Box>
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Ticket Status Distribution
        </Typography>
        <svg id="pieChart" width="400" height="400"></svg>
      </Box>
    </Box>
  );
};

export default ReportCard;