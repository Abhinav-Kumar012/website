export type Project = {
  name: string;
  display: string;
  desc: string;
  lang: string;
  stars: number;
  topics: string[];
  url: string;
  homepage?: string;
  category:
    | "Systems & Backend"
    | "Machine Learning & AI"
    | "Languages & Compilers"
    | "Data & Databases"
    | "Learning & Writing";
  highlight?: boolean;
};

export const profile = {
  name: "Abhinav Kumar",
  handle: "Abhinav-Kumar012",
  role: "Software & Systems Engineer",
  tagline:
    "Integrated M.Tech CS student at IIIT Bangalore and Software Engineer Intern at Arista Networks building performant, reliable systems across distributed microservices, databases and machine learning in Rust, Java, Python & C.",
  location: "Bengaluru, India",
  email: "Abhinav.Kumar@iiitb.ac.in",
  phone: "+91 6203642937",
  github: "https://github.com/Abhinav-Kumar012",
  linkedin: "https://linkedin.com/in/abhinav-kr007",
  resumePdf:
    "https://github.com/Abhinav-Kumar012/resume/releases/download/latest/Resume.pdf",
  avatar: "https://avatars.githubusercontent.com/u/117056468?v=4",
  stats: {
    repos: 46,
    followers: 5,
    joined: "2022",
  },
};

export type ExperienceItem = {
  role: string;
  org: string;
  location: string;
  period: string;
  points: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Software Engineer Intern",
    org: "Arista Networks",
    location: "Bengaluru, Karnataka",
    period: "May 2026 – July 2026",
    points: [
      "Contributed to features within Arista Extensible Operating System (EOS), focusing on configuration state management and system reliability.",
      "Optimized state reconciliation following agent failures, reducing system recovery time by over 50%.",
      "Designed and implemented enhancements to the configuration status framework, improving consistency and reliability during agent recovery.",
      "Worked with EOS's state-driven inter-process communication architecture, where components synchronize configuration through a shared state repository.",
    ],
  },
];

export type EducationItem = {
  school: string;
  degree: string;
  period: string;
  score: string;
};

export const education: EducationItem = {
  school: "International Institute of Information Technology, Bangalore",
  degree: "Integrated Master of Technology in Computer Science",
  period: "Aug 2022 – July 2027",
  score: "3.43 / 4.0",
};

export const coursework: string[] = [
  "Data Structures & Algorithms",
  "Database Management",
  "NoSQL Systems",
  "Cloud Computing",
  "Programming Languages",
  "Computer Networks",
  "Software Engineering",
  "Computer Architecture",
  "Operating Systems",
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Languages",
    items: ["Rust", "Python", "Java", "C / C++", "OCaml", "Zig", "TypeScript", "SQL"],
  },
  {
    group: "Systems & Cloud",
    items: [
      "Docker",
      "Kubernetes",
      "Spring Boot",
      "Kafka",
      "Redis",
      "gRPC",
      "RabbitMQ",
      "Jenkins",
      "Ansible",
      "ELK Stack",
    ],
  },
  {
    group: "Data & Databases",
    items: ["PostgreSQL", "MongoDB", "Apache Hive", "Hadoop / MapReduce", "MySQL", "JDBC"],
  },
  {
    group: "ML & AI",
    items: ["PyTorch", "scikit-learn", "Transformers", "Neural Networks", "Federated Learning", "Burn (Rust)"],
  },
];

