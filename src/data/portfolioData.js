export const PERSON = {
  name: 'Mukeshram S',
  title: 'Machine Learning Engineer | AI Engineer | Data Scientist',
  role: 'Machine Learning Engineer',
  headline:
    'Machine Learning Engineer focused on building production-ready AI systems using Machine Learning, Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), AI Agents, and Data Engineering.',
  about:
    'Final-year Artificial Intelligence & Data Science student passionate about solving real-world problems through logical thinking, analytical problem-solving, and intelligent AI systems. I specialize in Machine Learning, Generative AI, Large Language Models, Retrieval-Augmented Generation (RAG), AI Agents, and Data Engineering. I enjoy designing and building end-to-end AI applications—from data collection and model development to deployment and visualization—with a focus on scalable, production-ready solutions.',
  linkedin: 'https://linkedin.com/in/mukeshram-s',
  github: 'https://github.com/Mukeshram-07',
  resume: 'https://drive.google.com/file/d/1FVeMv8ZmxI0KycH5mXR8wj7XsVcwmRzn/view',
  articles: 'https://mukeshramdatascience.blogspot.com/',
  formspree: 'https://formspree.io/f/mreaqpnp',
  availableFor: [
    'Full-Time Opportunities',
    'Internships',
    'Freelance Projects',
    'Open Source Collaboration',
  ],
};

export const STATS = [
  { id: 'projects', label: 'Projects Completed', value: 12 },
  { id: 'certs', label: 'Professional Certifications', value: 17 },
  { id: 'exp', label: 'Industry Experience', value: 5 },
  { id: 'events', label: 'Leadership & Events', value: 11 },
];

export const EDUCATION = [
  {
    degree: 'B.Tech – Artificial Intelligence and Data Science',
    duration: '2023 – 2027',
    institution: 'Dhanalakshmi Srinivasan University',
    location: 'Tiruchirappalli, Tamil Nadu',
    type: 'university',
  },
  {
    degree: 'Higher Secondary Education',
    duration: '2023',
    institution: 'Maharishi Vidhya Mandir Matric Hr. Sec. School',
    location: 'Karaikudi, Tamil Nadu',
    type: 'school',
  },
];

export const SKILL_GROUPS = [
  {
    title: 'Programming Languages',
    skills: [
      { name: 'Python', icon: 'python' },
      { name: 'Java', icon: 'openjdk' },
      { name: 'C++', icon: 'cplusplus' },
      { name: 'SQL', icon: 'mysql' },
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
    ],
  },
  {
    title: 'Machine Learning',
    skills: [
      { name: 'TensorFlow', icon: 'tensorflow' },
      { name: 'PyTorch', icon: 'pytorch' },
      { name: 'Scikit-learn', icon: 'scikitlearn' },
      { name: 'OpenCV', icon: 'opencv' },
      { name: 'Pandas', icon: 'pandas' },
      { name: 'NumPy', icon: 'numpy' },
    ],
  },
  {
    title: 'Generative AI',
    skills: [
      { name: 'LangChain', icon: 'langchain' },
      { name: 'Hugging Face', icon: 'huggingface' },
      { name: 'ChromaDB', icon: 'custom-chroma' },
      { name: 'Sentence Transformers', icon: 'custom-st' },
      { name: 'OpenAI API', icon: 'openai' },
      { name: 'Ollama', icon: 'ollama' },
      { name: 'RAG', icon: 'custom-rag' },
      { name: 'Prompt Engineering', icon: 'custom-prompt' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'FastAPI', icon: 'fastapi' },
      { name: 'Flask', icon: 'flask' },
      { name: 'Node.js', icon: 'nodedotjs' },
      { name: 'REST APIs', icon: 'custom-rest' },
    ],
  },
  {
    title: 'Data Engineering',
    skills: [
      { name: 'ETL Pipelines', icon: 'custom-etl' },
      { name: 'Data Cleaning', icon: 'custom-datacleaning' },
      { name: 'Data Processing', icon: 'custom-dataprocessing' },
      { name: 'Feature Engineering', icon: 'custom-feature' },
    ],
  },
  {
    title: 'Cloud & DevOps',
    skills: [
      { name: 'AWS', icon: 'amazonaws' },
      { name: 'Google Cloud', icon: 'googlecloud' },
      { name: 'Docker', icon: 'docker' },
      { name: 'Cloudflare', icon: 'cloudflare' },
    ],
  },
  {
    title: 'Data Visualization',
    skills: [
      { name: 'Power BI', icon: 'powerbi' },
      { name: 'Matplotlib', icon: 'custom-matplotlib' },
      { name: 'Plotly', icon: 'plotly' },
      { name: 'Streamlit', icon: 'streamlit' },
    ],
  },
];

