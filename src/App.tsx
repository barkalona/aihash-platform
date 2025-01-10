import React from 'react';
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
    import { Toaster } from 'react-hot-toast';
    import * as Sentry from '@sentry/react'; // Import Sentry
    import { AuthProvider } from './contexts/AuthContext';
    import { WalletProvider } from './contexts/WalletContext';
    import { Header } from './components/Layout/Header';
    import { MarketplacePage } from './components/Marketplace/MarketplacePage';
    import { GovernancePage } from './components/Governance/GovernancePage';
    import { StatisticsPage } from './components/Statistics/StatisticsPage';
    import { DocumentationPage } from './components/Documentation/DocumentationPage';
    import { WhitePaperPage } from './components/Documentation/WhitePaperPage';
    import { HomePage } from './components/Home/HomePage';
    import { MiningCommandCenter } from './components/Dashboard/MiningCommandCenter';
    import { AboutPage } from './components/About/AboutPage';
    import { FeedbackWidget } from './components/Feedback/FeedbackWidget';
    import { AuthPage } from './components/Auth/AuthPage';
    import { ResetPassword } from './components/Auth/ResetPassword';
    
    // Initialize Sentry
    Sentry.init({
      dsn: 'https://ea395f4d7595e9327a46540ffb1a5d9c@o4508620514066432.ingest.de.sentry.io/4508620673777744', // Replace with your Sentry DSN
      integrations: [new Sentry.BrowserTracing()],
      tracesSampleRate: 1.0, // Adjust based on your needs
    });
    
    export default function App() {
      return (
        <Sentry.ErrorBoundary fallback={<p>An error occurred.</p>}>
          <AuthProvider>
            <WalletProvider>
              <Router>
                <div className="min-h-screen bg-[#0D1117] text-white">
                  <Header />
                  <main>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/dashboard" element={<MiningCommandCenter />} />
                      <Route path="/auth" element={<AuthPage />} />
                      <Route path="/auth/reset-password" element={<ResetPassword />} />
                      <Route path="/marketplace" element={<MarketplacePage />} />
                      <Route path="/governance" element={<GovernancePage />} />
                      <Route path="/stats" element={<StatisticsPage />} />
                      <Route path="/docs" element={<DocumentationPage />} />
                      <Route path="/whitepaper" element={<WhitePaperPage />} />
                      <Route path="/about" element={<AboutPage />} />
                    </Routes>
                  </main>
                  <FeedbackWidget />
                  <Toaster
                    position="top-right"
                    toastOptions={{
                      className: 'bg-gray-900 text-white',
                      duration: 4000,
                      style: {
                        background: '#1A202C',
                        color: '#fff',
                        border: '1px solid #2D3748',
                      },
                    }}
                  />
                </div>
              </Router>
            </WalletProvider>
          </AuthProvider>
        </Sentry.ErrorBoundary>
      );
    }
