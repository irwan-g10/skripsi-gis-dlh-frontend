import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

function ItemPengangkutan({ data }) {
  const [distance, setDistance] = React.useState(null);

  React.useEffect(() => {
    const latA = parseFloat(data.latitude);
    const logA = parseFloat(data.longitude);
    const latB = parseFloat(data.unit_pelayanan_teknis.latitude);
    const logB = parseFloat(data.unit_pelayanan_teknis.longitude);

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
  }, [
    data.latitude,
    data.longitude,
    data.unit_pelayanan_teknis.latitude,
    data.unit_pelayanan_teknis.longitude,
  ]);

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
