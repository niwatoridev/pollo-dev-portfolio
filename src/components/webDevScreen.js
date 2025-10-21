import {html, css} from 'lit';
import {TranslatorClass} from './TranslatorClass';
import Typed from 'typed.js';
import './LanguageSwitcher';

export class WebDevScreen extends TranslatorClass {
  static get styles() {
    return css`
      :host {
        display: block;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
      }

      #mainContainer {
        display: flex;
        flex-direction: column;
        margin: 0;
        padding: 0;
        background-color: #1e1e1e;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
      }

      #header {
        width: fit-content;
        display: flex;
        flex-direction: column;
        position: absolute;
        bottom: -1vw;
      }

      .heroVideo {
        opacity: 0.4;
      }

      #gradient {
        position: absolute;
        bottom: -1vw;
        width: 99vw;
        height: 50vh;
        background: rgb(30, 30, 30);
        background: linear-gradient(
          0deg,
          rgba(30, 30, 30, 1) 6%,
          rgba(30, 30, 30, 0) 26%
        );
      }

      #headerTextContainer {
        color: white;
        display: flex;
        flex-direction: column;
        width: 70vw;
        margin: 0;
        padding: 0;
      }

      #preheader {
        width: fit-content;
        color: #d6d2d2;
        font-family: 'Roboto Mono', monospace;
        font-optical-sizing: auto;
        font-style: normal;
        margin: 0;
        padding-left: 5px;
      }

      h1 {
        width: fit-content;
        font-size: 6rem;
        font-family: 'Oswald', serif;
        font-optical-sizing: auto;
        font-style: normal;
        margin: 0;
        color: #f4f4f4;
        height: fit-content;
      }

      p {
        color: white;
      }

      #headerText {
        color: transparent;
        -webkit-text-stroke: 1.5px #0acbd5;
        margin-bottom: -50px;
      }

      #subheader {
        color: #0acbd5;
        text-shadow: 1px 1px 1px #2e2e2e, 1px 2px 1px #2e2e2e,
          1px 3px 1px #2e2e2e, 1px 4px 1px #2e2e2e, 1px 5px 1px #2e2e2e,
          1px 6px 1px #2e2e2e, 1px 7px 1px #2e2e2e, 1px 8px 1px #2e2e2e,
          1px 9px 1px #2e2e2e, 1px 10px 1px #2e2e2e,
          1px 18px 6px rgba(16, 16, 16, 0.4),
          1px 22px 10px rgba(16, 16, 16, 0.2),
          1px 25px 35px rgba(16, 16, 16, 0.2),
          1px 30px 60px rgba(16, 16, 16, 0.4);
      }

      #typeWritingTextContainer {
        display: inline-block;
        margin-top: 3vh;
      }

      #typeWritingText {
        font-size: 1.5rem;
        color: #d6d2d2;
        font-family: 'Roboto Mono', monospace;
        font-optical-sizing: auto;
        font-style: normal;
        margin: 0;
        width: fit-content;
      }

      #langButton {
        position: absolute;
        left: 1810px;
        top: 20px;
      }

      body {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #000;
      }

      /* Carousel Styles */
      .carouselContainer {
        position: absolute;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        bottom: 0;
      }

      .carouselWheel {
        position: relative;
        width: 100px;
        height: 100px;
        transform-style: preserve-3d;
        transition: transform 0.8s ease-in-out;
        transform: translateX(-50vw) translateY(-12vh);
      }

      .carouselPanel {
        position: absolute;
        width: 70vw;
        transition: transform 0.8s ease-in-out, opacity 0.8s ease-in-out;
        transform-origin: 0 0;
      }

      .carouselButtons {
        position: absolute;
        display: flex;
        flex-direction: column;
        gap: 20px;
        z-index: 100;
        left: 2.5%;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      .carouselButton {
        padding: 0;
        background: none;
        color: #0acbd5;
        border: none;
        cursor: pointer;
        font-size: 32px;
        transition: all 0.3s ease;
      }

      .carouselButton:hover {
        color: #ffffff;
        transform: scale(1.3);
        filter: drop-shadow(0 0 10px #0acbd5);
      }
    `;
  }

  static get properties() {
    return {
      preferedLanguage: {type: String},
      typingTextVisible: {type: Boolean},
      heroVideoSource: {type: String},
      currentRotation: {type: Number},
      numberOfPanels: {type: Number},
    };
  }

  constructor() {
    super();
    this.preferedLanguage = 'es-MX';
    this.typingTextVisible = true;
    this.typedInstance = null;
    this.heroVideoSource = '../../media/videos/blurredHeroShot.mp4';

    // Carousel configuration
    this.numberOfPanels = 4; // Escalable: cambia este número para más paneles
    this.currentRotation = 0; // Ángulo actual de rotación en grados
    this.panelContents = [
      {title: 'WEB DEVELOPER', subtitle: 'AND ESPORTS PRODUCER'},
      {title: 'EXPERIENCIA', subtitle: 'PROFESIONAL'},
      {title: 'PORTFOLIO', subtitle: 'DE TRABAJOS'},
      {title: 'CONTACTO', subtitle: 'Y REDES'},
    ];
  }

  _onLanguageChanged(event) {
    this.preferedLanguage = event.detail.language;
    this.setPreferedLanguage(this.preferedLanguage);
    this.typingTextVisible = false;
    this.typingTextVisible = true;
  }

