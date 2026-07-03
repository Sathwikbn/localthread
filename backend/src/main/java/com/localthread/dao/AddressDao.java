package com.localthread.dao;

import com.localthread.model.Address;
import java.util.List;
import java.util.Optional;

public interface AddressDao {
    Address save(Address address);
    Optional<Address> findById(Long id);
    List<Address> findByUserId(Long userId);
    void update(Address address);
    void deleteById(Long id);
    void clearDefault(Long userId);
}