export const PROJECTS = [
  /* ── New featured projects ─────────────────────── */
  {
    title: 'AlexVale Gmail MCP',
    category: 'AI • MCP • Gmail Automation',
    role: 'AI Automation Engineer',
    overview: 'An intelligent Gmail automation server built using the Model Context Protocol (MCP). Enables AI assistants to securely read, search, summarize, and manage Gmail within LLM-powered workflows.',
    highlights: ['Model Context Protocol (MCP)', 'Gmail API Integration', 'Email Search & Retrieval', 'AI-powered Summarization', 'Secure Authentication', 'Automation Ready'],
    problem: 'AI assistants lack secure, standardized access to Gmail for reading, searching, and managing emails programmatically.',
    solution: 'Built an MCP server using FastMCP and Gmail API with OAuth authentication, exposing structured tools for AI agents to interact with Gmail securely.',
    tech: ['Python', 'FastMCP', 'Gmail API', 'OAuth', 'Google Cloud', 'JSON'],
    github: 'https://github.com/Mukeshram-07/alexvale-gmail-mcp',
    featured: true,
  },
  {
    title: 'Multimodal RAG System',
    category: 'Generative AI • RAG • LLM',
    role: 'AI / ML Engineer',
    overview: 'A production-ready Multimodal Retrieval-Augmented Generation system that ingests PDFs, performs semantic retrieval, and generates citation-aware answers using Large Language Models.',
    highlights: ['PDF Ingestion', 'Vector Database', 'Semantic Search', 'Citation-aware Responses', 'FastAPI Backend', 'Streamlit UI', 'Production Architecture'],
    problem: 'LLMs hallucinate and lack grounding in proprietary documents, limiting their reliability for enterprise use.',
    solution: 'Built a full RAG pipeline: PDF chunking → embedding → ChromaDB storage → semantic retrieval → LLM answer generation with citations, served via FastAPI and Streamlit.',
    tech: ['Python', 'FastAPI', 'Streamlit', 'ChromaDB', 'Sentence Transformers', 'LLMs', 'RAG'],
    github: 'https://github.com/Mukeshram-07/multimodal-rag',
    featured: true,
  },
  {
    title: 'AI Agent for Data Scientists',
    category: 'AI Agents • Machine Learning',
    role: 'AI Agent Developer',
    overview: 'An AI-powered assistant for data scientists that automates data exploration, analysis, visualization, feature engineering, and ML workflows through an intelligent conversational interface.',
    highlights: ['AI Agent', 'Data Analysis', 'ML Workflow Automation', 'Visualization', 'Intelligent Insights', 'End-to-End Analytics'],
    problem: 'Data scientists spend excessive time on repetitive EDA and pipeline tasks that could be automated intelligently.',
    solution: 'Built a conversational AI agent that interprets natural language queries, executes data analysis pipelines, generates visualizations, and surfaces ML insights automatically.',
    tech: ['React', 'FastAPI', 'Python', 'Machine Learning', 'LLMs', 'Pandas', 'Plotly'],
    github: 'https://github.com/Mukeshram-07/ai-agent-ds',
    featured: true,
  },
  /* ── Existing projects ──────────────────────────── */
  {
    title: 'Job Market Skill Demand Analyzer',
    role: 'Full Stack Developer & Data Scientist',
    overview: 'End-to-end data science project analyzing real-time job market skill demand.',
    problem: 'Job seekers lack visibility into which skills are currently in demand across the market.',
    solution: 'Built a system that fetches real-time job data via API, extracts skills using NLP, performs trend analysis, and visualizes results in an interactive Streamlit dashboard.',
    tech: ['Python', 'NLP', 'Streamlit', 'Scikit-learn', 'Pandas'],
    github: 'https://github.com/Mukeshram-07/job-market-skill-demand-analyzer',
    featured: true,
  },
  {
    title: 'Delivery Delay Prediction System',
    role: 'ML Developer',
    overview: 'ML classification system predicting delivery delays from logistics data.',
    problem: 'Logistics companies struggle to proactively identify deliveries at risk of delays.',
    solution: 'Developed a classification model with feature engineering on operational data to predict delay risk with high accuracy.',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'Classification', 'Feature Engineering'],
    github: 'https://github.com/Mukeshram-07/delivery-delay-prediction',
    featured: true,
  },
  {
    title: 'Study Buddy – ML-Based Learning Assistant',
    role: 'Developer & Designer',
    overview: 'ML-powered educational assistant for personalized learning.',
    problem: 'Students need adaptive tools that generate study material on demand.',
    solution: 'Built an NLP pipeline that generates summaries, quizzes, flashcards, and concept explanations from uploaded content.',
    tech: ['Python', 'NLP', 'ML', 'Education AI'],
    github: 'https://github.com/Mukeshram-07/ai-study-buddy',
    featured: true,
  },
  {
    title: 'Sales Prediction Trend Analysis',
    role: 'ML Engineer & Data Analyst',
    overview: 'ML-based sales forecasting and trend analysis system.',
    problem: 'Businesses need reliable forecasts to plan inventory and sales strategy.',
    solution: 'Applied regression models and time-series analysis to historical sales data for accurate future sales prediction.',
    tech: ['Python', 'Regression', 'Forecasting', 'Analytics'],
    github: 'https://github.com/Mukeshram-07/sales-prediction-trend-analysis',
  },
  {
    title: 'Born 2 Ride – Travel Planner & Fuel Cost Estimator',
    role: 'Concept Creation & Logic Design',
    overview: 'ML-powered travel planning with fuel cost estimation.',
    problem: 'Travelers lack tools to accurately estimate trip costs and find relevant recommendations.',
    solution: 'Built fuel cost estimation using vehicle mileage and distance inputs, with ML-based hotel and food recommendations using location intelligence.',
    tech: ['Python', 'ML', 'Location AI', 'Analytics'],
    github: 'https://github.com/Mukeshram-07/Born2Ride',
  },
  {
    title: 'Trichy Restaurant Data Analytics',
    role: 'Data Analysis & Dashboard Design',
    overview: 'Comprehensive analytics on 6000+ restaurant survey responses.',
    problem: 'No structured insights existed from large-scale local restaurant survey data.',
    solution: 'Cleaned and analyzed 6000+ survey responses using Python and Pandas, built Power BI dashboards to surface business trends and KPIs.',
    tech: ['Python', 'Pandas', 'Power BI', 'EDA'],
    github: 'https://github.com/Mukeshram-07/Trichy-Restaurant-Data-Analytics',
  },
  {
    title: 'Movie Ratings Analysis',
    role: 'Team Lead – Launchspring Internship',
    overview: 'Statistical analysis of 550,000+ movie rating records.',
    problem: 'Large-scale rating data requires structured preprocessing and statistical analysis workflows.',
    solution: 'Led a 6-member team to process 550k+ records, performing correlation analysis, trend detection, and statistical insight generation.',
    tech: ['Python', 'Statistics', 'Pandas', 'Data Analysis'],
    github: 'https://github.com/Mukeshram-07/Movie-Ratings-Analysis',
  },
  {
    title: 'NeoGuard – IoT Health & Environment Monitor',
    category: 'IoT • Real-time • Backend',
    role: 'Backend Developer',
    overview: 'Real-time IoT health and environment monitoring system with intelligent multi-channel alert dispatching via browser, SMS, and Telegram.',
    highlights: ['Real-time IoT', 'Anomaly Detection', 'Multi-channel Alerts', 'Threat Scoring', 'Socket.IO'],
    problem: 'IoT health monitoring systems lack intelligent alert prioritization, causing alert fatigue and missed critical events.',
    solution: 'Built a Node.js backend with Z-score anomaly detection, rule-based alert engine with priority sorting, cooldown management, and multi-channel dispatch via Twilio SMS and Telegram Bot.',
    tech: ['Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'Twilio', 'Telegram API'],
    github: 'https://github.com/Mukeshram-07/Neo-Guard',
  },
  {
    title: 'Segmentation of AI – Research Project',
    role: 'Lead Author',
    overview: 'Research paper on AI domain segmentation and architecture patterns.',
    problem: 'There is limited structured documentation on how AI domains are segmented and applied in real-world systems.',
    solution: 'Authored a comprehensive research paper covering AI domain segmentation, architecture patterns, and real-world implementation frameworks.',
    tech: ['Research', 'AI Architecture', 'Documentation'],
    demo: 'https://drive.google.com/drive/folders/1WYWV3cFeCiIHUdKcqdZ4jJbkNG7TvlsV',
  },
];

