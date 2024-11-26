import {html, css} from 'lit';
import {TranslatorClass} from './translator';

export class webDevScreen extends TranslatorClass {
  static get styles() {
    return css`
      #mainContainer {
        display: flex;
        flex-direction: column;
        margin: 0;
      }

      #header {
        width: fit-content;
        display: flex;
        flex-direction: column;
        position: relative;
        bottom: 7vw;
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

      #headerText {
        color: transparent;
        -webkit-text-stroke: 2px #0acbd5;
      }

      #subheader {
        color: #0acbd5;
      }

      #typeWritingTextContainer {
        display: inline-block;
      }

      #typeWritingText {
        font-size: 1.5rem;
        color: #d6d2d2;
        font-family: 'Roboto Mono', monospace;
        font-optical-sizing: auto;
        font-style: normal;
        margin: 0;
        border-right: 5px solid;
        padding-right: 5px;
        width: fit-content;
        white-space: nowrap;
        overflow: hidden;
        animation: typing 2s steps(14), cursor 0.4s step-end infinite alternate;
      }

      @keyframes cursor {
        50% {
          border-color: transparent;
        }
      }

      @keyframes typing {
        from {
          width: 0;
        }
      }
    `;
  }

  static get properties() {
    return {
      preferedLanguage: {type: String},
    };
  }

  constructor() {
    super();
    this.preferedLanguage = 'en-EN';
  }

  _onClick() {
    this.setPreferedLanguage(this.preferedLanguage);
    this.t('portfolio-mainpage-hero-header');
  }

  renderHeader() {
    return html`
      <div id="header">
        <div>
          <video autoplay loop>
            <source src="../../media/videos/blurredHeroShot.mp4" />
          </video>
        </div>
        <div id="headerTextContainer">
          <p id="preheader">${this.t('portfolio-mainpage-hero-preheader')}</p>
          <h1 id="headerText">${this.t('portfolio-mainpage-hero-header')}</h1>
          <h1 id="subheader">${this.t('portfolio-mainpage-hero-subheader')}</h1>
          <div id="typeWritingTextContainer">
            <p id="typeWritingText">
              ${this.t('portfolio-mainpage-hero-preheader')}
            </p>
            <wc-typed-js strings="First text, Second Text">
              <h1 class="typing"></h1>
            </wc-typed-js>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    return html` <div id="mainContainer">${this.renderHeader()}</div> `;
  }
}

window.customElements.define('web-dev-screen', webDevScreen);
