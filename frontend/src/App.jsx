import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './routes';

const App = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
