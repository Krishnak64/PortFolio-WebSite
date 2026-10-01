# Krishna's Portfolio Website

A responsive developer portfolio for a **Full Stack Developer** and **AI/ML Engineer**, built with React and Vite. Visitors can switch between a Full Stack view and an AI/ML view, browse projects, and download the resume that fits the role.

**[Live Demo](https://krishnatechportfolio.netlify.app/)** · **[Source Code](https://github.com/Krishnak64/PortFolio-WebSite)**

## Features

- **Role toggle:** switch between Full Stack and AI/ML. The headline, about text, skills, accent colour and resume button change with it.
- **Project showcase:** 11 projects with feature lists, tech stacks, live demo links and GitHub links, with CORTEX AI featured first.
- **Filters and "Show all":** filter projects by All, Full Stack or AI/ML, and expand the list only when needed.
- **Resume downloads:** two role-specific PDFs (Full Stack and AI/ML).
- **Skills and experience:** skills grouped by role, plus an internship timeline.
- **Responsive:** works on phones, tablets and desktops.
- **Dark mode:** follows the system theme, and respects reduced-motion settings.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 18, JavaScript, CSS (custom properties) |
| Build tool | Vite |
| Fonts | Bricolage Grotesque, IBM Plex Sans (Google Fonts) |
| Deployment | Netlify |

## Featured Projects

| Project | Area |
| --- | --- |
| CORTEX AI: Multi-Agent Platform (LangGraph, RAG, Qdrant) | Full Stack + AI/ML |
| MERN AI Website Builder | Full Stack + AI/ML |
| ExamNotesAI | Full Stack + AI/ML |
| Real-Time AI Gym Coach | AI/ML |
| SnapClass AI: Smart Attendance | AI/ML |
| Flappy Bird AI (Deep Q-Network) | AI/ML |
| Vybes: Social Media Platform | Full Stack |
| CORA: Citation Network Paper Classification | AI/ML |
| Heart Disease Prediction | AI/ML |
| MeetHub: Video Calling Platform | Full Stack |
| Airbnb Clone | Full Stack |

## Project Structure

```
PortFolio-WebSite/
├── public/                 # Resume PDFs (served as static files)
│   ├── Krishna_Resume_FullStack.pdf
│   └── Krishna_Resume_AI-ML.pdf
├── src/
│   ├── App.jsx             # Page layout and components
│   ├── data.js             # All content: projects, skills, experience, links
│   ├── styles.css          # Styling and theme
│   └── main.jsx            # App entry point
├── index.html
├── vite.config.js
└── package.json
```

## Getting Started

You need [Node.js](https://nodejs.org) (LTS version) installed.

```bash
# 1. Clone the repository
git clone https://github.com/Krishnak64/PortFolio-WebSite.git
cd PortFolio-WebSite

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open the link Vite prints (usually `http://localhost:5173`).

### Other commands

| Command | What it does |
| --- | --- |
| `npm run build` | Creates a production build in `dist/` |
| `npm run preview` | Serves the production build locally |

## Customising

- **Content:** edit `src/data.js` to change projects, skills, experience, contact details and links. The order of the `projects` list is the order shown on the site.
- **Resumes:** replace the PDFs in `public/` and keep the same file names.
- **Look and feel:** edit the colour variables at the top of `src/styles.css`.

## Deployment

The site is deployed on Netlify from this repository.

- Build command: `npm run build`
- Publish directory: `dist`

Every push to `main` triggers a new deploy.

## Contact

- Email: krishnakumar.tech7@gmail.com
- GitHub: [Krishnak64](https://github.com/Krishnak64)
- Live site: [krishnaportfolio.com](https://krishnaportfolio.com)
