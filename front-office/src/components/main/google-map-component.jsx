// GoogleMapComponent.jsx
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
      width: '100%',
      height: '530px',
};

const GoogleMapComponent = ({ latitude, longitude }) => {
      // Définit le centre selon les props
      const center = {
            lat: latitude || 12.6392,
            lng: longitude || -8.0029,
      };

      return (
            <LoadScript googleMapsApiKey="AIzaSyD7haDBb3EoQeuqg4XsnpmAIMCcd-NKMFs">
                  <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
                        <Marker position={center} />
                  </GoogleMap>
            </LoadScript>
      );
};

export default GoogleMapComponent;
