package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

import com.mycompany.myapp.domain.enumeration.BasketState;

/**
 * The Basket entity.
 */
@ApiModel(description = "The Basket entity.")
@Entity
@Table(name = "basket")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Basket implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "basket_id", nullable = false)
    private Long basketId;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "basket_state", nullable = false)
    private BasketState basketState;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @OneToOne
    @JoinColumn(unique = true)
    private Course course;

    @ManyToOne
    @JsonIgnoreProperties("baskets")
    private User customer;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getBasketId() {
        return basketId;
    }

    public Basket basketId(Long basketId) {
        this.basketId = basketId;
        return this;
    }

    public void setBasketId(Long basketId) {
        this.basketId = basketId;
    }

    public BasketState getBasketState() {
        return basketState;
    }

    public Basket basketState(BasketState basketState) {
        this.basketState = basketState;
        return this;
    }

    public void setBasketState(BasketState basketState) {
        this.basketState = basketState;
    }

    public User getUser() {
        return user;
    }

    public Basket user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Course getCourse() {
        return course;
    }

    public Basket course(Course course) {
        this.course = course;
        return this;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public User getCustomer() {
        return customer;
    }

    public Basket customer(User user) {
        this.customer = user;
        return this;
    }

    public void setCustomer(User user) {
        this.customer = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Basket)) {
            return false;
        }
        return id != null && id.equals(((Basket) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Basket{" +
            "id=" + getId() +
            ", basketId=" + getBasketId() +
            ", basketState='" + getBasketState() + "'" +
            "}";
    }
}
