package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Cooperative;
import com.mycompany.myapp.repository.CooperativeRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Cooperative}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CooperativeResource {

    private final Logger log = LoggerFactory.getLogger(CooperativeResource.class);

    private static final String ENTITY_NAME = "cooperative";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CooperativeRepository cooperativeRepository;

    public CooperativeResource(CooperativeRepository cooperativeRepository) {
        this.cooperativeRepository = cooperativeRepository;
    }

    /**
     * {@code POST  /cooperatives} : Create a new cooperative.
     *
     * @param cooperative the cooperative to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cooperative, or with status {@code 400 (Bad Request)} if the cooperative has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cooperatives")
    public ResponseEntity<Cooperative> createCooperative(@Valid @RequestBody Cooperative cooperative) throws URISyntaxException {
        log.debug("REST request to save Cooperative : {}", cooperative);
        if (cooperative.getId() != null) {
            throw new BadRequestAlertException("A new cooperative cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Cooperative result = cooperativeRepository.save(cooperative);
        return ResponseEntity.created(new URI("/api/cooperatives/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cooperatives} : Updates an existing cooperative.
     *
     * @param cooperative the cooperative to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cooperative,
     * or with status {@code 400 (Bad Request)} if the cooperative is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cooperative couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cooperatives")
    public ResponseEntity<Cooperative> updateCooperative(@Valid @RequestBody Cooperative cooperative) throws URISyntaxException {
        log.debug("REST request to update Cooperative : {}", cooperative);
        if (cooperative.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Cooperative result = cooperativeRepository.save(cooperative);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cooperative.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /cooperatives} : get all the cooperatives.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cooperatives in body.
     */
    @GetMapping("/cooperatives")
    public List<Cooperative> getAllCooperatives(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Cooperatives");
        return cooperativeRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /cooperatives/:id} : get the "id" cooperative.
     *
     * @param id the id of the cooperative to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cooperative, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cooperatives/{id}")
    public ResponseEntity<Cooperative> getCooperative(@PathVariable Long id) {
        log.debug("REST request to get Cooperative : {}", id);
        Optional<Cooperative> cooperative = cooperativeRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(cooperative);
    }

    /**
     * {@code DELETE  /cooperatives/:id} : delete the "id" cooperative.
     *
     * @param id the id of the cooperative to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cooperatives/{id}")
    public ResponseEntity<Void> deleteCooperative(@PathVariable Long id) {
        log.debug("REST request to delete Cooperative : {}", id);
        cooperativeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
