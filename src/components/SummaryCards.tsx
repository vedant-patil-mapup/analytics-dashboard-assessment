import React from 'react';
import type { SummaryStats } from '../types/vehicleTypes';
import { CARD_COLORS } from '../constants/chartConstants';

interface SummaryCardsProps {
  stats: SummaryStats;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ stats }) => {
  const cards = [
    { title: 'Total Vehicles', value: stats.totalVehicles.toLocaleString(), color: CARD_COLORS.totalVehicles },
    { title: 'Unique Makes', value: stats.uniqueMakes.toString(), color: CARD_COLORS.uniqueMakes },
    { title: 'Coverage Cities', value: stats.uniqueCities.toString(), color: CARD_COLORS.uniqueCities },
    { title: 'Avg Range (miles)', value: stats.avgRange.toString(), color: CARD_COLORS.avgRange }
  ];

  return (
    <div className="summary-cards">
      {cards.map((card, index) => (
        <div key={index} className="summary-card" style={{ borderLeftColor: card.color }}>
          <h3>{card.title}</h3>
          <p className="number">{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
