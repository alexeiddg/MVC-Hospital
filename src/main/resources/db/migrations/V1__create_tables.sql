CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    rol VARCHAR(100) NOT NULL
);

CREATE TABLE paciente (
    id INT PRIMARY KEY REFERENCES usuario(id) ON DELETE CASCADE,
    contacto_emergencia VARCHAR(100),
    historial_medico VARCHAR(100)
);

CREATE TABLE medico (
    id INT PRIMARY KEY REFERENCES usuario(id) ON DELETE CASCADE,
    especialidad VARCHAR(100),
    horario_trabajo VARCHAR(100),
    licencia_medica VARCHAR(100)
);

CREATE TABLE administrador (
    id INT PRIMARY KEY REFERENCES usuario(id) ON DELETE CASCADE
);

CREATE TABLE enfermera (
    id INT PRIMARY KEY REFERENCES usuario(id) ON DELETE CASCADE,
    area_asignada VARCHAR(100),
    turno VARCHAR(100)
);

CREATE TABLE cita (
    id SERIAL PRIMARY KEY,
    fecha VARCHAR(100),
    hora VARCHAR(100),
    motivo_consulta VARCHAR(100),
    estado VARCHAR(100),
    medico_id INT REFERENCES medico(id) ON DELETE CASCADE,
    paciente_id INT REFERENCES paciente(id) ON DELETE CASCADE
);