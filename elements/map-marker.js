const map_marker_template = document.createElement('template');

map_marker_template.innerHTML = `
    <style>
        :host {
            display: block;
            position: absolute;
            width: 0px;
            height: 0px;
        }
        
        :host([hidden]) {
            display: none;
        }

        .marker-icon {
            transform: translate(-50%, -50%);
            z-index: 1;
            width: 50px;
            height: 50px;
            position: absolute;
        }
    </style>
`;

class MapMarker extends DataListener {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({mode:'closed'});
        shadowRoot.appendChild(map_marker_template.content.cloneNode(true));
        shadowRoot.appendChild(this._createIconImage());
    }

    /* Called when element is added to the document. */
    connectedCallback() {
        super.connectedCallback();
        this._defaultAttribute('slot', 'map-marker');
        this._defaultAttribute('x-position', 0);
        this._defaultAttribute('z-position', 0);
        this._defaultAttribute('left-percentage', '50%');
        this._defaultAttribute('top-percentage', '50%');
    }

    _defaultAttribute(attribute, value) {
        if (!this.hasAttribute(attribute)) {
            this.setAttribute(attribute, value);
        }
    }
  
    /* Called when element is removed from the document. */
    disconnectedCallback() {
        super.disconnectedCallback();
    }
  
    /* Attributes to listen for, options for attributeChangedCallback method. */
    static get observedAttributes() {
      return super.observedAttributes.concat('icon-src', 'left-percentage', 
        'top-percentage', 'x-position', 'z-position');
    }
  
    /* Called when an attributed has changed. */
    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
        switch(name) {
            case 'icon-src':
                this.iconImage.src = newValue;
                break;
            case 'left-percentage':
                this.style.left = newValue;
                break;
            case 'top-percentage':
                this.style.top = newValue;
                break;
            case 'x-position':
                this.dispatchEvent(new Event('situationxposition'));
                break;
            case 'z-position':
                this.dispatchEvent(new Event('situationzposition'));
                break;
            default:
          }
    }

    _createIconImage() {
        this.iconImage = document.createElement('img');
        this.iconImage.classList += 'marker-icon';
        return this.iconImage;
    }

    _receiveDataHandler(data) {
        if (typeof(data) != 'object') return;

        if (!this.hasAttribute('serial-number')) return;

        if (! 'serial' in data) return;
        if (data['serial'] != this.getAttribute('serial-number')) return;

        if (! 'position' in data) return;
        let position = data['position'];
        
        if (typeof(position) != 'object') return;

        if ('x' in position) {
            this.setAttribute('x-position', position['x']);
        }
        if ('z' in position) {
            this.setAttribute('z-position', position['z']);
        }
    }

}
customElements.define("map-marker", MapMarker);