export const EXPERIENCE = [
  {
    company: 'AMDOX Technologies',
    title: 'Data Science Intern',
    duration: 'Nov 2025 – Feb 2026',
    badge: 'Data Science Intern',
    certificate: null, // add Google Drive / URL here when available
    tech: ['Python', 'Pandas', 'NumPy', 'SQL', 'Excel', 'Data Analytics', 'EDA', 'Data Visualization'],
    points: [
      'Cleaned and transformed structured datasets to prepare them for downstream analysis',
      'Performed Exploratory Data Analysis (EDA) using Python to surface trends and patterns',
      'Built business reports and interactive visualizations to communicate data-driven insights',
      'Queried relational databases using SQL and assisted in generating actionable insights for decision making',
    ],
  },
  {
    company: 'Edunet Foundation (IBM)',
    title: 'AI/ML Intern',
    duration: '2025',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'ML Pipelines'],
    points: [
      'Developed ML models for prediction and analytics under IBM-supported Edunet Foundation program',
      'Implemented end-to-end data preprocessing, feature engineering, model training, and evaluation pipelines',
      'Built classification and regression models using Scikit-learn on real-world datasets',
      'Optimized model performance through cross-validation and hyperparameter tuning',
    ],
  },
  {
    company: 'Launchspring',
    title: 'Data Analytics Intern (Team Lead)',
    duration: 'September 2025',
    tech: ['Python', 'Pandas', 'Power BI', 'Data Analysis'],
    points: [
      'Led a 6-member analytics team, managing task allocation and workflow organization',
      'Analyzed 550,000+ movie rating records for statistical insights and trend detection',
      'Designed structured data analysis workflows covering collection, cleaning, and reporting',
      'Collaborated with cross-functional members to deliver actionable business insights',
    ],
  },
  {
    company: 'VDart',
    title: 'Data Analytics OJT',
    duration: 'July 2025 – September 2025',
    tech: ['Python', 'Data Cleaning', 'EDA', 'Analytics'],
    points: [
      'Applied structured data workflows on real-world business datasets',
      'Automated data collection, cleaning, and preprocessing pipelines',
      'Analyzed datasets to support business analytics and generate actionable reports',
      'Gained practical exposure to enterprise data analysis processes and tools',
    ],
  },
  {
    company: 'Journal Club – AI & DS Dept.',
    title: 'Vice President',
    duration: 'September 2025 – Present',
    tech: ['Leadership', 'Event Management', 'AI/DS'],
    points: [
      'Led academic initiatives and knowledge-sharing sessions in AI and Data Science',
      'Organized and coordinated 8+ technical events, workshops, and guest lectures',
      'Managed volunteer teams and oversaw documentation and organizational records',
      'Built community around AI/DS research and industry trends',
    ],
  },
];

