import {html, css, LitElement} from 'lit';

class LanguageSwitcher extends LitElement {
  static get styles() {
    return css`
      input {
        display: none;
      }

      .button {
        background: #0acbd5;
        border: solid 2px #1e1e1e;
        width: 4rem;
        height: 2rem;
        border-radius: 200px;
        cursor: pointer;
        position: relative;
        display: inline-block;
        transition: 0.2s;
        padding: 2px;
      }
      .span {
        position: absolute;
        background-color: #1e1e1e;
        width: 1.875rem;
        height: 1.875rem;
        border-radius: 100px;
        margin: 0.063rem;
        transition: all 0.2s ease-out;
      }
      img {
        position: absolute;
        width: 1.375rem;
        height: 1.375rem;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        filter: invert(79%) sepia(48%) saturate(5108%) hue-rotate(135deg)
          brightness(96%) contrast(92%);
      }
    `;
  }

  static get properties() {
    return {
      currentLanguage: {type: String},
      espIconRoute: {type: String},
      engIconRoute: {type: String},
      espImgFilterConfig: {type: String},
      engImgFilterConfig: {type: String},
    };
  }

  constructor() {
    super();
    this.currentLanguage = 'es-MX';
    this.espIconRoute =
      '../../media/images/lang/material-symbols--language-spanish.png';
    this.engIconRoute =
      '../../media/images/lang/material-symbols--language-us.png';
    this.espImgFilterConfig =
      'invert(79%) sepia(48%) saturate(5108%) hue-rotate(135deg) brightness(96%) contrast(92%)';
    this.engImgFilterConfig =
      'invert(5%) sepia(0%) saturate(1862%) hue-rotate(222deg) brightness(98%) contrast(84%)';
  }

  _toggleLanguage() {
    console.log(this.currentLanguage);
    this.currentLanguage = this.currentLanguage === 'es-MX' ? 'en-EN' : 'es-MX';

    // Disparar evento local para el componente padre (webDevScreen)
    this.dispatchEvent(
      new CustomEvent('language-changed', {
        detail: {language: this.currentLanguage},
        bubbles: true,
        composed: true,
      })
    );

    // Disparar evento global para todos los componentes que heredan de TranslatorClass
    window.dispatchEvent(
      new CustomEvent('language-changing', {
        detail: {language: this.currentLanguage}
      })
    );
  }

  _handleClick() {
    let input = this.shadowRoot.getElementById('check');
    let img = this.shadowRoot.querySelector('.img');
    let span = this.shadowRoot.querySelector('.span');
    let button = this.shadowRoot.querySelector('.button');

    if (input.checked) {
      span.style.left = '2.125rem';
      span.style.background = '#0acbd5';
      button.style.border = 'solid 0.125rem #0acbd5';
      button.style.padding = '0.125rem';
      button.style.background = '#1e1e1e';
      img.style.filter = this.engImgFilterConfig;
      img.src = this.engIconRoute;
      this._toggleLanguage();
    } else {
      span.style.left = '0.125rem';
      span.style.background = '#1e1e1e';
      button.style.background = '#0acbd5';
      button.style.padding = '0.125rem';
      button.style.border = 'solid 0.125rem #1e1e1e';
      img.style.filter = this.espImgFilterConfig;
      img.src = this.espIconRoute;
    }
  }

  render() {
    return html`
      <label for="check" class="button" @click=${this._handleClick}>
        <input type="checkbox" id="check" />
        <span class="span">
          <img src=${this.espIconRoute} class="img" />
        </span>
      </label>
    `;
  }
}

customElements.define('language-switcher', LanguageSwitcher);
