export const categories = [
  { name: 'Rumah', icon: '⌂', color: '#2f6b4f', cap: 2200000, kind: 'needs' },
  { name: 'Belanja', icon: '✦', color: '#d4874a', cap: 2600000, kind: 'needs' },
  { name: 'Transport', icon: '↗', color: '#4d7c9f', cap: 900000, kind: 'needs' },
  { name: 'Tagihan', icon: '⌁', color: '#8b6cae', cap: 650000, kind: 'needs' },
  { name: 'Sekolah', icon: '▣', color: '#bf7261', cap: 750000, kind: 'needs' },
  { name: 'Kesehatan', icon: '+', color: '#4c9884', cap: 350000, kind: 'needs' },
  { name: 'Makan di luar', icon: '◒', color: '#e2a43b', cap: 700000, kind: 'wants' },
  { name: 'Langganan', icon: '◉', color: '#bd7094', cap: 220000, kind: 'wants' },
  { name: 'Belanja pribadi', icon: '◇', color: '#ae7b53', cap: 450000, kind: 'wants' },
  { name: 'Hiburan', icon: '★', color: '#6476b7', cap: 300000, kind: 'wants' },
  { name: 'Tabungan', icon: '↥', color: '#197b62', cap: 1500000, kind: 'savings' },
];

export const transactions = [
  { id: 1, date: '2026-11-01', description: 'Gaji bulanan', category: 'Pendapatan', amount: 11000000, type: 'income' },
  { id: 2, date: '2026-11-03', description: 'Proyek desain kecil', category: 'Pendapatan', amount: 1500000, type: 'income' },
  { id: 3, date: '2026-11-01', description: 'Sewa rumah', category: 'Rumah', amount: 2200000, type: 'expense' },
  { id: 4, date: '2026-11-02', description: 'Belanja mingguan Pasar Senen', category: 'Belanja', amount: 680000, type: 'expense' },
  { id: 5, date: '2026-11-09', description: 'Belanja mingguan', category: 'Belanja', amount: 540000, type: 'expense' },
  { id: 6, date: '2026-11-16', description: 'Belanja mingguan', category: 'Belanja', amount: 710000, type: 'expense' },
  { id: 7, date: '2026-11-23', description: 'Belanja mingguan', category: 'Belanja', amount: 670000, type: 'expense' },
  { id: 8, date: '2026-11-04', description: 'Bensin motor', category: 'Transport', amount: 220000, type: 'expense' },
  { id: 9, date: '2026-11-11', description: 'KRL & ojek', category: 'Transport', amount: 185000, type: 'expense' },
  { id: 10, date: '2026-11-18', description: 'Bensin motor', category: 'Transport', amount: 245000, type: 'expense' },
  { id: 11, date: '2026-11-25', description: 'Parkir & tol', category: 'Transport', amount: 175000, type: 'expense' },
  { id: 12, date: '2026-11-05', description: 'Listrik PLN', category: 'Tagihan', amount: 285000, type: 'expense' },
  { id: 13, date: '2026-11-10', description: 'Air & kebersihan', category: 'Tagihan', amount: 165000, type: 'expense' },
  { id: 14, date: '2026-11-15', description: 'Internet rumah', category: 'Tagihan', amount: 200000, type: 'expense' },
  { id: 15, date: '2026-11-05', description: 'Uang sekolah Raka', category: 'Sekolah', amount: 500000, type: 'expense' },
  { id: 16, date: '2026-11-12', description: 'Buku latihan', category: 'Sekolah', amount: 250000, type: 'expense' },
  { id: 17, date: '2026-11-07', description: 'Vitamin keluarga', category: 'Kesehatan', amount: 210000, type: 'expense' },
  { id: 18, date: '2026-11-22', description: 'Klinik anak', category: 'Kesehatan', amount: 140000, type: 'expense' },
  { id: 19, date: '2026-11-06', description: 'Makan siang kantor', category: 'Makan di luar', amount: 150000, type: 'expense' },
  { id: 20, date: '2026-11-08', description: 'Kopi & camilan', category: 'Makan di luar', amount: 85000, type: 'expense' },
  { id: 21, date: '2026-11-14', description: 'Makan malam keluarga', category: 'Makan di luar', amount: 260000, type: 'expense' },
  { id: 22, date: '2026-11-20', description: 'Bakso Jumat', category: 'Makan di luar', amount: 115000, type: 'expense' },
  { id: 23, date: '2026-11-28', description: 'Sarapan akhir bulan', category: 'Makan di luar', amount: 190000, type: 'expense' },
  { id: 24, date: '2026-11-03', description: 'Streaming film', category: 'Langganan', amount: 79000, type: 'expense' },
  { id: 25, date: '2026-11-17', description: 'Penyimpanan awan', category: 'Langganan', amount: 69000, type: 'expense' },
  { id: 26, date: '2026-11-21', description: 'Aplikasi musik', category: 'Langganan', amount: 72000, type: 'expense' },
  { id: 27, date: '2026-11-13', description: 'Potong rambut', category: 'Belanja pribadi', amount: 160000, type: 'expense' },
  { id: 28, date: '2026-11-19', description: 'Kado ulang tahun', category: 'Belanja pribadi', amount: 220000, type: 'expense' },
  { id: 29, date: '2026-11-26', description: 'Tiket bioskop', category: 'Hiburan', amount: 180000, type: 'expense' },
  { id: 30, date: '2026-11-01', description: 'Transfer dana darurat', category: 'Tabungan', amount: 1000000, type: 'expense' },
  { id: 31, date: '2026-11-15', description: 'Tabungan motor', category: 'Tabungan', amount: 500000, type: 'expense' },
  { id: 32, date: '2026-11-02', description: 'Isi ulang e-wallet', category: 'Transport', amount: 75000, type: 'expense' },
  { id: 33, date: '2026-11-09', description: 'Gas dapur', category: 'Rumah', amount: 85000, type: 'expense' },
  { id: 34, date: '2026-11-16', description: 'Perlengkapan rumah', category: 'Rumah', amount: 145000, type: 'expense' },
  { id: 35, date: '2026-11-24', description: 'Donasi tetangga', category: 'Belanja pribadi', amount: 50000, type: 'expense' },
];