export const CERT_GROUPS = [
  {
    category: 'Machine Learning & AI',
    items: [
      { name: 'Machine Learning with Python', issuer: 'IBM', icon: 'ibm' },
      { name: 'Data Analysis with Python', issuer: 'IBM', icon: 'ibm' },
      { name: 'Data Fundamentals', issuer: 'IBM', icon: 'ibm' },
      { name: 'Getting Started with Data', issuer: 'IBM', icon: 'ibm' },
      { name: 'Data Science Essentials with Python', issuer: 'Cisco', icon: 'cisco' },
      { name: 'Data Science', issuer: 'HP LIFE', icon: 'hp' },
    ],
  },
  {
    category: 'Data Analytics',
    items: [
      { name: 'Meta Data Analyst Professional Certificate', issuer: 'Meta', icon: 'meta' },
      { name: 'Tata Data Analytics Job Simulation', issuer: 'Tata', icon: 'tata' },
      { name: 'Foundation of Data', issuer: 'Google', icon: 'google' },
      { name: 'Data Analytics', issuer: 'Grow AI', icon: null },
      { name: 'Power BI with AI', issuer: 'Udemy', icon: 'udemy' },
      { name: 'Excel Essentials Workbook', issuer: 'Acacia University', icon: 'microsoftexcel' },
    ],
  },
  {
    category: 'Cloud',
    items: [
      { name: 'SnowPro Associate', issuer: 'Snowflake', icon: 'snowflake' },
      { name: 'AWS Academy Machine Learning Foundations', issuer: 'Amazon Web Services', icon: 'amazonaws' },
    ],
  },
  {
    category: 'Leadership & Professional Development',
    items: [
      { name: 'Business Analyst', issuer: 'Agile Enterprise, London', icon: null },
      { name: 'Executive Diploma in Leadership & Management', issuer: 'MTF Institute', icon: null },
      { name: 'Presentation Skills', issuer: 'TCS', icon: 'tcs' },
    ],
  },
];

