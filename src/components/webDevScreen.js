import {html, css} from 'lit';
import {TranslatorClass} from './translator';
import Typed from 'typed.js';

export class WebDevScreen extends TranslatorClass {
  static get styles() {
    return css`
      #mainContainer {
        display: flex;
        flex-direction: column;
        margin: 0;
        background-color: #1e1e1e;
        height: 200vh;
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
        width: 100vw;
        height: 50vh;
        background: rgb(30, 30, 30);
        background: linear-gradient(
          0deg,
          rgba(30, 30, 30, 1) 6%,
          rgba(30, 30, 30, 0) 26%
        );
      }

      #headerSpacer {
        height: 100vh;
      }

      #headerTextContainer {
        color: white;
        position: absolute;
        right: 30vw;
        top: 20vw;
        display: flex;
        flex-direction: column;
        width: 60vw;
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
      }

      p {
        color: white;
      }

      #headerText {
        color: transparent;
        -webkit-text-stroke: 1.5px #0acbd5;
      }

      #subheader {
        color: #0acbd5;
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

      #cambiarIdioma {
        border: solid red 10px;
      }
    `;
  }

  static get properties() {
    return {
      preferedLanguage: {type: String},
      typingTextVisible: {type: Boolean},
    };
  }

  constructor() {
    super();
    this.preferedLanguage = 'es-MX';
    this.typingTextVisible = true;
    this.typedInstance = null; // Para manejar la instancia de Typed.js
  }

  // Llamado cuando el DOM del componente está actualizado
  updated(changedProperties) {
    super.updated(changedProperties);

    // Solo inicializar si la sección de typing está visible
    if (this.typingTextVisible) {
      const typingElement = this.shadowRoot.querySelector(
        '#typeWritingText span.typing'
      );

      if (typingElement) {
        // Destruir instancia previa si existe
        if (this.typedInstance) {
          this.typedInstance.destroy();
        }

        // Configurar opciones y crear nueva instancia
        this.typedInstance = new Typed(typingElement, {
          strings: [
            this.t('portfolio-mainpage-hero-typewriting-one'),
            this.t('portfolio-mainpage-hero-typewriting-two'),
            this.t('portfolio-mainpage-hero-typewriting-three'),
            this.t('portfolio-mainpage-hero-typewriting-four'),
          ],
          typeSpeed: 15,
          backSpeed: 10,
          backDelay: 2500,
          loop: true,
          smartBackspace: true,
        });
      } else {
        console.error('Elemento para Typed.js no encontrado en el DOM');
      }
    }
  }

  _changeLanguage() {
    this.preferedLanguage =
      this.preferedLanguage === 'en-EN' ? 'es-MX' : 'en-EN';
    this.setPreferedLanguage(this.preferedLanguage);

    // Marcar para re-renderizado
    this.typingTextVisible = false;
    this.typingTextVisible = true; // Fuerza Lit a actualizar el DOM
  }

  _renderTypeWriting() {
    return html`
      <div id="typeWritingTextContainer">
        <p id="typeWritingText"><span class="typing"></span></p>
      </div>
    `;
  }

  renderHeader() {
    return html`
      <div id="header">
        <div>
          <video class="heroVideo" autoplay muted loop>
            <source src="../../media/videos/blurredHeroShot.mp4" />
          </video>
        </div>
        <div id="headerTextContainer">
          <p id="preheader">${this.t('portfolio-mainpage-hero-preheader')}</p>
          <h1 id="headerText">${this.t('portfolio-mainpage-hero-header')}</h1>
          <h1 id="subheader">${this.t('portfolio-mainpage-hero-subheader')}</h1>
          ${this._renderTypeWriting()}
        </div>
      </div>
      <div id="gradient"></div>
      <div id="headerSpacer"></div>
    `;
  }

  renderMoreInfo() {
    return html`
      <div>
        <button id="cambiarIdioma" @click=${this._changeLanguage}>
          <p>cambiar idioma</p>
        </button>
      </div>
    `;
  }

  render() {
    return html`
      <div id="mainContainer">
        ${this.renderHeader()}${this.renderMoreInfo()}
      </div>
    `;
  }
}

window.customElements.define('web-dev-screen', WebDevScreen);
