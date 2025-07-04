package com.Rail.controller;



import com.Rail.entity.Facility;
import com.Rail.repository.FacilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/facilities")
@CrossOrigin(origins = "*")  // allow frontend calls
public class FacilityController {

    @Autowired
    private FacilityRepository facilityRepository;

    // Add facility
    @PostMapping("/add")
    public Facility addFacility(@RequestBody Facility facility) {
        return facilityRepository.save(facility);
    }

    // Get all facilities by city
    @GetMapping("/city/{city}")
    public List<Facility> getFacilitiesByCity(@PathVariable String city) {
        return facilityRepository.findByCity(city);
    }

    // Delete facility by ID
    @DeleteMapping("/delete/{id}")
    public void deleteFacility(@PathVariable Long id) {
        facilityRepository.deleteById(id);
    }



    @GetMapping
    public List<Facility> getAllFacilities() {
        return facilityRepository.findAll();
    }

  

}