export const CURRENTLY_EXPLORING = [
  { name: 'AI Agents', icon: 'custom-agent' },
  { name: 'Agentic AI', icon: 'custom-agentic' },
  { name: 'MCP Protocol', icon: 'custom-mcp' },
  { name: 'Multimodal RAG', icon: 'custom-multimodal' },
  { name: 'Vector Databases', icon: 'custom-vector' },
  { name: 'MLOps', icon: 'custom-mlops' },
  { name: 'Kubernetes', icon: 'kubernetes' },
];

export const JOURNEY_MILESTONES = [
  { year: '2023', title: 'Started B.Tech AI & Data Science', desc: 'Joined Dhanalakshmi Srinivasan University, began deep dive into AI fundamentals.' },
  { year: '2024', title: 'First ML Projects & Research', desc: 'Built early ML projects, participated in hackathons, authored AI research paper.' },
  { year: 'Jul 2025', title: 'VDart Data Analytics OJT', desc: 'Applied structured data workflows on real-world enterprise datasets.' },
  { year: 'Sep 2025', title: 'Launchspring Team Lead', desc: 'Led 6-member analytics team, analyzed 550k+ records for statistical insights.' },
  { year: 'Sep 2025', title: 'IBM Edunet AI/ML Internship', desc: 'Developed production ML models under IBM-supported program.' },
  { year: 'Sep 2025', title: 'Vice President – Journal Club', desc: 'Organized 8+ technical events and led AI/DS academic initiatives.' },
  { year: 'Nov 2025', title: 'AMDOX Data Science Internship', desc: 'Completed 3-month internship on Data Science, EDA, SQL, analytics, and data visualization.' },
  { year: 'Present', title: 'Building Production-Ready AI Systems', desc: 'Focused on LLMs, RAG pipelines, AI Agents, and scalable ML deployments.' },
];

