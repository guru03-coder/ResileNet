import React from 'react';

export interface Incident {
  id: string;
  title: string;
  location: string;
  sector: string;
  severity: 'CRITICAL' | 'MODERATE' | 'LOW';
  timeStart: string;
  timeEnd: string;
  status: string;
  type: 'flood' | 'fire' | 'medical' | 'logistics';
}

export interface NetworkNode {
  id: string;
  name: string;
  location: string;
  type: 'gateway' | 'relay' | 'mobile';
  battery: number;
  signal: 1 | 2 | 3 | 4;
  latency: string;
  hops: number;
  uptime: string;
  status: 'active' | 'warning' | 'offline';
}

export interface DispatchAssignment {
  id: string;
  title: string;
  subtitle: string;
  distance: string;
  urgency: 'critical' | 'high' | 'medium';
  eta: string;
  type: 'medical' | 'fire' | 'police' | 'ndrf';
}

export interface ChartDataPoint {
  name: string;
  value: number;
}

export interface MetricCardData {
  label: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
  chartData?: ChartDataPoint[];
  icon?: React.ReactNode;
  color?: string; // Optional override
}