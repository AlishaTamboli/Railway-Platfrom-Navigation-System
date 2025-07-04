package com.Rail.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Rail.entity.StationMaster;

@Repository
public interface StationMasterRepository extends JpaRepository<StationMaster, Long> {

    Optional<StationMaster> findByEmailAndPassword(String email, String password);

}
