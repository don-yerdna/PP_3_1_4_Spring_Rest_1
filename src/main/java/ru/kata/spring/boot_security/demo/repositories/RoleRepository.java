package ru.kata.spring.boot_security.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.kata.spring.boot_security.demo.models.Role;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
//    @Query("SELECT r FROM Role r JOIN FETCH r.users WHERE r.users= :userId")
//    List<Role> findRoleByUserId(Long userId);
    @Query("select r from Role r join fetch User u where u.id=:userId")
    List<Role> findByUserId(@Param("userId") Long userId);
}
