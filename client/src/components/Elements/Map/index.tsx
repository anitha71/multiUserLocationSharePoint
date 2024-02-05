import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet'
import { GeolocationPosition } from '../../../types'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
})

function LocationMarker({ location }: { location: any }) {

  const map = useMapEvents({})

  const [position, setPosition] = useState(location)

  useEffect(() => {
    setPosition(location)
    // map.flyTo([location.lat, location.lng])
  }, [location])

  return position === null ? null : (
    <>
      {
        position.map((data: any) => (
          <>
            <Marker position={data} icon={DefaultIcon}>
              <Popup>User is here!</Popup>
            </Marker>
          </>
        ))
      }
    </>
  )
}


function Map({ location }: { location: any }) {
  console.log(location);

  if (!location) return 'No location found'

  return (
    <>
      {
        location.length > 0 && <div className='w-full bg-gray-100 h-[600px] md:h-[550px]'>
          <MapContainer center={[location[0].lat, location[0].lng]} zoom={30} scrollWheelZoom={true} className='h-screen' >
            <TileLayer
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <LocationMarker location={location} />
          </MapContainer>
        </div>
      }
    </>
  )
}

export default Map