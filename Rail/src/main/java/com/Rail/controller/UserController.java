package com.Rail.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;  // ✅ correct Optional

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Rail.entity.Admin;
import com.Rail.entity.StationMaster;
import com.Rail.entity.User;
import com.Rail.repository.AdminRepository;
import com.Rail.repository.StationMasterRepository;
import com.Rail.repository.UserRepository;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5500") // or use allowedOriginPatterns
public class UserController {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private StationMasterRepository stationMasterRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();
     String role = loginRequest.getRole();

    switch (role.toLowerCase()) {
    case "admin":
        Optional<Admin> adminOpt = adminRepository.findByEmailAndPassword(email, password);
        if (adminOpt.isPresent()) {
            return ResponseEntity.ok(adminOpt.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Admin credentials.");
        }

  case "stationmaster":
    Optional<StationMaster> smOpt = stationMasterRepository.findByEmailAndPassword(email, password);
    if (smOpt.isPresent()) {
        StationMaster sm = smOpt.get();

        // Build a custom response that includes 'city'
        Map<String, Object> response = new HashMap<>();
        response.put("id", sm.getId());
        response.put("email", sm.getEmail());
        response.put("stationMasterName", sm.getStationMasterName());
        response.put("city", sm.getStationName());  // ✅ Use stationName as city

        return ResponseEntity.ok(response);
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Station Master credentials.");
    }


    case "user":
        Optional<User> userOpt = userRepository.findByEmailAndPassword(email, password);
        if (userOpt.isPresent()) {
            return ResponseEntity.ok(userOpt.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid User credentials.");
        }

    default:
        return ResponseEntity.badRequest().body("Invalid role.");
}

    }
}
