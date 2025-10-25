/* global Promise */
import {html, css} from 'lit';
import {BasePage} from './basePage';

export class Contacto extends BasePage {
  static get styles() {
    return [
      super.styles,
      css`
      .contentContainer {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        z-index: 12;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        transition: transform 0.6s ease-in-out, gap 0.6s ease-in-out;
      }

      .contactButton {
        background: transparent;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        position: relative;
        padding: 0;
      }

      .contactButton:hover {
        animation-name: hvr-buzz-out;
        animation-duration: 0.75s;
        animation-timing-function: linear;
        animation-iteration-count: 1;
      }

      .contactButton img {
        width: 9vh;
        margin-top: 8px;
        margin-bottom: 8px;
        filter: invert(79%) sepia(48%) saturate(5108%) hue-rotate(135deg)
          brightness(96%) contrast(92%);
      }

      @keyframes hvr-buzz-out {
        10% {
          transform: translateX(3px) rotate(2deg);
        }
        20% {
          transform: translateX(-3px) rotate(-2deg);
        }
        30% {
          transform: translateX(3px) rotate(2deg);
        }
        40% {
          transform: translateX(-3px) rotate(-2deg);
        }
        50% {
          transform: translateX(2px) rotate(1deg);
        }
        60% {
          transform: translateX(-2px) rotate(-1deg);
        }
        70% {
          transform: translateX(2px) rotate(1deg);
        }
        80% {
          transform: translateX(-2px) rotate(-1deg);
        }
        90% {
          transform: translateX(1px) rotate(0);
        }
        100% {
          transform: translateX(-1px) rotate(0);
        }
      }

      /* InfoCard Styles */
      .infoCard {
        position: absolute;
        z-index: 13;
        display: flex;
        flex-direction: column;
        align-items: center;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.6s ease-in-out;
      }

      .infoCard.open {
        opacity: 1;
        pointer-events: auto;
        transition-delay: 0.6s;
      }

      .infoCard.closing {
        opacity: 0;
        transition-delay: 0s;
      }

      .infoData {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: center;
        gap: 3rem;
        color: #0acbd5;
        font-size: 2rem;
        margin-bottom: 1rem;
        font-family: 'Oswald', serif;
      }

      /* Language fade solo para las columnas de texto, no la foto */
      .infoColumn {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        transition: opacity 0.3s ease;
      }

      .infoColumn:first-child {
        text-align: right;
        justify-self: end;
      }

      .infoColumn:last-child {
        text-align: left;
        justify-self: start;
      }

      :host(.languageFading) .infoColumn {
        opacity: 0;
      }

      .profileImage {
        width: 300px;
        height: 300px;
        border-radius: 50%;
        border: 5px solid #1e1e1e;
        object-fit: cover;
        object-position: 40% center;
        transform: scale(1.25);
        justify-self: center;
      }

      .infoName {
        font-family: 'Rock Salt', cursive;
        font-size: 3.5rem;
        color: #0acbd5;
        margin-bottom: 5px;
      }

      /* Animations for icons when InfoCard opens */
      .contentContainer.compact {
        transform: translate(-50%, calc(50% + 185px));
        gap: 1rem;
      }

      .contentContainer .contactButton img {
        transition: width 0.6s ease-in-out;
      }

      .contentContainer.compact .contactButton img {
        width: 5vh;
      }

      .contentContainer.closing {
        transform: translate(-50%, -50%);
        gap: 2rem;
        transition-delay: 0.6s;
      }

      .contentContainer.closing .contactButton img {
        width: 9vh;
        transition-delay: 0.6s;
      }
    `];
  }

  static get properties() {
    return {
      preferedLanguage: {type: String},
      isFadingOut: {type: Boolean},
      isInfoCardOpen: {type: Boolean},
      isInfoCardClosing: {type: Boolean},
    };
  }

  constructor() {
    super();
    this.preferedLanguage = 'es-MX';
    this.isFadingOut = false;
    this.isInfoCardOpen = false;
    this.isInfoCardClosing = false;
    this.pendingNavigation = null;
  }

  // Método público para verificar si necesita cerrar la InfoCard antes de navegar
  needsClosing() {
    return this.isInfoCardOpen && !this.isInfoCardClosing;
  }

