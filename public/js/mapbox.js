/* eslint-disable */

export const displayMap = locations => {
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/arturavgust/clkbqurka000401phho2k8kmh',
    accessToken:
      'pk.eyJ1IjoiYXJ0dXJhdmd1c3QiLCJhIjoiY2xrY2JtNmsyMDJ2ZTNkcXlocDR5bnJydCJ9.FggFk18K5E_nmXPtLBOScg',
    scrollZoom: false
  });

  let bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    const el = document.createElement('div');
    el.className = 'marker';

    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 200,
      left: 100,
      right: 100
    }
  });
};
