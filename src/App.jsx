import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
// Add page imports here
import Layout from "@/components/evrst/Layout";
import Markets from "@/pages/Markets";
import MarketDetail from "@/pages/MarketDetail";
import Dashboard from "@/pages/Dashboard";
import Kyc from "@/pages/Kyc";
import Wallet from "@/pages/Wallet";
import Fund from "@/pages/Fund";
import Convert from "@/pages/Convert";
import TradingBalance from "@/pages/TradingBalance";
import Withdrawals from "@/pages/Withdrawals";
import Orders from "@/pages/Orders";
import Portfolio from "@/pages/Portfolio";
import Ledger from "@/pages/Ledger";
import Leaderboard from "@/pages/Leaderboard";
import PointsHistory from "@/pages/PointsHistory";
import Referral from "@/pages/Referral";
import Notifications from "@/pages/Notifications";
import Support from "@/pages/Support";
import Profile from "@/pages/Profile";
import Security from "@/pages/Security";
import Offline from "@/pages/Offline";
import EmailVerification from "@/pages/EmailVerification";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-email" element={<EmailVerification />} />
      <Route path="/offline" element={<Offline />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Markets />} />
        <Route path="/market/:id" element={<MarketDetail />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/kyc" element={<Kyc />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/fund" element={<Fund />} />
        <Route path="/convert" element={<Convert />} />
        <Route path="/trading-balance" element={<TradingBalance />} />
        <Route path="/withdrawals" element={<Withdrawals />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/ledger" element={<Ledger />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/points" element={<PointsHistory />} />
        <Route path="/referral" element={<Referral />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/support" element={<Support />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/security" element={<Security />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App