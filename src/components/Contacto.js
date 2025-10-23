import {html, css} from 'lit';
import {TranslatorClass} from './TranslatorClass';

export class Contacto extends TranslatorClass {
  static get styles() {
    return css`
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
        text-shadow: 1px 1px 1px #2e2e2e, 1px 2px 1px #2e2e2e,
          1px 3px 1px #2e2e2e, 1px 4px 1px #2e2e2e;
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
        font-size: 2rem;
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
    return html`
      <div class="pageContainer">
        <div class="contentContainer">
          <h1>Contacto y Redes</h1>
          <p>
            Esta es la página de contacto. Aquí se mostrará información
            de contacto y enlaces a redes sociales.
          </p>
          <p>Contenido placeholder - En desarrollo.</p>
        </div>
        <button class="backButton ${this.isFadingOut ? 'fadeOut' : ''}" @click=${this._handleBackClick}>
          ◀
        </button>
      </div>
    `;
  }
}

window.customElements.define('contacto-page', Contacto);
