temp notes 
Program Notes:
- The db is created and dropped each time the spring boot application is run

Workflow for the Enfermera class
- CRUD for enfermeras
- Read citas assigned to them

Workflow for the Paciente class
- CRUD for pacientes
- CRUD for citas

Workflow for the Medico class
- CRUD for medicos
- See assigned citas

Workflow for the Administrador class
- Create, See and Delete Medicos; Manage medicos
- Create See and Delete Administradores; Manage their own class

the program does not 
- check for authentication
- restrict the api on an RBAC basis, meaning the following 
  - Any user subclass can access any endpoint, no RBAC restrictions