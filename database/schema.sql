


CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    rol VARCHAR(20) NOT NULL CHECK (rol IN ('MEDICO', 'PACIENTE')),
    fecha_registro DATE NOT NULL
);


CREATE TABLE medico (
    id_medico SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    apellido_paterno VARCHAR(100) NOT NULL,
    apellido_materno VARCHAR(100),
    cedula_profesional VARCHAR(50) UNIQUE NOT NULL,
    especialidad VARCHAR(100) NOT NULL,
    consultorio VARCHAR(100),
    fecha_alta DATE NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);


CREATE TABLE paciente (
    id_paciente SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL UNIQUE,
    codigo_paciente VARCHAR(50) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido_paterno VARCHAR(100) NOT NULL,
    apellido_materno VARCHAR(100),
    fecha_nacimiento DATE NOT NULL,
    sexo VARCHAR(20) NOT NULL,
    tipo_sangre VARCHAR(10),
    alergias TEXT,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);


CREATE TABLE medico_paciente (
    id_medico_paciente SERIAL PRIMARY KEY,
    id_medico INT NOT NULL,
    id_paciente INT NOT NULL,
    fecha_vinculacion DATE NOT NULL,
    FOREIGN KEY (id_medico) REFERENCES medico(id_medico),
    FOREIGN KEY (id_paciente) REFERENCES paciente(id_paciente),
    UNIQUE (id_medico, id_paciente)
);

CREATE TABLE medicamento (
    id_medicamento SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    presentacion VARCHAR(100),
    concentracion VARCHAR(50),
    via_administracion VARCHAR(50),
    descripcion TEXT
);


CREATE TABLE tratamiento (
    id_tratamiento SERIAL PRIMARY KEY,
    id_medico INT NOT NULL,
    id_paciente INT NOT NULL,
    nombre_tratamiento VARCHAR(100) NOT NULL,
    diagnostico TEXT,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE,
    estado VARCHAR(30) NOT NULL,
    receta_medica TEXT,
    notas_medicas TEXT,
    FOREIGN KEY (id_medico) REFERENCES medico(id_medico),
    FOREIGN KEY (id_paciente) REFERENCES paciente(id_paciente)
);

CREATE TABLE dosis (
    id_dosis SERIAL PRIMARY KEY,
    id_tratamiento INT NOT NULL,
    id_medicamento INT NOT NULL,
    cantidad VARCHAR(50) NOT NULL,
    frecuencia VARCHAR(50) NOT NULL,
    hora_programada TIME NOT NULL,
    duracion INT NOT NULL,
    FOREIGN KEY (id_tratamiento) REFERENCES tratamiento(id_tratamiento),
    FOREIGN KEY (id_medicamento) REFERENCES medicamento(id_medicamento)
);


CREATE TABLE calendario_medicacion (
    id_calendario SERIAL PRIMARY KEY,
    id_dosis INT NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    estado VARCHAR(30) NOT NULL CHECK (estado IN ('PENDIENTE', 'TOMADA', 'OMITIDA')),
    observaciones TEXT,
    FOREIGN KEY (id_dosis) REFERENCES dosis(id_dosis)
);

CREATE TABLE notificacion (
    id_notificacion SERIAL PRIMARY KEY,
    id_calendario INT NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    mensaje TEXT NOT NULL,
    fecha_envio TIMESTAMP NOT NULL,
    tipo VARCHAR(30) NOT NULL,
    estado VARCHAR(30) NOT NULL,
    FOREIGN KEY (id_calendario) REFERENCES calendario_medicacion(id_calendario)
);


CREATE TABLE historial_clinico (
    id_historial SERIAL PRIMARY KEY,
    id_paciente INT NOT NULL,
    id_tratamiento INT,
    fecha DATE NOT NULL,
    descripcion TEXT NOT NULL,
    observaciones TEXT,
    FOREIGN KEY (id_paciente) REFERENCES paciente(id_paciente),
    FOREIGN KEY (id_tratamiento) REFERENCES tratamiento(id_tratamiento)
);


CREATE TABLE estadistica_tratamiento (
    id_estadistica SERIAL PRIMARY KEY,
    id_tratamiento INT NOT NULL UNIQUE,
    total_dosis INT NOT NULL DEFAULT 0,
    dosis_tomadas INT NOT NULL DEFAULT 0,
    dosis_omitidas INT NOT NULL DEFAULT 0,
    porcentaje_cumplimiento DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    fecha_calculo DATE NOT NULL,
    FOREIGN KEY (id_tratamiento) REFERENCES tratamiento(id_tratamiento)
);


CREATE TABLE aviso (
    id_aviso SERIAL PRIMARY KEY,
    id_medico INT NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    contenido TEXT NOT NULL,
    fecha_publicacion TIMESTAMP NOT NULL,
    estado VARCHAR(20) NOT NULL CHECK (estado IN ('ACTIVO', 'INACTIVO')),
    FOREIGN KEY (id_medico) REFERENCES medico(id_medico)
);