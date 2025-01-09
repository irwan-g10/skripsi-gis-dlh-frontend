import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

function ItemPengaduan({ data }) {
  const [distance, setDistance] = React.useState(null);

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latA = parseFloat(data.latitude);
          const logA = parseFloat(data.longitude);
          const latB = parseFloat(position.coords.latitude);
          const logB = parseFloat(position.coords.longitude);

          const pointA = { lat: latA, lon: logA }; // Contoh titik A (Bandung)
          const pointB = { lat: latB, lon: logB }; // Contoh titik B (Bandung)
          const url = `http://router.project-osrm.org/route/v1/driving/${pointA.lon},${pointA.lat};${pointB.lon},${pointB.lat}?overview=false`;
          axios
            .get(url)
            .then((response) => {
              const route = response.data.routes[0];
              const distanceInMeters = route.distance;
              const distanceInKm = distanceInMeters / 1000;
              setDistance(distanceInKm.toFixed(2)); // Set jarak dan bulatkan ke 2 angka desimal
            })
            .catch((error) => {
              alert(error.message);
            });
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
        <th scope="row">Nama Pemohon</th>
        <td className="text-end">{data.nama}</td>
      </tr>
      {/* <tr>
        <th scope="row">Jenis</th>
        <td className="text-end">{data.jenis_tong}</td>
      </tr> */}
      <tr>
        <th scope="row">Lokasi Kejadian</th>
        <td className="text-end">{data.lokasi_kejadian}</td>
      </tr>
      <tr>
        <th scope="row">jarak</th>
        <td className="text-end">{distance} km</td>
      </tr>
      <tr>
        <th scope="row">Tanggal Pengaduan</th>
        <td className="text-end">{data.tanggal_pengaduan}</td>
      </tr>
    </tbody>
  );
}

export default ItemPengaduan;
