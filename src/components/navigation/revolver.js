import {html, css} from 'lit';
import {TranslatorClass} from '../language/translatorClass';

export class Revolver extends TranslatorClass {
  static get styles() {
    return css`
      :host {
        display: block;
        width: 100vw;
        height: 100vh;
        position: relative;
      }

      /* Carousel Styles */
      #carouselContainer {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 60vw;
        height: 60vw;
        max-width: 500px;
        max-height: 500px;
        perspective: 1000px;
        will-change: transform;
        backface-visibility: hidden;
        transform: translateZ(0) translate(-50%, -50%);
      }

      #carousel {
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
        transition: transform 0.5s ease-in-out;
        will-change: transform;
        backface-visibility: hidden;
        transform: translateZ(0);
      }

      .panel {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 2px solid rgba(255, 255, 255, 0.2);
        border-radius: 20px;
        backface-visibility: hidden;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .panel.active {
        border-color: #0acbd5;
        box-shadow: 0 0 20px rgba(10, 203, 213, 0.3);
      }

      #subheader {
        font-size: 2.5rem;
        margin: 0;
        text-align: center;
        color: #f4f4f4;
        transition: opacity 0.3s ease;
      }

      .panelSubtitle {
        font-size: 1.2rem;
        color: #0acbd5;
        margin-top: 10px;
        font-family: 'Roboto Mono', monospace;
      }

      /* Navigation Arrows */
      .arrowButton {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: transparent;
        border: none;
        color: #ffffff;
        font-size: 24px;
        cursor: pointer;
        padding: 10px;
        z-index: 100;
        transition: color 0.3s ease;
      }

      .arrowButton:hover {
        color: #0acbd5;
      }

      .arrowButton.left {
        left: 20px;
      }

      .arrowButton.right {
        right: 20px;
      }

      /* Language fade animation for carousel text */
      #subheader,
      .panelSubtitle {
        transition: opacity 0.3s ease;
      }

      :host(.languageFading) #subheader,
      :host(.languageFading) .panelSubtitle {
        opacity: 0;
      }

      /* === MEDIA QUERIES PARA RESPONSIVE DESIGN === */

      /* Tablet y pantallas medianas */
      @media (max-width: 768px) {
        #carouselContainer {
          width: 80vw;
          height: 80vw;
          max-width: 350px;
          max-height: 350px;
        }

        #subheader {
          font-size: 1.8rem;
        }

        .panelSubtitle {
          font-size: 1rem;
        }

        .arrowButton {
          font-size: 20px;
        }

        .arrowButton.left {
          left: 10px;
        }

        .arrowButton.right {
          right: 10px;
        }
      }

      /* Móviles */
      @media (max-width: 480px) {
        #carouselContainer {
          width: 90vw;
          height: 90vw;
          max-width: 280px;
          max-height: 280px;
        }

        #subheader {
          font-size: 1.5rem;
        }

        .panelSubtitle {
          font-size: 0.9rem;
        }

        .arrowButton {
          font-size: 18px;
        }

        .arrowButton.left {
          left: 5px;
        }

        .arrowButton.right {
          right: 5px;
        }
      }

      /* Landscape mobile */
      @media (max-height: 600px) and (orientation: landscape) {
        #carouselContainer {
          width: 50vh;
          height: 50vh;
        }

        #subheader {
          font-size: 1.3rem;
        }

        .panelSubtitle {
          font-size: 0.8rem;
        }
      }
    `;
  }

  static get properties() {
    return {
      preferedLanguage: {type: String},
      numberOfPanels: {type: Number},
      currentRotation: {type: Number},
      isLanguageFading: {type: Boolean},
    };
  }

  constructor() {
    super();
    this.preferedLanguage = 'es-MX';
    this.numberOfPanels = 4;
    this.currentRotation = 0;
    this.isLanguageFading = false;
  }

  get panelContents() {
    return [
      {title: this.t('panel-one-title'), subtitle: this.t('panel-one-subtitle'), view: null},
      {title: this.t('panel-two-title'), subtitle: this.t('panel-two-subtitle'), view: 'experiencia'},
      {title: this.t('panel-three-title'), subtitle: this.t('panel-three-subtitle'), view: 'portfolio'},
      {title: this.t('panel-four-title'), subtitle: this.t('panel-four-subtitle'), view: 'contacto'},
    ];
  }

  _getActivePanelIndex() {
    const normalizedRotation = ((this.currentRotation % 360) + 360) % 360;
    return Math.round(normalizedRotation / (360 / this.numberOfPanels)) % this.numberOfPanels;
  }

  _rotateCarousel(direction) {
    const anglePerPanel = 360 / this.numberOfPanels;
    this.currentRotation += direction === 'right' ? anglePerPanel : -anglePerPanel;
    this.requestUpdate();
  }

  _handlePanelClick(index, view) {
    const activePanelIndex = this._getActivePanelIndex();
    if (index !== activePanelIndex) {
      return;
    }

    if (index === 0 && !view) {
      console.log('Panel 1 clicked, but no action');
      return;
    }

    if (!view) {
      console.log('No view defined, ignoring click');
      return;
    }

    console.log('Navigating to view:', view);
    this.dispatchEvent(
      new CustomEvent('panel-navigate', {
        detail: {view},
        bubbles: true,
        composed: true,
      })
    );
  }

  _calculatePanelTransform(index) {
    const anglePerPanel = 360 / this.numberOfPanels;
    const angle = index * anglePerPanel - this.currentRotation;

    // Radio responsivo basado en el ancho de la ventana
    let radius = 300; // Desktop por defecto
    if (window.innerWidth <= 480) {
      radius = 180; // Móvil
    } else if (window.innerWidth <= 768) {
      radius = 220; // Tablet
    }

    return `rotateY(${angle}deg) translateZ(${radius}px)`;
  }

  render() {
    // Aplicar clase al host para language fade
    if (this.isLanguageFading) {
      this.classList.add('languageFading');
    } else {
      this.classList.remove('languageFading');
    }

    const activePanelIndex = this._getActivePanelIndex();

    return html`
      <div id="carouselContainer">
        <div id="carousel">
          ${this.panelContents.map((content, index) => {
            const isActive = index === activePanelIndex;
            return html`
              <div
                class="panel ${isActive ? 'active' : ''}"
                style="transform: ${this._calculatePanelTransform(index)}"
                @click=${() => this._handlePanelClick(index, content.view)}
              >
                <h1 id="subheader">${content.title}</h1>
                <p class="panelSubtitle">${content.subtitle}</p>
              </div>
            `;
          })}
        </div>

        <button class="arrowButton left" @click=${() => this._rotateCarousel('left')}>
          ◀
        </button>
        <button class="arrowButton right" @click=${() => this._rotateCarousel('right')}>
          ▶
        </button>
      </div>
    `;
  }
}

window.customElements.define('revolver-carousel', Revolver);
