import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

function ItemPengangkutan({ data }) {
  const [distance, setDistance] = React.useState(null);
  function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius bumi dalam km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Jarak dalam km
  }
  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latA = parseFloat(data.latitude);
          const logA = parseFloat(data.longitude);
          const latB = parseFloat(position.coords.latitude);
          const logB = parseFloat(position.coords.longitude);
          const jarak = haversine(latA, logA, latB, logB);
          setDistance(jarak.toFixed(2));
          // const pointA = { lat: latA, lon: logA }; // Contoh titik A (Bandung)
          // const pointB = { lat: latB, lon: logB }; // Contoh titik B (Bandung)
          // const url = `http://router.project-osrm.org/route/v1/driving/${pointA.lon},${pointA.lat};${pointB.lon},${pointB.lat}?overview=false`;
          // axios
          //   .get(url)
          //   .then((response) => {
          //     const route = response.data.routes[0];
          //     const distanceInMeters = route.distance;
          //     const distanceInKm = distanceInMeters / 1000;
          //     setDistance(distanceInKm.toFixed(2)); // Set jarak dan bulatkan ke 2 angka desimal
          //     console.log(
          //       `haversine =${jarak.toFixed(2)} - osrm= ${distanceInKm.toFixed(
          //         2
          //       )}`
          //     );
          //   })
          //   .catch((error) => {
          //     alert(error.message);
          //   });
        },
        (err) => console.log("err.message")
      );
    } else {
      console.log("Geolocation is not supported by your browser.");
    }
  }, [data.latitude, data.longitude]);

  return (
    <tbody>
      <tr>
        <th scope="row">Nama</th>
        <td className="text-end">{data.nama_tempat}</td>
      </tr>
      <tr>
        <th scope="row">Jenis</th>
        <td className="text-end">{data.jenis_tong}</td>
      </tr>
      <tr>
        <th scope="row">Alamat</th>
        <td className="text-end">{data.alamat}</td>
      </tr>
      <tr>
        <th scope="row">jarak</th>
        <td className="text-end">{distance} km</td>
      </tr>
    </tbody>
  );
}

export default ItemPengangkutan;
