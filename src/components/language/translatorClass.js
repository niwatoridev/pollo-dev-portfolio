import {LitElement} from 'lit';
import locales from '../../../locales.json' with {type: "json"};

export class TranslatorClass extends LitElement {

  static get properties() {
    return {
      preferedLanguage: {type: String},
      localesObject: {type: Object},
      text: {type: String},
      isLanguageFading: {type: Boolean},
    };
  }

  constructor() {
    super();
    this.preferedLanguage = '';
    this.localesObject = locales;
    this.isLanguageFading = false;
  }

  connectedCallback() {
    super.connectedCallback();
    // Escuchar eventos de cambio de idioma
    window.addEventListener('language-changing', this._handleLanguageChanging.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('language-changing', this._handleLanguageChanging.bind(this));
  }

  _handleLanguageChanging(event) {
    // Iniciar fade out
    this.isLanguageFading = true;
    this.requestUpdate();

    // Después de 300ms, cambiar el idioma
    setTimeout(() => {
      this.setPreferedLanguage(event.detail.language);
      this.requestUpdate();

      // Después de un pequeño delay, hacer fade in
      setTimeout(() => {
        this.isLanguageFading = false;
        this.requestUpdate();
      }, 50);
    }, 300);
  }

  setPreferedLanguage(preferences) {
    this.preferedLanguage = preferences;
  }

  t(text) {
    let languangePackage = this.localesObject[this.preferedLanguage];
    return languangePackage[text]
  }


}

window.customElements.define('translator-class', TranslatorClass);
