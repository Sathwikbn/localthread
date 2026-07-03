package com.localthread.dao.impl;

import com.localthread.dao.AppSettingDao;
import com.localthread.model.AppSetting;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public class AppSettingDaoImpl implements AppSettingDao {

    private final JdbcTemplate jdbcTemplate;

    public AppSettingDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<AppSetting> rowMapper = (rs, rowNum) -> {
        AppSetting s = new AppSetting();
        s.setId(rs.getLong("id"));
        s.setSettingKey(rs.getString("setting_key"));
        s.setSettingValue(rs.getString("setting_value"));
        return s;
    };

    @Override
    public List<AppSetting> findAll() {
        return jdbcTemplate.query("SELECT * FROM app_settings ORDER BY setting_key", rowMapper);
    }

    @Override
    public Optional<AppSetting> findByKey(String key) {
        List<AppSetting> settings = jdbcTemplate.query("SELECT * FROM app_settings WHERE setting_key=?", rowMapper, key);
        return settings.isEmpty() ? Optional.empty() : Optional.of(settings.get(0));
    }

    @Override
    public void upsert(String key, String value) {
        jdbcTemplate.update(
            "INSERT INTO app_settings (setting_key, setting_value) VALUES (?,?) ON DUPLICATE KEY UPDATE setting_value=?",
            key, value, value
        );
    }
}
