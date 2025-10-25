import {html} from 'lit';
import {BasePage} from './basePage';

export class Portfolio extends BasePage {
  renderContent() {
    return html`
      <h1>${this.t('portfolio-title')}</h1>
      <p>${this.t('portfolio-placeholder')}</p>
    `;
  }
}

window.customElements.define('portfolio-page', Portfolio);
