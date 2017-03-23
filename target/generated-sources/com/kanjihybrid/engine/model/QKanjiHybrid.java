package com.kanjihybrid.engine.model;

import static com.mysema.query.types.PathMetadataFactory.*;

import com.mysema.query.types.path.*;

import com.mysema.query.types.PathMetadata;
import javax.annotation.Generated;
import com.mysema.query.types.Path;


/**
 * QKanjiHybrid is a Querydsl query type for KanjiHybrid
 */
@Generated("com.mysema.query.codegen.EntitySerializer")
public class QKanjiHybrid extends EntityPathBase<KanjiHybrid> {

    private static final long serialVersionUID = -2091342358L;

    public static final QKanjiHybrid kanjiHybrid = new QKanjiHybrid("kanjiHybrid");

    public final StringPath bias = createString("bias");

    public final StringPath chinese = createString("chinese");

    public final StringPath coreMeanings = createString("coreMeanings");

    public final StringPath english = createString("english");

    public final StringPath grammar = createString("grammar");

    public final StringPath hybrid = createString("hybrid");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath JLPT = createString("JLPT");

    public final StringPath kanji1 = createString("kanji1");

    public final StringPath kunyomi = createString("kunyomi");

    public final StringPath onyomi = createString("onyomi");

    public final StringPath radical = createString("radical");

    public final StringPath refId = createString("refId");

    public final StringPath setting = createString("setting");

    public final StringPath unicodeId = createString("unicodeId");

    public QKanjiHybrid(String variable) {
        super(KanjiHybrid.class, forVariable(variable));
    }

    public QKanjiHybrid(Path<? extends KanjiHybrid> path) {
        super(path.getType(), path.getMetadata());
    }

    public QKanjiHybrid(PathMetadata<?> metadata) {
        super(KanjiHybrid.class, metadata);
    }

}

