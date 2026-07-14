export type InvoiceStatus = 'paid' | 'pending' | 'overdue' | 'partial' | 'draft';

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
  avatarColor: string;
  initials: string;
  totalRevenue: number;
  outstandingAmount: number;
  invoiceCount: number;
}

export interface Invoice {
  id: string;
  number: string;
  clientId: string;
  clientName: string;
  clientCompany: string;
  amount: number;
  dueDate: string;
  issueDate: string;
  status: InvoiceStatus;
  items: InvoiceItem[];
  notes: string;
  taxRate: number;
  discount: number;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
}

export interface Payment {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientCompany: string;
  amount: number;
  method: 'card' | 'bank' | 'paypal' | 'stripe';
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface Reminder {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientCompany: string;
  amount: number;
  daysOverdue: number;
  type: 'pre-due' | 'due' | 'post-due' | 'final-notice';
  tone: 'friendly' | 'professional' | 'firm' | 'legal';
  status: 'scheduled' | 'sent' | 'failed' | 'upcoming';
  scheduledDate: string;
  sentDate: string | null;
}

export const clients: Client[] = [
  {
    id: 'c1',
    name: 'Sarah Chen',
    company: 'Northwind Studio',
    email: 'sarah@northwindstudio.com',
    phone: '+1 (415) 555-0142',
    address: '340 Pine St, San Francisco, CA 94104',
    notes: 'Prefers monthly billing. Net-30 terms.',
    avatarColor: 'bg-blue-500',
    initials: 'SC',
    totalRevenue: 48200,
    outstandingAmount: 4200,
    invoiceCount: 12,
  },
  {
    id: 'c2',
    name: 'Marcus Johnson',
    company: 'Apex Digital Agency',
    email: 'marcus@apexdigital.io',
    phone: '+1 (212) 555-0198',
    address: '88 Greene Street, New York, NY 10012',
    notes: 'Fast payer. Usually settles within 10 days.',
    avatarColor: 'bg-emerald-500',
    initials: 'MJ',
    totalRevenue: 72500,
    outstandingAmount: 0,
    invoiceCount: 18,
  },
  {
    id: 'c3',
    name: 'Elena Rodriguez',
    company: 'Lumen Creative Co.',
    email: 'elena@lumencreative.co',
    phone: '+1 (305) 555-0177',
    address: '1450 Ocean Drive, Miami, FL 33139',
    notes: 'Requires detailed line items. Net-15.',
    avatarColor: 'bg-amber-500',
    initials: 'ER',
    totalRevenue: 31800,
    outstandingAmount: 6800,
    invoiceCount: 9,
  },
  {
    id: 'c4',
    name: 'David Park',
    company: 'Vertex Labs',
    email: 'david@vertexlabs.tech',
    phone: '+1 (206) 555-0123',
    address: '1201 3rd Ave, Seattle, WA 98101',
    notes: 'Quarterly retainer. Prefers ACH transfer.',
    avatarColor: 'bg-violet-500',
    initials: 'DP',
    totalRevenue: 96000,
    outstandingAmount: 12000,
    invoiceCount: 24,
  },
  {
    id: 'c5',
    name: 'Priya Sharma',
    company: 'Bloom Marketing',
    email: 'priya@bloommarketing.com',
    phone: '+1 (512) 555-0164',
    address: '500 W 2nd St, Austin, TX 78701',
    notes: 'New client. Onboarding phase.',
    avatarColor: 'bg-rose-500',
    initials: 'PS',
    totalRevenue: 14400,
    outstandingAmount: 3600,
    invoiceCount: 4,
  },
  {
    id: 'c6',
    name: 'Tom Walker',
    company: 'Walker Consulting',
    email: 'tom@walkerconsulting.net',
    phone: '+1 (617) 555-0189',
    address: '200 State St, Boston, MA 02109',
    notes: 'Long-term client. 2-year relationship.',
    avatarColor: 'bg-cyan-500',
    initials: 'TW',
    totalRevenue: 58900,
    outstandingAmount: 0,
    invoiceCount: 15,
  },
  {
    id: 'c7',
    name: 'Aisha Mohamed',
    company: 'Cedar & Co.',
    email: 'aisha@cedarco.design',
    phone: '+1 (312) 555-0155',
    address: '678 N Michigan Ave, Chicago, IL 60611',
    notes: 'Design retainer. Monthly billing.',
    avatarColor: 'bg-orange-500',
    initials: 'AM',
    totalRevenue: 41200,
    outstandingAmount: 5400,
    invoiceCount: 11,
  },
  {
    id: 'c8',
    name: 'Ryan Foster',
    company: 'Foster & Associates',
    email: 'ryan@fosterassoc.com',
    phone: '+1 (503) 555-0111',
    address: '900 SW 5th Ave, Portland, OR 97204',
    notes: 'Legal consulting. Strict payment terms.',
    avatarColor: 'bg-teal-500',
    initials: 'RF',
    totalRevenue: 67800,
    outstandingAmount: 8900,
    invoiceCount: 16,
  },
];

export const invoices: Invoice[] = [
  {
    id: 'i1',
    number: 'INV-2024-0142',
    clientId: 'c1',
    clientName: 'Sarah Chen',
    clientCompany: 'Northwind Studio',
    amount: 4200,
    dueDate: '2024-08-15',
    issueDate: '2024-07-15',
    status: 'pending',
    taxRate: 0,
    discount: 0,
    notes: 'Monthly retainer for design services.',
    items: [
      { description: 'UI/UX Design Retainer', quantity: 1, rate: 3500 },
      { description: 'Additional revisions', quantity: 7, rate: 100 },
    ],
  },
  {
    id: 'i2',
    number: 'INV-2024-0141',
    clientId: 'c4',
    clientName: 'David Park',
    clientCompany: 'Vertex Labs',
    amount: 12000,
    dueDate: '2024-07-01',
    issueDate: '2024-06-01',
    status: 'overdue',
    taxRate: 0,
    discount: 0,
    notes: 'Q2 engineering retainer.',
    items: [
      { description: 'Quarterly Engineering Retainer', quantity: 1, rate: 12000 },
    ],
  },
  {
    id: 'i3',
    number: 'INV-2024-0140',
    clientId: 'c2',
    clientName: 'Marcus Johnson',
    clientCompany: 'Apex Digital Agency',
    amount: 8400,
    dueDate: '2024-08-20',
    issueDate: '2024-07-20',
    status: 'paid',
    taxRate: 0,
    discount: 0,
    notes: 'Campaign management — July.',
    items: [
      { description: 'Campaign Strategy', quantity: 1, rate: 4000 },
      { description: 'Ad Management', quantity: 1, rate: 4400 },
    ],
  },
  {
    id: 'i4',
    number: 'INV-2024-0139',
    clientId: 'c3',
    clientName: 'Elena Rodriguez',
    clientCompany: 'Lumen Creative Co.',
    amount: 6800,
    dueDate: '2024-08-05',
    issueDate: '2024-07-05',
    status: 'overdue',
    taxRate: 0,
    discount: 200,
    notes: 'Brand identity package.',
    items: [
      { description: 'Logo Design', quantity: 1, rate: 3000 },
      { description: 'Brand Guidelines', quantity: 1, rate: 2000 },
      { description: 'Social Media Kit', quantity: 1, rate: 2000 },
    ],
  },
  {
    id: 'i5',
    number: 'INV-2024-0138',
    clientId: 'c5',
    clientName: 'Priya Sharma',
    clientCompany: 'Bloom Marketing',
    amount: 3600,
    dueDate: '2024-08-30',
    issueDate: '2024-07-30',
    status: 'pending',
    taxRate: 0,
    discount: 0,
    notes: 'Onboarding and strategy session.',
    items: [
      { description: 'Strategy Workshop', quantity: 1, rate: 1600 },
      { description: 'Content Calendar Setup', quantity: 1, rate: 2000 },
    ],
  },
  {
    id: 'i6',
    number: 'INV-2024-0137',
    clientId: 'c6',
    clientName: 'Tom Walker',
    clientCompany: 'Walker Consulting',
    amount: 5200,
    dueDate: '2024-08-10',
    issueDate: '2024-07-10',
    status: 'paid',
    taxRate: 0,
    discount: 0,
    notes: 'Monthly consulting services.',
    items: [
      { description: 'Consulting Retainer', quantity: 1, rate: 5200 },
    ],
  },
  {
    id: 'i7',
    number: 'INV-2024-0136',
    clientId: 'c7',
    clientName: 'Aisha Mohamed',
    clientCompany: 'Cedar & Co.',
    amount: 5400,
    dueDate: '2024-08-18',
    issueDate: '2024-07-18',
    status: 'partial',
    taxRate: 0,
    discount: 0,
    notes: 'Design retainer — August.',
    items: [
      { description: 'Design Retainer', quantity: 1, rate: 5400 },
    ],
  },
  {
    id: 'i8',
    number: 'INV-2024-0135',
    clientId: 'c8',
    clientName: 'Ryan Foster',
    clientCompany: 'Foster & Associates',
    amount: 8900,
    dueDate: '2024-07-15',
    issueDate: '2024-06-15',
    status: 'overdue',
    taxRate: 0,
    discount: 0,
    notes: 'Legal consulting retainer.',
    items: [
      { description: 'Legal Consulting', quantity: 1, rate: 7000 },
      { description: 'Contract Review', quantity: 1, rate: 1900 },
    ],
  },
  {
    id: 'i9',
    number: 'INV-2024-0134',
    clientId: 'c1',
    clientName: 'Sarah Chen',
    clientCompany: 'Northwind Studio',
    amount: 3500,
    dueDate: '2024-07-15',
    issueDate: '2024-06-15',
    status: 'paid',
    taxRate: 0,
    discount: 0,
    notes: 'June retainer.',
    items: [
      { description: 'Design Retainer', quantity: 1, rate: 3500 },
    ],
  },
  {
    id: 'i10',
    number: 'INV-2024-0133',
    clientId: 'c2',
    clientName: 'Marcus Johnson',
    clientCompany: 'Apex Digital Agency',
    amount: 7800,
    dueDate: '2024-07-20',
    issueDate: '2024-06-20',
    status: 'paid',
    taxRate: 0,
    discount: 0,
    notes: 'June campaign management.',
    items: [
      { description: 'Campaign Management', quantity: 1, rate: 7800 },
    ],
  },
  {
    id: 'i11',
    number: 'INV-2024-0132',
    clientId: 'c4',
    clientName: 'David Park',
    clientCompany: 'Vertex Labs',
    amount: 12000,
    dueDate: '2024-08-01',
    issueDate: '2024-07-01',
    status: 'pending',
    taxRate: 0,
    discount: 0,
    notes: 'Q3 engineering retainer.',
    items: [
      { description: 'Quarterly Retainer', quantity: 1, rate: 12000 },
    ],
  },
  {
    id: 'i12',
    number: 'INV-2024-0131',
    clientId: 'c3',
    clientName: 'Elena Rodriguez',
    clientCompany: 'Lumen Creative Co.',
    amount: 4200,
    dueDate: '2024-08-25',
    issueDate: '2024-07-25',
    status: 'draft',
    taxRate: 0,
    discount: 0,
    notes: 'Website redesign proposal.',
    items: [
      { description: 'Website Redesign', quantity: 1, rate: 4200 },
    ],
  },
];

export const payments: Payment[] = [
  {
    id: 'p1',
    invoiceNumber: 'INV-2024-0140',
    clientName: 'Marcus Johnson',
    clientCompany: 'Apex Digital Agency',
    amount: 8400,
    method: 'card',
    date: '2024-08-18',
    status: 'completed',
  },
  {
    id: 'p2',
    invoiceNumber: 'INV-2024-0137',
    clientName: 'Tom Walker',
    clientCompany: 'Walker Consulting',
    amount: 5200,
    method: 'bank',
    date: '2024-08-08',
    status: 'completed',
  },
  {
    id: 'p3',
    invoiceNumber: 'INV-2024-0134',
    clientName: 'Sarah Chen',
    clientCompany: 'Northwind Studio',
    amount: 3500,
    method: 'stripe',
    date: '2024-07-14',
    status: 'completed',
  },
  {
    id: 'p4',
    invoiceNumber: 'INV-2024-0133',
    clientName: 'Marcus Johnson',
    clientCompany: 'Apex Digital Agency',
    amount: 7800,
    method: 'card',
    date: '2024-07-19',
    status: 'completed',
  },
  {
    id: 'p5',
    invoiceNumber: 'INV-2024-0136',
    clientName: 'Aisha Mohamed',
    clientCompany: 'Cedar & Co.',
    amount: 2700,
    method: 'paypal',
    date: '2024-08-12',
    status: 'completed',
  },
  {
    id: 'p6',
    invoiceNumber: 'INV-2024-0142',
    clientName: 'Sarah Chen',
    clientCompany: 'Northwind Studio',
    amount: 4200,
    method: 'bank',
    date: '2024-08-14',
    status: 'pending',
  },
  {
    id: 'p7',
    invoiceNumber: 'INV-2024-0138',
    clientName: 'Ryan Foster',
    clientCompany: 'Foster & Associates',
    amount: 8900,
    method: 'card',
    date: '2024-08-01',
    status: 'failed',
  },
  {
    id: 'p8',
    invoiceNumber: 'INV-2024-0132',
    clientName: 'David Park',
    clientCompany: 'Vertex Labs',
    amount: 6000,
    method: 'bank',
    date: '2024-08-03',
    status: 'completed',
  },
];

export const reminders: Reminder[] = [
  {
    id: 'r1',
    invoiceNumber: 'INV-2024-0142',
    clientName: 'Sarah Chen',
    clientCompany: 'Northwind Studio',
    amount: 4200,
    daysOverdue: 0,
    type: 'pre-due',
    tone: 'friendly',
    status: 'upcoming',
    scheduledDate: '2024-08-13',
    sentDate: null,
  },
  {
    id: 'r2',
    invoiceNumber: 'INV-2024-0141',
    clientName: 'David Park',
    clientCompany: 'Vertex Labs',
    amount: 12000,
    daysOverdue: 44,
    type: 'post-due',
    tone: 'firm',
    status: 'sent',
    scheduledDate: '2024-07-15',
    sentDate: '2024-07-15',
  },
  {
    id: 'r3',
    invoiceNumber: 'INV-2024-0139',
    clientName: 'Elena Rodriguez',
    clientCompany: 'Lumen Creative Co.',
    amount: 6800,
    daysOverdue: 9,
    type: 'post-due',
    tone: 'professional',
    status: 'scheduled',
    scheduledDate: '2024-08-14',
    sentDate: null,
  },
  {
    id: 'r4',
    invoiceNumber: 'INV-2024-0135',
    clientName: 'Ryan Foster',
    clientCompany: 'Foster & Associates',
    amount: 8900,
    daysOverdue: 30,
    type: 'final-notice',
    tone: 'legal',
    status: 'failed',
    scheduledDate: '2024-08-10',
    sentDate: null,
  },
  {
    id: 'r5',
    invoiceNumber: 'INV-2024-0138',
    clientName: 'Priya Sharma',
    clientCompany: 'Bloom Marketing',
    amount: 3600,
    daysOverdue: 0,
    type: 'due',
    tone: 'friendly',
    status: 'upcoming',
    scheduledDate: '2024-08-30',
    sentDate: null,
  },
  {
    id: 'r6',
    invoiceNumber: 'INV-2024-0132',
    clientName: 'David Park',
    clientCompany: 'Vertex Labs',
    amount: 12000,
    daysOverdue: 0,
    type: 'pre-due',
    tone: 'professional',
    status: 'scheduled',
    scheduledDate: '2024-07-31',
    sentDate: null,
  },
  {
    id: 'r7',
    invoiceNumber: 'INV-2024-0136',
    clientName: 'Aisha Mohamed',
    clientCompany: 'Cedar & Co.',
    amount: 5400,
    daysOverdue: 3,
    type: 'post-due',
    tone: 'friendly',
    status: 'sent',
    scheduledDate: '2024-08-21',
    sentDate: '2024-08-21',
  },
];

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

export const analyticsData = {
  collectionRate: 84,
  latePaymentRate: 16,
  averageDaysToPay: 12,
  monthlyGrowth: 14.2,
  topClients: [
    { name: 'Vertex Labs', revenue: 96000, company: 'David Park' },
    { name: 'Apex Digital Agency', revenue: 72500, company: 'Marcus Johnson' },
    { name: 'Walker Consulting', revenue: 58900, company: 'Tom Walker' },
    { name: 'Foster & Associates', revenue: 67800, company: 'Ryan Foster' },
    { name: 'Northwind Studio', revenue: 48200, company: 'Sarah Chen' },
  ],
  outstandingClients: [
    { name: 'Vertex Labs', amount: 12000, company: 'David Park' },
    { name: 'Foster & Associates', amount: 8900, company: 'Ryan Foster' },
    { name: 'Lumen Creative Co.', amount: 6800, company: 'Elena Rodriguez' },
    { name: 'Cedar & Co.', amount: 5400, company: 'Aisha Mohamed' },
    { name: 'Bloom Marketing', amount: 3600, company: 'Priya Sharma' },
  ],
};

export const testimonials = [
  {
    id: 't1',
    name: 'Jordan Avery',
    role: 'Freelance Designer',
    company: 'Independent',
    content:
      'InvoiceFlow cut my late payments by 60%. The automated reminders are polite but effective — clients actually pay on time now.',
    avatarColor: 'bg-blue-500',
    initials: 'JA',
  },
  {
    id: 't2',
    name: 'Maya Thompson',
    role: 'Founder',
    company: 'Thompson Studio',
    content:
      'I used to spend hours chasing unpaid invoices. Now it just happens automatically. The AI reminder writer alone is worth the subscription.',
    avatarColor: 'bg-emerald-500',
    initials: 'MT',
  },
  {
    id: 't3',
    name: 'Carlos Mendez',
    role: 'Operations Lead',
    company: 'Mendez Agency',
    content:
      'The analytics dashboard gives me a clear picture of cash flow at a glance. I finally know exactly how much is outstanding and overdue.',
    avatarColor: 'bg-amber-500',
    initials: 'CM',
  },
  {
    id: 't4',
    name: 'Hannah Lee',
    role: 'Consultant',
    company: 'Lee Advisory',
    content:
      'Clean, fast, and professional. My clients have commented on how polished the invoices look. InvoiceFlow makes me look more established.',
    avatarColor: 'bg-violet-500',
    initials: 'HL',
  },
];

export const faqs = [
  {
    q: 'How does the automated reminder system work?',
    a: 'You configure reminder rules — before due date, on due date, and after due date. InvoiceFlow sends professional email reminders automatically based on your schedule. You can customize the tone, timing, and content of each reminder.',
  },
  {
    q: 'Can I customize invoice templates?',
    a: 'Yes. You can set your company logo, color scheme, invoice prefix, currency, and tax rate. Every invoice is generated from your template so your branding stays consistent across all client communications.',
  },
  {
    q: 'What payment methods are supported?',
    a: 'InvoiceFlow tracks payments made via credit card, bank transfer (ACH), PayPal, and Stripe. You can mark invoices as paid manually or let clients pay through integrated payment links.',
  },
  {
    q: 'Is my data secure?',
    a: 'All data is encrypted in transit and at rest. We use industry-standard security practices including TLS 1.3 encryption, secure session management, and regular security audits.',
  },
  {
    q: 'Can I cancel my subscription anytime?',
    a: 'Absolutely. You can upgrade, downgrade, or cancel your plan at any time from your account settings. No long-term contracts or cancellation fees.',
  },
  {
    q: 'Does InvoiceFlow work for agencies with multiple clients?',
    a: 'Yes. InvoiceFlow is built for freelancers, agencies, consultants, and small businesses. The client management system, analytics, and bulk reminder features scale from a handful of clients to hundreds.',
  },
];

export const pricingPlans = [
  {
    name: 'Starter',
    monthly: 0,
    yearly: 0,
    description: 'For freelancers just getting started.',
    features: [
      'Up to 5 clients',
      'Up to 10 invoices per month',
      'Basic reminder automation',
      'Payment tracking',
      'Email support',
    ],
    cta: 'Start Free',
    highlighted: false,
  },
  {
    name: 'Professional',
    monthly: 19,
    yearly: 15,
    description: 'For growing freelancers and consultants.',
    features: [
      'Unlimited clients',
      'Unlimited invoices',
      'Advanced reminder automation',
      'AI reminder writer',
      'Analytics dashboard',
      'Custom invoice branding',
      'Priority support',
    ],
    cta: 'Start 14-Day Trial',
    highlighted: true,
  },
  {
    name: 'Business',
    monthly: 49,
    yearly: 39,
    description: 'For agencies and small businesses.',
    features: [
      'Everything in Professional',
      'Multi-user access (5 seats)',
      'Advanced analytics & reporting',
      'API access',
      'Custom email templates',
      'Dedicated account manager',
      '24/7 phone support',
    ],
    cta: 'Start 14-Day Trial',
    highlighted: false,
  },
];

export const trustedByLogos = [
  'Northwind Studio',
  'Apex Digital',
  'Lumen Creative',
  'Vertex Labs',
  'Bloom Marketing',
  'Walker Consulting',
];

export const features = [
  {
    title: 'Invoice Management',
    description:
      'Create, edit, duplicate, and delete invoices in seconds. Professional templates with your branding, line items, taxes, and discounts.',
    icon: 'FileText',
    points: ['Create & Edit', 'Duplicate', 'Download PDF', 'Custom branding'],
  },
  {
    title: 'Automatic Reminder Emails',
    description:
      'Never chase a client again. Set up reminder rules for before, on, and after due dates. InvoiceFlow handles the follow-up automatically.',
    icon: 'BellRing',
    points: ['Pre-due reminders', 'Due date reminders', 'Post-due reminders', 'Final notices'],
  },
  {
    title: 'Payment Tracking',
    description:
      'Track every payment in real-time. Know exactly what is paid, pending, overdue, or partially paid at a glance.',
    icon: 'Wallet',
    points: ['Paid', 'Pending', 'Overdue', 'Partial payments'],
  },
  {
    title: 'Client Management',
    description:
      'Keep all client details in one place. Store contact info, addresses, notes, and view payment history per client.',
    icon: 'Users',
    points: ['Contact details', 'Email & phone', 'Billing address', 'Private notes'],
  },
  {
    title: 'Analytics',
    description:
      'Understand your cash flow with clear dashboards. Total revenue, pending, collected, average payment time, and monthly trends.',
    icon: 'BarChart3',
    points: ['Total revenue', 'Collection rate', 'Avg. payment time', 'Monthly trends'],
  },
  {
    title: 'AI Reminder Writer',
    description:
      'Generate polite, friendly, professional, or firm reminder emails with AI. Pick a tone, enter invoice details, and get a ready-to-send email.',
    icon: 'Sparkles',
    points: ['Friendly tone', 'Professional tone', 'Firm tone', 'Legal notice'],
  },
];

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCurrencyDetailed(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
