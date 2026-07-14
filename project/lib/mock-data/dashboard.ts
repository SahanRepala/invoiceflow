export const monthlyRevenue = [
  { month: 'Jan', revenue: 28400, collected: 26000 },
  { month: 'Feb', revenue: 31200, collected: 29800 },
  { month: 'Mar', revenue: 35600, collected: 33000 },
  { month: 'Apr', revenue: 32800, collected: 31000 },
  { month: 'May', revenue: 41200, collected: 38500 },
  { month: 'Jun', revenue: 38900, collected: 36200 },
  { month: 'Jul', revenue: 44600, collected: 41000 },
  { month: 'Aug', revenue: 48200, collected: 39600 },
];

export const invoiceStatusData = [
  { name: 'Paid', value: 42, color: 'hsl(var(--success))' },
  { name: 'Pending', value: 18, color: 'hsl(var(--primary))' },
  { name: 'Overdue', value: 11, color: 'hsl(var(--destructive))' },
  { name: 'Partial', value: 7, color: 'hsl(var(--warning))' },
];

export const dashboardStats = {
  totalRevenue: 301100,
  outstandingAmount: 40900,
  overdueAmount: 27700,
  invoicesSent: 78,
  invoicesPaid: 42,
  paymentRate: 72,
};

export const recentActivity = [
  {
    id: 'a1',
    type: 'payment',
    title: 'Payment received from Apex Digital Agency',
    description: 'INV-2024-0140 · $8,400',
    time: '2 hours ago',
  },
  {
    id: 'a2',
    type: 'reminder',
    title: 'Reminder sent to Vertex Labs',
    description: 'INV-2024-0141 · Firm tone',
    time: '5 hours ago',
  },
  {
    id: 'a3',
    type: 'invoice',
    title: 'Invoice INV-2024-0142 created',
    description: 'Northwind Studio · $4,200',
    time: '1 day ago',
  },
  {
    id: 'a4',
    type: 'payment',
    title: 'Partial payment from Cedar & Co.',
    description: 'INV-2024-0136 · $2,700 of $5,400',
    time: '2 days ago',
  },
  {
    id: 'a5',
    type: 'client',
    title: 'New client onboarded: Bloom Marketing',
    description: 'Priya Sharma · Austin, TX',
    time: '3 days ago',
  },
  {
    id: 'a6',
    type: 'reminder',
    title: 'Reminder failed to send to Foster & Associates',
    description: 'INV-2024-0135 · Bounced email',
    time: '4 days ago',
  },
];

export const upcomingReminders = [
  {
    id: 'u1',
    clientName: 'Sarah Chen',
    clientCompany: 'Northwind Studio',
    amount: 4200,
    dueDate: '2024-08-15',
    type: 'Pre-due reminder',
    daysLeft: 1,
  },
  {
    id: 'u2',
    clientName: 'Priya Sharma',
    clientCompany: 'Bloom Marketing',
    amount: 3600,
    dueDate: '2024-08-30',
    type: 'Due date reminder',
    daysLeft: 16,
  },
  {
    id: 'u3',
    clientName: 'David Park',
    clientCompany: 'Vertex Labs',
    amount: 12000,
    dueDate: '2024-08-01',
    type: 'Post-due reminder',
    daysLeft: -13,
  },
  {
    id: 'u4',
    clientName: 'Elena Rodriguez',
    clientCompany: 'Lumen Creative Co.',
    amount: 6800,
    dueDate: '2024-08-05',
    type: 'Post-due reminder',
    daysLeft: -9,
  },
];

export const recentPayments = [
  {
    id: 'rp1',
    clientName: 'Marcus Johnson',
    clientCompany: 'Apex Digital Agency',
    amount: 8400,
    invoiceNumber: 'INV-2024-0140',
    date: '2024-08-18',
    method: 'card' as const,
  },
  {
    id: 'rp2',
    clientName: 'Tom Walker',
    clientCompany: 'Walker Consulting',
    amount: 5200,
    invoiceNumber: 'INV-2024-0137',
    date: '2024-08-08',
    method: 'bank' as const,
  },
  {
    id: 'rp3',
    clientName: 'Aisha Mohamed',
    clientCompany: 'Cedar & Co.',
    amount: 2700,
    invoiceNumber: 'INV-2024-0136',
    date: '2024-08-12',
    method: 'paypal' as const,
  },
  {
    id: 'rp4',
    clientName: 'Sarah Chen',
    clientCompany: 'Northwind Studio',
    amount: 3500,
    invoiceNumber: 'INV-2024-0134',
    date: '2024-07-14',
    method: 'stripe' as const,
  },
];
