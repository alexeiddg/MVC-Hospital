package com.alexeiddg.mvcproject.controller;

import com.alexeiddg.mvcproject.model.object.Cita;
import com.alexeiddg.mvcproject.model.object.Paciente;
import com.alexeiddg.mvcproject.service.interfaces.PacienteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/paciente")
@CrossOrigin(origins = "http://localhost:3000")
public class PacienteController {
    private final PacienteService pacienteService;

    public PacienteController(PacienteService pacienteService) {
        this.pacienteService = pacienteService;
    }

    @GetMapping("/getall")
    public ResponseEntity<List<Paciente>> getAllPacientes() {
        return ResponseEntity.ok(pacienteService.getAllPacientes());
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Paciente> getPacienteById(@PathVariable Long id) {
        return ResponseEntity.ok(pacienteService.getPacienteById(id).orElse(null));
    }

    @PostMapping("/add")
    public ResponseEntity<Paciente> addPaciente(@RequestBody Paciente paciente) {
        pacienteService.addPaciente(paciente);
        return ResponseEntity.ok(paciente);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deletePaciente(@PathVariable Long id) {
        pacienteService.deletePaciente(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/citas/{id}")
    public ResponseEntity<List<Cita>> getCitasByPacienteId(@PathVariable Long id) {
        return ResponseEntity.ok(pacienteService.getCitasByPacienteId(id));
    }

    @PostMapping("/add/cita")
    public ResponseEntity<Cita> addCita(@RequestBody Cita cita) {
        System.out.println("si llego");
        pacienteService.addCita(cita);
        return ResponseEntity.ok(cita);
    }

    @DeleteMapping("/delete/cita/{id}")
    public ResponseEntity<Void> deleteCita(@PathVariable Long id) {
        pacienteService.deleteCita(id);
        return ResponseEntity.ok().build();
    }
}
