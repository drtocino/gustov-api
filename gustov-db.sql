DROP DATABASE IF EXISTS gustov;
CREATE database gustov;
USE gustov;

CREATE TABLE roles (
	idRol INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(30),
    activo BOOLEAN
);

CREATE TABLE usuarios (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    idRol INT,
    nombres VARCHAR(40),
    apellidos VARCHAR(40),
    usuario VARCHAR(20),
    clave VARCHAR(20),
    activo BOOLEAN,
    cargo VARCHAR(40),
    fechaInicio DATETIME,
    createdAt DATETIME,
    updatedAt DATETIME,
    FOREIGN KEY (idRol) REFERENCES roles(idRol)
);

CREATE TABLE vacacionEmpleados (
	idVacacionEmpleado INT PRIMARY KEY AUTO_INCREMENT,
    idUsuario INT,
    fechaInicio DATE,
    fechaFin DATE,
    createdAt DATETIME,
    updatedAt DATETIME,
    FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario)
);

CREATE TABLE rangoVacaciones (
	idRangoVacacion INT PRIMARY KEY AUTO_INCREMENT,
    etiqueta VARCHAR(50),
    cantidadMinima INT,
    cantidadMaxima INT,
    diasVacacion INT,
    createdAt DATETIME,
    updatedAt DATETIME
);


INSERT INTO roles VALUES
(null,"Administrador",1),
(null,"Empleado",1);



INSERT INTO usuarios VALUES
(null,1,"Dilan","Chuquimia","dilan.chuquimia","12811095",1,"Personal de TI","2020-08-30","2022-12-20","2022-12-20"),
(null,2,"Juan","Guarnizo","juan.guarnizo","12345678",1,"Chef","2020-02-24","2022-12-20","2022-12-20"),
(null,2,"Gonzalo","Martinez","gonzalo.martinez","87654321",1,"Jefe de Limpieza","2016-08-30","2022-12-20","2022-12-20");


INSERT INTO rangoVacaciones VALUES
(null,"1 a 5 años",1,5,15,"2022-12-20","2022-12-20"),
(null,"6 a 10 años",6,10,20,"2022-12-20","2022-12-20"),
(null,"11 años en adelante",11,100,30,"2022-12-20","2022-12-20");