  updated(changedProperties) {
    super.updated(changedProperties);

    if (this.typingTextVisible) {
      const typingElement = this.shadowRoot.querySelector(
        '#typeWritingText span.typing'
      );

      if (typingElement) {
        if (this.typedInstance) {
          this.typedInstance.destroy();
        }

        this.typedInstance = new Typed(typingElement, {
          strings: [
            this.t('portfolio-mainpage-hero-typewriting-one'),
            this.t('portfolio-mainpage-hero-typewriting-two'),
            this.t('portfolio-mainpage-hero-typewriting-three'),
            this.t('portfolio-mainpage-hero-typewriting-four'),
          ],
          typeSpeed: 20,
          backSpeed: 8,
          backDelay: 2500,
          loop: true,
          smartBackspace: true,
          showCursor: false,
        });
      } else {
        console.error('Elemento para Typed.js no encontrado en el DOM');
      }
    }
  }

  _renderTypeWriting() {
    return html`
      <div id="typeWritingTextContainer">
        <p id="typeWritingText"><span class="typing"></span></p>
      </div>
    `;
  }

  /**
   * Calcula el ángulo de cada panel basado en el número total de paneles
   * Panel 1 (index 0) debe estar a 0° (derecha del círculo)
   */
  _getPanelAngle(index) {
    const degreesPerPanel = 360 / this.numberOfPanels;
    // Sin offset - Panel 1 (index 0) en 0°, Panel 2 en 90°, Panel 3 en 180°, Panel 4 en 270°
    return index * degreesPerPanel;
  }

  /**
   * Calcula la rotación individual del panel para que aparezca derecho
   * Paneles horizontales (derecha/izquierda): 0° de rotación del contenido
   * Paneles verticales (arriba/abajo): 90° o -90° de rotación del contenido
   */
  _getPanelContentRotation(positionAngle) {
    // Normalizar el ángulo a 0-360
    const normalized = ((positionAngle % 360) + 360) % 360;

    // Derecha (0°): sin rotación
    if (normalized >= 315 || normalized < 45) return 0;
    // Abajo (90°): rotar -90° para que el texto quede vertical
    if (normalized >= 45 && normalized < 135) return -90;
    // Izquierda (180°): sin rotación
    if (normalized >= 135 && normalized < 225) return 0;
    // Arriba (270°): rotar 90° para que el texto quede vertical
    if (normalized >= 225 && normalized < 315) return 90;

    return 0;
  }

  /**
   * Calcula la opacidad del panel basado en su posición
   * Solo el panel en posición 0° (derecha del círculo) debe tener opacity 1
   */
  _getPanelOpacity(positionAngle) {
    const normalized = ((positionAngle % 360) + 360) % 360;
    // Panel a 0° (derecha del círculo): opacity 1
    if (normalized >= 315 || normalized < 45) return 1;
    // Otros paneles: opacity 0 (ocultos)
    return 0;
  }

  /**
   * Calcula la posición del panel en el círculo
   */
  _getPanelPosition(angle) {
    const radius = 150; // Radio del carrusel en píxeles (reducido para acercar paneles)
    const rad = (angle * Math.PI) / 180;
    return {
      x: Math.cos(rad) * radius,
      y: Math.sin(rad) * radius,
    };
  }

  /**
   * Rota el carrusel en sentido horario
   */
  rotateClockwise() {
    const degreesPerPanel = 360 / this.numberOfPanels;
    this.currentRotation -= degreesPerPanel;
    this.requestUpdate();
  }

  /**
   * Rota el carrusel en sentido antihorario
   */
  rotateCounterClockwise() {
    const degreesPerPanel = 360 / this.numberOfPanels;
    this.currentRotation += degreesPerPanel;
    this.requestUpdate();
  }

  renderHeader() {
    return html`
      <div id="header">
        <div>
          <video class="heroVideo" autoplay muted loop>
            <source src=${this.heroVideoSource} />
          </video>
        </div>
      </div>
      <div id="gradient"></div>
    `;
  }

  _renderPanelOne() {
    return html`
      <div id="headerTextContainer">
        <p id="preheader">${this.t('portfolio-mainpage-hero-preheader')}</p>
        <h1 id="headerText">${this.t('portfolio-mainpage-hero-header')}</h1>
        <h1 id="subheader">${this.t('portfolio-mainpage-hero-subheader')}</h1>
        ${this._renderTypeWriting()}
      </div>
    `;
  }

  renderCarousel() {
    return html`
      <div class="carouselContainer">
        <div class="carouselWheel">
          ${this.panelContents.map((content, index) => {
            // Calcular el ángulo actual del panel considerando la rotación
            const baseAngle = this._getPanelAngle(index);
            const currentAngle = baseAngle + this.currentRotation;

            // Opacidad basada en posición actual
            const opacity = this._getPanelOpacity(currentAngle);

            return html`
              <div
                class="carouselPanel"
                style="
                  transform:
                    rotate(${currentAngle}deg)
                    translate(150px, 0);
                  opacity: ${opacity};
                "
              >
                ${index === 0
                  ? this._renderPanelOne()
                  : html`
                      <div id="headerTextContainer">
                        <p id="preheader">Panel ${index + 1}</p>
                        <h1 id="headerText">${content.title}</h1>
                        <h1 id="subheader">${content.subtitle}</h1>
                      </div>
                    `}
              </div>
            `;
          })}
        </div>
        <div class="carouselButtons">
          <button class="carouselButton" @click=${this.rotateClockwise}>
            ▲
          </button>
          <button class="carouselButton" @click=${this.rotateCounterClockwise}>
            ▼
          </button>
        </div>
      </div>
    `;
  }

  render() {
    return html`
      <div id="mainContainer">
        ${this.renderHeader()} ${this.renderCarousel()}
        <language-switcher
          id="langButton"
          @language-changed="${this._onLanguageChanged}"
        ></language-switcher>
      </div>
    `;
  }
}

window.customElements.define('web-dev-screen', WebDevScreen);
