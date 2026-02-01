import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Sector, AreaChart, Area, LabelList, Cell
} from 'recharts';
import { 
  Zap, Car, Globe, TrendingUp, BarChart3, PieChart as PieIcon,
  Search, Filter, RefreshCw, Info
} from 'lucide-react';
import { List } from 'react-window';
import { fetchData, processDashboardData } from './utils/dataParser';
import StatCard from './components/StatCard';
import type { EVData, DashboardStats } from './types/ev';

const COLORS = ['#6366f1', '#a855f7', '#22d3ee', '#10b981', '#f59e0b', '#ef4444'];

// Custom components without React.memo for Recharts compatibility
const MyCustomPie = (props: any) => {
  const { index } = props;
  return (
    <Sector 
      {...props} 
      fill={COLORS[index % COLORS.length]} 
      cornerRadius={8} 
    />
  );
};

const MyCustomLabel = (props: any) => {
  const { cx, cy, midAngle, outerRadius, index, name, value } = props;
  const nCx = parseFloat(cx);
  const nCy = parseFloat(cy);
  const nMidAngle = parseFloat(midAngle);
  const nOuterRadius = parseFloat(outerRadius);

  if (isNaN(nCx) || isNaN(nCy) || isNaN(nMidAngle) || isNaN(nOuterRadius)) {
    return null;
  }

  const RADIAN = Math.PI / 180;
  const radius = nOuterRadius + 25;
  const x = nCx + radius * Math.cos(-nMidAngle * RADIAN);
  const y = nCy + radius * Math.sin(-nMidAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill={COLORS[(index ?? 0) % COLORS.length]}
      textAnchor={x > nCx ? 'start' : 'end'}
      dominantBaseline="central"
      className="text-[11px] font-bold"
    >
      {name}: {value?.toLocaleString()}
    </text>
  );
};

const MyCustomPieCAFV = (props: any) => {
  const { index } = props;
  return (
    <Sector 
      {...props} 
      fill={COLORS[(index + 2) % COLORS.length]} 
      cornerRadius={4} 
    />
  );
};

const MyCustomLabelCAFV = (props: any) => {
  const { cx, cy, midAngle, outerRadius, index, name, value, percent } = props;
  const nCx = parseFloat(cx);
  const nCy = parseFloat(cy);
  const nMidAngle = parseFloat(midAngle);
  const nOuterRadius = parseFloat(outerRadius);

  if (isNaN(nCx) || isNaN(nCy) || isNaN(nMidAngle) || isNaN(nOuterRadius)) {
    return null;
  }

  const RADIAN = Math.PI / 180;
  const radius = nOuterRadius + 30;
  const x = nCx + radius * Math.cos(-nMidAngle * RADIAN);
  const y = nCy + radius * Math.sin(-nMidAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill={COLORS[((index ?? 0) + 2) % COLORS.length]}
      textAnchor={x > nCx ? 'start' : 'end'}
      dominantBaseline="central"
      className="text-[11px] font-bold"
    >
      {name} ({((percent || 0) * 100).toFixed(0)}%)
    </text>
  );
};

const EmptyState = ({ message }: { message?: string }) => (
  <div className="h-full flex items-center justify-center text-slate-500 font-medium">
    {message || 'No data available'}
  </div>
);

