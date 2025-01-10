import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  dsn: "https://ea395f4d7595e9327a46540ffb1a5d9c@o4508620514066432.ingest.de.sentry.io/4508620673777744", // Replace with your Sentry DSN
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0, // Adjust based on your needs
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