export const goals = [
  { id: 1, name: 'Dana darurat', target: 30000000, saved: 12750000, monthly: 1000000, emoji: '◒', tone: 'mint' },
  { id: 2, name: 'Motor baru', target: 18000000, saved: 6300000, monthly: 500000, emoji: '↗', tone: 'amber' },
  { id: 3, name: 'Liburan keluarga', target: 7500000, saved: 2850000, monthly: 350000, emoji: '✦', tone: 'violet' },
];

export const debts = [
  { id: 1, name: 'Kartu kredit BCA', balance: 4800000, apr: 24, minimum: 240000, icon: '▤', tone: 'rose' },
  { id: 2, name: 'PayLater marketplace', balance: 1900000, apr: 30, minimum: 190000, icon: '◈', tone: 'amber' },
  { id: 3, name: 'Cicilan motor', balance: 9600000, apr: 12, minimum: 450000, icon: '↗', tone: 'blue' },
];

export const bills = [
  { id: 1, name: 'Sewa rumah', day: 1, amount: 2200000, category: 'Rumah', paid: true },
  { id: 2, name: 'Listrik PLN', day: 10, amount: 285000, category: 'Tagihan', paid: true },
  { id: 3, name: 'Internet rumah', day: 15, amount: 200000, category: 'Tagihan', paid: false },
  { id: 4, name: 'Air & kebersihan', day: 10, amount: 165000, category: 'Tagihan', paid: false },
  { id: 5, name: 'Streaming film', day: 3, amount: 79000, category: 'Langganan', paid: true },
  { id: 6, name: 'Aplikasi musik', day: 21, amount: 72000, category: 'Langganan', paid: false },
  { id: 7, name: 'Uang sekolah', day: 5, amount: 500000, category: 'Sekolah', paid: true },
];

export const monthLabels = ['Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov'];
export const monthHistory = [
  { income: 11800000, spending: 10100000 },
  { income: 12000000, spending: 9700000 },
  { income: 12100000, spending: 10400000 },
  { income: 12500000, spending: 10800000 },
  { income: 12300000, spending: 9950000 },
  { income: 12500000, spending: 9310000 },
];
