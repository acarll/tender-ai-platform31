import { Tender, TenderStatus, AIStatus } from './types';

export const REGIONS = [
  'Mazowieckie', 'Małopolskie', 'Wielkopolskie', 'Dolnośląskie', 
  'Pomorskie', 'Śląskie', 'Lubelskie', 'Podkarpackie', 'Łódzkie', 
  'Kujawsko-Pomorskie', 'Zachodniopomorskie', 'Warmińsko-Mazurskie', 
  'Świętokrzyskie', 'Podlaskie', 'Opolskie', 'Lubuskie'
];

export const BRANCHES = [
  'Construction Work',
  'IT Services & Software',
  'Medical Equipment & Pharmaceuticals',
  'Transport & Logistics',
  'Energy & Fuels',
  'Education & Training',
  'Cleaning & Waste Management',
  'Security Services',
  'Legal & Consulting',
  'Furniture & Office Supplies',
  'Food & Agriculture',
  'Advertising & Marketing',
  'Architecture & Engineering',
  'Repair & Maintenance',
  'Textile & Clothing',
  'Telecommunications',
  'Research & Development'
];

// Polish CSV Header Mappings
export const CSV_MAPPING = {
  title: ['przedmiot', 'tytuł', 'title', 'name'],
  description: ['opis', 'treść', 'zakres', 'description'],
  client: ['zamawiajacy', 'klient', 'organizator', 'client'],
  budget: ['wartosc', 'budzet', 'cena', 'budget', 'value'],
  region: ['wojewodztwo', 'region', 'miasto', 'location'],
  deadline: ['termin', 'deadline', 'data', 'date', 'due'],
  deposit: ['wadium', 'deposit', 'zabezpieczenie', 'security', 'bond'],
  link: ['link', 'url', 'www', 'strona', 'adres']
};

const DEFAULT_CHECKLIST = {
    productsAnalyzed: false,
    clientContacted: false,
    proposalDrafted: false,
    followUpScheduled: false
};

