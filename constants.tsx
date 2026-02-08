import { Incident, MetricCardData, NetworkNode, DispatchAssignment } from './types';
import React from 'react';
import { Activity, Wifi, Truck, AlertTriangle, ArrowRight, ArrowDown, Check, AlertCircle, Map, Tent, Users } from 'lucide-react';

export const MOCK_INCIDENTS: Incident[] = [
  {
    id: '1',
    title: 'Flash Flood Warning',
    location: 'Sector 4A',
    sector: '4A',
    severity: 'CRITICAL',
    timeStart: '09:00',
    timeEnd: '12:00',
    status: 'Dispatch Sent',
    type: 'flood'
  },
  {
    id: '2',
    title: 'Structural Fire',
    location: 'Sector 2B - Ind. Zone',
    sector: '2B',
    severity: 'CRITICAL',
    timeStart: '10:15',
    timeEnd: 'Ongoing',
    status: 'Units Arrived',
    type: 'fire'
  },
  {
    id: '3',
    title: 'Medical Emergency',
    location: 'Sector 1C - Shelter',
    sector: '1C',
    severity: 'MODERATE',
    timeStart: '08:45',
    timeEnd: '09:30',
    status: 'Resolved',
    type: 'medical'
  },
  {
    id: '4',
    title: 'Supply Route Blockage',
    location: 'Main Artery Rd',
    sector: '4A',
    severity: 'LOW',
    timeStart: '11:00',
    timeEnd: 'Est. 14:00',
    status: 'Rerouting',
    type: 'logistics'
  },
  {
    id: '5',
    title: 'Mesh Node Offline',
    location: 'Relay Station 7',
    sector: '3B',
    severity: 'MODERATE',
    timeStart: '11:30',
    timeEnd: 'Technician Dispatched',
    status: 'Pending',
    type: 'logistics'
  }
];

export const MOCK_NODES: NetworkNode[] = [
  {
    id: '1',
    name: 'Gateway Alpha-01',
    location: 'Police Jeep Unit 4 • Sector 4A',
    type: 'gateway',
    battery: 85,
    signal: 4,
    latency: '12ms',
    hops: 0,
    uptime: '4h 12m',
    status: 'active'
  },
  {
    id: '2',
    name: 'Relay Node Beta-04',
    location: 'Rooftop • Community Center',
    type: 'relay',
    battery: 92,
    signal: 3,
    latency: '24ms',
    hops: 1,
    uptime: '12h 05m',
    status: 'active'
  },
  {
    id: '3',
    name: 'Mobile Unit Delta-2',
    location: 'Search Team • Sector 4B',
    type: 'mobile',
    battery: 45,
    signal: 2,
    latency: '56ms',
    hops: 3,
    uptime: '1h 30m',
    status: 'warning'
  },
  {
    id: '4',
    name: 'Gateway Alpha-02',
    location: 'Fire Command Truck',
    type: 'gateway',
    battery: 98,
    signal: 4,
    latency: '8ms',
    hops: 0,
    uptime: '6h 45m',
    status: 'active'
  },
  {
    id: '5',
    name: 'Relay Node Gamma-09',
    location: 'Utility Pole • Main St.',
    type: 'relay',
    battery: 12,
    signal: 1,
    latency: '120ms',
    hops: 2,
    uptime: '22h 10m',
    status: 'offline'
  }
];

export const DISPATCH_ASSIGNMENTS: DispatchAssignment[] = [
  {
    id: '1',
    title: 'Medical: Sector 4A',
    subtitle: 'Cardiac Arrest',
    distance: '2km Away',
    urgency: 'critical',
    eta: '< 8 min',
    type: 'medical'
  },
  {
    id: '2',
    title: 'Evacuation: Zone B',
    subtitle: 'Flood Rising',
    distance: '5km Away',
    urgency: 'high',
    eta: 'ASAP',
    type: 'ndrf'
  },
  {
    id: '3',
    title: 'Fire: Industrial Park',
    subtitle: 'Chemical Spill Risk',
    distance: '8km Away',
    urgency: 'critical',
    eta: '< 12 min',
    type: 'fire'
  },
  {
    id: '4',
    title: 'Police: Checkpoint 3',
    subtitle: 'Crowd Control',
    distance: '1.5km Away',
    urgency: 'medium',
    eta: '15 min',
    type: 'police'
  },
];

