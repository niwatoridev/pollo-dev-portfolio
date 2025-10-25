import {html, css} from 'lit';
import {TranslatorClass} from './language/translatorClass';
import Typed from 'typed.js';
import './language/languageSwitchButton';
import './pages/basePage';
import './pages/experienciaProfesional';
import './pages/portfolio';
import './pages/contacto';
import './navigation/navigationBar';
import './navigation/revolver';

export class WebDevScreen extends TranslatorClass {
  static get styles() {
    return css`
      :host {
        display: block;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
      }

      #mainContainer {
        display: flex;
        flex-direction: column;
        margin: 0;
        padding: 0;
        background-color: #1e1e1e;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
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
        width: 99vw;
        height: 50vh;
        background: rgb(30, 30, 30);
        background: linear-gradient(
          0deg,
          rgba(30, 30, 30, 1) 6%,
          rgba(30, 30, 30, 0) 26%
        );
      }

      #headerTextContainer {
        color: white;
        display: flex;
        flex-direction: column;
        width: 70vw;
        margin: 0;
        padding: 0;
        transition: opacity 0.3s ease;
      }

      #headerTextContainer.languageFading {
        opacity: 0;
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
        height: fit-content;
      }

      p {
        color: white;
      }

      #headerText {
        color: transparent;
        -webkit-text-stroke: 1.5px #0acbd5;
        margin-bottom: -50px;
      }

      #subheader {
        color: #0acbd5;
        text-shadow: 1px 1px 1px #2e2e2e, 1px 2px 1px #2e2e2e,
          1px 3px 1px #2e2e2e, 1px 4px 1px #2e2e2e, 1px 5px 1px #2e2e2e,
          1px 6px 1px #2e2e2e, 1px 7px 1px #2e2e2e, 1px 8px 1px #2e2e2e,
          1px 9px 1px #2e2e2e, 1px 10px 1px #2e2e2e;
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

      #langButton {
        position: absolute;
        left: 1810px;
        top: 20px;
        z-index: 1000;
      }

      body {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #000;
      }

      /* Carousel Styles */
      .carouselContainer {
        position: absolute;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        bottom: 0;
      }

      .carouselWheel {
        position: relative;
        width: 100px;
        height: 100px;
        transform-style: preserve-3d;
        transition: transform 0.8s ease-in-out;
        transform: translateX(-57vw) translateY(-10vh);
        will-change: transform;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
      }

      .carouselPanel {
        position: absolute;
        width: 70vw;
        transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1),
          opacity 1s cubic-bezier(0.4, 0, 0.2, 1);
        transform-origin: 0 0;
        will-change: transform, opacity;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        transform: translateZ(0);
        -webkit-transform: translateZ(0);
      }

      .carouselButtons {
        position: absolute;
        display: flex;
        flex-direction: column;
        gap: 20px;
        z-index: 100;
        left: 2.5%;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      .carouselButton {
        padding: 0;
        background: none;
        color: #ffffff;
        border: none;
        cursor: pointer;
        font-size: 24px;
        transition: color 0.3s ease;
      }

      .carouselButton:hover {
        color: #0acbd5;
      }

      /* Transition Styles */
      .viewContainer {
        position: absolute;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1),
          opacity 1s cubic-bezier(0.4, 0, 0.2, 1);
        will-change: transform, opacity;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        z-index: 10;
      }

      .viewContainer.active {
        transform: translateX(0);
        opacity: 1;
      }

      .viewContainer.hidden {
        display: none;
      }

      .viewContainer.slideOutLeft {
        transform: translateX(-100vw);
        opacity: 0;
      }

      .viewContainer.slideInFromRight {
        animation: slideInRight 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }

      .viewContainer.slideOutRight {
        animation: slideOutRight 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }

      .viewContainer.slideInFromLeft {
        animation: slideInLeft 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }

      @keyframes slideInRight {
        from {
          transform: translateX(100vw);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      @keyframes slideOutRight {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100vw);
          opacity: 0;
        }
      }

      @keyframes slideInLeft {
        from {
          transform: translateX(-100vw);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      .detailPageContainer {
        position: absolute;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        will-change: transform, opacity;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        transform: translateZ(0);
        -webkit-transform: translateZ(0);
        z-index: 10;
      }

      /* Animaciones para transiciones entre páginas de detalle */
      .detailPageContainer.slideOutToLeft {
        animation: slideOutToLeft 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }

      .detailPageContainer.slideInFromRight {
        animation: slideInFromRight 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }

      .detailPageContainer.slideOutToRight {
        animation: slideOutToRight 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }

      .detailPageContainer.slideInFromLeft {
        animation: slideInFromLeft 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }

      @keyframes slideOutToLeft {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(-100vw);
          opacity: 0;
        }
      }

      @keyframes slideInFromRight {
        from {
          transform: translateX(100vw);
          opacity: 1;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      @keyframes slideOutToRight {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100vw);
          opacity: 0;
        }
      }

      @keyframes slideInFromLeft {
        from {
          transform: translateX(-100vw);
          opacity: 1;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      /* Fade in for navigation elements */
      navigation-bar {
        opacity: 0;
        animation: fadeInNav 0.6s ease-in-out 1.5s forwards;
        transition: opacity 0.3s ease;
      }

      /* Fade out for navigation elements when going back */
      navigation-bar.fadeOut {
        animation: fadeOutNav 0.6s ease-in-out forwards;
      }

      /* Language fade for navigation bar - Ahora manejado por TranslatorClass */

      @keyframes fadeInNav {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes fadeOutNav {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }

      /* Clickeable panel cursor */
      .carouselPanel.clickeable {
        cursor: pointer;
      }

      .carouselPanel.clickeable #headerTextContainer {
        pointer-events: auto;
      }

      .carouselPanel.clickeable:hover #headerTextContainer h1 {
        color: #ffffff;
        filter: drop-shadow(0 0 15px #0acbd5);
        transition: all 0.3s ease;
      }

      /* Overlay global para páginas de detalle */
      #globalOverlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(30, 30, 30, 0.7);
        z-index: 1;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.6s ease-in-out;
      }

      #globalOverlay.visible {
        opacity: 1;
      }

      #globalOverlay.fadeIn {
        animation: fadeInOverlay 0.6s ease-in-out 1.2s forwards;
      }

      #globalOverlay.fadeOut {
        animation: fadeOutOverlay 0.6s ease-in-out forwards;
      }

      @keyframes fadeInOverlay {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes fadeOutOverlay {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }
    `;
  }