export const MOCK_TENDERS: Tender[] = [
  {
    id: '1',
    title: 'Modernization of IT Infrastructure for City Hall',
    description: 'Comprehensive upgrade of server rooms, networking equipment, and cyber security software implementation for the Warsaw City Hall.',
    client: 'City of Warsaw',
    budget: 450000,
    currency: 'PLN',
    region: 'Mazowieckie',
    deadline: '2024-12-15',
    publishedDate: '2024-11-01',
    type: 'Services',
    branch: 'IT Services & Software',
    cpvCode: '72000000-5',
    status: TenderStatus.NEW,
    aiStatus: AIStatus.COMPLETED,
    summary: 'Supply of 10x Dell PowerEdge R750 servers (Dual Intel Xeon, 128GB RAM), 5x Cisco Catalyst 9200 switches, and implementation of Fortinet FortiGate 100F Firewall. Includes 36-month SLA.',
    keyRequirements: ['Cisco Certification', 'ISO 27001 Compliance', '36 months warranty'],
    keywords: ['Server', 'Network', 'Security', 'Cisco', 'Firewall'],
    score: 95,
    deposit: '10,000 PLN',
    documents: [
      { id: 'd1', name: 'Terms_of_Reference_v2.pdf', type: 'PDF', size: '2.4 MB', url: '#', uploadDate: '2024-11-01' },
      { id: 'd2', name: 'Network_Schematics.pdf', type: 'PDF', size: '5.1 MB', url: '#', uploadDate: '2024-11-02' },
      { id: 'd3', name: 'Pricing_Template.xlsx', type: 'XLSX', size: '45 KB', url: '#', uploadDate: '2024-11-01' }
    ],
    contactDetails: {
        person: 'Anna Kowalska',
        email: 'przetargi@warszawa.um.gov.pl',
        phone: '+48 22 443 00 00',
        address: 'Plac Bankowy 3/5, 00-950 Warszawa'
    },
    checklist: { ...DEFAULT_CHECKLIST, productsAnalyzed: true },
    clientHistory: [
        { id: 'h1', title: 'Supply of Laptops for Schools', date: '2023-08-15', winner: 'X-Kom Sp. z o.o.', price: 250000 },
        { id: 'h2', title: 'Maintenance of City Website', date: '2023-05-10', winner: 'SoftwareHouse SA', price: 120000 },
        { id: 'h3', title: 'Network Security Audit', date: '2022-11-20', winner: 'CyberSec Poland', price: 85000 }
    ]
  },
  {
    id: '2',
    title: 'Construction of Community Center in Krakow',
    description: 'Building a new 2-story community center including foundation, structural works, and interior finishing.',
    client: 'Municipality of Krakow',
    budget: 2500000,
    currency: 'PLN',
    region: 'Małopolskie',
    deadline: '2024-12-20',
    publishedDate: '2024-10-25',
    type: 'Works',
    branch: 'Construction Work',
    cpvCode: '45000000-7',
    status: TenderStatus.SAVED,
    aiStatus: AIStatus.PENDING,
    summary: '',
    keyRequirements: [],
    keywords: ['Concrete', 'Steel', 'Architecture', 'HVAC'],
    score: 60,
    deposit: 'Required',
    documents: [
      { id: 'd4', name: 'Architectural_Plans.zip', type: 'ZIP', size: '156 MB', url: '#', uploadDate: '2024-10-25' },
      { id: 'd5', name: 'Bill_of_Quantities.xlsx', type: 'XLSX', size: '1.2 MB', url: '#', uploadDate: '2024-10-26' }
    ],
    contactDetails: {
        person: 'Jan Nowak',
        email: 'inwestycje@krakow.pl',
        phone: '+48 12 616 12 34'
    },
    checklist: DEFAULT_CHECKLIST
  },
  {
    id: '3',
    title: 'Supply of Medical Imaging Equipment',
    description: 'Delivery and installation of MRI and CT scanners for the Regional Hospital.',
    client: 'Regional Hospital in Gdansk',
    budget: 1200000,
    currency: 'PLN',
    region: 'Pomorskie',
    deadline: '2025-01-10',
    publishedDate: '2024-11-05',
    type: 'Supplies',
    branch: 'Medical Equipment & Pharmaceuticals',
    cpvCode: '33100000-1',
    status: TenderStatus.REVIEWING,
    aiStatus: AIStatus.COMPLETED,
    summary: 'Procurement of 1x Siemens Magnetom Altea 1.5T MRI Scanner and 1x GE Revolution Maxima CT Scanner. Must include workstation terminals and lead shielding installation.',
    keyRequirements: ['Siemens or GE equipment', '24/7 Support Contract', 'Training for staff'],
    keywords: ['MRI', 'CT', 'Hospital', 'Imaging', 'Medical Device'],
    score: 20,
    documents: [],
    contactDetails: {
        person: 'Dr. Marek Zając',
        email: 'zamowienia@szpital.gdansk.pl',
        phone: '+48 58 300 11 22'
    },
    checklist: DEFAULT_CHECKLIST
  },
   {
    id: '4',
    title: 'Road Maintenance Service Contract 2025',
    description: 'Winter and summer maintenance of municipal roads in Wroclaw district.',
    client: 'Wroclaw Roads Authority',
    budget: 800000,
    currency: 'PLN',
    region: 'Dolnośląskie',
    deadline: '2024-11-30',
    publishedDate: '2024-10-20',
    type: 'Services',
    branch: 'Transport & Logistics',
    cpvCode: '90620000-9',
    status: TenderStatus.NEW,
    aiStatus: AIStatus.PENDING,
    keywords: ['Asphalt', 'Snow Removal', 'Maintenance', 'Roads'],
    score: 45,
    contactDetails: {
        person: 'Sekretariat ZDiUM',
        email: 'biuro@zdium.wroc.pl',
        phone: '+48 71 320 00 00'
    },
    checklist: DEFAULT_CHECKLIST
  },
  {
    id: '5',
    title: 'Software Development for Traffic Control',
    description: 'Development of an AI-powered traffic light management system.',
    client: 'Ministry of Transport',
    budget: 3000000,
    currency: 'PLN',
    region: 'Mazowieckie',
    deadline: '2025-02-01',
    publishedDate: '2024-11-10',
    type: 'Services',
    branch: 'IT Services & Software',
    cpvCode: '72200000-7',
    status: TenderStatus.SUBMITTED,
    aiStatus: AIStatus.COMPLETED,
    summary: 'Development of an AI Traffic Management System using Python/TensorFlow. Integration with 500+ existing street cameras. Deployment on AWS cloud infrastructure.',
    keyRequirements: ['Python', 'Computer Vision', 'Cloud Deployment'],
    keywords: ['AI', 'Traffic', 'Software', 'Python', 'Cloud'],
    score: 90,
    deposit: '50,000 PLN',
    documents: [
        { id: 'd6', name: 'API_Spec.pdf', type: 'PDF', size: '1.5 MB', url: '#', uploadDate: '2024-11-10' }
    ],
    contactDetails: {
        person: 'Piotr Wiśniewski',
        email: 'it.projects@gov.pl',
        phone: '+48 22 500 99 88'
    },
    checklist: {
        productsAnalyzed: true,
        clientContacted: true,
        proposalDrafted: true,
        followUpScheduled: true
    }
  },
  {
    id: '6',
    title: 'Cloud Migration for University',
    description: 'Migrating on-premise student database to AWS.',
    client: 'University of Technology',
    budget: 600000,
    currency: 'PLN',
    region: 'Wielkopolskie',
    deadline: '2025-03-01',
    publishedDate: '2024-11-12',
    type: 'Services',
    branch: 'IT Services & Software',
    cpvCode: '72000000-5',
    status: TenderStatus.NEW,
    aiStatus: AIStatus.COMPLETED,
    keywords: ['Cloud', 'AWS', 'Migration', 'Database', 'Security'],
    score: 85,
    contactDetails: {
        person: 'Katarzyna Lis',
        email: 'admin@put.edu.pl',
        phone: '+48 61 665 00 00'
    },
    checklist: DEFAULT_CHECKLIST
  },
  {
    id: '7',
    title: 'Cybersecurity Services for Banking Sector',
    description: 'Implementation of advanced cybersecurity solutions including threat detection, incident response, and security audits.',
    client: 'National Bank of Poland',
    budget: 1500000,
    currency: 'PLN',
    region: 'Mazowieckie',
    deadline: '2024-12-05',
    publishedDate: '2024-11-15',
    type: 'Services',
    branch: 'IT Services & Software',
    cpvCode: '72000000-5',
    status: TenderStatus.NEW,
    aiStatus: AIStatus.PENDING,
    keywords: ['Cybersecurity', 'Banking', 'Threat Detection', 'Compliance'],
    score: 88,
    contactDetails: {
        person: 'Michał Kowalczyk',
        email: 'przetargi@nbp.pl',
        phone: '+48 22 653 10 00'
    },
    checklist: DEFAULT_CHECKLIST
  },
  {
    id: '8',
    title: 'Renovation of Historical Building in Poznan',
    description: 'Comprehensive renovation of 19th-century building including facade restoration, roof repair, and interior modernization.',
    client: 'City of Poznan',
    budget: 3500000,
    currency: 'PLN',
    region: 'Wielkopolskie',
    deadline: '2025-01-15',
    publishedDate: '2024-11-08',
    type: 'Works',
    branch: 'Construction Work',
    cpvCode: '45000000-7',
    status: TenderStatus.NEW,
    aiStatus: AIStatus.COMPLETED,
    keywords: ['Renovation', 'Historical', 'Restoration', 'Heritage'],
    score: 55,
    contactDetails: {
        person: 'Agnieszka Nowak',
        email: 'konserwacja@poznan.pl',
        phone: '+48 61 878 50 00'
    },
    checklist: DEFAULT_CHECKLIST
  },
  {
    id: '9',
    title: 'Supply of Laboratory Equipment for Research Institute',
    description: 'Procurement of advanced laboratory equipment including spectrometers, microscopes, and analytical instruments.',
    client: 'Polish Academy of Sciences',
    budget: 950000,
    currency: 'PLN',
    region: 'Mazowieckie',
    deadline: '2025-02-20',
    publishedDate: '2024-11-18',
    type: 'Supplies',
    branch: 'Medical Equipment & Pharmaceuticals',
    cpvCode: '33100000-1',
    status: TenderStatus.NEW,
    aiStatus: AIStatus.PENDING,
    keywords: ['Laboratory', 'Research', 'Scientific Equipment', 'Analytics'],
    score: 42,
    contactDetails: {
        person: 'Prof. Jan Kowalski',
        email: 'zamowienia@pan.pl',
        phone: '+48 22 182 60 00'
    },
    checklist: DEFAULT_CHECKLIST
  },
  {
    id: '10',
    title: 'Public Transportation Management System',
    description: 'Development and implementation of integrated public transport management system with real-time tracking and mobile app.',
    client: 'Warsaw Public Transport Authority',
    budget: 2200000,
    currency: 'PLN',
    region: 'Mazowieckie',
    deadline: '2025-01-30',
    publishedDate: '2024-11-20',
    type: 'Services',
    branch: 'IT Services & Software',
    cpvCode: '72200000-7',
    status: TenderStatus.NEW,
    aiStatus: AIStatus.COMPLETED,
    keywords: ['Transport', 'Mobile App', 'Real-time', 'GPS', 'Management'],
    score: 92,
    contactDetails: {
        person: 'Tomasz Wiśniewski',
        email: 'it@ztm.waw.pl',
        phone: '+48 22 194 14 00'
    },
    checklist: DEFAULT_CHECKLIST
  },
  {
    id: '11',
    title: 'Waste Management Services for Municipal District',
    description: 'Comprehensive waste collection, recycling, and disposal services for residential and commercial areas.',
    client: 'Municipality of Lodz',
    budget: 1800000,
    currency: 'PLN',
    region: 'Łódzkie',
    deadline: '2024-12-10',
    publishedDate: '2024-11-05',
    type: 'Services',
    branch: 'Cleaning & Waste Management',
    cpvCode: '90500000-2',
    status: TenderStatus.NEW,
    aiStatus: AIStatus.PENDING,
    keywords: ['Waste', 'Recycling', 'Collection', 'Environmental'],
    score: 38,
    contactDetails: {
        person: 'Ewa Zielińska',
        email: 'odpady@uml.lodz.pl',
        phone: '+48 42 638 40 00'
    },
    checklist: DEFAULT_CHECKLIST
  },
  {
    id: '12',
    title: 'Energy Efficiency Audit and Modernization',
    description: 'Comprehensive energy audit and implementation of energy-saving solutions for public buildings.',
    client: 'Ministry of Climate',
    budget: 1200000,
    currency: 'PLN',
    region: 'Mazowieckie',
    deadline: '2025-02-15',
    publishedDate: '2024-11-14',
    type: 'Services',
    branch: 'Energy & Fuels',
    cpvCode: '71000000-8',
    status: TenderStatus.NEW,
    aiStatus: AIStatus.COMPLETED,
    keywords: ['Energy', 'Efficiency', 'Audit', 'Modernization', 'Sustainability'],
    score: 75,
    contactDetails: {
        person: 'Anna Krawczyk',
        email: 'przetargi@klimat.gov.pl',
        phone: '+48 22 369 29 00'
    },
    checklist: DEFAULT_CHECKLIST
  },
  {
    id: '13',
    title: 'Educational Software Platform Development',
    description: 'Development of comprehensive e-learning platform with course management, assessments, and student tracking.',
    client: 'Ministry of Education',
    budget: 2800000,
    currency: 'PLN',
    region: 'Mazowieckie',
    deadline: '2025-03-10',
    publishedDate: '2024-11-22',
    type: 'Services',
    branch: 'IT Services & Software',
    cpvCode: '72200000-7',
    status: TenderStatus.NEW,
    aiStatus: AIStatus.PENDING,
    keywords: ['E-learning', 'Education', 'Software', 'Platform', 'Online'],
    score: 80,
    contactDetails: {
        person: 'Piotr Nowak',
        email: 'it@men.gov.pl',
        phone: '+48 22 347 41 00'
    },
    checklist: DEFAULT_CHECKLIST
  },
  {
    id: '14',
    title: 'Furniture Supply for Government Offices',
    description: 'Supply and installation of ergonomic office furniture including desks, chairs, and storage solutions.',
    client: 'Government Administration',
    budget: 750000,
    currency: 'PLN',
    region: 'Mazowieckie',
    deadline: '2025-01-25',
    publishedDate: '2024-11-16',
    type: 'Supplies',
    branch: 'Furniture & Office Supplies',
    cpvCode: '39000000-9',
    status: TenderStatus.NEW,
    aiStatus: AIStatus.COMPLETED,
    keywords: ['Furniture', 'Office', 'Ergonomic', 'Supply'],
    score: 35,
    contactDetails: {
        person: 'Magdalena Szymańska',
        email: 'zamowienia@kprm.gov.pl',
        phone: '+48 22 694 50 00'
    },
    checklist: DEFAULT_CHECKLIST
  },
  {
    id: '15',
    title: 'Legal Advisory Services for Public Sector',
    description: 'Provision of legal advisory services including contract review, compliance, and regulatory guidance.',
    client: 'Various Public Entities',
    budget: 500000,
    currency: 'PLN',
    region: 'Mazowieckie',
    deadline: '2025-02-28',
    publishedDate: '2024-11-19',
    type: 'Services',
    branch: 'Legal & Consulting',
    cpvCode: '79100000-5',
    status: TenderStatus.NEW,
    aiStatus: AIStatus.PENDING,
    keywords: ['Legal', 'Advisory', 'Compliance', 'Consulting'],
    score: 65,
    contactDetails: {
        person: 'Dr. Katarzyna Mazur',
        email: 'przetargi@ms.gov.pl',
        phone: '+48 22 239 11 00'
    },
    checklist: DEFAULT_CHECKLIST
  }
];