import {LitElement} from 'lit';
import locales from '../../locales.json' with {type: "json"};

export class TranslatorClass extends LitElement {

  static get properties() {
    return {
      preferedLanguage: {type: String},
      localesObject: {type: Object},
      text: {type: String},
    };
  }

  constructor() {
    super();
    this.preferedLanguage = '';
    this.localesObject = locales;
  }

  setPreferedLanguage(preferences) {
    this.preferedLanguage = preferences;
    console.log(this.preferedLanguage)
  }

  t(text) {
    let languangePackage = this.localesObject[this.preferedLanguage];
    return languangePackage[text]
  }
  

}

window.customElements.define('translator-class', TranslatorClass);
