export type StackGroup = { name: string; items: string[] };

export const techStack: StackGroup[] = [
  {
    name: "Mobile",
    items: ["React Native", "Expo", "Flutter", "Swift", "Kotlin", "SQLite"],
  },
  {
    name: "Systems",
    items: ["Rust", "Go", "C++", "WebAssembly", "gRPC"],
  },
  {
    name: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    name: "Backend",
    items: ["Python", "FastAPI", "Node.js", "Express", "tRPC"],
  },
  {
    name: "LLMs & GenAI",
    items: ["GPT-4o", "Claude", "Gemini", "Llama", "DeepSeek", "Mistral"],
  },
  {
    name: "Agentic AI",
    items: ["LangGraph", "LangChain", "CrewAI", "AutoGen", "LlamaIndex"],
  },
  {
    name: "Retrieval & Vector",
    items: ["FAISS", "ChromaDB", "Pinecone", "Qdrant", "Azure AI Search", "Elasticsearch"],
  },
  {
    name: "Voice AI",
    items: ["Whisper", "WhisperX", "Parakeet", "ElevenLabs", "Twilio"],
  },
  {
    name: "Computer Vision",
    items: ["PyTorch", "YOLO", "MMDetection", "OpenCV", "MediaPipe", "ONNX Runtime"],
  },
  {
    name: "NLP & Document AI",
    items: ["spaCy", "Hugging Face", "LayoutLM", "Tesseract", "Presidio"],
  },
  {
    name: "Blockchain & Web3",
    items: ["Solidity", "Foundry", "Hardhat", "Viem", "Ethers.js", "The Graph"],
  },
  {
    name: "MLOps & Observability",
    items: ["Langfuse", "LangSmith", "Grafana", "Prometheus", "MLflow", "W&B"],
  },
  {
    name: "Responsible AI",
    items: ["Promptfoo", "Giskard", "Presidio", "Custom evals"],
  },
  {
    name: "Cloud",
    items: ["AWS", "GCP", "Azure", "Vercel", "Cloudflare"],
  },
  {
    name: "DevOps",
    items: ["Docker", "Kubernetes", "Nginx", "GitHub Actions", "Terraform"],
  },
  {
    name: "Data",
    items: ["PostgreSQL", "MongoDB", "Redis", "BigQuery", "Snowflake", "Kafka"],
  },
];
