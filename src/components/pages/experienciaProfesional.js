import {html} from 'lit';
import {BasePage} from './basePage';

export class ExperienciaProfesional extends BasePage {
  renderContent() {
    return html`
      <h1>${this.t('experiencia-title')}</h1>
      <p>${this.t('experiencia-placeholder')}</p>
    `;
  }
}

window.customElements.define('experiencia-profesional', ExperienciaProfesional);
