document.addEventListener('DOMContentLoaded', () => {
  const busSelect = document.getElementById('busSelect');
  const stopSelect = document.getElementById('stopSelect');
  const mapFrame = document.getElementById('mapFrame');

  const API_KEY = 'AIzaSyCG__f5rFxOt8uOjsd99OZ_UBeGh4ieINk'; // Replace with your real key

  const routes = {
    '1A': {
      stops: {
        'Kuri Road': '33.6410,73.1320',
        'Zia Masjid': '33.6422,73.0941',
        'Khana Pul': '33.6130,73.1010',
        'Gangal': '33.6190,73.1110',
        'Koral': '33.6135,73.1190',
        'PWD': '33.5736,73.1278'
      }
    },
    '1B': {
      stops: {
        'PWD': '33.5736,73.1278',
        'Gangal': '33.6190,73.1110',
        'Khanna Pul': '33.6130,73.1010'
      }
    },
    '2A': {
      stops: {
        'I-10': '33.6430,73.0220',
        'IJP Road': '33.6357,73.0722',
        'Peshawar Road (Westridge)': '33.6139,73.0401',
        'Askari 11': '33.6336,72.9797',
        'PWD': '33.5736,73.1278',
        'Ghauri Town': '33.6095,73.1227',
        'Gangal': '33.6190,73.1110',
        'Khanna Pul': '33.6130,73.1010',
        'Zia Masjid': '33.6422,73.0941'
      }
    },
    '2B': {
      stops: {
        'H-13': '33.6274,72.9746',
        'G-14': '33.6394,72.9969',
        'Motorway Chowk': '33.6370,72.9902',
        'Golra Mor': '33.6366,72.9945',
        'Askari 11': '33.6336,72.9797'
      }
    },
    '2C': {
      stops: {
        'Srinagar Highway': '33.6780,73.0550',
        'I-14': '33.6442,72.9922',
        'Batta Chowk': '33.6550,72.9799',
        'Misrial Town': '33.6642,72.9583'
      }
    }
  };

  const AIR_UNI_COORDS = '33.7136,73.0250'; // Destination

  busSelect.addEventListener('change', () => {
    const selectedBus = busSelect.value;
    const stops = routes[selectedBus]?.stops || {};

    stopSelect.innerHTML = '<option disabled selected>Select a Stop</option>';
    stopSelect.disabled = true;

    Object.entries(stops).forEach(([stopName, coords]) => {
      if (coords) {  // Only include stops with valid coordinates
        const option = document.createElement('option');
        option.value = stopName;
        option.textContent = stopName;
        stopSelect.appendChild(option);
      }
    });

    if (stopSelect.options.length > 1) {
      stopSelect.disabled = false;
    }

    mapFrame.src = ''; // Reset map
  });

  stopSelect.addEventListener('change', () => {
    const selectedBus = busSelect.value;
    const selectedStop = stopSelect.value;

    const origin = routes[selectedBus]?.stops[selectedStop];

    if (origin && AIR_UNI_COORDS) {
      mapFrame.src = `https://www.google.com/maps/embed/v1/directions?key=${API_KEY}&origin=${origin}&destination=${AIR_UNI_COORDS}&mode=driving`;
    } else {
      console.warn('Missing coordinates for this stop.');
      mapFrame.src = '';
    }
  });
});
