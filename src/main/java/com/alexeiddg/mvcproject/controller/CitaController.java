package com.alexeiddg.mvcproject.controller;

import com.alexeiddg.mvcproject.model.object.Cita;
import com.alexeiddg.mvcproject.service.interfaces.CitaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cita")
@CrossOrigin(origins = "http://localhost:3000")
public class CitaController {
    private final CitaService citaService;

    public CitaController(CitaService citaService) {
        this.citaService = citaService;
    }

    @GetMapping("/getall")
    public ResponseEntity<List<Cita>> getAllCitas() {
        return ResponseEntity.ok(citaService.getAllCitas());
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Cita> getCitaById(@PathVariable Long id) {
        return ResponseEntity.ok(citaService.getCitaById(id).orElse(null));
    }

    @PostMapping("/add")
    public ResponseEntity<Cita> addCita(@RequestBody Cita cita) {
        citaService.addCita(cita);
        return ResponseEntity.ok(cita);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCita(@PathVariable Long id) {
        citaService.deleteCita(id);
        return ResponseEntity.ok().build();
    }
}
