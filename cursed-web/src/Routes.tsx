import React from 'react';
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';

import { LogEntry } from './pages/LogEntry';

import { Home } from './pages/Home';

export function AppRoutes() {
  return (
    <RouterRoutes>
      
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        
        {/* Log Entry routes */}
        <Route path="/logs" element={<LogEntry />} />
      
        {/* Catch all route - redirect to dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </RouterRoutes>
  );
} 