  static get properties() {
    return {
      preferedLanguage: {type: String},
      typingTextVisible: {type: Boolean},
      heroVideoSource: {type: String},
      currentRotation: {type: Number},
      numberOfPanels: {type: Number},
      currentView: {type: String},
      previousView: {type: String},
      lastPanelIndex: {type: Number},
      isTransitioning: {type: Boolean},
      transitionDirection: {type: String}, // 'forward' o 'back'
      keepDetailVisible: {type: Boolean}, // Mantener detalle visible durante transición de regreso
      isFadingOut: {type: Boolean}, // Nav bar y botón están haciendo fade out
      isSpinning: {type: Boolean}, // Carrusel está girando como revólver
      isLanguageFading: {type: Boolean}, // Texto está en fade durante cambio de idioma
      isDetailTransitioning: {type: Boolean}, // Transición entre páginas de detalle
      outgoingDetailView: {type: String}, // Vista que está saliendo durante transición
      detailTransitionDirection: {type: String}, // 'right' (avanza) o 'left' (retrocede)
      overlayState: {type: String}, // Estado del overlay: 'hidden', 'fadeIn', 'visible', 'fadeOut'
    };
  }

  constructor() {
    super();
    this.preferedLanguage = 'es-MX';
    this.typingTextVisible = true;
    this.typedInstance = null;
    this.heroVideoSource = '../../media/videos/blurredHeroShot.mp4';

    // Carousel configuration
    this.numberOfPanels = 4; // Escalable: cambia este número para más paneles
    this.currentRotation = 0; // Ángulo actual de rotación en grados

    // Navigation state
    this.currentView = 'revolver'; // 'revolver', 'experiencia', 'portfolio', 'contacto'
    this.previousView = 'revolver'; // Vista anterior (para transiciones)
    this.lastPanelIndex = 0; // Para recordar la posición del carrusel
    this.isTransitioning = false; // Para prevenir clicks durante transiciones
    this.transitionDirection = 'forward'; // 'forward' (panel->detalle) o 'back' (detalle->panel)
    this.keepDetailVisible = false; // Mantener detalle visible durante transición de regreso
    this.isFadingOut = false; // Nav bar y botón están haciendo fade out
    this.isSpinning = false; // Carrusel está girando como revólver
    this.isLanguageFading = false; // Texto está en fade durante cambio de idioma
    this.isDetailTransitioning = false; // Transición entre páginas de detalle
    this.outgoingDetailView = null; // Vista que está saliendo durante transición
    this.detailTransitionDirection = 'right'; // 'right' (avanza) o 'left' (retrocede)
    this.overlayState = 'hidden'; // Estado del overlay global
  }

