package com.sre.challenge.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sre.challenge.entities.AuthClientEntity;

@Repository
public interface IAuthClientRepository extends JpaRepository<AuthClientEntity, String>  {

} 
