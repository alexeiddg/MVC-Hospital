package com.alexeiddg.mvcproject.controller;

import com.alexeiddg.mvcproject.model.object.Cita;
import com.alexeiddg.mvcproject.model.object.Enfermera;
import com.alexeiddg.mvcproject.service.interfaces.EnfermeraService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enfermera")
public class EnfermeraController {
    private final EnfermeraService enfermeraService;

    public EnfermeraController(EnfermeraService enfermeraService) {
        this.enfermeraService = enfermeraService;
    }

    @GetMapping("/getall")
    public ResponseEntity<List<Enfermera>> getAllEnfermeras() {
        return ResponseEntity.ok(enfermeraService.getAllEnfermeras());
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Enfermera> getEnfermeraById(@PathVariable Long id) {
        return ResponseEntity.ok(enfermeraService.getEnfermeraById(id).orElse(null));
    }

    @PostMapping("/add")
    public ResponseEntity<Enfermera> addEnfermera(@RequestBody Enfermera enfermera) {
        enfermeraService.addEnfermera(enfermera);
        return ResponseEntity.ok(enfermera);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteEnfermera(@PathVariable Long id) {
        enfermeraService.deleteEnfermera(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/citas/{enfermeraId}")
    public ResponseEntity<List<Cita>> getCitasByEnfermeraId(@PathVariable Long enfermeraId) {
        return ResponseEntity.ok(enfermeraService.getCitasByEnfermeraId(enfermeraId));
    }
}
