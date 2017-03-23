package com.kanjihybrid.engine.model;

import static com.mysema.query.types.PathMetadataFactory.*;

import com.mysema.query.types.path.*;

import com.mysema.query.types.PathMetadata;
import javax.annotation.Generated;
import com.mysema.query.types.Path;
import com.mysema.query.types.path.PathInits;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.mysema.query.codegen.EntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = 1633924020L;

    public static final QUser user = new QUser("user");

    public final com.kanjihybrid.engine.model.base.QAuditedEntity _super = new com.kanjihybrid.engine.model.base.QAuditedEntity(this);

    //inherited
    public final DateTimePath<org.joda.time.DateTime> created = _super.created;

    //inherited
    public final StringPath createdBy = _super.createdBy;

    public final StringPath email = createString("email");

    public final BooleanPath enabled = createBoolean("enabled");

    public final StringPath firstName = createString("firstName");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath lastName = createString("lastName");

    public final StringPath middleName = createString("middleName");

    public final StringPath password = createString("password");

    public final ListPath<com.kanjihybrid.engine.model.lookup.Role, EnumPath<com.kanjihybrid.engine.model.lookup.Role>> roles = this.<com.kanjihybrid.engine.model.lookup.Role, EnumPath<com.kanjihybrid.engine.model.lookup.Role>>createList("roles", com.kanjihybrid.engine.model.lookup.Role.class, EnumPath.class, PathInits.DIRECT2);

    //inherited
    public final DateTimePath<org.joda.time.DateTime> updated = _super.updated;

    //inherited
    public final StringPath updatedBy = _super.updatedBy;

    public final StringPath username = createString("username");

    public QUser(String variable) {
        super(User.class, forVariable(variable));
    }

    public QUser(Path<? extends User> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUser(PathMetadata<?> metadata) {
        super(User.class, metadata);
    }

}

