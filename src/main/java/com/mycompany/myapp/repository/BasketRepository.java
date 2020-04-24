package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Basket;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Basket entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BasketRepository extends JpaRepository<Basket, Long> {

    @Query("select basket from Basket basket where basket.customer.login = ?#{principal.username}")
    List<Basket> findByCustomerIsCurrentUser();
}
