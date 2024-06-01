const express = require('express')
const fs = require('fs');
const app = express()
const port = 4000
const cors = require('cors')

app.use(cors())
app.use(express.json())


let flotaVehiculos = [];

app.get('/flotasVehiculos', (req, res) => {
    res.json(flotaVehiculos)
})


app.post('/flotasVehiculos', (req, res) => {

    const { nombre, ubicacion: { lat, lon } } = req.body

    const newFlota = {
        id: flotaVehiculos.length + 1,
        nombre,
        estado: "Sin ruta",
        ubicacion: {
            lat,
            lon
        },
        rendimiento: {
            gas: "100%",
            velocidad: "0km",
            kilometraje: "0km"
        },
    }

    flotaVehiculos.push(newFlota)

    res.json(newFlota)
})

app.put('/flotasVehiculos/:id', (req, res) => {

    const { nombre, estado, ubicacion: { lat, lon }, rendimiento: { gas, velocidad, kilometraje } } = req.body
    const { id } = req.params

    const vehiculo = flotaVehiculos.find((e) => e.id == id)

    if (vehiculo) {
        vehiculo.nombre = nombre || vehiculo.nombre
        vehiculo.estado = estado || vehiculo.estado
        vehiculo.ubicacion.lat = lat || vehiculo.ubicacion.lat
        vehiculo.ubicacion.lon = lon || vehiculo.ubicacion.lon
        vehiculo.rendimiento.gas = gas || vehiculo.rendimiento.gas
        vehiculo.rendimiento.velocidad = velocidad || vehiculo.rendimiento.velocidad
        vehiculo.rendimiento.kilometraje = kilometraje || vehiculo.rendimiento.kilometraje
    } else {
        res.status(404).send('No se agrego el cambio a vehiculo')
    }

})


app.listen(port, () => {
    console.log(`Servidor corriendo en la url http://localhost:${port}`)
})
