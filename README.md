
<img width="1716" height="752" alt="Screenshot 2025-08-31 172143" src="https://github.com/user-attachments/assets/881f0110-b9a6-4b29-9105-6a2fb417a8cb" />

<img width="1916" height="1002" alt="Screenshot 2025-08-31 172220" src="https://github.com/user-attachments/assets/4ea26771-2bde-40b1-b71c-ba6bc1250489" />


# data-flow-architect
 Data Flow Architect

## Overview
This project is a React + TypeScript + Tailwind CSS frontend that allows users to describe data pipelines in plain English and see them visualized as interactive flow diagrams.

## Features
- Landing Page with hero section, large input field, and example prompt buttons
- Chat interface with AI responses
- Split-pane layout: chat and visual canvas side-by-side (desktop)
- Visual FlowDiagram with three node types:
	- Source (databases, APIs) — blue
	- Transform (data processing) — purple
	- Destination (warehouses, APIs) — green
- Node status indicators:
	- Pending (orange) → Partial (blue) → Complete (green) → Error (red)
- Properties panel showing configuration details for selected node
- Dark/light theme toggle
- Mobile-responsive design

## Run Locally
```bash
npm install
npm run dev
