DDLS.RectMesh = function(w,h) {

    //  v0 +-----+ v1
    //     |    /|
    //     |   / |
    //     |  /  |
    //     | /   |
    //     |/    |
    //  v3 +-----+ v2


    var v = [];
    var e = [];
    var f = [];
    var s = [];
    var i = 4;
    while(i--){
        f.push(new DDLS.Face());
        v.push(new DDLS.Vertex());
        s.push(new DDLS.Segment());
        e.push(new DDLS.Edge(), new DDLS.Edge(), new DDLS.Edge());
    }
    //i = 4*3;
    //while(i--) e.push(new DDLS.Edge());

    var boundShape = new DDLS.Shape();    
    var offset = 10;

    v[0].pos.set(0 - offset, 0 - offset);
    v[1].pos.set(w + offset, 0 - offset);
    v[2].pos.set(w + offset, h + offset);
    v[3].pos.set(0 - offset, h + offset);

    v[0].setDatas(e[0]);
    v[1].setDatas(e[2]);
    v[2].setDatas(e[4]);
    v[3].setDatas(e[6]);

    e[0].setDatas(v[0],e[1],e[2],f[3], true, true);   // v0--v1
    e[1].setDatas(v[1],e[0],e[7],f[0], true, true);   // v1--v0
    e[2].setDatas(v[1],e[3],e[11],f[3],true, true);   // v1--v2
    e[3].setDatas(v[2],e[2],e[8],f[1], true, true);   // v2--v1
    e[4].setDatas(v[2],e[5],e[6],f[2], true, true);   // v2--v3
    e[5].setDatas(v[3],e[4],e[3],f[1], true, true);   // v3--v2
    e[6].setDatas(v[3],e[7],e[10],f[2],true, true);   // v3--v0
    e[7].setDatas(v[0],e[6],e[9],f[0], true, true);   // v0--v3
    e[8].setDatas(v[1],e[9],e[5],f[1], true, false);  // v1--v3 diagonal edge
    e[9].setDatas(v[3],e[8],e[1],f[0], true, false);  // v3--v1 diagonal edge
    e[10].setDatas(v[0],e[11],e[4],f[2],false,false); // v0--v2 imaginary edge
    e[11].setDatas(v[2],e[10],e[0],f[3],false,false); // v2--v0 imaginary edge

    f[0].setDatas(e[9], true); // v0-v3-v1
    f[1].setDatas(e[8], true); // v1-v3-v2
    f[2].setDatas(e[4],false); // v0-v2-v3
    f[3].setDatas(e[2],false); // v0-v1-v2

    // constraint relations datas
    v[0].fromConstraintSegments = [s[0],s[3]];
    v[1].fromConstraintSegments = [s[0],s[1]];
    v[2].fromConstraintSegments = [s[1],s[2]];
    v[3].fromConstraintSegments = [s[2],s[3]];

    e[0].fromConstraintSegments.push(s[0]);
    e[1].fromConstraintSegments.push(s[0]);
    e[2].fromConstraintSegments.push(s[1]);
    e[3].fromConstraintSegments.push(s[1]);
    e[4].fromConstraintSegments.push(s[2]);
    e[5].fromConstraintSegments.push(s[2]);
    e[6].fromConstraintSegments.push(s[3]);
    e[7].fromConstraintSegments.push(s[3]);

    s[0].edges.push(e[0]); // top
    s[1].edges.push(e[2]); // right
    s[2].edges.push(e[4]); // bottom
    s[3].edges.push(e[6]); // left
    s[0].fromShape = boundShape;
    s[1].fromShape = boundShape;
    s[2].fromShape = boundShape;
    s[3].fromShape = boundShape;
    boundShape.segments.push(s[0], s[1], s[2], s[3]);

    var mesh = new DDLS.Mesh(w,h);
    mesh._vertices = v;
    mesh._edges = e;
    mesh._faces = f;
    mesh._constraintShapes.push(boundShape);

    mesh.clipping = false;
    mesh.insertConstraintShape( [ 0,0,w,0,  w,0,w,h,  w,h,0,h,  0,h,0,0 ] );
    mesh.clipping = true;
    return mesh;
};