import React from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";


const markerIcon = new L.Icon({
    iconUrl: require("../../assets/images/geo-alt-fill.png"),
    iconSize: [ 25, 30 ] 
})

const MapWrapped = ({ centerCoordinates, coordinatesPosition }) => {

    return (

        <MapContainer
            center={centerCoordinates}
            zoom={12}
            style={{
                width: "100%",
                height: "100%",
                borderRadius: "5px"
            }}
        >

            <TileLayer
                url="https://api.maptiler.com/maps/topo-v2/256/{z}/{x}/{y}.png?key=aA11V8lEYGnQr9zR8OgO"
                attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
            />

            <Marker
                position={coordinatesPosition}
                icon={markerIcon}
            >
                <Popup>
                    <b> Simpin Kopertas Location </b>
                </Popup>
            </Marker>


        </MapContainer>

    );

};

export default MapWrapped;