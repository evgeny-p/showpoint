var showPoint = {
  initMap: function() {
    this.initialPosition = {lat: 55.0317454, lng: 82.9299059};
    this.initialZoom = 12;
    
    this.showPointForm = document.getElementById('showpoint');

    this.map = new google.maps.Map(document.getElementById('map'), {
      center: this.initialPosition,
      zoom: this.initialZoom,
      mapTypeControl: false
    });

    var that = this;
    this.showPointForm.addEventListener('submit', function(e) {
      that.setMarker(e, that);
      return false;
    });
  },

  setMarker: function(e, that) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    var userString = that.showPointForm.latlng.value.trim();

    if (!userString) {
      that.resetMap();
      return;
    }

    var latlngArray = userString.split(/[,;\s]+/);
    if (latlngArray.length != 2) {
      that.showError('ERROR: expected format &lt;lat&gt; &lt;lon&gt;');
      return;
    }

    var lat = parseFloat(latlngArray[0]);
    var lng = parseFloat(latlngArray[1]);

    if (isNaN(lat) || isNaN(lng)) {
      that.showError('ERROR: invalid floating point values "' + userString + '"');
      return;
    }

    that.showMarker(lat, lng);
  },

  showMarker: function(lat, lng) {
    this.clearError();

    var markerPosition = {lat: lat, lng: lng};

    if (this.marker) {
      this.marker.setMap(null);
    }

    this.marker = new google.maps.Marker({
      position: markerPosition,
      map: this.map
    });

    this.map.setCenter(markerPosition);
    this.map.setZoom(17);
  },

  showError: function(text) {
    var error = document.getElementById('error');
    error.innerHTML = text;
    error.style.display = 'block';
  },

  clearError: function() {
    var error = document.getElementById('error');
    error.style.display = 'none';
  },

  resetMap: function() {
    this.map.setCenter(this.initialPosition);
    this.map.setZoom(this.initialZoom);
  }
};
