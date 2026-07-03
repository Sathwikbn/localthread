package com.localthread.dao.impl;

import com.localthread.dao.AddressDao;
import com.localthread.model.Address;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Optional;

@Repository
public class AddressDaoImpl implements AddressDao {

    private final JdbcTemplate jdbcTemplate;

    public AddressDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Address> rowMapper = (rs, rowNum) -> {
        Address a = new Address();
        a.setId(rs.getLong("id"));
        a.setUserId(rs.getLong("user_id"));
        a.setLabel(rs.getString("label"));
        a.setLine1(rs.getString("line1"));
        a.setCity(rs.getString("city"));
        a.setState(rs.getString("state"));
        a.setPincode(rs.getString("pincode"));
        a.setIsDefault(rs.getBoolean("is_default"));
        return a;
    };

    @Override
    public Address save(Address address) {
        String sql = "INSERT INTO addresses (user_id, label, line1, city, state, pincode, is_default) VALUES (?,?,?,?,?,?,?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setLong(1, address.getUserId());
            ps.setString(2, address.getLabel());
            ps.setString(3, address.getLine1());
            ps.setString(4, address.getCity());
            ps.setString(5, address.getState());
            ps.setString(6, address.getPincode());
            ps.setBoolean(7, address.getIsDefault() != null && address.getIsDefault());
            return ps;
        }, keyHolder);
        address.setId(keyHolder.getKey().longValue());
        return address;
    }

    @Override
    public Optional<Address> findById(Long id) {
        List<Address> addresses = jdbcTemplate.query("SELECT * FROM addresses WHERE id=?", rowMapper, id);
        return addresses.isEmpty() ? Optional.empty() : Optional.of(addresses.get(0));
    }

    @Override
    public List<Address> findByUserId(Long userId) {
        return jdbcTemplate.query("SELECT * FROM addresses WHERE user_id=? ORDER BY is_default DESC", rowMapper, userId);
    }

    @Override
    public void update(Address address) {
        jdbcTemplate.update(
            "UPDATE addresses SET label=?, line1=?, city=?, state=?, pincode=?, is_default=? WHERE id=?",
            address.getLabel(), address.getLine1(), address.getCity(),
            address.getState(), address.getPincode(), address.getIsDefault(), address.getId()
        );
    }

    @Override
    public void deleteById(Long id) {
        jdbcTemplate.update("DELETE FROM addresses WHERE id=?", id);
    }

    @Override
    public void clearDefault(Long userId) {
        jdbcTemplate.update("UPDATE addresses SET is_default=FALSE WHERE user_id=?", userId);
    }
}