  _onLanguageChanged(event) {
    // Solo manejar el fade para el carrusel (headerTextContainer)
    // El navbar se maneja solo a través de TranslatorClass
    this.isLanguageFading = true;

    // Después de 300ms (fade out completo), cambiar idioma
    setTimeout(() => {
      this.preferedLanguage = event.detail.language;
      this.setPreferedLanguage(this.preferedLanguage);
      this.typingTextVisible = false;
      this.requestUpdate();

      // Pequeño delay para asegurar que el DOM se actualice
      setTimeout(() => {
        this.typingTextVisible = true;
        // Después de 50ms, iniciar fade in
        setTimeout(() => {
          this.isLanguageFading = false;
          this.requestUpdate();
        }, 50);
      }, 50);
    }, 300);
  }

  get panelContents() {
    return [
      {title: 'WEB DEVELOPER', subtitle: 'AND ESPORTS PRODUCER', view: null}, // Panel 1: 0° (derecha/visible) - no clickeable
      {
        title: this.t('panel-two-title'),
        subtitle: this.t('panel-two-subtitle'),
        view: 'experiencia',
      }, // Panel 2: 270° (arriba)
      {
        title: this.t('panel-three-title'),
        subtitle: this.t('panel-three-subtitle'),
        view: 'portfolio',
      }, // Panel 3: 180° (izquierda)
      {
        title: this.t('panel-four-title'),
        subtitle: this.t('panel-four-subtitle'),
        view: 'contacto',
      }, // Panel 4: 90° (abajo)
    ];
  }

  updated(changedProperties) {
    super.updated(changedProperties);

    if (this.typingTextVisible) {
      const typingElement = this.shadowRoot.querySelector(
        '#typeWritingText span.typing'
      );

      if (typingElement) {
        if (this.typedInstance) {
          this.typedInstance.destroy();
        }

        this.typedInstance = new Typed(typingElement, {
          strings: [
            this.t('portfolio-mainpage-hero-typewriting-one'),
            this.t('portfolio-mainpage-hero-typewriting-two'),
            this.t('portfolio-mainpage-hero-typewriting-three'),
            this.t('portfolio-mainpage-hero-typewriting-four'),
          ],
          typeSpeed: 20,
          backSpeed: 8,
          backDelay: 2500,
          loop: true,
          smartBackspace: true,
          showCursor: false,
        });
      } else {
        console.error('Elemento para Typed.js no encontrado en el DOM');
      }
    }
  }

  _renderTypeWriting() {
    return html`
      <div id="typeWritingTextContainer">
        <p id="typeWritingText"><span class="typing"></span></p>
      </div>
    `;
  }

  /**
   * Calcula el ángulo de cada panel basado en el número total de paneles
   * Panel 1 (index 0) debe estar a 0° (derecha del círculo)
   * Los paneles van en sentido ANTIHORARIO: 0° → 270° → 180° → 90°
   */
  _getPanelAngle(index) {
    const degreesPerPanel = 360 / this.numberOfPanels;
    // Invertir dirección: multiplica por -1 para ir antihorario
    return (-index * degreesPerPanel + 360) % 360;
  }

