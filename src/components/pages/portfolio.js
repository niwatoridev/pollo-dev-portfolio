import {html, css} from 'lit';
import {BasePage} from './basePage';

export class Portfolio extends BasePage {
  static get styles() {
    return [
      super.styles,
      css`
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
        }

        .portfolio-card {
          background: rgba(45, 45, 45, 0.6);
          border: 1px solid #333333;
          border-radius: 12px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: all 0.3s ease;
          cursor: default;
        }

        .portfolio-card:hover {
          border-color: #0acbd5;
          background: rgba(45, 45, 45, 0.9);
          transform: translateY(-4px);
        }

        .card-logo {
          width: 120px;
          height: 120px;
          object-fit: contain;
          margin-bottom: 1.5rem;
          border-radius: 8px;
        }

        .card-name {
          font-size: 1.5rem;
          font-family: 'Oswald', serif;
          color: #ffffff;
          margin: 0 0 0.8rem 0;
        }

        .card-desc {
          font-size: 0.85rem;
          font-family: 'Roboto Mono', monospace;
          color: #999999;
          line-height: 1.6;
          margin: 0 0 1.2rem 0;
        }

        .card-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .tech-tag {
          background: rgba(10, 203, 213, 0.15);
          color: #0acbd5;
          padding: 0.25rem 0.6rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-family: 'Roboto Mono', monospace;
          border: 1px solid rgba(10, 203, 213, 0.3);
        }

        .card-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #0acbd5;
          text-decoration: none;
          font-family: 'Roboto Mono', monospace;
          font-size: 0.9rem;
          padding: 0.5rem 1.2rem;
          border: 1px solid #0acbd5;
          border-radius: 6px;
          transition: all 0.3s ease;
          margin-top: auto;
        }

        .card-link:hover {
          background: #0acbd5;
          color: #1e1e1e;
        }

        /* Override base contentContainer to ensure centering */
        .contentContainer {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .portfolio-title {
          font-size: 2.5rem;
          font-family: 'Oswald', serif;
          color: #0acbd5;
          margin: 0 0 2rem 0;
          text-align: center;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .portfolio-grid {
            grid-template-columns: 1fr;
            width: 90vw;
            gap: 1.5rem;
          }

          .portfolio-title {
            font-size: 2rem;
          }

          .card-logo {
            width: 90px;
            height: 90px;
          }
        }

        @media (max-width: 480px) {
          .portfolio-grid {
            width: 95vw;
          }

          .portfolio-title {
            font-size: 1.8rem;
          }

          .card-name {
            font-size: 1.2rem;
          }

          .card-desc {
            font-size: 0.8rem;
          }
        }
      `,
    ];
  }

  get projects() {
    return [
      {
        name: this.t('portfolio-1-name'),
        desc: this.t('portfolio-1-desc'),
        logo: '../../media/images/logos/RADAR3W.png',
        url: 'https://test.radartcg.com',
        technologies: [
          'React 18',
          'Vite',
          'Node.js',
          'Express',
          'MongoDB',
          'Cloudflare R2',
          'Stripe',
          'JWT Auth',
          'i18n',
        ],
      },
      {
        name: this.t('portfolio-2-name'),
        desc: this.t('portfolio-2-desc'),
        logo: '../../media/images/logos/medico-transparent.png',
        url: 'https://www.grupomedicojuridico.mx/',
        technologies: [
          'HTML5',
          'CSS3',
          'JavaScript',
          'Web3Forms',
          'Netlify',
          'Responsive Design',
        ],
      },
    ];
  }

  renderContent() {
    return html`
      <h1 class="portfolio-title">${this.t('portfolio-title')}</h1>
      <div class="portfolio-grid">
        ${this.projects.map(
          (project) => html`
            <div class="portfolio-card">
              <img
                class="card-logo"
                src="${project.logo}"
                alt="${project.name}"
              />
              <h2 class="card-name">${project.name}</h2>
              <p class="card-desc">${project.desc}</p>
              <div class="card-tech">
                ${project.technologies.map(
                  (tech) => html`<span class="tech-tag">${tech}</span>`
                )}
              </div>
              <a
                class="card-link"
                href="${project.url}"
                target="_blank"
                rel="noopener noreferrer"
              >
                ${this.t('portfolio-visit')} &#8599;
              </a>
            </div>
          `
        )}
      </div>
    `;
  }
}

window.customElements.define('portfolio-page', Portfolio);
