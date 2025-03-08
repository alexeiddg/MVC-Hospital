package com.alexeiddg.mvcproject.controller;

import com.alexeiddg.mvcproject.model.object.Cita;
import com.alexeiddg.mvcproject.model.object.Medico;
import com.alexeiddg.mvcproject.service.interfaces.MedicoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medico")
public class MedicoController {
    private final MedicoService medicoService;

    public MedicoController(MedicoService medicoService) {
        this.medicoService = medicoService;
    }

    @GetMapping("/getall")
    public ResponseEntity<List<Medico>> getAllMedicos() {
        return ResponseEntity.ok(medicoService.getAllMedicos());
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Medico> getMedicoById(@PathVariable Long id) {
        return ResponseEntity.ok(medicoService.getMedicoById(id).orElse(null));
    }

    @PostMapping("/add")
    public ResponseEntity<Medico> addMedico(@RequestBody Medico medico) {
        medicoService.addMedico(medico);
        return ResponseEntity.ok(medico);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteMedico(@PathVariable Long id) {
        medicoService.deleteMedico(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/citas/{medicoId}")
    public ResponseEntity<List<Cita>> getCitasByMedicoId(@PathVariable Long medicoId) {
        return ResponseEntity.ok(medicoService.getCitasByMedicoId(medicoId));
    }
}
