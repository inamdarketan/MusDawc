import React from 'react';
import {createRoot} from 'react-dom/client';
import {App} from './ui/App';
import {ErrorBoundary} from './ui/ErrorBoundary';
import './ui/styles.css';
import {registerTrustedTypesPolicy} from './security/trustedTypes';
try { registerTrustedTypesPolicy(); } catch { /* No app code uses an HTML injection sink. */ }
createRoot(document.getElementById('root')!).render(<React.StrictMode><ErrorBoundary><App/></ErrorBoundary></React.StrictMode>);
