import {html, css} from 'lit';
import {BaseToggleButton} from '../shared/baseToggleButton.js';

class LanguageSwitcher extends BaseToggleButton {
  static get styles() {
    return [
      super.styles,
      css`
        img {
          width: 100%;
          height: 100%;
          filter: invert(79%) sepia(48%) saturate(5108%) hue-rotate(135deg)
            brightness(96%) contrast(92%);
        }
      `,
    ];
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

  renderIcon() {
    return html`<img src=${this.espIconRoute} class="img" />`;
  }

  onToggle(checked) {
    const img = this.shadowRoot.querySelector('.img');

    if (checked) {
      img.style.filter = this.engImgFilterConfig;
      img.src = this.engIconRoute;
      this._toggleLanguage();
    } else {
      img.style.filter = this.espImgFilterConfig;
      img.src = this.espIconRoute;
    }
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
        detail: {language: this.currentLanguage},
      })
    );
  }
}

customElements.define('language-switcher', LanguageSwitcher);
