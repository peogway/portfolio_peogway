# Peogway — Portfolio

Personal portfolio of **Hung Nguyen**, MSc student in Digital Systems and Service Development at LUT University (Finland).

🌐 **Live site:** [peogway.dev](https://peogway.dev)

## About

A single-page portfolio presenting my background, tech stack, education, experience, and selected projects, with contact links. It is a static site built with [Jekyll](https://jekyllrb.com/) and hosted on GitHub Pages.

## Sections

- **Home** — short intro and tech stack
- **About** — background, skills, and education
- **Experience** — professional work and projects:
  - **Keys2Balance Oy** — Web Developer (React/Redux, Node.js/Express, PostgreSQL)
  - **Project Management Website** — full-stack app with React, Express, MongoDB, deployed on Fly.io
  - **Slime Adventure** — 2D platformer built in Godot 4 with an RL-trained enemy agent
  - **Blog App Website** — Next.js, TypeScript, PostgreSQL (Drizzle), with Playwright E2E tests and CI
- **Contact** — LinkedIn, GitHub, Telegram, and more

## Tech

- HTML, CSS, vanilla JavaScript
- Jekyll (components via `_config.yml` → `includes_dir: components`)
- Google Fonts (Playfair Display, IBM Plex Sans/Mono) and Font Awesome
- Custom domain via `CNAME`

## Project structure

```
.
├── index.html        # Page shell; includes each component
├── components/       # Jekyll includes: navbar, home, about, experience, contact, sidebar, footer
├── css/style.css     # Styles
├── js/               # navbar.js, main.js
├── assets/           # Avatar, project icons, screenshots
├── _config.yml       # Jekyll config
├── Gemfile
└── CNAME             # Custom domain
```

## Run locally

Requires [Ruby](https://www.ruby-lang.org/) and [Bundler](https://bundler.io/).

```bash
git clone https://github.com/peogway/portfolio_peogway.git
cd portfolio_peogway
bundle install
bundle exec jekyll serve
```

Then open <http://localhost:4000>.

## Customizing

Content lives in `components/`. Edit the relevant file (for example `experience.html` to add a project) and the change appears in the page automatically.

## Contact

- LinkedIn:&nbsp;&nbsp; [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/peogway2403/)
  <br/>
  <br/>
- GitHub:&nbsp;&nbsp; [![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/peogway)
  <br/>
  <br/>
- Telegram:&nbsp;&nbsp; [![Telegram](https://img.shields.io/badge/Telegram-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/peogway)

