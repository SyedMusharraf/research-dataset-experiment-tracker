# Research Dataset and Experiment Tracker

A web-based application for organizing, managing, and tracking research datasets and machine learning experiment results. Designed for researchers, students, data analysts, and ML practitioners who need a centralized, structured alternative to spreadsheets and manual tracking methods.

---

## Project Overview

Managing research datasets and experiment results across multiple projects can quickly become disorganized when relying on spreadsheets or text documents.

The **Research Dataset and Experiment Tracker** addresses this challenge by providing a centralized platform to store dataset metadata, monitor processing status, manage research projects, and record machine learning experiment outcomes — all in one place.

This is **Version 1 (MVP)** of the application. The system does not store dataset files directly; instead, it stores structured metadata, project information, and experiment records linked to those datasets.

---

## Features

### Dataset Management

* Create, view, update, and delete dataset records.
* Store dataset metadata including:

  * Dataset name
  * Source URL
  * Category
  * Processing status
  * Description

### Research Notes

* Attach free-form notes to datasets.
* Record observations, references, and research context.

### Experiment Tracking

* Log machine learning experiment results.
* Track:

  * Model name
  * Accuracy
  * Precision
  * Recall
  * F1-Score
  * Notes

### Search and Filtering

* Search datasets by name.
* Filter datasets by:

  * Category
  * Processing status

### Experiment Dashboard

* View aggregated performance metrics.
* Monitor experiment outcomes and model performance.

### User Authentication

* User registration and account creation.
* Secure login and logout functionality.
* Session-based access control.

### Project Management

* Create and manage research projects.
* Associate datasets and experiment results with specific projects.

---

## Technology Stack

| Technology   | Description                          |
| ------------ | ------------------------------------ |
| Next.js 16   | React Framework                      |
| TypeScript   | Programming Language                 |
| Supabase     | PostgreSQL Database & Authentication |
| Tailwind CSS | Styling Framework                    |
| shadcn/ui    | UI Component Library                 |
| Lucide React | Icon Library                         |
| Vercel       | Deployment Platform                  |

---

## Installation

### Prerequisites

Before running the project, ensure the following are installed:

* Node.js v18 or later
* npm or yarn
* A Supabase account and project

### Clone the Repository

```bash
git clone https://github.com/SyedMusharraf/research-dataset-experiment-tracker
cd research-dataset-tracker
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env.local` file and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Start Development Server

```bash
npm run dev
```

The application will be available at:

```text
https://research-dataset-experiment-tracker.vercel.app/
```

---

## Usage

### Add a Dataset

1. Navigate to **Datasets**.
2. Click **Add Dataset**.
3. Enter:

   * Dataset Name
   * Source URL
   * Category
   * Processing Status
   * Description
   * Notes

### Create a Project

1. Navigate to **Projects**.
2. Click **Add Project**.
3. Enter:

   * Project Name
   * Description

### Search and Filter Datasets

Use the search bar and filters to quickly locate datasets by:

* Name
* Category
* Status

### Track an Experiment

1. Open the **Experiments** section.
2. Create a new experiment.
3. Associate it with a project and dataset.
4. Enter:

   * Model Name
   * Accuracy
   * Precision
   * Recall
   * F1-Score
   * Notes

### View Dashboard Analytics

The dashboard provides:

* Total datasets
* Total projects
* Total experiments
* Average model accuracy
* Dataset category distribution
* Experiment performance overview

### Update or Delete Records

All dataset, project, and experiment records can be edited or removed through their respective management pages.

---

## Project Structure

```text
app/
├── datasets/
├── projects/
├── experiments/
├── analytics/
├── settings/
├── login/
└── signup/

components/
├── ui/
├── dashboard-charts/
├── datasets-view/
├── projects-view/
└── experiments-view/

lib/
├── supabase.ts
├── datasets.ts
├── projects.ts
├── experiments.ts
└── dashboard.ts
```

---

## Future Enhancements

Planned improvements for future releases:

### Dataset Versioning

* Track changes to dataset metadata over time.
* Maintain version history.

### Experiment Comparison

* Compare multiple experiment runs side-by-side.
* Visual performance comparisons.

### Export Functionality

* Export data to:

  * CSV
  * PDF

### Tagging System

* Flexible tagging for improved dataset organization.

### Notifications

* Dataset status alerts.
* Experiment completion notifications.

### API Integration

* Public REST API access.
* Integration with external research tools and ML pipelines.

---

## License

This project was developed for academic and research purposes.

See the LICENSE file for additional details.
