import {html, LitElement, css} from 'lit';

/**
 * BaseToggleButton - Componente base para botones toggle reutilizables
 *
 * Este componente proporciona la estructura visual y animaciones para un botón toggle.
 * Los componentes hijos deben extender esta clase e implementar:
 * - renderIcon(): Método que retorna el contenido del ícono (imagen, SVG, etc.)
 * - onToggle(checked): Método que maneja la lógica específica del toggle
 */
export class BaseToggleButton extends LitElement {
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
        padding: 2px;
      }

      .span {
        position: absolute;
        background-color: #1e1e1e;
        width: 1.875rem;
        height: 1.875rem;
        border-radius: 100px;
        margin: 0.063rem;
        left: 0.125rem;
        transition: all 0.2s ease-out;
      }

      .icon-container {
        position: absolute;
        width: 1.375rem;
        height: 1.375rem;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    `;
  }

  static get properties() {
    return {
      checked: {type: Boolean},
    };
  }

  constructor() {
    super();
    this.checked = false;
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('checked')) {
      // Usar requestAnimationFrame para asegurar que la transición se vea
      requestAnimationFrame(() => {
        this.applyToggleStyles(this.checked);
      });
    }
  }

  firstUpdated() {
    // Aplicar estilos iniciales sin animación
    this.applyToggleStyles(this.checked);
  }

  /**
   * Método que los hijos deben sobrescribir para renderizar el ícono
   * @returns {TemplateResult} El contenido del ícono
   */
  renderIcon() {
    return html``;
  }

  /**
   * Método que los hijos deben sobrescribir para manejar el toggle
   * @param {boolean} checked - Estado del checkbox después del click
   */
  onToggle(checked) {
    // Los hijos implementan la lógica específica
  }

  /**
   * Aplica los estilos visuales del toggle basado en el estado
   * @param {boolean} checked - Estado del toggle
   */
  applyToggleStyles(checked) {
    const span = this.shadowRoot.querySelector('.span');
    const button = this.shadowRoot.querySelector('.button');

    if (!span || !button) return;

    if (checked) {
      // Estado "activado" - círculo a la derecha
      span.style.left = '2.125rem';
      span.style.background = '#0acbd5';
      button.style.border = 'solid 0.125rem #0acbd5';
      button.style.padding = '0.125rem';
      button.style.background = '#1e1e1e';
    } else {
      // Estado "desactivado" - círculo a la izquierda
      span.style.left = '0.125rem';
      span.style.background = '#1e1e1e';
      button.style.background = '#0acbd5';
      button.style.padding = '0.125rem';
      button.style.border = 'solid 0.125rem #1e1e1e';
    }
  }

  _handleClick() {
    const input = this.shadowRoot.getElementById('check');
    this.checked = input.checked;

    // Aplicar estilos visuales
    this.applyToggleStyles(this.checked);

    // Llamar al método de lógica de negocio que implementa el hijo
    this.onToggle(this.checked);
  }

  render() {
    return html`
      <label for="check" class="button" @click=${this._handleClick}>
        <input type="checkbox" id="check" ?checked=${this.checked} />
        <span class="span">
          <div class="icon-container">
            ${this.renderIcon()}
          </div>
        </span>
      </label>
    `;
  }
}

customElements.define('base-toggle-button', BaseToggleButton);
