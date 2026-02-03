import { MapLocation } from '@/src/data/mocks/mapaData';
import React, { useRef, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';


interface LeafletMapProps {
  locations: MapLocation[];
  selectedLocation: MapLocation | null;
  onSelectLocation: (locationId: string) => void;
  onMapClick: () => void;
}

export function LeafletMap({ locations, selectedLocation, onSelectLocation, onMapClick }: LeafletMapProps) {
  const webViewRef = useRef<WebView>(null);

  // HTML + CSS + JS do Leaflet que será injetado
  const mapHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>
          body { margin: 0; padding: 0; }
          #map { height: 100vh; width: 100vw; }
          .leaflet-control-attribution { display: none; } /* Opcional: esconde rodapé */
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          // Inicializa o Mapa com Centro do Brasil
          var map = L.map('map', { zoomControl: false }).setView([-14.235, -51.9253], 4);

          // Adiciona o TileLayer - OpenStreetMap
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
          }).addTo(map);

          //Recebe os dados do React Native
          var locations = ${JSON.stringify(locations)};
          var markers = {};

          // Ícone
          var greenIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/markers-default/2x/green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });

          //Cria os Marcadores
          locations.forEach(loc => {
            var marker = L.marker([loc.latitude, loc.longitude], { icon: greenIcon }).addTo(map);
            
            // Evento de Clique no Marcador
            marker.on('click', function() {
              window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'markerClick', id: loc.id }));
            });
            
            markers[loc.id] = marker;
          });

          // Evento de Clique no Mapa (para limpar seleção)
          map.on('click', function() {
            window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'mapClick' }));
          });

          //Função para receber comandos do React Native (Zoom/Pan)
          document.addEventListener('message', function(event) {
             handleMessage(event);
          });
          window.addEventListener('message', function(event) {
             handleMessage(event);
          });

          function handleMessage(event) {
             try {
                var data = JSON.parse(event.data);
                if (data.type === 'flyTo') {
                   map.flyTo([data.lat, data.lng], 7, { duration: 1.5 });
                }
                if (data.type === 'resetZoom') {
                   map.flyTo([-14.235, -51.9253], 4, { duration: 1.5 });
                }
             } catch (e) {}
          }
        </script>
      </body>
    </html>
  `;

  //Quando a localização selecionada muda, manda o mapa voar para lá
  useEffect(() => {
    if (selectedLocation && webViewRef.current) {
      const script = JSON.stringify({ 
        type: 'flyTo', 
        lat: selectedLocation.latitude, 
        lng: selectedLocation.longitude 
      });
      webViewRef.current.postMessage(script);
    } else if (!selectedLocation && webViewRef.current) {
        // Se limpou a seleção, volta o zoom
        const script = JSON.stringify({ type: 'resetZoom' });
        webViewRef.current.postMessage(script);
    }
  }, [selectedLocation]);

  return (
    <WebView
      ref={webViewRef}
      originWhitelist={['*']}
      source={{ html: mapHtml }}
      style={styles.map}
      onMessage={(event) => {
        // Recebe mensagens do HTML (Cliques)
        try {
          const data = JSON.parse(event.nativeEvent.data);
          if (data.type === 'markerClick') {
            onSelectLocation(data.id);
          } else if (data.type === 'mapClick') {
            onMapClick();
          }
        } catch (e) { console.log(e) }
      }}
    />
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    backgroundColor: '#e5e7eb', // Cor de fundo enquanto carrega
  },
});