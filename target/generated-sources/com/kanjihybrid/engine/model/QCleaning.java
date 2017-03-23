package com.kanjihybrid.engine.model;

import static com.mysema.query.types.PathMetadataFactory.*;

import com.mysema.query.types.path.*;

import com.mysema.query.types.PathMetadata;
import javax.annotation.Generated;
import com.mysema.query.types.Path;


/**
 * QCleaning is a Querydsl query type for Cleaning
 */
@Generated("com.mysema.query.codegen.EntitySerializer")
public class QCleaning extends EntityPathBase<Cleaning> {

    private static final long serialVersionUID = 459144290L;

    public static final QCleaning cleaning = new QCleaning("cleaning");

    public final StringPath cleaned = createString("cleaned");

    public final StringPath compoundcleaned = createString("compoundcleaned");

    public QCleaning(String variable) {
        super(Cleaning.class, forVariable(variable));
    }

    public QCleaning(Path<? extends Cleaning> path) {
        super(path.getType(), path.getMetadata());
    }

    public QCleaning(PathMetadata<?> metadata) {
        super(Cleaning.class, metadata);
    }

}

