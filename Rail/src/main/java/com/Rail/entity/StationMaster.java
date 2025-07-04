package com.Rail.entity;



import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "station_master")
@Data
public class StationMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String stationName;
    private String stationMasterName;
    private String email;
    private String password;

}
