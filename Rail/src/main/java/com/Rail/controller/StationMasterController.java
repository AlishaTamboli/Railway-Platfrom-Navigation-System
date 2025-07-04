package com.Rail.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Rail.entity.StationMaster;
import com.Rail.repository.StationMasterRepository;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:8081") // or "*" for testing
public class StationMasterController {

    @Autowired
    private StationMasterRepository repository;

    @PostMapping("/add-station-master")
    public ResponseEntity<String> addStationMaster(@RequestBody StationMaster master) {
        repository.save(master);
        return ResponseEntity.ok("Station Master added");
    }

    @GetMapping("/view-station-masters")
    public ResponseEntity<List<StationMaster>> viewAll() {
        return ResponseEntity.ok(repository.findAll());
    }
}
