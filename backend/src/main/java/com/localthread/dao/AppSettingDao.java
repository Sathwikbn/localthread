package com.localthread.dao;

import com.localthread.model.AppSetting;
import java.util.List;
import java.util.Optional;

public interface AppSettingDao {
    List<AppSetting> findAll();
    Optional<AppSetting> findByKey(String key);
    void upsert(String key, String value);
}