export const EVENTS = [
  { title: 'AI Conclave 2026', year: '2026', org: 'DSU – AI & DS Department', desc: 'Co-organized featuring 5 guest speakers from IIIT. Technical talks and panel discussions on emerging AI technologies and research trends.' },
  { title: 'Promptify – AI Image Prompt Engineering', year: '2026', org: 'DSU – Journal Club', desc: 'Organized event on image prompt engineering using generative AI tools. Guided students in prompt design and AI creativity workflows.' },
  { title: 'AI Summit – Research Paper Presentation', year: '2026', org: 'DSU – AI & DS Department', desc: 'Intra-college AI summit featuring research paper presentations, technical discussions, and knowledge sharing among students and faculty.' },
  { title: 'uMagineDX & ICT Academy – Panel Discussion', year: '2026', org: 'ICT Academy', desc: 'Led coordination for industry panel discussion bringing together AI/DS experts and students for structured knowledge exchange.' },
  { title: 'Tech Fest – Project Expo', year: '2026', org: 'School of Engineering', desc: 'Coordinated the School of Engineering Project Expo featuring innovative engineering projects across multiple departments. Managed evaluation, participants, and presentations.' },
  { title: 'Unity AR/VR Training Program', year: '2026', org: 'Department of AI & Data Science', desc: 'Organized an immersive Unity AR/VR training program introducing students to virtual reality development and Unity-based application development.' },
  { title: 'Smartathon – 12 Hour Hackathon', year: '2026', org: 'Department of AI & Data Science', desc: 'Organized a 12-hour intra-college Smartathon encouraging innovation, rapid prototyping, teamwork, and problem-solving through intensive hackathon challenges.' },
  { title: 'AI Expert Exchange – Group Discussion', year: '2025', org: 'DSU – Journal Club', desc: 'Organized interactive sessions focused on current AI trends and industry perspectives with expert practitioners.' },
  { title: 'Startup Spark – Innovation Event', year: '2025', org: 'DSU – Journal Club', desc: 'Coordinated event showcasing student startups and entrepreneurial ventures in AI/DS domain.' },
  { title: 'BIYOnd – Data Analytics Event', year: '2025', org: 'DSU – AI & DS Department', desc: 'Managed comprehensive data analytics event featuring workshops and competitions.' },
  { title: 'Neura Fest – Project Expo', year: '2025', org: 'DSU – AI & DS Department', desc: 'Supervised large-scale project exhibition showcasing innovative AI and data science projects from students across departments.' },
];

export const ACHIEVEMENTS = [
  {
    title: '1st Prize – SYNERGIA 0.1 National Level Hackathon',
    year: '2026',
    org: 'Dept. of CSE (IoT), Dhanalakshmi Srinivasan University',
    result: '1st Place',
    desc: 'Secured First Prize at the SYNERGIA 0.1 National Level Hackathon by developing an AI-powered healthcare solution demonstrating innovation, teamwork, and real-world problem solving.',
    tags: ['Hackathon', 'Winner', 'AI', 'Healthcare', 'Innovation'],
  },
  {
    title: '2nd Runner-Up – Chemovate 2.0 MedTech Hackathon',
    year: '2026',
    org: "St. Joseph's College of Engineering, Chennai",
    result: '3rd Place',
    desc: 'Secured 2nd Runner-Up in the MedTech domain during the 24-hour Chemovate 2.0 Hackathon by building an innovative healthcare-focused AI solution under strict time constraints.',
    tags: ['Hackathon', 'MedTech', 'Healthcare', 'Innovation', 'Teamwork'],
  },
  {
    title: '2nd Place – Tablitics Data Analytics Competition',
    year: '2025',
    org: 'Tablitics',
    result: '2nd Place',
    desc: 'Secured 2nd prize in Power BI data analytics competition. Developed interactive dashboards and extracted actionable insights using real-world dataset.',
    tags: ['Analytics', 'Power BI', 'Winner'],
  },
  {
    title: '3rd Place – Coding Battle',
    year: "QUBEIT'24, KRCE Trichy",
    org: 'KRCE Trichy',
    result: '3rd Place',
    desc: 'Secured third position in competitive coding competition demonstrating strong algorithmic problem-solving skills.',
    tags: ['Coding', 'Competition'],
  },
  {
    title: 'Open Source Contributor',
    year: 'Ongoing',
    org: 'GitHub',
    result: 'Active',
    desc: 'Active open source contributor managing frontend and backend repositories. Building reusable components, REST APIs, and AI-integrated tools shared with the developer community.',
    tags: ['Open Source', 'Frontend', 'Backend', 'Community'],
  },
];

