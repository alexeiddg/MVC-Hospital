CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    rol VARCHAR(100) NOT NULL
);

CREATE TABLE paciente (
    id SERIAL PRIMARY KEY,
    contacto_emergencia VARCHAR(100),
    historial_medico VARCHAR(100)
    -- check if ref needed to usuario --
);

CREATE TABLE medico (
    id SERIAL PRIMARY KEY,
    especialidad VARCHAR(100),
    horario_trabajo VARCHAR(100),
    licencia_medica VARCHAR(100)
    -- check if ref needed to usuario --
);

CREATE TABLE administrador (
    id SERIAL PRIMARY KEY
    -- check if ref needed to usuario --
);

CREATE TABLE enfermera (
    id SERIAL PRIMARY KEY,
    area_asignada VARCHAR(100),
    turno VARCHAR(100)
    -- check if ref needed to usuario --
);

CREATE TABLE cita (
    id SERIAL PRIMARY KEY,
    fecha VARCHAR(100),
    hora VARCHAR(100),
    motivoConsulta VARCHAR(100),
    estado VARCHAR(100)
    -- add ref to medic --
    -- add ref to paciente --
);