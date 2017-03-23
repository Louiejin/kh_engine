package com.kanjihybrid.engine.model;

import static com.mysema.query.types.PathMetadataFactory.*;

import com.mysema.query.types.path.*;

import com.mysema.query.types.PathMetadata;
import javax.annotation.Generated;
import com.mysema.query.types.Path;


/**
 * QMorningSun is a Querydsl query type for MorningSun
 */
@Generated("com.mysema.query.codegen.EntitySerializer")
public class QMorningSun extends EntityPathBase<MorningSun> {

    private static final long serialVersionUID = -245940975L;

    public static final QMorningSun morningSun = new QMorningSun("morningSun");

    public final StringPath cleanedsun = createString("cleanedsun");

    public final StringPath morningsun = createString("morningsun");

    public QMorningSun(String variable) {
        super(MorningSun.class, forVariable(variable));
    }

    public QMorningSun(Path<? extends MorningSun> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMorningSun(PathMetadata<?> metadata) {
        super(MorningSun.class, metadata);
    }

}

