package com.alexeiddg.mvcproject.controller;

import com.alexeiddg.mvcproject.model.object.Administrador;
import com.alexeiddg.mvcproject.model.object.Medico;
import com.alexeiddg.mvcproject.service.interfaces.AdministradorService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/administrador")
@CrossOrigin(origins = "http://localhost:3000")
public class AdministradorController {
    private final AdministradorService administradorService;

    public AdministradorController(AdministradorService administradorService) {
        this.administradorService = administradorService;
    }

    // Medicos Workflow
    @GetMapping("/medicos")
    public ResponseEntity<List<Medico>> getAllMedicos() {
        System.out.println("getAllMedicos");
        return ResponseEntity.ok(administradorService.getAllMedicos());
    }

    @GetMapping("/medicos/{id}")
    public ResponseEntity<Medico> getMedicoById(@PathVariable Long id){
        return ResponseEntity.ok(administradorService.getMedicoById(id).orElse(null));
    }

    @PostMapping("/add/medico")
    public ResponseEntity<Medico> addMedico(@RequestBody Medico medico){
        administradorService.addMedico(medico);
        return ResponseEntity.ok(medico);
    }

    @DeleteMapping("/delete/medico/{id}")
    public ResponseEntity<Void> deleteMedico(@PathVariable Long id){
        administradorService.deleteMedico(id);
        return ResponseEntity.ok().build();
    }

    // Administradores Workflow
    @GetMapping("/get")
    public ResponseEntity<List<Administrador>> getAllAdministradores() {
        return ResponseEntity.ok(administradorService.getAllAdministradores());
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Administrador> getAdministradorById(@PathVariable Long id){
        return ResponseEntity.ok(administradorService.getAdministradorById(id).orElse(null));
    }

    @PostMapping("/add")
    public ResponseEntity<Administrador> addAdministrador(@RequestBody Administrador administrador){
        administradorService.addAdministrador(administrador);
        return ResponseEntity.ok(administrador);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteAdministrador(@PathVariable Long id){
        administradorService.deleteAdministrador(id);
        return ResponseEntity.ok().build();
    }
}