  // Método público para cerrar la InfoCard y retornar una promesa
  closeInfoCardBeforeNavigation() {
    return new Promise((resolve) => {
      this._closeInfoCard(() => {
        resolve();
      });
    });
  }

  _handleBackClick() {
    // Si la InfoCard está abierta, cerrarla primero
    if (this.isInfoCardOpen) {
      this._closeInfoCard(() => {
        // Después de cerrar, hacer el back
        this.isFadingOut = true;
        this.dispatchEvent(
          new CustomEvent('navigate-back', {
            bubbles: true,
            composed: true,
          })
        );
      });
    } else {
      // Iniciar fade out de la flecha
      this.isFadingOut = true;

      // Disparar navegación inmediatamente (webDevScreen manejará los tiempos)
      this.dispatchEvent(
        new CustomEvent('navigate-back', {
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  _closeInfoCard(callback) {
    // CERRAR: Primero fade out de InfoCard, luego iconos regresan
    this.isInfoCardClosing = true;

    // Después de 600ms (fade out de card), mover iconos
    setTimeout(() => {
      this.isInfoCardOpen = false;
      this.isInfoCardClosing = false;
      this.requestUpdate();

      // Después de otros 600ms (iconos volviendo), ejecutar callback o navegar
      setTimeout(() => {
        if (callback) {
          callback();
        } else if (this.pendingNavigation) {
          // Re-despachar el evento de navegación
          this.dispatchEvent(
            new CustomEvent('navigate', {
              bubbles: true,
              composed: true,
              detail: this.pendingNavigation
            })
          );
          this.pendingNavigation = null;
        }
      }, 600);
    }, 600);
  }

  _handleInfoClick() {
    if (this.isInfoCardOpen) {
      // CERRAR: Usar el método centralizado
      this._closeInfoCard();
    } else {
      // ABRIR: Primero mover iconos, luego fade in de InfoCard
      this.isInfoCardOpen = true;
      // El fade in de la card se maneja con transition-delay en CSS
    }
  }

  render() {
    // Aplicar clase al host
    if (this.isLanguageFading) {
      this.classList.add('languageFading');
    } else {
      this.classList.remove('languageFading');
    }

    return html`
      <div class="pageContainer">
        <!-- InfoCard -->
        <div class="infoCard ${this.isInfoCardOpen && !this.isInfoCardClosing ? 'open' : ''} ${this.isInfoCardClosing ? 'closing' : ''}">
          <div class="infoData">
            <div class="infoColumn">
              <div>${this.t('contacto-info-frontend')}</div>
              <div>${this.t('contacto-info-esports')}</div>
              <div>${this.t('contacto-info-pronouns')}</div>
            </div>
            <img
              class="profileImage"
              src="../../media/images/pictures/DSC00967.JPG"
              alt="Esteban Muñoz"
            />
            <div class="infoColumn">
              <div>${this.t('contacto-info-email')}</div>
              <div>${this.t('contacto-info-phone')}</div>
              <div>${this.t('contacto-info-nationality')}</div>
            </div>
          </div>
          <div class="infoName">Esteban Muñoz</div>
        </div>

        <!-- Contact Icons -->
        <div class="contentContainer ${this.isInfoCardOpen && !this.isInfoCardClosing ? 'compact' : ''} ${this.isInfoCardClosing ? 'closing' : ''}">
          <a
            class="contactButton"
            href="https://www.linkedin.com/in/esmunozdev/"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
          >
            <img src="../../media/images/icons/linkedin.png" alt="LinkedIn" />
          </a>

          <a
            class="contactButton"
            href="https://github.com/niwatoridev"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
          >
            <img src="../../media/images/icons/github-sign.png" alt="GitHub" />
          </a>

          <a
            class="contactButton"
            href="https://www.instagram.com/pollo.dev/"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
          >
            <img src="../../media/images/icons/instagram.png" alt="Instagram" />
          </a>

          <button
            class="contactButton"
            @click=${this._handleInfoClick}
            title="Info Personal"
          >
            <img
              src="../../media/images/icons/id-card.png"
              alt="Info Personal"
            />
          </button>
        </div>

        <!-- Back Button -->
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

window.customElements.define('contacto-page', Contacto);
