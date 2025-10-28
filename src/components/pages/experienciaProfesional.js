import {html, css} from 'lit';
import {BasePage} from './basePage';
import '../shared/modeToggleButton.js';
import '../shared/baseToggleButton.js';

export class ExperienciaProfesional extends BasePage {
  // Variables estáticas para mantener el estado entre navegaciones
  static hasAnsweredWelcome = false;
  static userPreferredSimpleMode = false;

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          width: 100vw;
          height: 100vh;
          position: relative;
        }

        .pageContainer {
          width: 100%;
          height: 100%;
          background: transparent;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0;
          margin: 0;
          position: relative;
        }

        .content-wrapper {
          position: relative;
          width: 85vw;
          max-width: 1200px;
        }

        .contentContainer {
          width: 100%;
          color: white;
          z-index: 10;
        }

        .contentContainer.terminal-mode {
          height: 70vh;
          background: #1e1e1e;
          border: 1px solid #333333;
          border-radius: 6px;
          padding: 0;
          overflow: visible;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        /* Solo animar fade-in cuando el componente está completamente visible */
        :host(.visible) .contentContainer.terminal-mode {
          opacity: 0;
          animation: fadeIn 0.6s ease-in-out forwards;
        }

        /* Terminal Header */
        .terminal-header {
          background: #2d2d2d;
          padding: 0.8rem 1.5rem;
          border-bottom: 1px solid #333333;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .terminal-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #666666;
        }

        .terminal-title {
          font-family: 'Roboto Mono', monospace;
          color: #999999;
          font-size: 0.85rem;
          margin-left: auto;
        }

        /* Tab Navigation */
        .tab-navigation {
          display: flex;
          gap: 0.5rem;
          padding: 1rem 2rem 0 2rem;
          background: #1e1e1e;
        }

        .tab-button {
          font-family: 'Roboto Mono', monospace;
          background: transparent;
          border: none;
          color: #999999;
          padding: 0.8rem 1.5rem;
          cursor: pointer;
          font-size: 0.9rem;
          border-bottom: 2px solid transparent;
          transition: all 0.3s ease;
          position: relative;
        }

        .tab-button:hover {
          color: #ffffff;
          background: #2d2d2d;
        }

        .tab-button.active {
          color: #0acbd5;
          border-bottom-color: #0acbd5;
          background: #2d2d2d;
        }

        .tab-button::before {
          content: '>';
          margin-right: 0.5rem;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .tab-button.active::before {
          opacity: 1;
        }

        /* Contador de items en tab */
        .tab-count {
          display: inline-block;
          background: #333333;
          color: #999999;
          padding: 0.1rem 0.5rem;
          border-radius: 10px;
          font-size: 0.75rem;
          margin-left: 0.5rem;
        }

        .tab-button.active .tab-count {
          background: rgba(10, 203, 213, 0.2);
          color: #0acbd5;
        }

        /* Terminal Body */
        .terminal-body {
          flex: 1;
          padding: 2rem;
          overflow-y: auto;
          overflow-x: hidden;
          font-family: 'Roboto Mono', monospace;
          font-size: 0.95rem;
          line-height: 1.8;
          color: #0acbd5;
        }

        /* Scrollbar personalizado */
        .terminal-body::-webkit-scrollbar {
          width: 8px;
        }

        .terminal-body::-webkit-scrollbar-track {
          background: #2d2d2d;
        }

        .terminal-body::-webkit-scrollbar-thumb {
          background: #555555;
          border-radius: 4px;
        }

        /* Líneas del terminal */
        .terminal-line {
          margin-bottom: 0.5rem;
          opacity: 0;
          animation: fadeInLine 0.3s forwards;
        }

        @keyframes fadeInLine {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .prompt {
          color: #0acbd5;
        }

        .command {
          color: #ffffff;
          font-weight: bold;
        }

        .output {
          color: #d6d2d2;
          margin-left: 2rem;
          margin-top: 0.5rem;
        }

        .output-highlight {
          color: #0acbd5;
          font-weight: bold;
        }

        .output-dim {
          color: rgba(214, 210, 210, 0.6);
        }

        /* Experiencia expandible */
        .experience-item {
          margin: 1.5rem 0;
          padding: 1.5rem;
          background: transparent;
          border-left: 2px solid #555555;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }

        .experience-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 0;
          height: 100%;
          background: #2d2d2d;
          transition: width 0.2s ease;
          z-index: 0;
        }

        .experience-item:hover::before {
          width: 100%;
        }

        .experience-item:hover {
          background: #2d2d2d;
          border-left-color: #999999;
        }

        .experience-item > * {
          position: relative;
          z-index: 1;
        }

        .experience-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .experience-role {
          font-size: 1.3rem;
          color: #ffffff;
          font-weight: bold;
          margin-bottom: 0.3rem;
        }

        .experience-company {
          color: #999999;
          font-size: 1rem;
        }

        .experience-period {
          color: #666666;
          font-size: 0.85rem;
          white-space: nowrap;
          padding: 0.3rem 0.8rem;
          background: #2d2d2d;
          border-radius: 3px;
          border: 1px solid #444444;
        }

        .experience-desc {
          color: #d6d2d2;
          margin: 1rem 0;
          line-height: 1.6;
        }

        .experience-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .tech-item {
          background: #2d2d2d;
          color: #999999;
          padding: 0.3rem 0.8rem;
          border-radius: 3px;
          font-size: 0.8rem;
          border: 1px solid #444444;
          transition: all 0.2s ease;
        }

        .tech-item:hover {
          background: #3d3d3d;
          color: #cccccc;
        }

        /* Cursor parpadeante */
        .cursor {
          display: inline-block;
          width: 8px;
          height: 16px;
          background: #0acbd5;
          margin-left: 2px;
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%,
          49% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0;
          }
        }

        /* Separador visual */
        .separator {
          margin: 2rem 0;
          height: 1px;
          background: #333333;
        }

        /* Estilos para el título de terminal (ocultar solo en terminal mode) */
        .terminal-mode h1 {
          display: none;
        }

        /* Pero mostrar h1 en welcome screen */
        .welcome-screen h1 {
          display: block;
        }

        /* Sección de categoría */
        .section-header {
          color: #ffffff;
          font-size: 1.1rem;
          font-weight: bold;
          margin: 2rem 0 1rem 0;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #333333;
        }

        .section-path {
          color: #0acbd5;
          font-weight: normal;
        }

        /* Badge de estado */
        .status-badge {
          display: inline-block;
          padding: 0.2rem 0.6rem;
          background: #2d2d2d;
          border: 1px solid #0acbd5;
          border-radius: 3px;
          font-size: 0.7rem;
          margin-left: 0.5rem;
          color: #0acbd5;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* Animación de tipeo */
        @keyframes typewriter {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        .typing-effect {
          overflow: hidden;
          white-space: nowrap;
          display: inline-block;
        }

        /* Mode Toggle Button Positioning */
        .mode-toggle {
          position: absolute;
          bottom: -2.5rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 100;
        }

        /* Simple Mode Styles */
        .simple-mode {
          width: 100%;
          height: 100%;
          padding: 2rem;
          background: transparent;
          overflow-y: auto;
          overflow-x: hidden;
          box-sizing: border-box;
        }

        /* Solo animar fade-in cuando el componente está completamente visible */
        :host(.visible) .simple-mode {
          opacity: 0;
          animation: fadeIn 0.6s ease-in-out forwards;
        }

        /* Scrollbar para simple mode */
        .simple-mode::-webkit-scrollbar {
          width: 8px;
        }

        .simple-mode::-webkit-scrollbar-track {
          background: #2d2d2d;
        }

        .simple-mode::-webkit-scrollbar-thumb {
          background: #555555;
          border-radius: 4px;
        }

        .simple-mode h2 {
          color: #0acbd5;
          font-size: 2.5rem;
          margin-bottom: 2rem;
          text-align: center;
          font-family: 'Oswald', serif;
        }

        .simple-section {
          margin-bottom: 3rem;
        }

        .simple-section-title {
          color: #ffffff;
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #0acbd5;
          font-family: 'Oswald', serif;
        }

        .simple-experience {
          background: rgba(45, 45, 45, 0.5);
          border-left: 3px solid #0acbd5;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          border-radius: 0 8px 8px 0;
        }

        .simple-experience-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .simple-role {
          font-size: 1.5rem;
          color: #ffffff;
          font-weight: bold;
          font-family: 'Oswald', serif;
        }

        .simple-company {
          color: #0acbd5;
          font-size: 1.1rem;
          margin-top: 0.3rem;
          font-family: 'Roboto Mono', monospace;
        }

        .simple-period {
          color: #999999;
          font-size: 0.9rem;
          font-family: 'Roboto Mono', monospace;
        }

        .simple-desc {
          color: #d6d2d2;
          line-height: 1.6;
          margin: 1rem 0;
          font-family: 'Roboto Mono', monospace;
        }

        .simple-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .simple-tech-item {
          background: rgba(10, 203, 213, 0.2);
          color: #0acbd5;
          padding: 0.4rem 0.8rem;
          border-radius: 4px;
          font-size: 0.85rem;
          border: 1px solid rgba(10, 203, 213, 0.4);
          font-family: 'Roboto Mono', monospace;
        }

        /* Welcome Screen */
        .welcome-screen {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          background: transparent;
          opacity: 0;
          animation: fadeIn 0.6s ease-in-out forwards;
        }

        .welcome-question {
          font-size: 2.5rem;
          color: #ffffff;
          margin-bottom: 3rem;
          font-family: 'Oswald', serif;
          background: transparent;
        }

        /* Fade animations */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-in {
          opacity: 0;
          animation: fadeIn 0.6s ease-in-out forwards;
        }

        .fade-out {
          opacity: 1;
          animation: fadeOut 0.4s ease-in-out forwards;
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-10px);
          }
        }

        .welcome-buttons {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .welcome-button {
          background: #1e1e1e;
          border: 2px solid #0acbd5;
          color: #0acbd5;
          padding: 1rem 2rem;
          font-size: 1rem;
          font-family: 'Roboto Mono', monospace;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          min-width: 120px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .welcome-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: #0acbd5;
          transition: left 0.3s ease;
          z-index: 0;
        }

        .welcome-button:hover::before {
          left: 0;
        }

        .welcome-button:hover {
          color: #1e1e1e;
        }

        .welcome-button span {
          position: relative;
          z-index: 1;
        }

        .welcome-icon {
          width: 1.5rem;
          height: 1.5rem;
          position: relative;
          z-index: 1;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .contentContainer {
            width: 95vw;
            height: 80vh;
          }

          .terminal-body {
            padding: 1rem;
            font-size: 0.85rem;
          }

          .experience-header {
            flex-direction: column;
            gap: 0.5rem;
          }

          .experience-period {
            align-self: flex-start;
          }

          .mode-toggle {
            bottom: -2.2rem;
          }

          .simple-mode {
            width: 95vw;
            padding: 1rem;
          }

          .simple-mode h2 {
            font-size: 1.5rem;
          }
        }
      `,
    ];
  }

  static get properties() {
    return {
      ...super.properties,
      frontendExperiences: {type: Array},
      esportsExperiences: {type: Array},
      activeTab: {type: String},
      isSimpleMode: {type: Boolean},
      showWelcome: {type: Boolean},
      isFadingContent: {type: Boolean},
      hasAnsweredWelcome: {type: Boolean},
      _isMounted: {type: Boolean, state: true},
      _shouldRender: {type: Boolean, state: true},
    };
  }

  constructor() {
    super();
    this.activeTab = 'frontend'; // 'frontend' o 'esports'
    this.isSimpleMode = false;
    this.isFadingContent = false;
    this._isMounted = false;
    this._shouldRender = false;
    this._mountTimeout = null;

    console.log('[Experiencia] Constructor llamado');
    console.log(
      '[Experiencia] hasAnsweredWelcome:',
      ExperienciaProfesional.hasAnsweredWelcome
    );
    console.log(
      '[Experiencia] userPreferredSimpleMode:',
      ExperienciaProfesional.userPreferredSimpleMode
    );

    // Solo mostrar welcome si el usuario NO ha respondido antes
    // hasAnsweredWelcome se guarda en una variable estática de la clase
    if (!ExperienciaProfesional.hasAnsweredWelcome) {
      this.showWelcome = true;
      console.log('[Experiencia] Mostrando welcome screen');
    } else {
      this.showWelcome = false;
      // Recuperar la preferencia guardada del usuario
      this.isSimpleMode =
        ExperienciaProfesional.userPreferredSimpleMode || false;
      console.log(
        '[Experiencia] Saltando welcome, isSimpleMode:',
        this.isSimpleMode
      );
    }

    this.frontendExperiences = [
      {
        role: 'Senior Full Stack Developer',
        company: 'Tech Innovations Inc.',
        period: '2022 - Present',
        status: 'current',
        description:
          'Leading development of scalable web applications using modern frameworks. Architecting cloud-native solutions and mentoring junior developers.',
        technologies: [
          'React',
          'Node.js',
          'AWS',
          'TypeScript',
          'Docker',
          'Kubernetes',
        ],
      },
      {
        role: 'Frontend Developer',
        company: 'Digital Agency XYZ',
        period: '2019 - 2020',
        status: '',
        description:
          'Developed responsive web applications for clients across various industries. Focused on performance optimization and exceptional user experience.',
        technologies: ['Vue.js', 'SASS', 'Webpack', 'REST APIs', 'Git'],
      },
      {
        role: 'Web Developer & Designer',
        company: 'Freelance',
        period: '2017 - 2019',
        status: '',
        description:
          'Created custom websites and web applications for small businesses. Specialized in modern, responsive designs with focus on usability.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'WordPress', 'PHP'],
      },
    ];

    this.esportsExperiences = [
      {
        role: 'Esports Producer & Broadcast Engineer',
        company: 'Esports Global',
        period: '2020 - 2022',
        status: 'current',
        description:
          'Produced live esports tournaments with 100K+ concurrent viewers. Managed broadcast pipelines and coordinated production teams across multiple platforms.',
        technologies: [
          'OBS',
          'vMix',
          'Adobe Premiere',
          'Twitch API',
          'StreamLabs',
        ],
      },
      {
        role: 'Content Creator & Stream Producer',
        company: 'Gaming Studios Inc.',
        period: '2018 - 2020',
        status: '',
        description:
          'Managed live streaming operations and content creation for gaming events. Coordinated with talent and technical teams to deliver high-quality broadcasts.',
        technologies: ['StreamYard', 'Restream', 'Discord', 'YouTube Live'],
      },
    ];
  }

  connectedCallback() {
    super.connectedCallback();
    console.log(
      '[Experiencia] connectedCallback - isSimpleMode:',
      this.isSimpleMode,
      'showWelcome:',
      this.showWelcome
    );

    // Marcar como montado de inmediato
    this._isMounted = true;

    // Solo renderizar si el componente permanece montado por más de 200ms
    // Esto previene el render durante montajes/desmontajes rápidos (outgoing views)
    this._mountTimeout = setTimeout(() => {
      console.log('[Experiencia] Componente estable - habilitando render');
      this._shouldRender = true;

      // Agregar clase 'visible' para activar animaciones
      requestAnimationFrame(() => {
        this.classList.add('visible');
      });
    }, 200);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    console.log(
      '[Experiencia] disconnectedCallback - isSimpleMode:',
      this.isSimpleMode
    );

    // Cancelar timeout si se desmonta antes de tiempo
    if (this._mountTimeout) {
      clearTimeout(this._mountTimeout);
      this._mountTimeout = null;
    }

    this._isMounted = false;
    this._shouldRender = false;
    this.classList.remove('visible');
  }

  _switchTab(tab) {
    this.activeTab = tab;
  }

  _handleModeChanged(e) {
    this.isSimpleMode = e.detail.isSimpleMode;
    console.log(
      '[Experiencia] _handleModeChanged - nuevo isSimpleMode:',
      this.isSimpleMode
    );

    // Guardar la preferencia
    ExperienciaProfesional.userPreferredSimpleMode = this.isSimpleMode;
    console.log(
      '[Experiencia] Guardado userPreferredSimpleMode:',
      ExperienciaProfesional.userPreferredSimpleMode
    );

    // Forzar actualización
    this.requestUpdate();
  }

  _handleWelcomeChoice(knowsCode) {
    // Iniciar fade out
    this.isFadingContent = true;
    this.requestUpdate();

    // Esperar a que termine la animación fade out
    setTimeout(() => {
      this.isSimpleMode = !knowsCode; // Si conoce código -> terminal (false), si no -> simple (true)
      this.showWelcome = false;
      this.isFadingContent = false;

      // Guardar la respuesta del usuario en variables estáticas
      ExperienciaProfesional.hasAnsweredWelcome = true;
      ExperienciaProfesional.userPreferredSimpleMode = this.isSimpleMode;

      console.log(
        '[Experiencia] _handleWelcomeChoice - isSimpleMode establecido a:',
        this.isSimpleMode
      );

      this.requestUpdate();
    }, 400); // Duración del fadeOut animation
  }

  _renderWelcome() {
    return html`
      <div class="welcome-screen ${this.isFadingContent ? 'fade-out' : ''}">
        <h1 class="welcome-question">
          ${this.t('experiencia-welcome-question')}
        </h1>
        <div class="welcome-buttons">
          <button
            class="welcome-button"
            @click=${() => this._handleWelcomeChoice(true)}
          >
            <svg
              class="welcome-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 15 15"
            >
              <path
                fill="currentColor"
                stroke="currentColor"
                stroke-width="0.3"
                d="M9.036 2.314a.5.5 0 1 1 .928.371l-4 10a.5.5 0 1 1-.928-.37zm2.11 2.832a.5.5 0 0 1 .63-.064l.077.064l2 2l.065.078a.5.5 0 0 1-.065.63l-2 2a.5.5 0 1 1-.707-.708L12.793 7.5l-1.647-1.647l-.064-.078a.5.5 0 0 1 .064-.629m-8 0a.5.5 0 0 1 .707.707L2.207 7.5l1.646 1.646l.065.078a.5.5 0 0 1-.693.694l-.079-.065l-2-2a.5.5 0 0 1 0-.707z"
              />
            </svg>
            <span>${this.t('experiencia-welcome-yes')}</span>
          </button>
          <button
            class="welcome-button"
            @click=${() => this._handleWelcomeChoice(false)}
          >
            <svg
              class="welcome-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 15 15"
            >
              <path
                fill="currentColor"
                stroke="currentColor"
                stroke-width="0.3"
                d="M9.086 1a1.5 1.5 0 0 1 1.06.44l2.414 2.414l.1.11a1.5 1.5 0 0 1 .34.95V12.5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 2 12.5v-10A1.5 1.5 0 0 1 3.5 1zM3.5 2a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V4.914a.5.5 0 0 0-.084-.277l-.062-.076l-2.415-2.415A.5.5 0 0 0 9.086 2zm7 8a.5.5 0 0 1 0 1h-6a.5.5 0 0 1 0-1zm0-3a.5.5 0 0 1 0 1h-6a.5.5 0 0 1 0-1zm-3-3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1z"
              />
            </svg>
            <span>${this.t('experiencia-welcome-no')}</span>
          </button>
        </div>
      </div>
    `;
  }

  _renderSimpleMode() {
    return html`
      <div class="simple-mode">
        <h2>${this.t('experiencia-title')}</h2>

        <!-- Frontend Development Section -->
        <div class="simple-section">
          <h3 class="simple-section-title">
            ${this.t('experiencia-tab-frontend')}
          </h3>
          ${this.frontendExperiences.map(
            (exp) => html`
              <div class="simple-experience">
                <div class="simple-experience-header">
                  <div>
                    <div class="simple-role">
                      ${exp.role}
                      ${exp.status === 'current'
                        ? html`<span class="status-badge"
                            >${this.t('experiencia-status-active')}</span
                          >`
                        : ''}
                    </div>
                    <div class="simple-company">${exp.company}</div>
                  </div>
                  <div class="simple-period">${exp.period}</div>
                </div>
                <div class="simple-desc">${exp.description}</div>
                <div class="simple-tech">
                  ${exp.technologies.map(
                    (tech) => html`
                      <span class="simple-tech-item">${tech}</span>
                    `
                  )}
                </div>
              </div>
            `
          )}
        </div>

        <!-- Esports Production Section -->
        <div class="simple-section">
          <h3 class="simple-section-title">
            ${this.t('experiencia-tab-esports')}
          </h3>
          ${this.esportsExperiences.map(
            (exp) => html`
              <div class="simple-experience">
                <div class="simple-experience-header">
                  <div>
                    <div class="simple-role">
                      ${exp.role}
                      ${exp.status === 'current'
                        ? html`<span class="status-badge"
                            >${this.t('experiencia-status-active')}</span
                          >`
                        : ''}
                    </div>
                    <div class="simple-company">${exp.company}</div>
                  </div>
                  <div class="simple-period">${exp.period}</div>
                </div>
                <div class="simple-desc">${exp.description}</div>
                <div class="simple-tech">
                  ${exp.technologies.map(
                    (tech) => html`
                      <span class="simple-tech-item">${tech}</span>
                    `
                  )}
                </div>
              </div>
            `
          )}
        </div>
      </div>
    `;
  }

  renderContent() {
    console.log(
      '[Experiencia] renderContent - _isMounted:',
      this._isMounted,
      '_shouldRender:',
      this._shouldRender,
      'showWelcome:',
      this.showWelcome,
      'isSimpleMode:',
      this.isSimpleMode
    );

    // No renderizar nada si el componente no está listo (previene el flash durante outgoing views)
    if (!this._isMounted || !this._shouldRender) {
      console.log('[Experiencia] No renderizando - esperando estabilidad');
      return html``;
    }

    // Mostrar pantalla de bienvenida primero
    if (this.showWelcome) {
      console.log('[Experiencia] Renderizando welcome screen');
      return this._renderWelcome();
    }

    // Mostrar modo simple o terminal según elección
    if (this.isSimpleMode) {
      console.log('[Experiencia] Renderizando modo simple');
      return this._renderSimpleMode();
    }

    console.log('[Experiencia] Renderizando modo terminal');

    const currentExperiences =
      this.activeTab === 'frontend'
        ? this.frontendExperiences
        : this.esportsExperiences;

    const tabPath =
      this.activeTab === 'frontend' ? 'frontend-dev' : 'esports-production';

    const tabTitle =
      this.activeTab === 'frontend'
        ? this.t('experiencia-section-frontend')
        : this.t('experiencia-section-esports');

    return html`
      <div class="terminal-header">
        <div class="terminal-dot"></div>
        <div class="terminal-dot"></div>
        <div class="terminal-dot"></div>
        <div class="terminal-title">
          ${this.t('experiencia-terminal-title')}
        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="tab-navigation">
        <button
          class="tab-button ${this.activeTab === 'frontend' ? 'active' : ''}"
          @click=${() => this._switchTab('frontend')}
        >
          ${this.t('experiencia-tab-frontend')}
          <span class="tab-count">${this.frontendExperiences.length}</span>
        </button>
        <button
          class="tab-button ${this.activeTab === 'esports' ? 'active' : ''}"
          @click=${() => this._switchTab('esports')}
        >
          ${this.t('experiencia-tab-esports')}
          <span class="tab-count">${this.esportsExperiences.length}</span>
        </button>
      </div>

      <div class="terminal-body">
        <div class="terminal-line" style="animation-delay: 0.1s">
          <span class="prompt">esmunozdev@portfolio:~$</span>
          <span class="command"> cd ./experience/${tabPath}</span>
        </div>

        <div class="terminal-line" style="animation-delay: 0.2s">
          <div class="output output-dim">
            ${currentExperiences.length} ${this.t('experiencia-items-found')}
          </div>
        </div>

        <div class="separator"></div>

        <div class="section-header" style="animation-delay: 0.3s">
          <span class="section-path">~/experience/${tabPath}</span> -
          ${tabTitle}
        </div>

        ${currentExperiences.map(
          (exp, index) => html`
            <div
              class="experience-item"
              style="animation-delay: ${0.4 + index * 0.2}s"
            >
              <div class="experience-header">
                <div>
                  <div class="experience-role">
                    ${exp.role}
                    ${exp.status === 'current'
                      ? html`<span class="status-badge"
                          >${this.t('experiencia-status-active')}</span
                        >`
                      : ''}
                  </div>
                  <div class="experience-company">${exp.company}</div>
                </div>
                <div class="experience-period">${exp.period}</div>
              </div>

              <div class="experience-desc">${exp.description}</div>

              <div class="experience-tech">
                ${exp.technologies.map(
                  (tech) => html` <span class="tech-item">${tech}</span> `
                )}
              </div>
            </div>
          `
        )}

        <div class="separator"></div>

        <div
          class="terminal-line"
          style="animation-delay: ${0.4 + currentExperiences.length * 0.2}s"
        >
          <span class="prompt">esmunozdev@portfolio:~$</span>
          <span class="cursor"></span>
        </div>
      </div>

    `;
  }

  render() {
    // Aplicar clase al host
    if (this.isLanguageFading) {
      this.classList.add('languageFading');
    } else {
      this.classList.remove('languageFading');
    }

    // Aplicar terminal-mode tanto en modo terminal como en modo simple
    const shouldShowContainer = !this.showWelcome;

    return html`
      <div class="pageContainer">
        <div class="content-wrapper">
          <div
            class="contentContainer ${shouldShowContainer ? 'terminal-mode' : ''}"
          >
            ${this.renderContent()}
          </div>

          <!-- Mode toggle button - fuera del renderContent para evitar re-renders -->
          ${!this.showWelcome
            ? html`
                <mode-toggle-button
                  class="mode-toggle"
                  @mode-changed=${this._handleModeChanged}
                  .checked=${this.isSimpleMode}
                  .terminalLabel=${this.t('experiencia-mode-terminal')}
                  .simpleLabel=${this.t('experiencia-mode-simple')}
                ></mode-toggle-button>
              `
            : ''}
        </div>

        <button
          class="backButton ${this.isFadingOut ? 'fadeOut' : ''}"
          @click=${this._handleBackClick}
        >
          ◀
        </button>
      </div>
    `;
  }
}

window.customElements.define('experiencia-profesional', ExperienciaProfesional);
