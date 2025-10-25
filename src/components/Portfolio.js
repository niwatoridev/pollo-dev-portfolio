import {html, css} from 'lit';
import {TranslatorClass} from './TranslatorClass';

export class Portfolio extends TranslatorClass {
  static get styles() {
    return css`
      :host {
        display: block;
        width: 100vw;
        height: 100vh;
        position: relative;
      }

      /* Language fade solo para textos */
      .contentContainer h1,
      .contentContainer p {
        transition: opacity 0.3s ease;
      }

      :host(.languageFading) .contentContainer h1,
      :host(.languageFading) .contentContainer p {
        opacity: 0;
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
      }

      .contentContainer {
        width: 80vw;
        max-width: 1200px;
        color: white;
        z-index: 10;
      }

      h1 {
        font-size: 4rem;
        font-family: 'Oswald', serif;
        color: #0acbd5;
        margin: 0 0 2rem 0;
      }

      p {
        font-size: 1.2rem;
        font-family: 'Roboto Mono', monospace;
        color: #d6d2d2;
        line-height: 1.8;
        margin: 1rem 0;
      }

      .backButton {
        position: absolute;
        left: 2.5%;
        top: 50%;
        transform: translateY(-50%);
        padding: 0;
        background: transparent;
        color: #ffffff;
        border: none;
        cursor: pointer;
        font-size: 1.5rem;
        transition: color 0.3s ease;
        opacity: 0;
        animation: fadeInButton 0.6s ease-in-out 2.8s forwards;
      }

      .backButton.fadeOut {
        animation: fadeOutButton 0.6s ease-in-out forwards;
      }

      @keyframes fadeInButton {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes fadeOutButton {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }

      .backButton:hover {
        color: #0acbd5;
      }
    `;
  }

  static get properties() {
    return {
      preferedLanguage: {type: String},
      isFadingOut: {type: Boolean},
    };
  }

  constructor() {
    super();
    this.preferedLanguage = 'es-MX';
    this.isFadingOut = false;
  }

  _handleBackClick() {
    this.dispatchEvent(
      new CustomEvent('navigate-back', {
        bubbles: true,
        composed: true,
      })
    );
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
        <div class="contentContainer">
          <h1>${this.t('portfolio-title')}</h1>
          <p>${this.t('portfolio-placeholder')}</p>
        </div>
        <button class="backButton ${this.isFadingOut ? 'fadeOut' : ''}" @click=${this._handleBackClick}>
          ◀
        </button>
      </div>
    `;
  }
}

window.customElements.define('portfolio-page', Portfolio);
