// BKK TRANSIT APP - JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // App Config
  const config = {
    apiUrl: 'https://transit.hereapi.com/v8/stations',
    apiKey: 'YOUR_HERE_API_KEY', // Would typically be stored server-side
    bkkCenter: { lat: 13.7563, lng: 100.5018 }, // Bangkok center coordinates
    maxResults: 10,
    refreshInterval: 60000, // 1 minute
    stationData: {}
  };

  // DOM Elements
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section');
  const lineItems = document.querySelectorAll('.line-item');
  const stationList = document.getElementById('stations-list');
  const stationSearch = document.getElementById('station-search');
  const countdownEl = document.getElementById('countdown');
  const nearbyPlaces = document.getElementById('nearby-places');
  const nearbyStationsList = document.getElementById('nearby-stations-list');
  const latEl = document.getElementById('lat');
  const lngEl = document.getElementById('lng');
  
  // Bangkok BTS/MRT Station Data (would typically come from API)
  const stations = [
    {
      id: 'national-stadium',
      name: 'National Stadium',
      line: 'silom',
      coordinates: { lat: 13.746316, lng: 100.529415 },
      nextTrain: 5,
      status: 'on-time',
      nearby: ['MBK Center', 'Siam Discovery', 'Bangkok Art and Culture Centre']
    },
    {
      id: 'siam',
      name: 'Siam',
      line: 'silom',
      coordinates: { lat: 13.7455, lng: 100.5331 },
      nextTrain: 3,
      status: 'on-time',
      nearby: ['Siam Paragon', 'Siam Center', 'Siam Square']
    },
    {
      id: 'asok',
      name: 'Asok',
      line: 'sukhumvit',
      coordinates: { lat: 13.7366, lng: 100.5602 },
      nextTrain: 2,
      status: 'on-time',
      nearby: ['Terminal 21', 'Interchange with MRT Sukhumvit', 'Soi Cowboy']
    },
    {
      id: 'mo-chit',
      name: 'Mo Chit',
      line: 'sukhumvit',
      coordinates: { lat: 13.7999, lng: 100.5531 },
      nextTrain: 6,
      status: 'on-time',
      nearby: ['Chatuchak Weekend Market', 'JJ Mall', 'Or Tor Kor Market']
    },
    {
      id: 'phrom-phong',
      name: 'Phrom Phong',
      line: 'sukhumvit',
      coordinates: { lat: 13.7331, lng: 100.5689 },
      nextTrain: 1,
      status: 'on-time',
      nearby: ['EmQuartier', 'Benjasiri Park', 'The Emporium']
    },
    {
      id: 'krung-thon-buri',
      name: 'Krung Thon Buri',
      line: 'silom',
      coordinates: { lat: 13.7211, lng: 100.5021 },
      nextTrain: 4,
      status: 'on-time',
      nearby: ['The Peninsula Bangkok', 'Iconsiam', 'Millennium Hilton Bangkok']
    },
    {
      id: 'saphan-taksin',
      name: 'Saphan Taksin',
      line: 'silom',
      coordinates: { lat: 13.7182, lng: 100.5144 },
      nextTrain: 7,
      status: 'on-time',
      nearby: ['Chao Phraya River', 'Sathorn Pier', 'Lebua State Tower']
    },
    {
      id: 'krung-thep-aphiwat',
      name: 'Krung Thep Aphiwat',
      line: 'airport',
      coordinates: { lat: 13.7552, lng: 100.5388 },
      nextTrain: 10,
      status: 'on-time',
      nearby: ['Central Station', 'Airport Link Terminal', 'Rot Fai Night Market']
    }
  ];

  // Initialize the app
  function init() {
    setupEventListeners();
    populateStations();
    updateStationDetails(stations[0]); // Default to National Stadium
    startCountdown();
    fetchNearbyStations();
    
    // Setup refresh interval for real-time data
    setInterval(function() {
      updateStationTimes();
      fetchNearbyStations();
    }, config.refreshInterval);
  }

  // Setup UI Event Listeners
  function setupEventListeners() {
    // Navigation tabs
    navItems.forEach(item => {
      item.addEventListener('click', function() {
        const targetSection = this.getAttribute('data-target');
        
        // Update active nav item
        navItems.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
        
        // Show corresponding section
        sections.forEach(section => {
          section.classList.remove('active-section');
          if (section.id === targetSection) {
            section.classList.add('active-section');
          }
        });
      });
    });

    // Line selection
    lineItems.forEach(item => {
      item.addEventListener('click', function() {
        const selectedLine = this.getAttribute('data-line');
        
        // Highlight the selected line
        lineItems.forEach(line => line.classList.remove('active'));
        this.classList.add('active');
        
        // Filter stations by line
        filterStationsByLine(selectedLine);
      });
    });

    // Station search functionality
    stationSearch.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      filterStationsBySearch(searchTerm);
    });
  }

  // Populate the station list
  function populateStations() {
    // Clear existing stations
    stationList.innerHTML = '';
    
    // Add each station to the list
    stations.forEach(station => {
      const stationItem = document.createElement('div');
      stationItem.className = 'station-item';
      stationItem.setAttribute('data-station', station.id);
      stationItem.setAttribute('data-line', station.line);
      
      stationItem.innerHTML = `
        <span class="station-item-name">${station.name}</span>
        <span class="station-coordinates">${station.coordinates.lat.toFixed(4)} ${station.coordinates.lng.toFixed(4)}</span>
        <span class="select-indicator"></span>
      `;
      
      // Add click event to select station
      stationItem.addEventListener('click', function() {
        const selectedStationId = this.getAttribute('data-station');
        const selectedStation = stations.find(s => s.id === selectedStationId);
        
        // Update UI
        document.querySelectorAll('.station-item').forEach(item => {
          item.classList.remove('active');
        });
        this.classList.add('active');
        
        // Update station details
        updateStationDetails(selectedStation);
      });
      
      stationList.appendChild(stationItem);
    });
    
    // Set the first station as active by default
    stationList.querySelector('.station-item').classList.add('active');
  }

  // Filter stations by line
  function filterStationsByLine(line) {
    const stationItems = document.querySelectorAll('.station-item');
    
    stationItems.forEach(item => {
      if (line === 'all' || item.getAttribute('data-line') === line) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  }

  // Filter stations by search term
  function filterStationsBySearch(searchTerm) {
    const stationItems = document.querySelectorAll('.station-item');
    
    stationItems.forEach(item => {
      const stationName = item.querySelector('.station-item-name').textContent.toLowerCase();
      
      if (stationName.includes(searchTerm)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  }

  // Update station details panel
  function updateStationDetails(station) {
    document.querySelector('.station-name').textContent = station.name;
    
    // Update line badge
    const lineBadge = document.querySelector('.line-tag');
    lineBadge.innerHTML = `<span class="${station.line}-badge">${getLineName(station.line)}</span>`;
    
    // Update status
    document.querySelector('.status-value').textContent = station.status === 'on-time' ? 'On Time' : 'Delayed';
    document.querySelector('.status-value').className = 'status-value ' + station.status;
    
    // Update countdown
    updateCountdown(station.nextTrain);
    
    // Update coordinates
    latEl.textContent = station.coordinates.lat.toFixed(6);
    lngEl.textContent = station.coordinates.lng.toFixed(6);
    
    // Update nearby places
    nearbyPlaces.innerHTML = '';
    station.nearby.forEach(place => {
      const li = document.createElement('li');
      li.className = 'nearby-item';
      li.textContent = place;
      nearbyPlaces.appendChild(li);
    });
    
    // If 'Near Me' tab is active, refresh the map
    if (document.getElementById('near-section').classList.contains('active-section')) {
      initMap(station.coordinates);
    }
  }

  // Get full line name from code
  function getLineName(lineCode) {
    const lineNames = {
      'silom': 'Silom Line',
      'sukhumvit': 'Sukhumvit Line',
      'gold': 'Gold Line',
      'purple': 'Purple Line',
      'pink': 'Pink Line',
      'yellow': 'Yellow Line',
      'airport': 'Airport Rail Link'
    };
    
    return lineNames[lineCode] || lineCode;
  }

  // Update countdown timer
  function startCountdown() {
    let time = parseInt(countdownEl.textContent);
    
    setInterval(() => {
      if (time <= 0) {
        // Simulate next train arrival by setting a new random time
        time = Math.floor(Math.random() * 7) + 1;
      } else {
        time--;
      }
      
      countdownEl.textContent = time + ' min';
    }, 60000); // Update every minute
  }

  // Update train times (simulates real-time updates)
  function updateStationTimes() {
    stations.forEach(station => {
      // Simulate train schedule changes
      station.nextTrain = Math.floor(Math.random() * 10) + 1;
      
      // Occasionally simulate delays
      station.status = Math.random() > 0.9 ? 'delayed' : 'on-time';
    });
    
    // Update current station display if needed
    const activeStationId = document.querySelector('.station-item.active').getAttribute('data-station');
    const activeStation = stations.find(s => s.id === activeStationId);
    
    if (activeStation) {
      updateStationDetails(activeStation);
    }
  }

  // Fetch nearby stations - simulated API call
  function fetchNearbyStations() {
    // In a real app, this would make an API call to get nearby stations
    // For demo, we'll use our existing data with a timeout to simulate API call
    
    setTimeout(() => {
      // Get current active station's coordinates
      const activeStationId = document.querySelector('.station-item.active').getAttribute('data-station');
      const activeStation = stations.find(s => s.id === activeStationId);
      
      if (!activeStation) return;
      
      // Find stations within 2km (simplified calculation)
      const nearbyStations = stations.filter(station => {
        if (station.id === activeStationId) return false;
        
        // Simple distance calculation (not accurate for real geo, just for demo)
        const distance = Math.sqrt(
          Math.pow(station.coordinates.lat - activeStation.coordinates.lat, 2) +
          Math.pow(station.coordinates.lng - activeStation.coordinates.lng, 2)
        ) * 111; // rough conversion to km
        
        return distance < 2; // stations within 2km
      });
      
      // Update nearby stations list
      updateNearbyStationsList(nearbyStations);
      
      // If we were using a real API like HERE Maps or Google Maps, 
      // we would make an API call like this:
      
      /*
      fetch(`${config.apiUrl}?apiKey=${config.apiKey}&lat=${activeStation.coordinates.lat}&lng=${activeStation.coordinates.lng}&radius=2000`)
        .then(response => response.json())
        .then(data => {
          // Process the data
          updateNearbyStationsList(data.stations);
        })
        .catch(error => console.error('Error fetching nearby stations:', error));
      */
    }, 500);
  }

  // Update the nearby stations list
  function updateNearbyStationsList(nearbyStations) {
    nearbyStationsList.innerHTML = '';
    
    if (nearbyStations.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'No stations nearby';
      nearbyStationsList.appendChild(li);
      return;
    }
    
    nearbyStations.forEach(station => {
      const li = document.createElement('li');
      li.className = 'nearby-station-item';
      li.innerHTML = `
        <span class="nearby-station-name">${station.name}</span>
        <span class="nearby-station-line ${station.line}-text">${getLineName(station.line)}</span>
      `;
      
      // Add click event to select this station
      li.addEventListener('click', function() {
        // Find the station item in the main list and trigger a click
        const stationItem = document.querySelector(`.station-item[data-station="${station.id}"]`);
        if (stationItem) {
          stationItem.click();
          
          // Switch to transit tab
          document.querySelector('.nav-item[data-target="transit-section"]').click();
        }
      });
      
      nearbyStationsList.appendChild(li);
    });
  }

  // Initialize map - in a real app, this would use Google Maps or similar
  function initMap(coordinates) {
    const mapContainer = document.getElementById('map');
    
    // In a real app, we would initialize the map here
    // For this demo, we'll just update the placeholder
    
    mapContainer.innerHTML = `
      <div class="map-placeholder">
        <i class="fas fa-map-marked-alt"></i>
        <p>Map centered at ${coordinates.lat.toFixed(6)}, ${coordinates.lng.toFixed(6)}</p>
        <p class="map-note">In a real app, this would display an interactive map</p>
      </div>
    `;
    
    // If we were using Google Maps API, it would look like this:
    
    /*
    const map = new google.maps.Map(mapContainer, {
      center: { lat: coordinates.lat, lng: coordinates.lng },
      zoom: 15
    });
    
    // Add marker for the station
    new google.maps.Marker({
      position: { lat: coordinates.lat, lng: coordinates.lng },
      map: map,
      title: 'Current Station'
    });
    
    // Add markers for nearby places
    fetchNearbyPlaces(coordinates, map);
    */
  }

  // Simulate updating countdown display
  function updateCountdown(minutes) {
    countdownEl.textContent = minutes + ' min';
  }

  // Initialize the app
  init();
}); 