  /**
   * Calcula la rotación individual del panel para que aparezca derecho
   * Paneles horizontales (derecha/izquierda): 0° de rotación del contenido
   * Paneles verticales (arriba/abajo): 90° o -90° de rotación del contenido
   */
  _getPanelContentRotation(positionAngle) {
    // Normalizar el ángulo a 0-360
    const normalized = ((positionAngle % 360) + 360) % 360;

    // Derecha (0°): sin rotación
    if (normalized >= 315 || normalized < 45) return 0;
    // Abajo (90°): rotar -90° para que el texto quede vertical
    if (normalized >= 45 && normalized < 135) return -90;
    // Izquierda (180°): sin rotación
    if (normalized >= 135 && normalized < 225) return 0;
    // Arriba (270°): rotar 90° para que el texto quede vertical
    if (normalized >= 225 && normalized < 315) return 90;

    return 0;
  }

  /**
   * Calcula la opacidad del panel basado en su posición
   * Solo el panel en posición 0° (derecha del círculo) debe tener opacity 1
   */
  _getPanelOpacity(positionAngle) {
    const normalized = ((positionAngle % 360) + 360) % 360;

    // Durante el spin, todos los paneles tienen opacidad para verse girando
    if (this.isSpinning) {
      // Panel activo (0°): opacity 1
      if (normalized >= 315 || normalized < 45) return 1;
      // Paneles laterales: opacity media para efecto de profundidad
      return 0.4;
    }

    // Comportamiento normal: solo panel activo visible
    if (normalized >= 315 || normalized < 45) return 1;
    return 0;
  }

  /**
   * Calcula la posición del panel en el círculo
   */
  _getPanelPosition(angle) {
    const radius = 150; // Radio del carrusel en píxeles (reducido para acercar paneles)
    const rad = (angle * Math.PI) / 180;
    return {
      x: Math.cos(rad) * radius,
      y: Math.sin(rad) * radius,
    };
  }

  /**
   * Rota el carrusel en sentido horario (botón ▲ - panel anterior)
   */
  rotateClockwise() {
    const degreesPerPanel = 360 / this.numberOfPanels;
    this.currentRotation -= degreesPerPanel;
    this.requestUpdate();
  }

  /**
   * Rota el carrusel en sentido antihorario (botón ▼ - panel siguiente)
   */
  rotateCounterClockwise() {
    const degreesPerPanel = 360 / this.numberOfPanels;
    this.currentRotation += degreesPerPanel;
    this.requestUpdate();
  }

  /**
   * Obtiene el índice del panel actualmente visible
   */
  _getActivePanelIndex() {
    // Buscar qué panel tiene opacity 1 (está visible)
    for (let i = 0; i < this.numberOfPanels; i++) {
      const baseAngle = this._getPanelAngle(i);
      const currentAngle = baseAngle + this.currentRotation;
      const opacity = this._getPanelOpacity(currentAngle);

      if (opacity === 1) {
        console.log('Active panel found:', i);
        return i;
      }
    }
    return 0; // Fallback al primer panel
  }

  /**
   * Obtiene el índice de una vista en el array panelContents
   */
  _getViewIndex(view) {
    return this.panelContents.findIndex((panel) => panel.view === view);
  }

  /**
   * Maneja el click en un panel
   */
  _handlePanelClick(index, view) {
    console.log('Panel clicked:', index, 'view:', view);
    if (this.isTransitioning || this.isSpinning) {
      console.log('Transitioning or spinning, ignoring click');
      return;
    }

    const activePanelIndex = this._getActivePanelIndex();
    console.log('Active panel index:', activePanelIndex);

    if (index !== activePanelIndex) {
      console.log('Panel is not active, ignoring click');
      return; // Solo el panel activo es clickeable
    }

    // Si es el panel 1 (índice 0), no hacer nada (ya no es clickeable)
    if (index === 0 && !view) {
      console.log('Panel 1 clicked, but no action (not clickeable anymore)');
      return;
    }

    if (!view) {
      console.log('No view defined, ignoring click');
      return;
    }

    console.log('Navigating to view:', view);
    this._navigateToView(view);
  }

