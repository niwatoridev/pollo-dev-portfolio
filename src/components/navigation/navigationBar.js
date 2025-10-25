import {html, css} from 'lit';
import {TranslatorClass} from '../language/translatorClass';

export class NavigationBar extends TranslatorClass {
  static get styles() {
    return css`
      :host {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        z-index: 1000;
      }

      .navContainer {
        width: 100%;
        background: transparent;
        backdrop-filter: blur(10px);
        padding: 20px 0;
      }

      .navList {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 50px;
        list-style: none;
        margin: 0;
        padding: 0;
      }

      .navItem {
        margin: 0;
        padding: 0;
      }

      .navLink {
        color: #d6d2d2;
        text-decoration: none;
        font-family: 'Roboto Mono', monospace;
        font-size: 1rem;
        padding: 10px 20px;
        border-radius: 4px;
        transition: all 0.3s ease;
        cursor: pointer;
        border: 2px solid transparent;
      }

      .navLink:hover {
        color: #0acbd5;
        opacity: 0.6;
      }

      .navLink.active {
        color: #0acbd5;
        font-weight: bold;
        opacity: 1;
      }

      .navLink.active:hover {
        opacity: 1;
      }

      /* Language fade animation - solo para textos */
      :host(.languageFading) .navLink {
        opacity: 0 !important;
      }
    `;
  }

  static get properties() {
    return {
      activeView: {type: String},
      preferedLanguage: {type: String},
    };
  }

  constructor() {
    super();
    this.activeView = 'revolver';
    this.preferedLanguage = 'es-MX';
  }

  _handleNavigate(view) {
    this.dispatchEvent(
      new CustomEvent('navigate', {
        detail: {view},
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
      <nav class="navContainer">
        <ul class="navList">
          <li class="navItem">
            <a
              class="navLink ${this.activeView === 'experiencia'
                ? 'active'
                : ''}"
              @click=${() => this._handleNavigate('experiencia')}
            >
              ${this.t('navbar-experiencia')}
            </a>
          </li>
          <li class="navItem">
            <a
              class="navLink ${this.activeView === 'portfolio' ? 'active' : ''}"
              @click=${() => this._handleNavigate('portfolio')}
            >
              ${this.t('navbar-portfolio')}
            </a>
          </li>
          <li class="navItem">
            <a
              class="navLink ${this.activeView === 'contacto' ? 'active' : ''}"
              @click=${() => this._handleNavigate('contacto')}
            >
              ${this.t('navbar-contacto')}
            </a>
          </li>
        </ul>
      </nav>
    `;
  }
}

window.customElements.define('navigation-bar', NavigationBar);
