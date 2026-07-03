package com.localthread.dao;

import com.localthread.model.AuditLog;
import java.util.List;

public interface AuditLogDao {
    void save(AuditLog log);
    List<AuditLog> findAll(int page, int limit);
    int countAll();
}
