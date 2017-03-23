package com.kanjihybrid.engine.model;

import static com.mysema.query.types.PathMetadataFactory.*;

import com.mysema.query.types.path.*;

import com.mysema.query.types.PathMetadata;
import javax.annotation.Generated;
import com.mysema.query.types.Path;


/**
 * QKanjiHybridPhrase is a Querydsl query type for KanjiHybridPhrase
 */
@Generated("com.mysema.query.codegen.EntitySerializer")
public class QKanjiHybridPhrase extends EntityPathBase<KanjiHybridPhrase> {

    private static final long serialVersionUID = -294807229L;

    public static final QKanjiHybridPhrase kanjiHybridPhrase = new QKanjiHybridPhrase("kanjiHybridPhrase");

    public final StringPath english = createString("english");

    public final StringPath hybrid = createString("hybrid");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public QKanjiHybridPhrase(String variable) {
        super(KanjiHybridPhrase.class, forVariable(variable));
    }

    public QKanjiHybridPhrase(Path<? extends KanjiHybridPhrase> path) {
        super(path.getType(), path.getMetadata());
    }

    public QKanjiHybridPhrase(PathMetadata<?> metadata) {
        super(KanjiHybridPhrase.class, metadata);
    }

}

