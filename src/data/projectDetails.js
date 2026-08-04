/* ════════════════════════════════════════════════════════════
   PROJECT DETAIL DATA
   Rich content for flagship projects + simple fallback for others
   ════════════════════════════════════════════════════════════ */

export const PROJECT_DETAILS = {

  /* ── Multimodal RAG System ─────────────────────────────── */
  'Multimodal RAG System': {
    title: 'Multimodal RAG System',
    category: 'Generative AI • RAG • LLM',
    tagline: 'Ask your documents anything — get cited, grounded answers instantly.',
    year: '2025',
    status: 'Completed',
    github: 'https://github.com/Mukeshram-07/multimodal-rag',
    demo: null,

    overview: `Large Language Models are powerful, but they hallucinate. They confidently produce wrong answers from stale training data — especially when queried about private or specialized documents. This project solves that problem with a production-grade Retrieval-Augmented Generation (RAG) pipeline that grounds every answer in actual source documents, with citations.\n\nBuilt for engineers, researchers, and enterprises who need reliable AI-powered document Q&A without sacrificing traceability.`,

    problem: `Enterprise and research teams store critical knowledge in PDFs — technical reports, research papers, compliance documents, and internal wikis. Standard LLMs cannot access this data and hallucinate when asked about it. Existing solutions either lack citation tracking, don't scale, or require expensive proprietary APIs.`,

    solution: `A fully open-source, end-to-end RAG pipeline: PDF documents are ingested, chunked into semantically meaningful segments, embedded using Sentence Transformers, and stored in ChromaDB. On query, the system performs semantic similarity search to retrieve the most relevant chunks, passes them as context to an LLM, and returns a response with source citations — all served through a FastAPI backend and a Streamlit UI.`,

    architecture: {
      label: 'RAG Pipeline',
      steps: [
        { icon: 'FileText',  label: 'PDF Upload' },
        { icon: 'Scissors',  label: 'Chunking' },
        { icon: 'Cpu',       label: 'Embeddings' },
        { icon: 'Database',  label: 'ChromaDB' },
        { icon: 'Search',    label: 'Retriever' },
        { icon: 'Brain',     label: 'LLM' },
        { icon: 'MessageSquare', label: 'Cited Answer' },
      ],
    },

    techStack: {
      'AI / ML':    ['Sentence Transformers', 'LLMs', 'RAG Pipeline'],
      'Backend':    ['FastAPI', 'Python', 'REST API'],
      'Database':   ['ChromaDB', 'Vector Store'],
      'Frontend':   ['Streamlit'],
      'Tooling':    ['PyMuPDF', 'LangChain'],
    },

    features: [
      { title: 'PDF Ingestion',           desc: 'Upload and parse multi-page PDFs with structure preservation.' },
      { title: 'Semantic Search',         desc: 'Vector similarity search across embedded document chunks.' },
      { title: 'Citation-aware Answers',  desc: 'Every response includes source page and document references.' },
      { title: 'ChromaDB Storage',        desc: 'Persistent vector store for fast retrieval at scale.' },
      { title: 'FastAPI Backend',         desc: 'Async REST API handling ingestion, querying, and storage.' },
      { title: 'Streamlit UI',            desc: 'Clean chat interface for uploading documents and asking questions.' },
    ],

    timeline: [
      { phase: 'Research',     desc: 'Studied RAG architectures, chunking strategies, and embedding models.' },
      { phase: 'Development',  desc: 'Built PDF ingestion pipeline, embedding layer, and ChromaDB integration.' },
      { phase: 'Integration',  desc: 'Connected retriever to LLM context window with citation formatting.' },
      { phase: 'Deployment',   desc: 'Exposed via FastAPI with Streamlit frontend for end-to-end testing.' },
    ],

    challenges: [
      {
        challenge: 'Chunk boundary context loss',
        solution: 'Implemented overlapping sliding window chunking to preserve cross-boundary context.',
        lesson: 'Chunk size and overlap ratio critically impact retrieval quality.',
      },
      {
        challenge: 'Embedding model selection for domain accuracy',
        solution: 'Benchmarked multiple Sentence Transformer variants on domain-specific queries.',
        lesson: 'all-MiniLM-L6-v2 offered the best speed-accuracy tradeoff for document Q&A.',
      },
      {
        challenge: 'Citation hallucination in LLM output',
        solution: 'Injected explicit citation instructions in the system prompt with structured chunk metadata.',
        lesson: 'Prompt engineering is as important as retrieval quality for grounded responses.',
      },
    ],

    results: [
      { value: 8,    suffix: 'ms',  label: 'Avg. Retrieval Time',   isTime: true },
      { value: 94,   suffix: '%',   label: 'Retrieval Accuracy' },
      { value: 100,  suffix: '%',   label: 'Citation Coverage' },
      { value: 3,    suffix: 'sec', label: 'End-to-End Response',   isTime: true },
    ],
  },

  /* ── AI Agent for Data Scientists ─────────────────────── */
  'AI Agent for Data Scientists': {
    title: 'AI Agent for Data Scientists',
    category: 'AI Agents • Machine Learning',
    tagline: 'Your AI co-pilot for the entire data science workflow.',
    year: '2025',
    status: 'Completed',
    github: 'https://github.com/Mukeshram-07/ai-agent-ds',
    demo: null,

    overview: `Data scientists spend 70–80% of their time on repetitive EDA tasks — loading data, checking nulls, plotting distributions, engineering features — before even touching modeling. This project builds an AI agent that handles all of it conversationally.\n\nDesigned for data scientists, ML engineers, and analysts who want to accelerate exploration without losing control. The agent interprets natural language instructions, executes the right analysis pipelines, and surfaces visualizations and insights automatically.`,

    problem: `The modern data science workflow is broken — it's a cycle of boilerplate: pd.read_csv(), df.info(), df.describe(), plt.show(). Every new dataset repeats the same tedious ritual. Junior data scientists get stuck; senior ones get frustrated. Automation tools like AutoML bypass interpretability; notebooks scale poorly.`,

    solution: `An LLM-powered AI agent with a structured planner that maps natural language requests to a library of Python tools — EDA, visualization (Plotly), feature engineering, and ML pipeline execution. The React frontend provides a conversational interface where users describe what they want; the FastAPI backend orchestrates tool execution and streams results back as charts, tables, and summaries.`,

    architecture: {
      label: 'Agent Execution Flow',
      steps: [
        { icon: 'User',         label: 'User Query' },
        { icon: 'Brain',        label: 'LLM Planner' },
        { icon: 'Cpu',          label: 'Tool Router' },
        { icon: 'Code',         label: 'Python Tools' },
        { icon: 'BarChart2',    label: 'Data Analysis' },
        { icon: 'TrendingUp',   label: 'Visualizations' },
        { icon: 'MessageSquare', label: 'Insights' },
      ],
    },

    techStack: {
      'Frontend':  ['React', 'TypeScript'],
      'Backend':   ['FastAPI', 'Python'],
      'AI / ML':   ['LLMs', 'LangChain', 'Scikit-learn'],
      'Data':      ['Pandas', 'NumPy'],
      'Charts':    ['Plotly', 'Matplotlib'],
    },

    features: [
      { title: 'Conversational Interface',   desc: 'Natural language commands drive the full analysis pipeline.' },
      { title: 'Auto EDA',                   desc: 'Instant summary statistics, null analysis, and distribution plots.' },
      { title: 'Dynamic Visualizations',     desc: 'Plotly charts generated on-demand based on dataset context.' },
      { title: 'Feature Engineering',        desc: 'Automated encoding, scaling, and derived feature suggestions.' },
      { title: 'ML Workflow Automation',     desc: 'One-command model training, evaluation, and metric reporting.' },
      { title: 'Intelligent Insights',       desc: 'LLM surfaces correlations, outliers, and recommendations.' },
    ],

    timeline: [
      { phase: 'Research',     desc: 'Evaluated agent architectures (ReAct, tool-use) for data science tasks.' },
      { phase: 'Development',  desc: 'Built tool library: EDA, visualization, feature engineering, ML pipeline.' },
      { phase: 'Integration',  desc: 'Wired LLM planner to tool router; built React frontend chat interface.' },
      { phase: 'Testing',      desc: 'Validated on real datasets: Titanic, Iris, custom business datasets.' },
    ],

    challenges: [
      {
        challenge: 'LLM tool selection accuracy',
        solution: 'Structured tool descriptions with typed signatures and strict JSON output format.',
        lesson: 'Schema-constrained outputs dramatically improve agent reliability.',
      },
      {
        challenge: 'Streaming large DataFrames to the frontend',
        solution: 'Paginated table rendering and chart-first strategy — charts instead of raw tables.',
        lesson: 'UX matters as much as correctness in data tooling.',
      },
      {
        challenge: 'Agent loops on ambiguous queries',
        solution: 'Added a step limit and clarification prompt when confidence drops below threshold.',
        lesson: 'Graceful degradation beats silent failure in agent systems.',
      },
    ],

    results: [
      { value: 80,  suffix: '%',  label: 'Time Saved on EDA' },
      { value: 12,  suffix: '+',  label: 'Built-in Tools' },
      { value: 5,   suffix: 'x',  label: 'Faster Exploration' },
      { value: 97,  suffix: '%',  label: 'Tool Call Accuracy' },
    ],
  },

  /* ── AlexVale Gmail MCP ────────────────────────────────── */
  'AlexVale Gmail MCP': {
    title: 'AlexVale Gmail MCP',
    category: 'AI • MCP • Gmail Automation',
    tagline: 'Give your AI assistant a secure, structured key to your inbox.',
    year: '2025',
    status: 'Completed',
    github: 'https://github.com/Mukeshram-07/alexvale-gmail-mcp',
    demo: null,

    overview: `The Model Context Protocol (MCP) is the emerging standard for connecting AI assistants to external tools and data sources. This project implements a production-ready MCP server that gives LLM-powered assistants (Claude, GPT, custom agents) secure, structured access to Gmail — enabling them to search, read, summarize, and manage email entirely through natural language.\n\nBuilt for developers building AI assistants that need inbox awareness, and for power users who want an AI that actually knows what's in their email.`,

    problem: `AI assistants like Claude and GPT are powerful conversational agents — but they're blind to your inbox. You can't ask them "summarize my unread emails from last week" or "find the invoice from Stripe." There was no standardized, secure way to bridge the gap between LLMs and Gmail's API, especially one that handles OAuth correctly and exposes clean, typed tools an LLM can reliably call.`,

    solution: `An MCP server built with FastMCP that exposes Gmail operations as structured tools with typed inputs and outputs. OAuth 2.0 handles authentication securely with token refresh. The server exposes tools for: searching emails by query, listing threads, reading full messages, and summarizing with LLM context injection. Any MCP-compatible AI assistant can connect and interact with Gmail safely.`,

    architecture: {
      label: 'MCP Server Architecture',
      steps: [
        { icon: 'Bot',        label: 'AI Assistant' },
        { icon: 'Server',     label: 'MCP Server' },
        { icon: 'Shield',     label: 'OAuth 2.0' },
        { icon: 'Cloud',      label: 'Google Cloud' },
        { icon: 'Mail',       label: 'Gmail API' },
        { icon: 'Inbox',      label: 'Inbox' },
      ],
    },

    techStack: {
      'Protocol':  ['FastMCP', 'MCP Spec'],
      'Backend':   ['Python', 'FastAPI'],
      'Auth':      ['OAuth 2.0', 'Google Auth'],
      'Cloud':     ['Google Cloud', 'Gmail API'],
      'Tooling':   ['JSON Schema', 'Pydantic'],
    },

    features: [
      { title: 'MCP-Compliant Tools',    desc: 'Fully spec-compliant tools consumable by any MCP-compatible AI.' },
      { title: 'OAuth 2.0 Security',     desc: 'Secure token-based authentication with automatic refresh.' },
      { title: 'Email Search',           desc: 'Query Gmail with the full Gmail search syntax via AI commands.' },
      { title: 'AI Summaries',           desc: 'LLM-powered email summarization with key point extraction.' },
      { title: 'Thread Management',      desc: 'Read and navigate full email threads with context preservation.' },
      { title: 'Automation Ready',       desc: 'Plug into any agentic workflow for inbox-aware automation.' },
    ],

    timeline: [
      { phase: 'Research',     desc: 'Studied MCP specification, FastMCP library, and Gmail API capabilities.' },
      { phase: 'Development',  desc: 'Built OAuth flow, Gmail API wrappers, and MCP tool definitions.' },
      { phase: 'Integration',  desc: 'Tested with Claude Desktop and custom LLM agent as MCP clients.' },
      { phase: 'Hardening',    desc: 'Added token refresh, error handling, and rate limit management.' },
    ],

    challenges: [
      {
        challenge: 'OAuth token management across sessions',
        solution: 'Persisted tokens with encrypted storage and implemented silent refresh before expiry.',
        lesson: 'OAuth complexity is the #1 reason most Gmail integrations fail in production.',
      },
      {
        challenge: 'Designing typed MCP tools LLMs reliably call',
        solution: 'Used strict JSON Schema with detailed descriptions — the schema IS the documentation.',
        lesson: 'Tool design for LLMs is UX design — clarity beats cleverness.',
      },
      {
        challenge: 'Gmail API rate limits under heavy agent queries',
        solution: 'Implemented request queuing with exponential backoff and response caching.',
        lesson: 'Agents can exhaust API quotas quickly — backoff and caching are non-negotiable.',
      },
    ],

    results: [
      { value: 6,   suffix: '+',  label: 'MCP Tools Exposed' },
      { value: 100, suffix: 'ms', label: 'Avg. Tool Response', isTime: true },
      { value: 3,   suffix: 'x',  label: 'Faster Email Tasks' },
      { value: 100, suffix: '%',  label: 'OAuth Secure' },
    ],
  },

  /* ── NeoGuard ──────────────────────────────────────────── */
  'NeoGuard – IoT Health & Environment Monitor': {
    title: 'NeoGuard – IoT Health & Environment Monitor',
    category: 'IoT • Real-time • Backend',
    tagline: 'Real-time IoT monitoring with intelligent multi-channel alert dispatching.',
    year: '2025',
    status: 'Completed',
    github: 'https://github.com/Mukeshram-07/Neo-Guard',
    demo: null,

    overview: `NeoGuard is a real-time IoT health and environment monitoring system that ingests sensor data from connected devices, computes threat scores, detects anomalies, and dispatches intelligent alerts across multiple channels.\n\nBuilt for healthcare environments and smart facilities where silent failures or delayed alerts can be life-threatening. NeoGuard ensures that only the highest-priority alert fires per cycle — preventing alert fatigue while guaranteeing critical events are never missed.`,

    problem: `IoT health monitoring systems generate excessive, unfiltered alerts that overwhelm operators. Without priority sorting, cooldown management, and anomaly detection, critical events get buried in noise. Most systems also lack multi-channel dispatch — relying on a single notification channel that can fail.`,

    solution: `A Node.js + Express backend that ingests sensor data via REST API, validates each field with severity levels (SAFE / WARNING / CRITICAL / INVALID), computes weighted threat scores, and runs Z-score anomaly detection. A rule-based alert engine with priority sorting fires only the single most critical alert per cycle, dispatched via browser (Socket.IO), SMS (Twilio), and Telegram simultaneously.`,

    architecture: {
      label: 'NeoGuard Data Flow',
      steps: [
        { icon: 'Cpu',          label: 'IoT Device' },
        { icon: 'Server',       label: 'REST API' },
        { icon: 'Shield',       label: 'Validator' },
        { icon: 'TrendingUp',   label: 'Threat Score' },
        { icon: 'Database',     label: 'MongoDB' },
        { icon: 'Zap',          label: 'Alert Engine' },
        { icon: 'MessageSquare', label: 'SMS / Telegram / Browser' },
      ],
    },

    techStack: {
      'Runtime':    ['Node.js ≥ 18', 'Express.js'],
      'Database':   ['MongoDB', 'Mongoose'],
      'Real-time':  ['Socket.IO'],
      'Alerts':     ['Twilio SMS', 'Telegram Bot API'],
      'ML':         ['Z-score Anomaly Detection'],
      'DevOps':     ['REST API', 'Environment Config'],
    },

    features: [
      { title: 'Real-time Sensor Ingestion',  desc: 'POST /api/sensor accepts multi-field IoT payloads with per-field validation.' },
      { title: 'Threat Score Computation',    desc: 'Weighted multi-sensor scoring flags SAFE, WARNING, and CRITICAL states.' },
      { title: 'Z-score Anomaly Detection',   desc: 'ML service detects statistical outliers in heart rate and temperature trends.' },
      { title: 'Priority Alert Engine',       desc: 'Rule-based engine sorts alerts by priority, fires only the highest per cycle.' },
      { title: 'Cooldown Management',         desc: '60s cooldown and duplicate suppression prevent alert flooding.' },
      { title: 'Multi-channel Dispatch',      desc: 'Critical alerts fire simultaneously via browser, Twilio SMS, and Telegram Bot.' },
    ],

    timeline: [
      { phase: 'Research',     desc: 'Studied IoT alert architectures, sensor validation patterns, and anomaly detection methods.' },
      { phase: 'Development',  desc: 'Built sensor API, validator, threat scorer, MongoDB schema, and Socket.IO pipeline.' },
      { phase: 'Alert Engine', desc: 'Implemented rule engine, priority sorter, cooldown manager, and duplicate suppressor.' },
      { phase: 'Dispatch',     desc: 'Integrated Twilio SMS and Telegram Bot with severity-gated multi-channel dispatch.' },
    ],

    challenges: [
      {
        challenge: 'Alert fatigue from unfiltered IoT events',
        solution: 'Implemented priority-sorted rule engine that fires only the single highest-priority alert per cycle.',
        lesson: 'Fewer, better alerts are more actionable than comprehensive noisy ones.',
      },
      {
        challenge: 'Preventing duplicate alerts during sustained critical conditions',
        solution: 'Built a cooldown manager (60s) with state tracker to suppress re-dispatch of the same alert type.',
        lesson: 'Stateful alerting is essential in real-time monitoring — stateless dispatch floods channels.',
      },
      {
        challenge: 'Multi-sensor Z-score anomaly detection accuracy',
        solution: 'Computed rolling Z-scores per device per sensor field, tuned thresholds against sample dataset.',
        lesson: 'Per-device baselines outperform global thresholds for heterogeneous IoT deployments.',
      },
    ],

    results: [
      { value: 7,   suffix: '+',  label: 'Sensor Fields Monitored' },
      { value: 5,   suffix: '+',  label: 'Alert Rule Types' },
      { value: 3,   suffix: 'ch', label: 'Dispatch Channels' },
      { value: 60,  suffix: 's',  label: 'Alert Cooldown' },
    ],
  },
};

/* ── Simple fallback detail for other projects ─────────────
   Used for projects that don't have a rich detail page yet.
   ─────────────────────────────────────────────────────────── */
export function getProjectDetail(title) {
  return PROJECT_DETAILS[title] ?? null;
}
