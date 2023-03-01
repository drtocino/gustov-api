const bodyParser = require('body-parser');
const express = require('express');
const { Sequelize, DataTypes, Model } = require('sequelize')
const cors = require("cors");

const app = express();

app.use(cors(
    {
        origin: "http://localhost:4200",
        credentials: true,
    }
))

const jsonParser = bodyParser.json()

const sequelize = new Sequelize('gustov','root','P@ssw0rd', {
    dialect: 'mysql',
    port: '3308',
    dialectOptions: {}
})

class Usuario extends Model {}

Usuario.init({
    idUsuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    idRol: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    nombres: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    usuario: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    clave: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    cargo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fechaInicio: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Usuario'
})
class Empleado extends Model {}

Empleado.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombres: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cargo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fechaInicio: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Empleado'
})

class RangoVacacion extends Model {}

RangoVacacion.init({
    idRangoVacacion: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    etiqueta: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cantidadMinima: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cantidadMaxima: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    diasVacacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'rangoVacaciones'
})

class VacacionEmpleado extends Model {}

VacacionEmpleado.init({
    idVacacionEmpleado: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'idUsuario'
        }
    },
    fechaInicio: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    fechaFin: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'vacacionEmpleado'
})

const PORT = 3000;

app.post("/login", jsonParser, (req,res) => {
    console.log(req.body)
    const usuarioParam = req.body.usuario;
    const claveParam = req.body.clave;
    const user = Usuario.findAll({
        where: {
            usuario: usuarioParam
        }
    }).then((r) => {
        if(r.length > 0){
            if(r[0].dataValues.clave == claveParam){
                res.send(r[0].dataValues)
            }else{
                res.send(false)                
            }
        }else{
            res.send(false)
        }
    })
})

app.post("/crearEmpleado", jsonParser, (req,res) => {
    Usuario.create(req.body).then((r) => {
        if(r.getDataValue.length > 0){
            res.send(true)
        }else{
            res.send(false)
        }
    }).catch((err) => {
        console.log(err)
    })
})

app.post("/vacacion", jsonParser, (req,res) => {
    VacacionEmpleado.create(req.body).then((r) => {
        if(r.getDataValue.length > 0){
            res.send(true)
        }else{
            res.send(false)
        }
    })
})

app.get("/empleados", jsonParser, (req,res) => {
    const empleados = []
    Usuario.findAll({
        where: {
            idRol: 2,
        }
    }).then((r) => {
        if (r.length > 0){
            console.log(r)
            r.map((emp) => {
                empleados.push(emp)
            })
            res.send(empleados)
        }else{
            res.send(false);
        }
    })
})

app.get("/vacaciones/:idUsuario", jsonParser, (req,res) => {
    console.log(req.body)
    const usuario = req.params.idUsuario
    const empleados = []
    VacacionEmpleado.findAll({
        where: {
            idUsuario: usuario,
        }
    }).then((r) => {
        if (r.length > 0){
            console.log(r)
            r.map((emp) => {
                empleados.push(emp)
            })
            res.send(empleados)
        }else{
            res.send(false);
        }
    })
})

app.get("/rangosVacaciones", jsonParser, (req,res) => {
    const rangos = []
    RangoVacacion.findAll({}).then((r) => {
        if (r.length > 0){
            console.log(r)
            r.map((emp) => {
                rangos.push(emp)
            })
            res.send(rangos)
        }else{
            res.send(false);
        }
    })
})

app.get("/empleado/:idEmpleado", jsonParser, (req,res) => {
    const idEmpleado = req.params.idEmpleado;
    console.log(idEmpleado);
    Usuario.findOne({
        where: {
            idUsuario: idEmpleado,
        }
    }).then((r) => {
        if(r){
            res.send(r.dataValues)
        }else{
            res.send(false);
        }
    })
})

  
app.listen(PORT, (error) => {
    if(!error)
        console.log("Servidor corriendo en puerto "+ PORT)
    else 
        console.log("Ocurrio un error no se pudo levantar el servidor", error);
    }
);