  /**
   * Inicia la animación de giro del revólver (2 segundos de giro continuo)
   */
  _startRevolverSpin() {
    this.isSpinning = true;
    const startRotation = this.currentRotation;
    const totalRotations = 10; // Más rotaciones para que se vea más rápido y fluido
    const targetRotation = startRotation + 360 * totalRotations;
    const duration = 2000; // 2 segundos
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Usar easing más agresivo para inicio rápido y desaceleración suave al final
      const easeOut = 1 - Math.pow(1 - progress, 3);

      this.currentRotation =
        startRotation + (targetRotation - startRotation) * easeOut;
      this.requestUpdate();

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Al terminar, asegurar que vuelva al panel 1 (rotación 0)
        this.currentRotation = 0;
        this.isSpinning = false;
        this.requestUpdate();
      }
    };

    requestAnimationFrame(animate);
  }

  /**
   * Navega a una vista específica
   */
  _navigateToView(view, direction = 'forward') {
    console.log('Navigating to:', view, 'Direction:', direction);
    if (this.isTransitioning) return;
    if (this.currentView === view) return;

    // Guardar el índice del panel actual si estamos en el revolver
    if (this.currentView === 'revolver') {
      this.lastPanelIndex = this._getActivePanelIndex();
    }

    // Detectar si estamos navegando entre páginas de detalle (no revolver)
    const isDetailToDetail =
      this.currentView !== 'revolver' && view !== 'revolver';

    // Establecer la dirección de la transición
    this.transitionDirection = direction;
    this.previousView = this.currentView;
    this.isTransitioning = true;

    const startTime = Date.now();

    if (direction === 'back') {
      // REGRESO: Fade out del overlay, nav bar y botón, LUEGO slide
      console.log('Iniciando fade out...');
      this.isFadingOut = true;
      this.keepDetailVisible = true;
      this.overlayState = 'fadeOut'; // Fade out del overlay

      // Esperar 600ms (duración del fade out) antes de iniciar el slide
      setTimeout(() => {
        console.log('Fade out completado, iniciando slide...');
        // Ahora sí, cambiar la vista para iniciar el slide
        this.currentView = view;
        this.requestUpdate();

        // Esperar 1000ms (duración del slide) antes de limpiar
        setTimeout(() => {
          const elapsed = Date.now() - startTime;
          console.log(
            'Transición completa después de',
            elapsed,
            'ms - limpiando estado'
          );
          this.isTransitioning = false;
          this.keepDetailVisible = false;
          this.isFadingOut = false;
          this.overlayState = 'hidden'; // Ocultar overlay completamente
          this.requestUpdate();
        }, 1000);
      }, 600);
    } else if (isDetailToDetail) {
      // NAVEGACIÓN ENTRE DETALLES: Overlay permanece visible
      console.log(
        'Navegación entre páginas de detalle - overlay permanece visible'
      );
      this.overlayState = 'visible'; // Mantener overlay visible sin animación

      // Determinar dirección basándose en los índices en panelContents
      const currentIndex = this._getViewIndex(this.currentView);
      const targetIndex = this._getViewIndex(view);

      // Si el índice destino es mayor, avanzamos (derecha), si es menor, retrocedemos (izquierda)
      this.detailTransitionDirection =
        targetIndex > currentIndex ? 'right' : 'left';

      console.log(
        `Transición: ${this.currentView}(${currentIndex}) → ${view}(${targetIndex}), dirección: ${this.detailTransitionDirection}`
      );

      this.isDetailTransitioning = true;
      this.outgoingDetailView = this.currentView;

      // Iniciar la animación de salida de la vista actual
      this.requestUpdate();

      // Después de 50ms, cambiar la vista para que la nueva entre
      setTimeout(() => {
        this.currentView = view;
        this.requestUpdate();

        // Esperar 1000ms (duración de la animación) antes de limpiar
        setTimeout(() => {
          this.isTransitioning = false;
          this.isDetailTransitioning = false;
          this.outgoingDetailView = null;
          this.requestUpdate();
        }, 1000);
      }, 50);
    } else {
      // AVANCE: Overlay con animación desde revolver a detalle
      console.log('Previous view:', this.previousView, 'New view:', view);
      this.overlayState = 'fadeIn'; // Fade in del overlay con delay
      this.currentView = view;
      this.requestUpdate();

      // Después de la animación del overlay, cambiar a estado visible
      setTimeout(() => {
        this.overlayState = 'visible';
        this.requestUpdate();
      }, 1800); // 1.2s delay + 0.6s animación

      // Esperar a que termine la transición antes de limpiar
      setTimeout(() => {
        const elapsed = Date.now() - startTime;
        console.log(
          'Timeout ejecutado después de',
          elapsed,
          'ms - limpiando estado'
        );
        this.isTransitioning = false;
        this.requestUpdate();
      }, 1000);
    }
  }

  /**
   * Maneja la navegación desde la Navigation Bar
   */
  async _handleNavigate(event) {
    // Si estamos en contacto y la InfoCard está abierta, cerrarla primero
    if (this.currentView === 'contacto') {
      const contactoComponent = this.shadowRoot.querySelector('contacto-page');
      if (contactoComponent && contactoComponent.needsClosing()) {
        await contactoComponent.closeInfoCardBeforeNavigation();
      }
    }
    this._navigateToView(event.detail.view);
  }

  /**
   * Maneja el botón de regreso
   */
  _handleNavigateBack() {
    this._navigateToView('revolver', 'back');
  }

  renderHeader() {
    return html`
      <div id="header">
        <div>
          <video class="heroVideo" autoplay muted loop>
            <source src=${this.heroVideoSource} />
          </video>
        </div>
      </div>
      <div id="gradient"></div>
    `;
  }

  _renderPanelOne() {
    return html`
      <div
        id="headerTextContainer"
        class="${this.isLanguageFading ? 'languageFading' : ''}"
      >
        <p id="preheader">${this.t('portfolio-mainpage-hero-preheader')}</p>
        <h1 id="headerText">${this.t('portfolio-mainpage-hero-header')}</h1>
        <h1 id="subheader">${this.t('portfolio-mainpage-hero-subheader')}</h1>
        ${this._renderTypeWriting()}
      </div>
    `;
  }

  renderCarousel() {
    return html`
      <div class="carouselContainer">
        <div class="carouselWheel">
          ${this.panelContents.map((content, index) => {
            // Calcular el ángulo actual del panel considerando la rotación
            const baseAngle = this._getPanelAngle(index);
            const currentAngle = baseAngle + this.currentRotation;

            // Opacidad basada en posición actual
            const opacity = this._getPanelOpacity(currentAngle);

            // Determinar si el panel es clickeable
            const isActive = opacity === 1;
            // Solo los paneles con view son clickeables (panel 1 ya no es clickeable)
            const isClickeable = isActive && content.view !== null;

            return html`
              <div
                class="carouselPanel ${isClickeable ? 'clickeable' : ''}"
                style="
                  transform:
                    rotate(${currentAngle}deg)
                    translate(350px, 0);
                  opacity: ${opacity};
                "
                @click=${() => this._handlePanelClick(index, content.view)}
              >
                ${index === 0
                  ? this._renderPanelOne()
                  : html`
                      <div id="headerTextContainer">
                        <p id="preheader">ㅤ</p>
                        <h1 id="headerText">${content.title}</h1>
                        <h1 id="subheader">${content.subtitle}</h1>
                      </div>
                    `}
              </div>
            `;
          })}
        </div>
        <div class="carouselButtons">
          <button class="carouselButton" @click=${this.rotateClockwise}>
            ▲
          </button>
          <button class="carouselButton" @click=${this.rotateCounterClockwise}>
            ▼
          </button>
        </div>
      </div>
    `;
  }

  _renderDetailPageFor(view) {
    switch (view) {
      case 'experiencia':
        return html`<experiencia-profesional
          .preferedLanguage=${this.preferedLanguage}
          .isFadingOut=${this.isFadingOut}
          @navigate-back=${this._handleNavigateBack}
        ></experiencia-profesional>`;
      case 'portfolio':
        return html`<portfolio-page
          .preferedLanguage=${this.preferedLanguage}
          .isFadingOut=${this.isFadingOut}
          @navigate-back=${this._handleNavigateBack}
        ></portfolio-page>`;
      case 'contacto':
        return html`<contacto-page
          .preferedLanguage=${this.preferedLanguage}
          .isFadingOut=${this.isFadingOut}
          @navigate-back=${this._handleNavigateBack}
        ></contacto-page>`;
      default:
        return html``;
    }
  }

  render() {
    const isRevolver = this.currentView === 'revolver';
    const isGoingBack = this.transitionDirection === 'back';

    // Clases para el revolver
    let revolverClass = 'viewContainer';
    if (isRevolver) {
      // Si estamos en revolver Y estamos en transición de regreso, animar entrada desde izquierda
      // Si NO estamos en transición, está activo normalmente
      revolverClass +=
        isGoingBack && this.isTransitioning ? ' slideInFromLeft' : ' active';
    } else {
      // Si NO estamos en revolver, salir hacia la izquierda
      revolverClass += ' slideOutLeft';
    }

    // Clases para la página de detalle
    let detailClass = 'viewContainer';
    let shouldShowDetail = false;

    if (!isRevolver) {
      // Estamos en una página de detalle: mostrarla entrando desde la derecha
      detailClass += ' slideInFromRight';
      shouldShowDetail = true;
    } else if (this.keepDetailVisible) {
      // Estamos regresando al revolver pero mantenemos el detalle visible para la animación
      detailClass += ' slideOutRight';
      shouldShowDetail = true;
    } else {
      // Estamos en revolver y NO en transición: ocultar
      detailClass += ' hidden';
      shouldShowDetail = false;
    }

    // Determinar qué vista mostrar en el detalle
    const detailViewToShow = !isRevolver ? this.currentView : this.previousView;

    console.log(
      'Render @',
      Date.now(),
      '- isRevolver:',
      isRevolver,
      'isGoingBack:',
      isGoingBack,
      'isTransitioning:',
      this.isTransitioning,
      'keepDetailVisible:',
      this.keepDetailVisible,
      'shouldShowDetail:',
      shouldShowDetail,
      'detailClass:',
      detailClass
    );

    return html`
      <div id="mainContainer">
        ${this.renderHeader()}

        <!-- Overlay global para páginas de detalle -->
        <div id="globalOverlay" class="${this.overlayState}"></div>

        <!-- Revolver Carousel - SIEMPRE renderizado -->
        <div class="${revolverClass}">${this.renderCarousel()}</div>

        <!-- Detail Pages - Renderizado condicionalmente -->
        <div class="${detailClass}">
          ${shouldShowDetail && detailViewToShow
            ? html`
                <navigation-bar
                  class="${this.isFadingOut && !this.isDetailTransitioning
                    ? 'fadeOut'
                    : ''}"
                  .activeView=${detailViewToShow}
                  .preferedLanguage=${this.preferedLanguage}
                  @navigate=${this._handleNavigate}
                ></navigation-bar>

                <!-- Página saliente durante transición detalle a detalle -->
                ${this.isDetailTransitioning && this.outgoingDetailView
                  ? html`
                      <div
                        class="detailPageContainer ${this
                          .detailTransitionDirection === 'right'
                          ? 'slideOutToLeft'
                          : 'slideOutToRight'}"
                      >
                        ${this._renderDetailPageFor(this.outgoingDetailView)}
                      </div>
                    `
                  : ''}

                <!-- Página actual/entrante -->
                <div
                  class="detailPageContainer ${this.isDetailTransitioning
                    ? this.detailTransitionDirection === 'right'
                      ? 'slideInFromRight'
                      : 'slideInFromLeft'
                    : ''}"
                >
                  ${this._renderDetailPageFor(detailViewToShow)}
                </div>
              `
            : ''}
        </div>

        <!-- Language Switcher - Always visible and fixed -->
        <language-switcher
          id="langButton"
          @language-changed="${this._onLanguageChanged}"
        ></language-switcher>
      </div>
    `;
  }
}

window.customElements.define('web-dev-screen', WebDevScreen);