export default function App() {
  const [rawData, setRawData] = useState<EVData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const fetched = await fetchData();
      setRawData(fetched);
      setLoading(false);
    };
    loadData();
  }, []);

  const filteredData = useMemo(() => {
    let result = filter === 'All' 
      ? rawData 
      : rawData.filter(v => v.Make === filter);

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(v => 
        (v.Model?.toLowerCase().includes(lowerSearch)) || 
        (v['VIN (1-10)']?.toLowerCase().includes(lowerSearch))
      );
    }
    return result;
  }, [filter, rawData, searchTerm]);

  const stats = useMemo<DashboardStats>(() => {
    return processDashboardData(filteredData);
  }, [filteredData]);

  const uniqueMakes = useMemo(() => {
    return ['All', ...new Set(rawData.map(v => v.Make))].sort().slice(0, 30);
  }, [rawData]);

  const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const TableRow = useCallback(({ index, style, ariaAttributes }: any) => {
    const row = filteredData[index];
    if (!row) return null;
    
    return (
      <div 
        style={style} 
        {...ariaAttributes}
        className="flex items-center hover:bg-white/5 transition-colors border-b border-white/5 px-6"
      >
        <div className="flex-1 text-sm font-mono text-indigo-400 truncate pr-4">{row['VIN (1-10)']}</div>
        <div className="flex-1 text-sm font-medium truncate pr-4">{row['Make']}</div>
        <div className="flex-1 text-sm text-slate-300 truncate pr-4">{row['Model']}</div>
        <div className="flex-1 text-sm text-slate-400 truncate pr-4">{row['Model Year']}</div>
        <div className="flex-1 text-sm font-medium text-emerald-400 truncate pr-4">{row['Electric Range']} mi</div>
        <div className="flex-1">
          <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
            row['Electric Vehicle Type']?.includes('Battery') 
              ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
              : 'bg-indigo-500/10 text-indigo-500 border border-indigo-500/20'
          }`}>
            {row['Electric Vehicle Type']?.includes('Battery') ? 'BEV' : 'PHEV'}
          </span>
        </div>
      </div>
    );
  }, [filteredData]);

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center gap-4 bg-[#0f172a] text-white">
        <RefreshCw className="animate-spin text-indigo-500" size={48} />
        <p className="text-slate-400 font-medium">Analyzing EV Population Data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-50 font-['Outfit'] selection:bg-indigo-500/30">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-10 space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              EV Population <span className="text-indigo-500">Analytics</span>
            </h1>
            <p className="text-slate-400 mt-2 text-lg">
              Insights from {filteredData.length.toLocaleString()} vehicles {filter !== 'All' ? `by ${filter}` : ''}
            </p>
          </div>
          
          <div className="relative group">
            <select 
              value={filter}
              onChange={handleFilterChange}
              className="appearance-none bg-slate-800/50 backdrop-blur-md border border-white/10 text-white px-6 py-3 pr-12 rounded-2xl cursor-pointer hover:border-white/20 transition-all outline-none focus:ring-2 focus:ring-indigo-500/50"
            >
              {uniqueMakes.map(make => (
                <option key={make} value={make} className="bg-[#1e293b]">{make}</option>
              ))}
            </select>
            <Filter size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Vehicles" value={stats.totalEVs.toLocaleString()} icon={Car} color="#6366f1" />
          <StatCard title="Avg. Electric Range" value={`${stats.avgRange} mi`} icon={Zap} color="#22d3ee" />
          <StatCard title="Top Brand" value={stats.makeData[0]?.make || 'N/A'} icon={TrendingUp} color="#a855f7" />
          <StatCard title="BEV vs PHEV" value={stats.totalEVs > 0 ? `${Math.round((stats.typeData.find(t => t.name === 'BEV')?.value || 0) / stats.totalEVs * 100)}% BEV` : '0% BEV'} icon={Globe} color="#10b981" />
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8 bg-slate-800/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-semibold">Population Growth by Year</h2>
              <BarChart3 className="text-slate-500" size={20} />
            </div>
            <div className="h-[350px] w-full">
              {stats.yearData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stats.yearData}>
                    <defs>
                      <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #ffffff10', borderRadius: '16px', color: '#fff' }} />
                    <Area type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorCount)" />
                  </AreaChart>
                </ResponsiveContainer>
              ) : <EmptyState />}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 bg-slate-800/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-semibold">Vehicle Types</h2>
              <PieIcon className="text-slate-500" size={20} />
            </div>
            <div className="h-[350px] w-full flex flex-col">
              {stats.typeData.length > 0 ? (
                <>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stats.typeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={110}
                        paddingAngle={10}
                        dataKey="value"
                        shape={MyCustomPie}
                      >
                        <LabelList content={MyCustomLabel} />
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #ffffff10', borderRadius: '16px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap justify-center gap-4 mt-4">
                    {stats.typeData.map((entry, index) => (
                      <div key={entry.name} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                        <span className="text-xs text-slate-400 font-medium">{entry.name}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : <EmptyState />}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6 bg-slate-800/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-semibold">Top 10 Manufacturers</h2>
              <TrendingUp className="text-slate-500" size={20} />
            </div>
            <div className="h-[300px] w-full">
              {stats.makeData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.makeData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" horizontal={false} />
                    <XAxis type="number" hide />
                    <YAxis dataKey="make" type="category" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} width={100} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #ffffff10', borderRadius: '16px' }} />
                    <Bar dataKey="count" radius={[0, 10, 10, 0]} fill="#6366f1">
                      {stats.makeData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={`url(#gradient-${index})`} />
                      ))}
                    </Bar>
                    <defs>
                      {stats.makeData.map((_, index) => (
                        <linearGradient key={`grad-${index}`} id={`gradient-${index}`} x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#6366f1" stopOpacity={0.8} />
                          <stop offset="100%" stopColor="#22d3ee" stopOpacity={1} />
                        </linearGradient>
                      ))}
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              ) : <EmptyState />}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6 bg-slate-800/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-semibold">CAFV Eligibility</h2>
              <Info className="text-slate-500" size={20} />
            </div>
            <div className="h-[300px] w-full">
              {stats.cafvData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.cafvData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      labelLine={true}
                      shape={MyCustomPieCAFV}
                    >
                      <LabelList content={MyCustomLabelCAFV} />
                    </Pie>
                    <Tooltip contentStyle={{ color: '#fff', backgroundColor: '#1e293b', border: '1px solid #ffffff10', borderRadius: '16px' }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : <EmptyState />}
            </div>
          </div>

          <div className="col-span-12 bg-slate-800/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
            <div className="p-8 pb-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <h2 className="text-xl font-semibold">Complete Dataset ({filteredData.length.toLocaleString()} rows)</h2>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search model or VIN..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="bg-white/5 border border-white/10 rounded-xl px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 w-full md:w-64"
                  />
                  <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                </div>
              </div>
              <div className="flex items-center bg-white/5 uppercase text-xs font-semibold text-slate-400 tracking-wider px-6 py-4 rounded-t-xl border-x border-t border-white/5">
                <div className="flex-1">VIN</div>
                <div className="flex-1">Make</div>
                <div className="flex-1">Model</div>
                <div className="flex-1">Year</div>
                <div className="flex-1">Range</div>
                <div className="flex-1">Type</div>
              </div>
            </div>
            <div className="h-[500px] border-x border-b border-white/5 mx-8 mb-8 rounded-b-xl overflow-hidden bg-white/2">
              {filteredData.length > 0 ? (
                <List
                  height={500}
                  rowCount={filteredData.length}
                  rowHeight={56}
                  width="100%"
                  rowComponent={TableRow}
                  rowProps={{}}
                />
              ) : <EmptyState message="No matching vehicles found" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
