export type DatasetStatus = "Raw" | "Cleaned" | "Processed" | "Ready"

export type Dataset = {
  id: string
  name: string
  source_url: string
  category: string
  status: DatasetStatus
  description: string
  notes: string
  created_at: string
}

export type Project = {
  id: string
  name: string
  description: string
  created_at: string
}

export type Experiment = {
  id: string
  dataset_id: string
  project_id: string
  model_name: string
  accuracy: number
  precision_score: number
  recall_score: number
  f1_score: number
  notes: string
  created_at: string
}

export const datasets: Dataset[] = [
  {
    id: "ds_1",
    name: "Telecom Customer Records",
    source_url: "https://data.example.com/telecom-customers.csv",
    category: "Tabular",
    status: "Ready",
    description:
      "Anonymized customer subscription records including tenure, plan type, monthly charges and churn labels.",
    notes: "Target column is 'Churn'. Some missing values in TotalCharges resolved during cleaning.",
    created_at: "2025-01-12",
  },
  {
    id: "ds_2",
    name: "Amazon Product Reviews",
    source_url: "https://data.example.com/amazon-reviews.json",
    category: "Text",
    status: "Processed",
    description: "1.2M product reviews with star ratings, verified purchase flags and review text.",
    notes: "Tokenized and lemmatized. Stopwords removed for the NLP pipeline.",
    created_at: "2025-02-03",
  },
  {
    id: "ds_3",
    name: "Credit Card Transactions",
    source_url: "https://data.example.com/cc-transactions.parquet",
    category: "Tabular",
    status: "Cleaned",
    description: "Highly imbalanced transaction dataset with anonymized PCA features and fraud labels.",
    notes: "Only 0.17% positive class. Consider SMOTE or class weighting.",
    created_at: "2025-02-21",
  },
  {
    id: "ds_4",
    name: "Twitter Sentiment Corpus",
    source_url: "https://data.example.com/twitter-sentiment.csv",
    category: "Text",
    status: "Raw",
    description: "Raw scraped tweets labeled with positive, negative and neutral sentiment.",
    notes: "Contains emojis, hashtags and URLs that still need preprocessing.",
    created_at: "2025-03-09",
  },
  {
    id: "ds_5",
    name: "Retail Sales Timeseries",
    source_url: "https://data.example.com/retail-sales.csv",
    category: "Time Series",
    status: "Ready",
    description: "Daily sales across 45 stores with promotions, holidays and weather signals.",
    notes: "Aggregated to daily granularity. Includes lag features.",
    created_at: "2025-03-18",
  },
  {
    id: "ds_6",
    name: "Chest X-Ray Images",
    source_url: "https://data.example.com/chest-xray.zip",
    category: "Image",
    status: "Processed",
    description: "Labeled chest radiographs for pneumonia detection, resized to 224x224.",
    notes: "Normalized and augmented with random flips and rotations.",
    created_at: "2025-04-02",
  },
  {
    id: "ds_7",
    name: "IoT Sensor Logs",
    source_url: "https://data.example.com/iot-sensors.parquet",
    category: "Time Series",
    status: "Cleaned",
    description: "Multivariate sensor readings from industrial equipment for anomaly detection.",
    notes: "Resampled to 1-minute intervals. Outliers winsorized.",
    created_at: "2025-04-15",
  },
  {
    id: "ds_8",
    name: "News Articles Corpus",
    source_url: "https://data.example.com/news-corpus.json",
    category: "Text",
    status: "Raw",
    description: "Multi-topic news articles for topic modeling and classification experiments.",
    notes: "Raw HTML still present in body field.",
    created_at: "2025-05-01",
  },
]

export const projects: Project[] = [
  {
    id: "pr_1",
    name: "Customer Churn Prediction",
    description: "Predict which telecom customers are likely to cancel their subscriptions next quarter.",
    created_at: "2025-01-15",
  },
  {
    id: "pr_2",
    name: "Sentiment Analysis Pipeline",
    description: "End-to-end NLP pipeline classifying product and social sentiment at scale.",
    created_at: "2025-02-05",
  },
  {
    id: "pr_3",
    name: "Fraud Detection System",
    description: "Real-time anomaly detection for flagging fraudulent credit card transactions.",
    created_at: "2025-02-25",
  },
  {
    id: "pr_4",
    name: "Demand Forecasting",
    description: "Forecast retail demand to optimize inventory and reduce stockouts.",
    created_at: "2025-03-20",
  },
]