export const projects: Project[] = [
  {
    name: "lastmile_microservice",
    display: "LastMile",
    desc: "A real-time ride-matching platform of 8 Spring Boot microservices enabling asynchronous rider–driver workflows via REST, gRPC and Kafka. A Redis matching engine handles 100+ concurrent requests with distributed locking to eliminate race conditions; deployed on Kubernetes with HPA (1→5 pods), Distroless containers and ELK logging, load-tested with Locust.",
    lang: "Java",
    stars: 3,
    topics: ["spring-boot", "kafka", "kubernetes", "redis", "grpc", "microservice"],
    url: "https://github.com/Abhinav-Kumar012/lastmile_microservice",
    category: "Systems & Backend",
    highlight: true,
  },
  {
    name: "Hetrosync",
    display: "HetroSync",
    desc: "A synchronization engine across heterogeneous databases (MongoDB, PostgreSQL, Hive) with custom GET/SET/MERGE operations and structured oplogs for reliable state convergence. Uses an abstract merge method with associativity and idempotency to sync states without direct cross-system access, exposed via an interactive CLI and a batch test mode.",
    lang: "Java",
    stars: 1,
    topics: ["mongodb", "postgresql", "hive", "oplog-based", "synchronization"],
    url: "https://github.com/Abhinav-Kumar012/Hetrosync",
    category: "Systems & Backend",
    highlight: true,
  },
  {
    name: "cloud_computing",
    display: "Cloud Computing Suite",
    desc: "Coursework and experiments spanning containerized services with Docker, Kubernetes on Minikube, gRPC, RabbitMQ messaging and REST APIs.",
    lang: "Python",
    stars: 1,
    topics: ["kubernetes", "docker", "grpc", "rabbitmq", "minikube", "rest"],
    url: "https://github.com/Abhinav-Kumar012/cloud_computing",
    category: "Systems & Backend",
  },
  {
    name: "calculator_spe_mini_proj",
    display: "SPE CI/CD Calculator",
    desc: "A calculator app wrapped in a complete software-production-engineering pipeline: Maven build, GraalVM native image, Dockerized delivery, Jenkins CI and Ansible playbooks.",
    lang: "Java",
    stars: 1,
    topics: ["jenkins", "docker", "ansible", "graalvm", "maven"],
    url: "https://github.com/Abhinav-Kumar012/calculator_spe_mini_proj",
    homepage: "https://hub.docker.com/r/vanos007/calc-spe",
    category: "Systems & Backend",
  },
  {
    name: "olms",
    display: "OLMS — Library System",
    desc: "An online library management system in C with user authentication and password-protected admin access. Admins add, delete, modify and search books and manage accounts, backed by robust logging and system calls for file handling, multithreading and socket programming enabling concurrent client access with data consistency.",
    lang: "C",
    stars: 4,
    topics: ["socket-programming", "multithreading", "file-locking", "linux", "syscall"],
    url: "https://github.com/Abhinav-Kumar012/olms",
    category: "Systems & Backend",
    highlight: true,
  },
  {
    name: "Rust_Python_ML_PE",
    display: "Rust vs Python for ML",
    desc: "A performance-engineering study comparing Rust (Burn, wgpu) against Python for deep-learning workloads, quantifying throughput and resource trade-offs.",
    lang: "Rust",
    stars: 3,
    topics: ["rust", "python", "burn-rs", "deep-learning", "wgpu"],
    url: "https://github.com/Abhinav-Kumar012/Rust_Python_ML_PE",
    category: "Machine Learning & AI",
    highlight: true,
  },
  {
    name: "machine_learning_rs",
    display: "ML in Rust",
    desc: "Hands-on machine learning implementations written in idiomatic Rust, exploring the growing native ML ecosystem.",
    lang: "Rust",
    stars: 1,
    topics: ["machine-learning", "rust"],
    url: "https://github.com/Abhinav-Kumar012/machine_learning_rs",
    category: "Machine Learning & AI",
  },
  {
    name: "Neural-Machine-Translation",
    display: "Neural Machine Translation",
    desc: "An English→Hindi NMT system built on the Transformer architecture with PyTorch, covering tokenization, attention and beam-search decoding.",
    lang: "Jupyter Notebook",
    stars: 1,
    topics: ["transformer", "pytorch", "nlp", "machine-translation"],
    url: "https://github.com/Abhinav-Kumar012/Neural-Machine-Translation",
    category: "Machine Learning & AI",
    highlight: true,
  },
  {
    name: "ML-project",
    display: "Credit Risk Analysis",
    desc: "Machine-learning course project applying neural networks to credit-risk classification and analysis.",
    lang: "Python",
    stars: 2,
    topics: ["machine-learning", "neural-network", "credit-risk-analysis"],
    url: "https://github.com/Abhinav-Kumar012/ML-project",
    category: "Machine Learning & AI",
  },
  {
    name: "mlp_sentiment_xor",
    display: "MLP Sentiment & XOR",
    desc: "From-scratch multi-layer perceptron experiments for sentiment analysis and the classic XOR problem in PyTorch.",
    lang: "Jupyter Notebook",
    stars: 1,
    topics: ["nlp", "pytorch", "sentiment-analysis"],
    url: "https://github.com/Abhinav-Kumar012/mlp_sentiment_xor",
    category: "Machine Learning & AI",
  },
  {
    name: "PL_project",
    display: "PL Project (Rust)",
    desc: "A programming-languages research project implemented in Rust, exploring language design and semantics.",
    lang: "Rust",
    stars: 2,
    topics: ["rust", "programming-languages"],
    url: "https://github.com/Abhinav-Kumar012/PL_project",
    category: "Languages & Compilers",
    highlight: true,
  },
  {
    name: "programming2_c--_interpreter",
    display: "C-- Interpreter",
    desc: "A tree-walking interpreter for a C-- subset written in C — lexer, parser and evaluator for a small imperative language.",
    lang: "C",
    stars: 1,
    topics: ["interpreter", "c-language", "lexer", "parser"],
    url: "https://github.com/Abhinav-Kumar012/programming2_c--_interpreter",
    category: "Languages & Compilers",
  },
  {
    name: "Programming_languages_2026",
    display: "Programming Languages Course",
    desc: "Assignments and material spanning lexers, parsers and interpreters across OCaml, Prolog, C/C++ and Java for a graduate PL/compilers course.",
    lang: "OCaml",
    stars: 3,
    topics: ["ocaml", "prolog", "interpreter", "lexer", "parser", "pldi"],
    url: "https://github.com/Abhinav-Kumar012/Programming_languages_2026",
    category: "Languages & Compilers",
  },
  {
    name: "SSP-project",
    display: "Postgres Performance Study",
    desc: "Measuring PostgreSQL performance across scenarios using the TPROC-C benchmark on HammerDB, with analysis notebooks.",
    lang: "Jupyter Notebook",
    stars: 2,
    topics: ["postgresql", "benchmark", "performance", "hammerdb"],
    url: "https://github.com/Abhinav-Kumar012/SSP-project",
    category: "Data & Databases",
    highlight: true,
  },
  {
    name: "Big-Data-Processing-with-MapReduce_NoSQL_Assignment-2",
    display: "MapReduce Text Analysis",
    desc: "A Hadoop MapReduce pipeline processing 10k+ documents for large-scale text analysis, showcasing distributed computing at scale.",
    lang: "Java",
    stars: 1,
    topics: ["hadoop", "mapreduce", "java", "big-data"],
    url: "https://github.com/Abhinav-Kumar012/Big-Data-Processing-with-MapReduce_NoSQL_Assignment-2",
    category: "Data & Databases",
  },
  {
    name: "Hive-Powered-Data-Processing_NoSQL_Assignment-3",
    display: "Hive Data Processing",
    desc: "Transforming raw CSV data into structured Hive tables through effective schema design and HiveQL analytics.",
    lang: "HiveQL",
    stars: 1,
    topics: ["hive", "hiveql", "pig"],
    url: "https://github.com/Abhinav-Kumar012/Hive-Powered-Data-Processing_NoSQL_Assignment-3",
    category: "Data & Databases",
  },
  {
    name: "jdbc_mini_project",
    display: "JDBC DBMS Project",
    desc: "A DBMS-lab application in Java backed by MySQL, demonstrating relational modeling and JDBC connectivity.",
    lang: "Java",
    stars: 4,
    topics: ["java", "mysql", "sql", "jdbc"],
    url: "https://github.com/Abhinav-Kumar012/jdbc_mini_project",
    category: "Data & Databases",
  },
  {
    name: "dsa_book",
    display: "AI-Authored DSA Book",
    desc: "An agentic-AI pipeline that generates a full data-structures-and-algorithms book in Markdown, published to GitHub Pages.",
    lang: "Python",
    stars: 1,
    topics: ["agentic-ai", "dsa", "markdown", "ai"],
    url: "https://github.com/Abhinav-Kumar012/dsa_book",
    homepage: "https://abhinav-kumar012.github.io/dsa_book/",
    category: "Learning & Writing",
  },
  {
    name: "linux_book",
    display: "AI-Authored Linux Book",
    desc: "An AI-generated, GitHub-Pages-published book on Linux fundamentals and tooling built with shell automation.",
    lang: "Shell",
    stars: 1,
    topics: ["linux", "ai", "shell"],
    url: "https://github.com/Abhinav-Kumar012/linux_book",
    homepage: "https://abhinav-kumar012.github.io/linux_book/",
    category: "Learning & Writing",
  },
  {
    name: "Async_rs",
    display: "Async Rust",
    desc: "A focused deep-dive into asynchronous programming in Rust — futures, executors and the async/await model.",
    lang: "Rust",
    stars: 1,
    topics: ["rust", "async"],
    url: "https://github.com/Abhinav-Kumar012/Async_rs",
    category: "Learning & Writing",
  },
  {
    name: "rustlings",
    display: "Rustlings Solutions",
    desc: "Complete worked solutions to the Rustlings exercise set, cementing ownership, traits and error-handling fundamentals.",
    lang: "Rust",
    stars: 1,
    topics: ["rust", "rustlings"],
    url: "https://github.com/Abhinav-Kumar012/rustlings",
    category: "Learning & Writing",
  },
  {
    name: "zig_learn",
    display: "Learning Zig",
    desc: "Exploratory code learning the Zig systems programming language and its comptime model.",
    lang: "Zig",
    stars: 1,
    topics: ["zig"],
    url: "https://github.com/Abhinav-Kumar012/zig_learn",
    category: "Learning & Writing",
  },
  {
    name: "spatial_computing_proj",
    display: "Spatial Computing: Pansharpening",
    desc: "A vision-transformer approach to multi-objective pansharpening, optimising the accuracy–speed trade-off across a Pareto front published on Hugging Face.",
    lang: "Python",
    stars: 2,
    topics: [
      "vision-transformer",
      "nsga-2",
      "multi-objective-optimization",
      "machine-learning",
    ],
    url: "https://github.com/Abhinav-Kumar012/spatial_computing_proj",
    homepage: "https://huggingface.co/Vanos007/pansharpening_pareto_front",
    category: "Machine Learning & AI",
    highlight: true,
  },
  {
    name: "software_and_system_performance_assignments",
    display: "Software & System Performance",
    desc: "Graduate coursework on measuring software and systems performance — profiling, benchmarking and the cost models behind both.",
    lang: "Python",
    stars: 2,
    topics: ["performance-engineering", "benchmarking", "systems"],
    url: "https://github.com/Abhinav-Kumar012/software_and_system_performance_assignments",
    category: "Systems & Backend",
  },
  {
    name: "ST_project",
    display: "Software Testing & Mutation Analysis",
    desc: "A software-testing project measuring real test-suite strength with mutation testing, integration coverage and unit-test reporting.",
    lang: "HTML",
    stars: 2,
    topics: ["mutation-testing", "coverage-report", "software-testing"],
    url: "https://github.com/Abhinav-Kumar012/ST_project",
    category: "Systems & Backend",
  },
  {
    name: "os_lab_hol",
    display: "OS Lab: System Calls",
    desc: "Operating-systems lab work built directly on Linux system calls — process control, memory and file-system behaviour.",
    lang: "C",
    stars: 1,
    topics: ["os", "system-calls", "c"],
    url: "https://github.com/Abhinav-Kumar012/os_lab_hol",
    category: "Systems & Backend",
  },
  {
    name: "Inventory_Management_System_C_proj",
    display: "Inventory Management System",
    desc: "A first-semester systems project in C that tracks stock, picks up data from suppliers and keeps records consistent.",
    lang: "C",
    stars: 0,
    topics: ["c", "systems"],
    url: "https://github.com/Abhinav-Kumar012/Inventory_Management_System_C_proj",
    category: "Systems & Backend",
  },
  {
    name: "NoSql-Assingment1",
    display: "NoSQL Assignment I",
    desc: "A NoSQL databases assignment working through relational modelling, SQL and PostgreSQL query design.",
    lang: "SQL",
    stars: 1,
    topics: ["postgresql", "sql"],
    url: "https://github.com/Abhinav-Kumar012/NoSql-Assingment1",
    category: "Data & Databases",
  },
  {
    name: "imagex_prog2",
    display: "Image Processing Utilities",
    desc: "A set of image-processing tools built across TypeScript, C++, Java and an Angular front end.",
    lang: "TypeScript",
    stars: 1,
    topics: ["image-processing", "angular", "cpp", "java"],
    url: "https://github.com/Abhinav-Kumar012/imagex_prog2",
    category: "Learning & Writing",
  },
  {
    name: "rust_template",
    display: "Rust Cargo Workspace Template",
    desc: "A reusable cargo-workspace skeleton for starting multi-crate Rust projects with shared tooling and CI wired in.",
    lang: "Rust",
    stars: 1,
    topics: ["cargo-workspace", "rust", "rust-lang"],
    url: "https://github.com/Abhinav-Kumar012/rust_template",
    category: "Learning & Writing",
  },
  {
    name: "vibe-website",
    display: "Vibe Website",
    desc: "A second portfolio experiment — an AI-assisted TypeScript build taken end to end and deployed to GitHub Pages.",
    lang: "TypeScript",
    stars: 1,
    topics: ["ai", "typescript", "github-pages"],
    url: "https://github.com/Abhinav-Kumar012/vibe-website",
    homepage: "https://abhinav-kumar012.github.io/vibe-website/",
    category: "Learning & Writing",
  },
  {
    name: "resume",
    display: "Résumé Build Pipeline",
    desc: "A LaTeX résumé kept in sync automatically with Overleaf and rebuilt into a tagged PDF release on every push.",
    lang: "TeX",
    stars: 1,
    topics: ["latex", "github-actions", "pdf-generation"],
    url: "https://github.com/Abhinav-Kumar012/resume",
    homepage:
      "https://github.com/Abhinav-Kumar012/resume/releases/download/latest/Resume.pdf",
    category: "Learning & Writing",
  },
];