/* ── Technical Leadership & Community ──────────────────── */
export const LEADERSHIP_EVENTS = [
  {
    title: 'AI Conclave 2026',
    date: '2026',
    org: 'DSU – AI & DS Department',
    desc: 'Co-organized AI Conclave 2026 featuring 5 guest speakers from IIIT. The event included technical talks, panel discussions, and student interaction sessions focused on emerging AI technologies and research trends.',
    tags: ['AI', 'Event', 'Organizer', 'Speaker'],
  },
  {
    title: 'Promptify – AI Image Prompt Engineering',
    date: '2026',
    org: 'DSU – Journal Club',
    desc: 'Organized and conducted an event focused on image prompt engineering using generative AI tools. Guided students in prompt design and AI creativity workflows.',
    tags: ['AI', 'Event', 'Organizer'],
  },
  {
    title: 'AI Summit – Research Paper Presentation',
    date: '2026',
    org: 'DSU – AI & DS Department',
    desc: 'Conducted intra-college AI summit featuring research paper presentations, technical discussions, and knowledge sharing among students and faculty.',
    tags: ['Research', 'Event', 'Organizer'],
  },
  {
    title: 'uMagineDX & ICT Academy – Panel Discussion',
    date: '2026',
    org: 'ICT Academy',
    desc: 'Led coordination for industry panel discussion bringing together AI and Data Science experts and students for structured knowledge exchange.',
    tags: ['Leadership', 'Event', 'Organizer'],
  },
  {
    title: 'Tech Fest – Project Expo',
    date: '2026',
    org: 'School of Engineering',
    desc: 'Coordinated and managed the School of Engineering Project Expo featuring innovative engineering projects across multiple departments. Responsible for project evaluation coordination, participant management, and technical presentation sessions.',
    tags: ['Project Expo', 'Engineering', 'Organizer', 'Innovation'],
  },
  {
    title: 'Unity AR/VR Training Program',
    date: '2026',
    org: 'Department of AI & Data Science',
    desc: 'Organized and coordinated an immersive Unity AR/VR training program introducing students to virtual reality development, immersive technologies, and Unity-based application development.',
    tags: ['AR', 'VR', 'Unity', 'Training', 'Organizer'],
  },
  {
    title: 'Smartathon – 12 Hour Hackathon',
    date: '2026',
    org: 'Department of AI & Data Science',
    desc: 'Successfully organized a 12-hour intra-college Smartathon encouraging innovation, rapid prototyping, teamwork, and problem-solving through intensive hackathon challenges.',
    tags: ['Hackathon', 'Innovation', 'AI', 'Organizer'],
  },
  {
    title: 'AI Expert Exchange – Group Discussion',
    date: '2025',
    org: 'DSU – Journal Club',
    desc: 'Organized interactive sessions focused on current AI trends and industry perspectives, enabling peer learning and expert interaction.',
    tags: ['AI', 'Community', 'Event'],
  },
  {
    title: 'Startup Spark – Innovation Event',
    date: '2025',
    org: 'DSU – Journal Club',
    desc: 'Coordinated event showcasing student startups and entrepreneurial ventures in AI and Data Science domain.',
    tags: ['Event', 'Leadership', 'Organizer'],
  },
  {
    title: 'BIYOnd – Data Analytics Event',
    date: '2025',
    org: 'DSU – AI & DS Department',
    desc: 'Managed comprehensive data analytics event featuring workshops and competitions designed to build practical data skills.',
    tags: ['ML', 'Workshop', 'Event'],
  },
  {
    title: 'Neura Fest – Project Expo',
    date: '2025',
    org: 'DSU – AI & DS Department',
    desc: 'Supervised large-scale project exhibition showcasing innovative AI and data science projects from students across departments.',
    tags: ['Event', 'Organizer', 'AI'],
  },
];

export const LEADERSHIP_ROLES = [
  {
    title: 'Vice President',
    date: 'Sep 2025 – Present',
    org: 'Journal Club – AI & DS Department, DSU',
    desc: 'Led academic initiatives and knowledge-sharing sessions in AI and Data Science. Organized 8+ technical events, managed volunteer teams, and oversaw documentation.',
    tags: ['Leadership', 'AI', 'Community'],
  },
];

export const WORKSHOPS_SESSIONS = [];

export const COMMUNITY_CONTRIBUTIONS = [
  {
    title: 'Open Source Contributor',
    date: 'Ongoing',
    org: 'GitHub',
    desc: 'Contributing to open source AI and data science projects. Building tools and sharing code for the developer community.',
    tags: ['Community', 'AI', 'ML'],
  },
];

