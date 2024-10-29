// src/components/MapComponent.tsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import countryData from "./countries.geojson"; // Upewnij się, że ścieżka do pliku GeoJSON jest poprawna
import "leaflet/dist/leaflet.css";
import {
  FeatureCollection,
  Feature,
  Geometry,
  GeoJsonProperties,
} from "geojson"; // Importuj typy GeoJSON

interface MapComponentProps {
  country: string;
}

const ChangeView: React.FC<{ center: [number, number]; zoom: number }> = ({
  center,
  zoom,
}) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
};

const MapComponent: React.FC<MapComponentProps> = ({ country }) => {
  const [selectedCountry, setSelectedCountry] = useState<Feature<
    Geometry,
    GeoJsonProperties
  > | null>(null);

  useEffect(() => {
    if (countryData.features) {
      const countryFeature = (countryData as FeatureCollection).features.find(
        (feature: Feature<Geometry, GeoJsonProperties>) =>
          feature.properties && feature.properties.name === country
      );
      setSelectedCountry(countryFeature || null);
    } else {
      console.error("Brak features w countryData");
    }
  }, [country]);

  const highlightStyle = {
    fillColor: "blue",
    weight: 2,
    opacity: 1,
    color: "blue",
    fillOpacity: 0.3,
  };

  const defaultCenter: [number, number] = [51.505, -0.09]; // Domyślne centrum mapy
  const zoomLevel = 4; // Domyślny poziom powiększenia

  // Logowanie do konsoli
  console.log("Selected Country Data:", selectedCountry);

  return (
    <MapContainer
      style={{ height: "400px", width: "100%" }} // Dodano style do mapy
    >
      <ChangeView center={defaultCenter} zoom={zoomLevel} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {selectedCountry && selectedCountry.geometry && (
        <GeoJSON data={selectedCountry} pathOptions={highlightStyle} />
      )}
      <GeoJSON
        data={countryData}
        pathOptions={{
          fillColor: "gray",
          weight: 1,
          color: "black",
          fillOpacity: 0.1,
        }}
      />
    </MapContainer>
  );
};

export default MapComponent;