export const experiments: Experiment[] = [
  {
    id: "ex_1",
    dataset_id: "ds_1",
    project_id: "pr_1",
    model_name: "XGBoost",
    accuracy: 0.912,
    precision_score: 0.887,
    recall_score: 0.864,
    f1_score: 0.875,
    notes: "Tuned with 500 estimators and max_depth=6. Best churn model so far.",
    created_at: "2025-04-22",
  },
  {
    id: "ex_2",
    dataset_id: "ds_1",
    project_id: "pr_1",
    model_name: "Random Forest",
    accuracy: 0.889,
    precision_score: 0.851,
    recall_score: 0.842,
    f1_score: 0.846,
    notes: "Baseline ensemble. Solid but slightly behind XGBoost.",
    created_at: "2025-04-20",
  },
  {
    id: "ex_3",
    dataset_id: "ds_1",
    project_id: "pr_1",
    model_name: "Logistic Regression",
    accuracy: 0.831,
    precision_score: 0.792,
    recall_score: 0.778,
    f1_score: 0.785,
    notes: "Interpretable baseline with L2 regularization.",
    created_at: "2025-04-18",
  },
  {
    id: "ex_4",
    dataset_id: "ds_2",
    project_id: "pr_2",
    model_name: "BERT-base-uncased",
    accuracy: 0.943,
    precision_score: 0.931,
    recall_score: 0.928,
    f1_score: 0.929,
    notes: "Fine-tuned for 3 epochs. Strong sentiment classification results.",
    created_at: "2025-05-02",
  },
  {
    id: "ex_5",
    dataset_id: "ds_4",
    project_id: "pr_2",
    model_name: "Logistic Regression",
    accuracy: 0.802,
    precision_score: 0.774,
    recall_score: 0.761,
    f1_score: 0.767,
    notes: "TF-IDF features on raw tweets. Needs better preprocessing.",
    created_at: "2025-05-04",
  },
  {
    id: "ex_6",
    dataset_id: "ds_3",
    project_id: "pr_3",
    model_name: "Isolation Forest",
    accuracy: 0.967,
    precision_score: 0.712,
    recall_score: 0.689,
    f1_score: 0.7,
    notes: "Unsupervised anomaly detection. High accuracy due to class imbalance.",
    created_at: "2025-05-10",
  },
  {
    id: "ex_7",
    dataset_id: "ds_3",
    project_id: "pr_3",
    model_name: "XGBoost",
    accuracy: 0.981,
    precision_score: 0.901,
    recall_score: 0.873,
    f1_score: 0.887,
    notes: "Class-weighted boosting. Best fraud recall to date.",
    created_at: "2025-05-12",
  },
  {
    id: "ex_8",
    dataset_id: "ds_5",
    project_id: "pr_4",
    model_name: "Random Forest",
    accuracy: 0.876,
    precision_score: 0.858,
    recall_score: 0.841,
    f1_score: 0.849,
    notes: "Regression reframed as bucketed classification for demand tiers.",
    created_at: "2025-05-18",
  },
  {
    id: "ex_9",
    dataset_id: "ds_2",
    project_id: "pr_2",
    model_name: "XGBoost",
    accuracy: 0.908,
    precision_score: 0.889,
    recall_score: 0.871,
    f1_score: 0.88,
    notes: "Gradient boosting on embeddings. Faster than BERT inference.",
    created_at: "2025-05-20",
  },
  {
    id: "ex_10",
    dataset_id: "ds_6",
    project_id: "pr_3",
    model_name: "BERT-base-uncased",
    accuracy: 0.934,
    precision_score: 0.918,
    recall_score: 0.905,
    f1_score: 0.911,
    notes: "Vision-text adaptation experiment.",
    created_at: "2025-05-24",
  },
]

export const datasetCategories = ["Tabular", "Text", "Image", "Time Series"]
export const datasetStatuses: DatasetStatus[] = ["Raw", "Cleaned", "Processed", "Ready"]
export const modelNames = ["XGBoost", "Random Forest", "BERT-base-uncased", "Logistic Regression", "Isolation Forest"]

export function getDatasetById(id: string) {
  return datasets.find((d) => d.id === id)
}

export function getProjectById(id: string) {
  return projects.find((p) => p.id === id)
}

export function getDatasetName(id: string) {
  return getDatasetById(id)?.name ?? "Unknown"
}

export function getProjectName(id: string) {
  return getProjectById(id)?.name ?? "Unknown"
}

export function experimentsForProject(projectId: string) {
  return experiments.filter((e) => e.project_id === projectId)
}

export function datasetsForProject(projectId: string) {
  const ids = new Set(experimentsForProject(projectId).map((e) => e.dataset_id))
  return datasets.filter((d) => ids.has(d.id))
}

export function experimentsForDataset(datasetId: string) {
  return experiments.filter((e) => e.dataset_id === datasetId)
}

export const summary = {
  totalDatasets: datasets.length,
  totalProjects: projects.length,
  totalExperiments: experiments.length,
  avgAccuracy: experiments.reduce((s, e) => s + e.accuracy, 0) / experiments.length,
}

export const recentActivity = experiments
  .slice()
  .sort((a, b) => b.created_at.localeCompare(a.created_at))
  .slice(0, 6)
  .map((e) => ({
    id: e.id,
    dataset: getDatasetName(e.dataset_id),
    project: getProjectName(e.project_id),
    model: e.model_name,
    accuracy: e.accuracy,
    date: e.created_at,
  }))