export const categoryOrder: Project["category"][] = [
  "Systems & Backend",
  "Machine Learning & AI",
  "Languages & Compilers",
  "Data & Databases",
  "Learning & Writing",
];

export const langColors: Record<string, string> = {
  Rust: "#e06c3b",
  Python: "#4b8bbe",
  Java: "#e0895b",
  C: "#8a9bb0",
  "C / C++": "#8a9bb0",
  "Jupyter Notebook": "#d98a3a",
  OCaml: "#e0a13b",
  Shell: "#7fb069",
  Zig: "#e6b34a",
  HiveQL: "#5fa8a0",
  HTML: "#d16a4e",
  TypeScript: "#4b8bbe",
  TeX: "#5b8bbd",
  SQL: "#e38c2a",
};

/* ------------------------------------------------------------------ */
/* Live, published artifacts                                           */
/* ------------------------------------------------------------------ */

export type Demo = {
  title: string;
  desc: string;
  url: string;
  repo: string;
  stack: string[];
  accent: string;
};

export const demos: Demo[] = [
  {
    title: "DSA Book",
    desc: "A complete data-structures and algorithms book generated by an agentic-AI pipeline and published to GitHub Pages.",
    url: "https://abhinav-kumar012.github.io/dsa_book/",
    repo: "https://github.com/Abhinav-Kumar012/dsa_book",
    stack: ["Python", "Agentic AI", "Markdown"],
    accent: "var(--amber)",
  },
  {
    title: "Linux Book",
    desc: "Linux fundamentals and everyday tooling, written by AI and shipped as a live, readable site.",
    url: "https://abhinav-kumar012.github.io/linux_book/",
    repo: "https://github.com/Abhinav-Kumar012/linux_book",
    stack: ["Shell", "AI", "GitHub Pages"],
    accent: "var(--lime)",
  },
  {
    title: "DSA Book II",
    desc: "The expanded second volume of the AI-authored algorithms book, with shell-driven tooling around it.",
    url: "https://abhinav-kumar012.github.io/dsa_book_2/",
    repo: "https://github.com/Abhinav-Kumar012/dsa_book_2",
    stack: ["Shell", "AI", "GitHub Pages"],
    accent: "var(--rust)",
  },
  {
    title: "Linux Book II",
    desc: "The follow-up volume of the AI-authored Linux book, published live and kept in sync from the repo.",
    url: "https://abhinav-kumar012.github.io/lb2/",
    repo: "https://github.com/Abhinav-Kumar012/lb2",
    stack: ["JavaScript", "GitHub Pages"],
    accent: "var(--teal)",
  },
  {
    title: "Vibe Website",
    desc: "A second portfolio experiment — an AI-assisted build taken end to end and deployed to GitHub Pages.",
    url: "https://abhinav-kumar012.github.io/vibe-website/",
    repo: "https://github.com/Abhinav-Kumar012/vibe-website",
    stack: ["TypeScript", "AI", "GitHub Pages"],
    accent: "var(--amber)",
  },
  {
    title: "This Site",
    desc: "The page you are reading — React, Tailwind and Framer Motion, deployed straight from the repository.",
    url: "https://abhinav-kumar012.github.io/website/",
    repo: "https://github.com/Abhinav-Kumar012/website",
    stack: ["React", "Tailwind", "Framer Motion"],
    accent: "var(--rust)",
  },
];
