import {html, css} from 'lit';
import {BaseToggleButton} from './baseToggleButton.js';
import Typed from 'typed.js';

class ModeToggleButton extends BaseToggleButton {
  static get properties() {
    return {
      ...super.properties,
      terminalLabel: {type: String},
      simpleLabel: {type: String},
    };
  }

  constructor() {
    super();
    this.terminalLabel = 'Terminal Mode';
    this.simpleLabel = 'Document Mode';
    this._typedInstance = null;
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        /* Reducir el tamaño del botón en 40% */
        .button {
          width: 2.4rem;
          height: 1.2rem;
        }

        .span {
          width: 1.125rem;
          height: 1.125rem;
          margin: 0.0375rem;
          left: 0.075rem;
        }

        .icon-container {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        svg {
          width: 0.65rem;
          height: 0.65rem;
          color: #0acbd5;
          transition: color 0.2s ease-out;
        }

        .mode-label {
          font-family: 'Roboto Mono', monospace;
          font-size: 0.7rem;
          color: #999999;
          text-align: center;
          opacity: 0.8;
          min-height: 1rem;
        }

        :host(:hover) .mode-label {
          opacity: 1;
        }
      `,
    ];
  }

  renderIcon() {
    // Renderizar el ícono según el estado checked
    return this.checked
      ? html`
          <!-- Ícono de documento para modo simple -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 15 15"
          >
            <path
              fill="currentColor"
              stroke="currentColor"
              stroke-width="0.3"
              d="M9.086 1a1.5 1.5 0 0 1 1.06.44l2.414 2.414l.1.11a1.5 1.5 0 0 1 .34.95V12.5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 2 12.5v-10A1.5 1.5 0 0 1 3.5 1zM3.5 2a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V4.914a.5.5 0 0 0-.084-.277l-.062-.076l-2.415-2.415A.5.5 0 0 0 9.086 2zm7 8a.5.5 0 0 1 0 1h-6a.5.5 0 0 1 0-1zm0-3a.5.5 0 0 1 0 1h-6a.5.5 0 0 1 0-1zm-3-3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1z"
            />
          </svg>
        `
      : html`
          <!-- Ícono de código para modo terminal -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 15 15"
          >
            <path
              fill="currentColor"
              stroke="currentColor"
              stroke-width="0.3"
              d="M9.036 2.314a.5.5 0 1 1 .928.371l-4 10a.5.5 0 1 1-.928-.37zm2.11 2.832a.5.5 0 0 1 .63-.064l.077.064l2 2l.065.078a.5.5 0 0 1-.065.63l-2 2a.5.5 0 1 1-.707-.708L12.793 7.5l-1.647-1.647l-.064-.078a.5.5 0 0 1 .064-.629m-8 0a.5.5 0 0 1 .707.707L2.207 7.5l1.646 1.646l.065.078a.5.5 0 0 1-.693.694l-.079-.065l-2-2a.5.5 0 0 1 0-.707z"
            />
          </svg>
        `;
  }

  render() {
    return html`
      ${super.render()}
      <div class="mode-label">
        <span id="typed-text"></span>
      </div>
    `;
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('checked')) {
      // Sincronizar color del ícono
      this._syncIconColor();
      // Actualizar el texto con efecto typing
      this._updateLabel();
    }
  }

  firstUpdated() {
    super.firstUpdated();
    // Aplicar color inicial
    this._syncIconColor();
    // Inicializar label
    this._updateLabel();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // Limpiar instancia de Typed.js
    if (this._typedInstance) {
      this._typedInstance.destroy();
      this._typedInstance = null;
    }
  }

  _syncIconColor() {
    const svg = this.shadowRoot.querySelector('svg');
    if (!svg) return;

    if (this.checked) {
      // Modo simple activado
      svg.style.color = '#1e1e1e';
    } else {
      // Modo terminal activado
      svg.style.color = '#0acbd5';
    }
  }

  applyToggleStyles(checked) {
    const span = this.shadowRoot.querySelector('.span');
    const button = this.shadowRoot.querySelector('.button');

    if (!span || !button) return;

    if (checked) {
      // Estado "activado" - círculo a la derecha (ajustado para el tamaño reducido)
      span.style.left = '1.275rem';
      span.style.background = '#0acbd5';
      button.style.border = 'solid 0.075rem #0acbd5';
      button.style.padding = '0.075rem';
      button.style.background = '#1e1e1e';
    } else {
      // Estado "desactivado" - círculo a la izquierda
      span.style.left = '0.075rem';
      span.style.background = '#1e1e1e';
      button.style.background = '#0acbd5';
      button.style.padding = '0.075rem';
      button.style.border = 'solid 0.075rem #1e1e1e';
    }
  }

  _updateLabel() {
    // Destruir instancia anterior si existe
    if (this._typedInstance) {
      this._typedInstance.destroy();
      this._typedInstance = null;
    }

    const labelElement = this.shadowRoot.getElementById('typed-text');
    if (!labelElement) return;

    const text = this.checked ? this.simpleLabel : this.terminalLabel;

    // Crear nueva instancia de Typed.js
    this._typedInstance = new Typed(labelElement, {
      strings: [text],
      typeSpeed: 50,
      showCursor: false,
      onComplete: () => {
        // Opcional: hacer algo cuando termine de escribir
      },
    });
  }

  onToggle(checked) {
    this.dispatchEvent(
      new CustomEvent('mode-changed', {
        detail: {isSimpleMode: checked},
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define('mode-toggle-button', ModeToggleButton);
