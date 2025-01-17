/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
function InformasiGeografis() {
  const [dataTpa, setDataTpa] = React.useState([]);
  const [dataNearest, setDataNearest] = React.useState([]);

  const [loadingNearest, setLoadingNearest] = React.useState(true);
  const [dataUpt, setDataUpt] = React.useState([]);

  const [loading, setLoading] = React.useState(false);
  const [location, setLocation] = React.useState({
    latitude: null,
    longitude: null,
  });
  React.useEffect(() => {
    axios
      .get(`http://localhost:5000/api/titik-tpa`)
      .then((response) => {
        setDataTpa(response.data.result);
        axios
          .get(`http://localhost:5000/api/titik-upt`)
          .then((response) => {
            setDataUpt(response.data.result);
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  setLoading(true);
                  setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                  });
                  axios
                    .get(
                      `http://localhost:5000/api/titik-tpa/nearest?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`
                    )
                    .then((response) => {
                      setDataNearest(response.data.result);
                      // console.log("aaaa");

                      setLoadingNearest(false);
                    })
                    .catch((error) => {
                      alert(error.message);
                    });
                },
                (err) => console.log(err.message)
              );
            } else {
              console.log("Geolocation is not supported by your browser.");
            }
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);
  const redIcon = new L.DivIcon({
    className: "custom-marker-red",
    html: '<div style="width: 20px; height: 20px; background-color: red; border-radius: 50%;"></div>',
    iconSize: [20, 20],
  });
  const blackIcon = new L.DivIcon({
    className: "custom-marker-black",
    html: '<div style="width: 20px; height: 20px; background-color: black; border-radius: 50%;"></div>',
    iconSize: [20, 20],
  });

  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });

  function dijkstra(graph, start) {
    // Inisialisasi jarak awal
    const distances = {};
    const visited = new Set();

    // Tetapkan jarak awal ke Infinity, kecuali node start
    for (let neighbor in graph[start]) {
      distances[neighbor] = graph[start][neighbor];
    }

    // Inisialisasi jarak node awal ke dirinya sendiri dengan 0
    distances[start] = 0;

    // Cari node dengan jarak terpendek yang belum dikunjungi
    const findNearestCity = () => {
      let nearest = null;

      for (let city in distances) {
        if (!visited.has(city)) {
          if (nearest === null || distances[city] < distances[nearest]) {
            nearest = city;
          }
        }
      }

      return nearest;
    };

    // Mulai pencarian
    while (visited.size < Object.keys(graph[start]).length) {
      const nearestCity = findNearestCity();
      visited.add(nearestCity);
    }

    // Temukan kota dengan jarak terpendek
    const nearestCity = Object.keys(distances).reduce((nearest, city) => {
      if (
        city !== start &&
        (nearest === null || distances[city] < distances[nearest])
      ) {
        return city;
      }
      return nearest;
    }, null);

    return { nearestCity, distance: distances[nearestCity] };
  }
  if (loading) {
    console.log(dataNearest);
    return (
      <div className="InformasiGeografis">
        <div className="row">
          <div className="col">
            <div className="pilih-map mb-3">
              <MapContainer
                center={[-7.047407, 107.583554]}
                zoom={13}
                style={{ height: "550px", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />

                {dataTpa.map((item) => {
                  // console.log(item.latitude);
                  return (
                    <div key={item.id}>
                      <Marker
                        position={[
                          parseFloat(item.latitude),
                          parseFloat(item.longitude),
                        ]}
                      >
                        <Popup>{item.nama_tempat}</Popup>
                      </Marker>
                    </div>
                  );
                })}
                {dataUpt.map((item) => {
                  return (
                    <Marker
                      icon={redIcon}
                      position={[
                        parseFloat(item.latitude),
                        parseFloat(item.longitude),
                      ]}
                    >
                      <Popup>{item.nama_upt}</Popup>
                    </Marker>
                  );
                })}
                <Marker
                  icon={blackIcon}
                  position={[
                    parseFloat(location.latitude),
                    parseFloat(location.longitude),
                  ]}
                >
                  <Popup>Lokasi Anda</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
          <div className="col-4">
            {loadingNearest ? (
              <div className="d-flex justify-content-center align-items-center">
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              (() => {
                const graph = {
                  Start: {},
                };

                dataNearest.forEach((item) => {
                  graph.Start[item.id] = parseFloat(item.distance);
                });

                const { nearestCity, distance } = dijkstra(graph, "Start");
                // console.log(
                //   `UPT terdekat adalah ${nearestCity} dengan jarak ${distance} km`
                // );

                const foundItem = dataNearest.find(
                  (item) => item.id === nearestCity
                );
                console.log(foundItem);
                return (
                  <div className="card">
                    <img
                      src={foundItem.image_url}
                      className="card-img-top"
                      alt="..."
                    ></img>
                    <div class="card-body">
                      <h5 className="card-title">Lokasi TPA Terdekat</h5>
                      <table className="table">
                        <tbody>
                          <tr>
                            <th scope="row">Nama TPA</th>
                            <td className="text-end">
                              {foundItem.nama_tempat}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">UPT Pengelola</th>
                            <td className="text-end">
                              {foundItem.unit_pelayanan_teknis.nama_upt}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">jarak</th>
                            <td className="text-end">
                              {foundItem.distance} km
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="d-flex justify-content-end">
                        <a
                          href={`https://www.google.com/maps/dir/${location.latitude},${location.longitude}/${foundItem.latitude},${foundItem.longitude}`}
                          className="btn btn-primary"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Pergi ke tujuan
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })()
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default InformasiGeografis;
