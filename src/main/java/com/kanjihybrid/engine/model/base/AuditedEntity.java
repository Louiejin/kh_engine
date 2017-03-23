package com.kanjihybrid.engine.model.base;

import com.kanjihybrid.engine.util.UserUtil;
import org.hibernate.annotations.Type;
import org.joda.time.DateTime;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

/**
 * @author Frank Lloyd Teh
 */
@MappedSuperclass
public abstract class AuditedEntity {

    @Column
    private String createdBy;

    @Column
    private String updatedBy;

    @Column
    @Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
    private DateTime created;

    @Column
    @Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
    private DateTime updated;

    @PrePersist
    protected void onCreate() {
        updatedBy = createdBy = UserUtil.getCurrentUsername();
        updated = created = new DateTime();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedBy = UserUtil.getCurrentUsername();
        updated = new DateTime();
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    public DateTime getCreated() {
        return created;
    }

    public void setCreated(DateTime created) {
        this.created = created;
    }

    public DateTime getUpdated() {
        return updated;
    }

    public void setUpdated(DateTime updated) {
        this.updated = updated;
    }
}