package com.kanjihybrid.engine.model.base;

import static com.mysema.query.types.PathMetadataFactory.*;

import com.mysema.query.types.path.*;

import com.mysema.query.types.PathMetadata;
import javax.annotation.Generated;
import com.mysema.query.types.Path;


/**
 * QAuditedEntity is a Querydsl query type for AuditedEntity
 */
@Generated("com.mysema.query.codegen.SupertypeSerializer")
public class QAuditedEntity extends EntityPathBase<AuditedEntity> {

    private static final long serialVersionUID = -1131320887L;

    public static final QAuditedEntity auditedEntity = new QAuditedEntity("auditedEntity");

    public final DateTimePath<org.joda.time.DateTime> created = createDateTime("created", org.joda.time.DateTime.class);

    public final StringPath createdBy = createString("createdBy");

    public final DateTimePath<org.joda.time.DateTime> updated = createDateTime("updated", org.joda.time.DateTime.class);

    public final StringPath updatedBy = createString("updatedBy");

    public QAuditedEntity(String variable) {
        super(AuditedEntity.class, forVariable(variable));
    }

    public QAuditedEntity(Path<? extends AuditedEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QAuditedEntity(PathMetadata<?> metadata) {
        super(AuditedEntity.class, metadata);
    }

}

