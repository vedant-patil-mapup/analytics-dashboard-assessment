
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const SummaryCard = ({ title, value }) => (
  <Card>
    <CardContent>
      <Typography variant="h6" color="textSecondary">{title}</Typography>
      <Typography variant="h4">{value}</Typography>
    </CardContent>
  </Card>
);

export default SummaryCard;