/* ── Research & Publications ───────────────────────────── */
export const RESEARCH_PAPERS = [
  {
    title: 'Segmentation of Artificial Intelligence',
    role: 'Lead Author',
    type: 'Research Paper',
    status: 'Published',
    year: '2024',
    domain: 'AI Architecture',
    abstract: 'A comprehensive study on the segmentation and classification of Artificial Intelligence domains, exploring architectural patterns, domain boundaries, and real-world implementation frameworks across AI subfields.',
    keywords: ['Artificial Intelligence', 'AI Segmentation', 'Machine Learning', 'Deep Learning', 'AI Architecture'],
    tech: ['Research', 'AI Architecture', 'Documentation'],
    link: 'https://drive.google.com/drive/folders/1WYWV3cFeCiIHUdKcqdZ4jJbkNG7TvlsV',
  },
  {
    title: 'Future Research Publication',
    role: 'Author',
    type: 'Research Paper',
    status: 'In Progress',
    year: 'Coming Soon',
    domain: 'AI / ML',
    abstract: 'Placeholder for upcoming research publication. Details will be updated upon completion.',
    keywords: [],
    tech: [],
    link: null,
    placeholder: true,
  },
];

/* ── Professional Memberships ──────────────────────────── */
export const MEMBERSHIPS = [
  {
    title: 'Open Source Contributor',
    org: 'GitHub',
    type: 'Community',
    status: 'Active',
    desc: 'Active contributor to open source AI and data science repositories.',
  },
  {
    title: 'IEEE Student Member',
    org: 'IEEE',
    type: 'Professional',
    status: 'Placeholder',
    desc: 'Placeholder – to be added upon joining.',
    placeholder: true,
  },
  {
    title: 'Google Developer Groups',
    org: 'Google',
    type: 'Community',
    status: 'Placeholder',
    desc: 'Placeholder – to be added upon joining.',
    placeholder: true,
  },
  {
    title: 'AWS Community Builder',
    org: 'Amazon Web Services',
    type: 'Cloud',
    status: 'Placeholder',
    desc: 'Placeholder – to be added upon joining.',
    placeholder: true,
  },
];

/* ── Hackathons & Competitions ─────────────────────────── */
export const HACKATHONS = [
  {
    title: '1st Prize – SYNERGIA 0.1 National Level Hackathon',
    year: '2026',
    role: 'Participant',
    result: '1st Place',
    desc: 'Secured First Prize at SYNERGIA 0.1 National Level Hackathon by developing an AI-powered healthcare solution.',
    tech: ['Python', 'AI', 'Healthcare', 'ML'],
    github: null,
  },
  {
    title: '2nd Runner-Up – Chemovate 2.0 MedTech Hackathon',
    year: '2026',
    role: 'Participant',
    result: '3rd Place',
    desc: 'Secured 2nd Runner-Up in MedTech domain during the 24-hour Chemovate 2.0 Hackathon with an AI healthcare solution.',
    tech: ['Python', 'AI', 'MedTech', 'Healthcare'],
    github: null,
  },
  {
    title: '2nd Place – Tablitics Data Analytics Competition',
    year: '2025',
    role: 'Participant',
    result: '2nd Place',
    desc: 'Secured 2nd prize in Power BI data analytics competition. Developed interactive dashboards and extracted actionable insights.',
    tech: ['Power BI', 'Data Analytics', 'Visualization'],
    github: null,
  },
  {
    title: '3rd Place – Coding Battle',
    year: "QUBEIT'24, KRCE Trichy",
    role: 'Participant',
    result: '3rd Place',
    desc: 'Secured third position in competitive coding competition demonstrating strong algorithmic problem-solving skills.',
    tech: ['Python', 'Algorithms', 'Data Structures'],
    github: null,
  },
];

export const NAV_ITEMS = [
  { id: 'home',           label: 'Home' },
  { id: 'about',          label: 'About' },
  { id: 'skills',         label: 'Skills' },
  { id: 'projects',       label: 'Projects' },
  { id: 'experience',     label: 'Experience' },
  { id: 'education',      label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'achievements',   label: 'Achievements' },
  { id: 'journey',        label: 'Journey' },
  { id: 'contact',        label: 'Contact' },
];