export const UPTIME_DATA = [
  { name: '1', value: 98 },
  { name: '2', value: 99 },
  { name: '3', value: 98.5 },
  { name: '4', value: 99.8 },
  { name: '5', value: 99.9 },
  { name: '6', value: 99.9 },
];

export const LATENCY_DATA = [
  { name: '1', value: 120 },
  { name: '2', value: 135 },
  { name: '3', value: 140 },
  { name: '4', value: 138 },
  { name: '5', value: 142 },
  { name: '6', value: 145 },
];

// Footer Metrics for Dashboard View
export const DASHBOARD_METRICS: MetricCardData[] = [
  {
    label: 'Mesh Uptime',
    value: '99.9%',
    chartData: UPTIME_DATA,
  },
  {
    label: 'Avg Latency',
    value: '142ms',
    chartData: LATENCY_DATA,
  },
  {
    label: 'Active Units',
    value: '75',
    trend: 'up',
  },
  {
    label: 'Incidents',
    value: '295',
    icon: <AlertTriangle size={16} className="text-[#10B981]" />,
  }
];

// Footer Metrics for Mesh Grid View
export const MESH_METRICS: MetricCardData[] = [
  {
    label: 'Packet Loss',
    value: '0.02%',
    color: '#10B981' // Green Text
  },
  {
    label: 'Grid Load',
    value: '45%',
    icon: <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden relative">
            <div className="absolute left-0 top-0 h-full bg-yellow-400 w-[45%]" />
          </div>
  },
  {
    label: 'Est. Range',
    value: '4.2 km',
    icon: <div className="bg-blue-50 p-2 rounded-full"><ArrowRight size={20} className="text-blue-500" /></div>
  }
];

// Footer Metrics for Dispatch View
export const DISPATCH_METRICS: MetricCardData[] = [
  {
    label: 'Avg Response',
    value: '8m 42s',
    icon: <div className="bg-green-50 p-2 rounded-full"><ArrowDown size={20} className="text-[#10B981]" /></div>
  },
  {
    label: 'Units Busy',
    value: '85%',
    icon: <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden relative">
            <div className="absolute left-0 top-0 h-full bg-yellow-400 w-[85%]" />
          </div>
  },
  {
    label: 'Fuel Status',
    value: 'OK',
    icon: <div className="bg-green-50 p-2 rounded-full"><Check size={20} className="text-[#10B981]" /></div>
  },
  {
    label: 'Hospital Beds',
    value: '12 Open',
    icon: <div className="bg-red-50 p-2 rounded-full"><AlertCircle size={20} className="text-red-500" /></div>
  }
];

// Footer Metrics for Map View
export const MAP_METRICS: MetricCardData[] = [
  {
    label: 'Affected Area',
    value: '42 sq km',
    icon: <div className="bg-red-50 p-2 rounded-full"><Map size={20} className="text-red-500" /></div>
  },
  {
    label: 'Villages Offline',
    value: '14',
    icon: <div className="bg-red-50 p-2 rounded-full"><AlertTriangle size={20} className="text-red-500" /></div>
  },
  {
    label: 'Safe Camps',
    value: '6 Active',
    icon: <div className="bg-green-50 p-2 rounded-full"><Tent size={20} className="text-[#10B981]" /></div>
  },
  {
    label: 'Evacuated',
    value: '1,240',
    icon: <div className="bg-blue-50 p-2 rounded-full"><Users size={20} className="text-blue-500" /></div>
  }
];