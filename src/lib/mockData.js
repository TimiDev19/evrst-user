// Centralised mock data for the EVRST V1 UI/UX draft.
// All figures are realistic placeholders for Nigeria & Ghana users.

export const CATEGORIES = [
    { id: "all", label: "All", icon: "LayoutGrid" },
    { id: "politics", label: "Politics", icon: "Landmark" },
    { id: "sports", label: "Sports", icon: "Trophy" },
    { id: "crypto", label: "Crypto", icon: "Bitcoin" },
    { id: "economy", label: "Economy", icon: "TrendingUp" },
    { id: "entertainment", label: "Entertainment", icon: "Clapperboard" },
    { id: "world", label: "World", icon: "Globe" },
    { id: "tech", label: "Tech", icon: "Cpu" },
  ];
  
  export const MARKETS = [
    {
      id: "m1",
      question: "Will the Super Eagles qualify for the 2026 World Cup?",
      category: "sports",
      categoryLabel: "Sports",
      yesPrice: 0.62, noPrice: 0.38, probability: 62,
      volume: 48200000, liquidity: 12500000, followers: 1840,
      closesIn: "14d", closingDate: "2026-10-06", status: "open",
      trending: true, featured: true, change: 0.04, image: "https://images.unsplash.com/photo-1577223625812-7517cf0f1d18?w=800&q=80",
      resolutionSource: "FIFA official results", tag: "Nigeria",
    },
    {
      id: "m2",
      question: "Will Bitcoin close above $120,000 by end of October 2026?",
      category: "crypto", categoryLabel: "Crypto",
      yesPrice: 0.41, noPrice: 0.59, probability: 41,
      volume: 31800000, liquidity: 9400000, followers: 2210,
      closesIn: "9d", closingDate: "2026-10-01", status: "open",
      trending: true, featured: true, change: -0.02, image: "https://images.unsplash.com/photo-1518546305667-73e8e63d1b6b?w=800&q=80",
      resolutionSource: "Coinbase BTC-USD daily close", tag: "Crypto",
    },
    {
      id: "m3",
      question: "Will the Cedi strengthen against the USD by Q4 2026?",
      category: "economy", categoryLabel: "Economy",
      yesPrice: 0.28, noPrice: 0.72, probability: 28,
      volume: 9400000, liquidity: 3100000, followers: 612,
      closesIn: "21d", closingDate: "2026-10-13", status: "open",
      trending: false, featured: false, change: 0.01, image: "https://images.unsplash.com/photo-1611974789855-9c2b0b1c5b8f?w=800&q=80",
      resolutionSource: "Bank of Ghana official rates", tag: "Ghana",
    },
    {
      id: "m4",
      question: "Will Tinubu sign the new tax reform bill before November 2026?",
      category: "politics", categoryLabel: "Politics",
      yesPrice: 0.55, noPrice: 0.45, probability: 55,
      volume: 27500000, liquidity: 7800000, followers: 1530,
      closesIn: "5d", closingDate: "2026-09-27", status: "open",
      trending: true, featured: false, change: 0.07, image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80",
      resolutionSource: "Official gazette publication", tag: "Nigeria",
    },
    {
      id: "m5",
      question: "Will Asante Kotoko win the Ghana Premier League 2026/27?",
      category: "sports", categoryLabel: "Sports",
      yesPrice: 0.19, noPrice: 0.81, probability: 19,
      volume: 6100000, liquidity: 2100000, followers: 488,
      closesIn: "30d", closingDate: "2026-10-22", status: "open",
      trending: false, featured: false, change: 0.0, image: "https://images.unsplash.com/photo-1551958219-acbc608c637f?w=800&q=80",
      resolutionSource: "Ghana Football Association", tag: "Ghana",
    },
    {
      id: "m6",
      question: "Will Ethereum flip Bitcoin in market cap by 2027?",
      category: "crypto", categoryLabel: "Crypto",
      yesPrice: 0.09, noPrice: 0.91, probability: 9,
      volume: 12300000, liquidity: 4200000, followers: 990,
      closesIn: "60d", closingDate: "2026-11-21", status: "open",
      trending: false, featured: false, change: -0.01, image: "https://images.unsplash.com/photo-1621761191319-c93cc3ec4c1d?w=800&q=80",
      resolutionSource: "CoinGecko market cap data", tag: "Crypto",
    },
    {
      id: "m7",
      question: "Will the Black Stars reach AFCON 2027 semi-finals?",
      category: "sports", categoryLabel: "Sports",
      yesPrice: 0.34, noPrice: 0.66, probability: 34,
      volume: 8800000, liquidity: 2900000, followers: 740,
      closesIn: "3d", closingDate: "2026-09-25", status: "open",
      trending: true, featured: false, change: 0.05, image: "https://images.unsplash.com/photo-1508098260754-f3b98f8f8c5b?w=800&q=80",
      resolutionSource: "CAF official tournament results", tag: "Ghana",
    },
    {
      id: "m8",
      question: "Will Nigeria's inflation drop below 20% by December 2026?",
      category: "economy", categoryLabel: "Economy",
      yesPrice: 0.47, noPrice: 0.53, probability: 47,
      volume: 19800000, liquidity: 6100000, followers: 1120,
      closesIn: "11d", closingDate: "2026-10-03", status: "open",
      trending: false, featured: true, change: 0.03, image: "https://images.unsplash.com/photo-1454165804609-c3d57bc86b40?w=800&q=80",
      resolutionSource: "NBS CPI report", tag: "Nigeria",
    },
    {
      id: "m9",
      question: "Will Apple announce a foldable iPhone in 2026?",
      category: "tech", categoryLabel: "Tech",
      yesPrice: 0.13, noPrice: 0.87, probability: 13,
      volume: 7400000, liquidity: 2600000, followers: 560,
      closesIn: "45d", closingDate: "2026-11-06", status: "open",
      trending: false, featured: false, change: -0.03, image: "https://images.unsplash.com/photo-1592286927505-1def25115558?w=800&q=80",
      resolutionSource: "Apple official announcement", tag: "Tech",
    },
    {
      id: "m10",
      question: "Will Burna Boy win a Grammy in 2027?",
      category: "entertainment", categoryLabel: "Entertainment",
      yesPrice: 0.38, noPrice: 0.62, probability: 38,
      volume: 5300000, liquidity: 1800000, followers: 820,
      closesIn: "75d", closingDate: "2026-12-06", status: "open",
      trending: false, featured: false, change: 0.02, image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
      resolutionSource: "Grammy Awards official results", tag: "Nigeria",
    },
    {
      id: "m11",
      question: "Will the Naira trade below ₦1,400/$ by end of 2026?",
      category: "economy", categoryLabel: "Economy",
      yesPrice: 0.24, noPrice: 0.76, probability: 24,
      volume: 16700000, liquidity: 5200000, followers: 1340,
      closesIn: "7d", closingDate: "2026-09-29", status: "open",
      trending: true, featured: false, change: -0.04, image: "https://images.unsplash.com/photo-1611974789855-9c2b0b1c5b8f?w=800&q=80",
      resolutionSource: "FMDQ official daily quote", tag: "Nigeria",
    },
    {
      id: "m12",
      question: "Will Chelsea finish top 4 in the EPL 2026/27?",
      category: "sports", categoryLabel: "Sports",
      yesPrice: 0.58, noPrice: 0.42, probability: 58,
      volume: 22100000, liquidity: 6900000, followers: 1610,
      closesIn: "18d", closingDate: "2026-10-10", status: "open",
      trending: false, featured: false, change: 0.01, image: "https://images.unsplash.com/photo-1577223625812-7517cf0f1d18?w=800&q=80",
      resolutionSource: "Premier League final standings", tag: "Sports",
    },
  ];
  
  export const ORDER_BOOK = {
    bids: [
      { price: 0.61, size: 42000 }, { price: 0.60, size: 88500 }, { price: 0.59, size: 120000 }, { price: 0.58, size: 64000 }, { price: 0.57, size: 91000 },
    ],
    asks: [
      { price: 0.63, size: 38000 }, { price: 0.64, size: 76000 }, { price: 0.65, size: 142000 }, { price: 0.66, size: 58000 }, { price: 0.67, size: 83000 },
    ],
  };
  
  export const USER = {
    email: "adaeze.okafor@example.com",
    nickname: "AdaPredicts",
    country: "Nigeria",
    kycStatus: "unverified", // unverified | pending | verified | rejected
    walletStatus: "initialized", // not_initialized | initialized | linked
    walletAddress: "0x7a3F...c91B",
    leaderboardVisible: true,
    totalBalance: 285400,
    availableBalance: 142300,
    tradingBalance: 98600,
    reservedInOrders: 44500,
    points: 4820,
    level: "Gold Analyst",
  };
  
  export const DEPOSITS = [
    { id: "dep-8821", method: "Bank Transfer (GTB)", amount: 50000, currency: "NGN", status: "completed", date: "2026-09-18 14:22" },
    { id: "dep-8814", method: "Card (Visa)", amount: 20000, currency: "NGN", status: "completed", date: "2026-09-12 09:05" },
    { id: "dep-8809", method: "Bank Transfer (Access)", amount: 100000, currency: "NGN", status: "pending", date: "2026-09-21 18:40" },
    { id: "dep-8795", method: "Card (Mastercard)", amount: 15000, currency: "NGN", status: "failed", date: "2026-09-03 11:12" },
  ];
  
  export const CONVERSIONS = [
    { id: "cnv-301", from: "NGN", to: "USDC", amount: 100000, received: 66.4, rate: 1505.2, fee: 1.0, status: "completed", date: "2026-09-19" },
    { id: "cnv-298", from: "USDC", to: "NGN", amount: 40, received: 60208, rate: 1505.2, fee: 1.0, status: "completed", date: "2026-09-15" },
  ];
  
  export const TRADING_TRANSFERS = [
    { id: "tt-55", direction: "in", amount: 30000, date: "2026-09-19 10:11" },
    { id: "tt-52", direction: "out", amount: 15000, date: "2026-09-16 16:30" },
    { id: "tt-49", direction: "in", amount: 50000, date: "2026-09-10 08:02" },
  ];
  
  export const WITHDRAWALS = [
    { id: "wd-771", destination: "GTB ••••4021", amount: 40000, status: "processing", date: "2026-09-20 13:00" },
    { id: "wd-768", destination: "Access ••••8830", amount: 25000, status: "completed", date: "2026-09-14 19:22" },
    { id: "wd-760", destination: "GTB ••••4021", amount: 60000, status: "cancelled", date: "2026-09-06 07:45" },
  ];
  
  export const WITHDRAWAL_DESTINATIONS = [
    { id: "d1", label: "GTB ••••4021", type: "Bank Account", status: "active", added: "2026-08-01" },
    { id: "d2", label: "Access ••••8830", type: "Bank Account", status: "active", added: "2026-08-22" },
    { id: "d3", label: "Zenith ••••1190", type: "Bank Account", status: "waiting", added: "2026-09-21", availableIn: "23h 14m" },
  ];
  
  export const ORDERS = [
    { id: "ord-4401", market: "Super Eagles qualify for 2026 WC", side: "YES", type: "limit", amount: 5000, shares: 8064, price: 0.62, filled: 0.0, status: "open", date: "2026-09-22 15:40" },
    { id: "ord-4398", market: "Tinubu signs tax reform bill", side: "NO", type: "market", amount: 3000, shares: 6666, price: 0.45, filled: 1.0, status: "filled", date: "2026-09-21 11:20" },
    { id: "ord-4395", market: "Bitcoin > $120k by Oct", side: "YES", type: "limit", amount: 8000, shares: 19512, price: 0.41, filled: 0.45, status: "partial", date: "2026-09-20 09:05" },
    { id: "ord-4390", market: "Naira below ₦1,400/$", side: "YES", type: "limit", amount: 2000, shares: 8333, price: 0.24, filled: 0.0, status: "cancelled", date: "2026-09-18 17:30" },
    { id: "ord-4388", market: "Inflation below 20%", side: "NO", type: "market", amount: 4500, shares: 8490, price: 0.53, filled: 0.0, status: "rejected", date: "2026-09-17 13:10" },
  ];
  
  export const POSITIONS = [
    { id: "p1", market: "Tinubu signs tax reform bill", side: "NO", shares: 6666, avgPrice: 0.45, value: 3000, unrealized: 320, payout: 6666, status: "open" },
    { id: "p2", market: "Bitcoin > $120k by Oct", side: "YES", shares: 8780, avgPrice: 0.41, value: 3600, unrealized: -180, payout: 8780, status: "open" },
    { id: "p3", market: "Inflation below 20%", side: "YES", shares: 4000, avgPrice: 0.44, value: 1880, unrealized: 60, payout: 4000, status: "open" },
    { id: "p4", market: "Chelsea top 4 EPL", side: "YES", shares: 2000, avgPrice: 0.55, value: 1160, unrealized: 60, payout: 2000, status: "settled", realized: 2000 },
  ];
  
  export const LEDGER = [
    { id: "lg-9921", type: "deposit", label: "Deposit · GTB", amount: 50000, status: "completed", date: "2026-09-18 14:22", ref: "dep-8821" },
    { id: "lg-9918", type: "conversion", label: "NGN → USDC", amount: -100000, status: "completed", date: "2026-09-19 10:09", ref: "cnv-301" },
    { id: "lg-9915", type: "transfer", label: "Move to trading", amount: -30000, status: "completed", date: "2026-09-19 10:11", ref: "tt-55" },
    { id: "lg-9910", type: "reservation", label: "Order reserve · ord-4401", amount: -5000, status: "pending", date: "2026-09-22 15:40", ref: "ord-4401" },
    { id: "lg-9905", type: "withdrawal", label: "Withdrawal · GTB", amount: -40000, status: "processing", date: "2026-09-20 13:00", ref: "wd-771" },
    { id: "lg-9900", type: "fee", label: "Trading fee", amount: -45, status: "completed", date: "2026-09-21 11:20", ref: "fee-4398" },
  ];
  
  export const LEADERBOARD = {
    weekly: [
      { rank: 1, nickname: "LagosOracle", country: "Nigeria", points: 980, level: "Diamond Sage" },
      { rank: 2, nickname: "AccraAlpha", country: "Ghana", points: 870, level: "Diamond Sage" },
      { rank: 3, nickname: "AdaPredicts", country: "Nigeria", points: 820, level: "Gold Analyst", isYou: true },
      { rank: 4, nickname: "Private User", country: "Ghana", points: 760, level: "Gold Analyst" },
      { rank: 5, nickname: "NaijaBull", country: "Nigeria", points: 710, level: "Gold Analyst" },
      { rank: 6, nickname: "KumasiMind", country: "Ghana", points: 680, level: "Silver Strategist" },
      { rank: 7, nickname: "Private User", country: "Nigeria", points: 640, level: "Silver Strategist" },
      { rank: 8, nickname: "Voltarian", country: "Ghana", points: 590, level: "Silver Strategist" },
    ],
    monthly: [
      { rank: 1, nickname: "AccraAlpha", country: "Ghana", points: 4120, level: "Diamond Sage" },
      { rank: 2, nickname: "LagosOracle", country: "Nigeria", points: 3980, level: "Diamond Sage" },
      { rank: 3, nickname: "AdaPredicts", country: "Nigeria", points: 3210, level: "Gold Analyst", isYou: true },
      { rank: 4, nickname: "NaijaBull", country: "Nigeria", points: 2870, level: "Gold Analyst" },
      { rank: 5, nickname: "KumasiMind", country: "Ghana", points: 2610, level: "Silver Strategist" },
    ],
    alltime: [
      { rank: 1, nickname: "LagosOracle", country: "Nigeria", points: 48200, level: "Diamond Sage" },
      { rank: 2, nickname: "AccraAlpha", country: "Ghana", points: 44910, level: "Diamond Sage" },
      { rank: 3, nickname: "NaijaBull", country: "Nigeria", points: 31800, level: "Gold Analyst" },
      { rank: 4, nickname: "AdaPredicts", country: "Nigeria", points: 28400, level: "Gold Analyst", isYou: true },
      { rank: 5, nickname: "KumasiMind", country: "Ghana", points: 24120, level: "Silver Strategist" },
    ],
  };
  
  export const POINTS_HISTORY = [
    { id: "ph-1", points: 120, type: "earned", reason: "Settled winning trade · Inflation below 20%", date: "2026-09-21" },
    { id: "ph-2", points: 50, type: "pending", reason: "Referral · friend completed KYC", date: "2026-09-19" },
    { id: "ph-3", points: 30, type: "earned", reason: "Daily login streak (7 days)", date: "2026-09-18" },
    { id: "ph-4", points: -25, type: "reversed", reason: "Order cancelled before fill", date: "2026-09-17" },
    { id: "ph-5", points: 200, type: "earned", reason: "First valid deposit", date: "2026-09-12" },
    { id: "ph-6", points: -40, type: "expired", reason: "Season 3 points expired", date: "2026-09-01" },
  ];
  
  export const REFERRALS = [
    { id: "r1", name: "Chidi N.", status: "completed", date: "2026-09-10", points: 500 },
    { id: "r2", name: "Private User", status: "pending", date: "2026-09-19", points: 0 },
    { id: "r3", name: "Ama K.", status: "cancelled", date: "2026-08-30", points: 0 },
  ];
  
  export const NOTIFICATIONS = [
    { id: "n1", category: "security", title: "New login from Lagos", body: "If this wasn't you, secure your account.", status: "unread", date: "2h ago", action: "Review" },
    { id: "n2", category: "kyc", title: "Complete your KYC to trade", body: "You're one step away from placing trades.", status: "unread", date: "5h ago", action: "Start KYC" },
    { id: "n3", category: "deposits", title: "Deposit confirmed", body: "₦50,000 has been credited to your balance.", status: "read", date: "1d ago", action: "View" },
    { id: "n4", category: "orders", title: "Order filled", body: "Your NO order on 'Tinubu tax reform' was filled.", status: "read", date: "1d ago", action: "View" },
    { id: "n5", category: "followed", title: "Market closing soon", body: "'Super Eagles qualify' closes in 3 days.", status: "unread", date: "1d ago", action: "View market" },
    { id: "n6", category: "points", title: "You earned 120 points", body: "From a settled winning trade.", status: "read", date: "2d ago" },
    { id: "n7", category: "support", title: "Support replied to your ticket", body: "Ticket #4421 has a new response.", status: "unread", date: "3d ago", action: "Open" },
    { id: "n8", category: "product", title: "New markets available", body: "12 new markets added this week.", status: "read", date: "4d ago" },
  ];
  
  export const SUPPORT_TICKETS = [
    { id: "tk-4421", subject: "Withdrawal not received", status: "open", priority: "high", updated: "2026-09-21", messages: 4 },
    { id: "tk-4390", subject: "KYC document upload failing", status: "resolved", priority: "medium", updated: "2026-09-15", messages: 6 },
    { id: "tk-4355", subject: "Question about trading fees", status: "closed", priority: "low", updated: "2026-09-08", messages: 2 },
  ];
  
  export const TICKET_CONVERSATION = [
    { from: "you", text: "Hi, my withdrawal of ₦40,000 from yesterday hasn't reflected in my bank account yet.", date: "2026-09-21 13:05" },
    { from: "support", text: "Hello Ada, thanks for reaching out. I can see withdrawal wd-771 is currently processing with the provider. Bank transfers can take up to 24 hours.", date: "2026-09-21 13:20" },
    { from: "you", text: "Okay, thank you. I'll wait.", date: "2026-09-21 13:22" },
  ];
  
  export const PORTFOLIO_SERIES = [
    { day: "Mon", value: 268 }, { day: "Tue", value: 271 }, { day: "Wed", value: 265 },
    { day: "Thu", value: 278 }, { day: "Fri", value: 282 }, { day: "Sat", value: 276 }, { day: "Sun", value: 285 },
  ];
  
  export function formatNaira(n) {
    return "₦" + Number(n).toLocaleString("en-NG", { maximumFractionDigits: 0 });
  }
  export function formatVolume(n) {
    if (n >= 1e9) return "₦" + (n / 1e9).toFixed(1) + "B";
    if (n >= 1e6) return "₦" + (n / 1e6).toFixed(1) + "M";
    if (n >= 1e3) return "₦" + (n / 1e3).toFixed(0) + "K";
    return "₦" + n;
  }
  export function formatPct(p) { return Math.round(p) + "%"; }