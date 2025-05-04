// MapComponent.jsx
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
      width: '100%',
      height: '530px',
};

const center = {
      lat: 12.6392, // Latitude de Bamako (exemple)
      lng: -8.0029,
};

const GoogleMapComponent = () => {
      return (
            <LoadScript googleMapsApiKey="AIzaSyD7haDBb3EoQeuqg4XsnpmAIMCcd-NKMFs">
                  <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
                        <Marker position={center} />
                  </GoogleMap>
            </LoadScript>
      );
};

export default GoogleMapComponent;
