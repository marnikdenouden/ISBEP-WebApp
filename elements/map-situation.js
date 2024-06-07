const map_situation_template = document.createElement('template');

map_situation_template.innerHTML = `
    <style>
        :host {
            display: flex;
            position: relative;
            flex-warp: warp;
        }
        
        :host([hidden]) {
            display: none;
        }

        .map-area {
            width: 100%;
            height: 100%;
            position: absolute;
        }
    </style>
    <div class='map-area'>
        <slot name='map-marker'></slot>
    </div>
`;

class MapSituation extends HTMLElement {
    constructor() {
        super();
        console.log("constructor");

        const shadowRoot = this.attachShadow({mode:'closed'});

        shadowRoot.appendChild(map_situation_template.content.cloneNode(true));

        shadowRoot.appendChild(this._createBackgroundImage());
        
        this._mapMarkerSlot = shadowRoot.querySelector('slot[name=map-marker]');
    }

    /* Called when element is added to the document. */
    connectedCallback() {
        console.log("connectedCallback");

        this._defaultAttribute('situation-width', 1);
        this._defaultAttribute('situation-height', 1);
        this._defaultAttribute('situation-left-position', -0.5);
        this._defaultAttribute('situation-top-position', -0.5);

        this._onSlotChange = this._onSlotChange.bind(this);
        this._updateMapImageRatio = this._updateMapImageRatio.bind(this);
        this._updateMarkerPositions = this._updateMarkerPositions.bind(this);

        this._markerSituationXPositionHandler = function(event) {
            this._updateMarkerXPosition(event.target);
        }.bind(this);
        this._markerSituationZPositionHandler = function(event) {
            this._updateMarkerZPosition(event.target);
        }.bind(this);

        this._mapMarkerSlot.addEventListener('slotchange', this._onSlotChange);
        this._backgroundImage.addEventListener('load', this._updateMapImageRatio);
        this.addEventListener('load', this._updateMarkerPositions);
    }

    _defaultAttribute(attribute, value) {
        if (!this.hasAttribute(attribute)) {
            this.setAttribute(attribute, value);
        }
    }
  
    /* Called when element is removed from the document. */
    disconnectedCallback() {
        console.log("disconnectedCallback");
        this._backgroundImage.removeEventListener('load', this._updateMapImageRatio);
        this.removeEventListener('load', this._updateMarkerPositions);
        this._mapMarkerSlot.removeEventListener('slotchange', this._onSlotChange);
        this._removeSituationPositionListners();
    }
  
    /* Attributes to listen for, options for attributeChangedCallback method. */
    static get observedAttributes() {
      return ['background-src', 'situation-width', 'situation-height', 'situation-left-position', 'situation-top-position'];
    }
  
    /* Called when an attributed has changed. */
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`attributeChangedCallback ${name}`);
        switch(name) {
            case 'background-src':
                // if (this._backgroundImage != null) {
                    this._backgroundImage.src = newValue;
                // }
                break;
            case 'situation-width':
            case 'situation-height':
            case 'situation-left-position':
            case 'situation-top-position':
                this._updateMarkerPositions();
                break;
            default:
          }
    }

    _onSlotChange() {
        this._removeSituationPositionListners();
        this._addSituationPositionListeners();
        this._updateMarkerPositions();
    }

    _updateMapImageRatio() {
        console.log("updateMapImageRatio");
        this.style.aspectRatio = `${this._backgroundImage.naturalWidth}/${this._backgroundImage.naturalHeight}`;
    }

    _createBackgroundImage() {
        console.log("createBackgroundImage");
        this._backgroundImage = document.createElement('img');
        this._backgroundImage.classList += 'map-area';
        return this._backgroundImage;
    }
    
    _allMarkers() {
        return Array.from(this.querySelectorAll('map-marker'));
    }
    
    _updateMarkerPositions() {
        console.log("updateMarkerPositions");
        const markers = this._allMarkers();
        markers.forEach((marker) => {
            this._updateMarkerXPosition(marker);
            this._updateMarkerZPosition(marker);
        });
    }

    _addSituationPositionListeners() {
        const markers = this._allMarkers();
        markers.forEach((marker) => {
            marker.addEventListener('situationxposition', this._markerSituationXPositionHandler)
            marker.addEventListener('situationzposition', this._markerSituationZPositionHandler)
        });
    }

    _removeSituationPositionListners() {
        const markers = this._allMarkers();
        markers.forEach((marker) => {
            marker.removeEventListener('situationxposition', this._markerSituationXPositionHandler)
            marker.removeEventListener('situationzposition', this._markerSituationZPositionHandler)
        });
    }

    _updateMarkerXPosition(marker) {
        marker.setAttribute('left-percentage', `${((Number(marker.getAttribute('x-position'))
            - Number(this.getAttribute('situation-left-position'))) 
            / Number(this.getAttribute('situation-width'))) * 100}%`);
    }

    _updateMarkerZPosition(marker) {
        marker.setAttribute('top-percentage', `${((Number(marker.getAttribute('z-position'))
            - Number(this.getAttribute('situation-top-position'))) 
            / Number(this.getAttribute('situation-height'))) * 100}%`);
    }
}
console.log("DefineMapSituation");
customElements.define("map-situation", MapSituation);