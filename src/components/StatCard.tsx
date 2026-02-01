import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = React.memo(({ title, value, icon: Icon, color }) => {
  return (
    <div className="bg-slate-800/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 transition-all duration-300 hover:border-white/20 hover:bg-slate-800/60 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-2">
      <div className="flex items-center gap-4">
        <div 
          className="p-3 rounded-xl flex items-center justify-center shadow-lg"
          style={{ 
            backgroundColor: color || '#6366f1',
            boxShadow: `0 0 20px ${color}66` || '0 0 20px #6366f166'
          }}
        >
          <Icon size={24} className="text-white" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-slate-400">{title}</h3>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
      </div>
    </div>
  );
});

export default StatCard;
