import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import UselessClock from './UselessClock';

const root = createRoot( document.getElementById('root') );
root.render(<UselessClock />);