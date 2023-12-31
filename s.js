const videoElement = document.getElementsByClassName("input_video")[0],
    scene = new THREE.Scene(),
    camera3j = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1e3
    ),
    renderer = new THREE.WebGLRenderer({
        alpha: true,
    }),
    parameters = { count: 1e3, size: 0.02 };
let geometryg = null,
    materialg = null,
    points = null,
    radius = 2,
    angle = 1.57;
(camera3j.position.x = radius * Math.cos(angle)),
    (camera3j.position.z = radius * Math.sin(angle));
const generateGalaxy = () => {
    geometryg = new THREE.BufferGeometry();
    let b = new Float32Array(3 * parameters.count);
    for (let c = 0; c < parameters.count; c++) {
        let d = 3 * c;
        (b[d] = 10 * (Math.random() - 0.5)),
            (b[d + 1] = 10 * (Math.random() - 0.5)),
            (b[d + 2] = 10 * (Math.random() - 0.5));
    }
    geometryg.setAttribute("position", new THREE.BufferAttribute(b, 3)),
        (materialg = new THREE.PointsMaterial({
            size: parameters.size,
            sizeAttenuation: !0,
            depthWrite: !1,
            blending: THREE.AdditiveBlending,
        })),
        (points = new THREE.Points(geometryg, materialg)),
        (points.name = "pts");
};
generateGalaxy();
const pointLight = new THREE.PointLight(16501857);
pointLight.position.set(0, 0, 50);
const ambientLight = new THREE.AmbientLight(16777215);
scene.add(ambientLight);

for (var a, obj = new THREE.Object3D(), i = 0; i < 21; i++) {
    var b = new THREE.SphereGeometry(0.01, 32, 16),
        c = new THREE.MeshNormalMaterial();
    ((a = new THREE.Mesh(b, c)).rotation.x = Math.PI), obj.add(a);
}
for (i = 0; i < 21; i++)
    (b = new THREE.BoxGeometry(0.02, 0.02, 0.02)),
        (c = new THREE.MeshNormalMaterial()),
        ((a = new THREE.Mesh(b, c)).rotation.x = Math.PI),
        obj.add(a);
scene.add(obj),
    (b = new THREE.Geometry()),
    (c = new THREE.LineBasicMaterial({ color: "#FF0000" })),
    (line1 = new THREE.Line(b, c));
var rank = new Array(
    0,
    1,
    2,
    3,
    4,
    3,
    2,
    5,
    6,
    7,
    8,
    7,
    6,
    5,
    9,
    10,
    11,
    12,
    11,
    10,
    9,
    13,
    14,
    15,
    16,
    15,
    14,
    13,
    17,
    18,
    19,
    20,
    19,
    18,
    17,
    0,
    21,
    22,
    23,
    24,
    25,
    24,
    23,
    26,
    27,
    28,
    29,
    28,
    27,
    26,
    30,
    31,
    32,
    33,
    32,
    31,
    30,
    34,
    35,
    36,
    37,
    36,
    35,
    34,
    38,
    39,
    40,
    41,
    40,
    39,
    38,
    21
);
for (i = 0; i < rank.length; i++)
    b.vertices.push(obj.children[rank[i]].position);
function onResults(d) {
    if (2 == d.multiHandLandmarks.length) {
        for (let e = 0; e < 21; e++)
            (obj.children[e].position.x = -d.multiHandLandmarks[0][e].x),
                (obj.children[e].position.y = -d.multiHandLandmarks[0][e].y),
                (obj.children[e].position.z =
                    0.6 + d.multiHandLandmarks[0][e].z),
                (obj.children[e + 21].position.x =
                    -d.multiHandLandmarks[1][e].x),
                (obj.children[e + 21].position.y =
                    -d.multiHandLandmarks[1][e].y),
                (obj.children[e + 21].position.z =
                    0.6 + d.multiHandLandmarks[0][e].z);
    }
    if (1 == d.multiHandLandmarks.length) {
        for (let g = 0; g < 21; g++)
            (obj.children[g].position.x = -d.multiHandLandmarks[0][g].x),
                (obj.children[g].position.y = -d.multiHandLandmarks[0][g].y),
                (obj.children[g].position.z =
                    0.6 + d.multiHandLandmarks[0][g].z);
    }
    line1 = new THREE.Line(b, c);
}
scene.add(line1),
    renderer.setSize(window.innerWidth, window.innerHeight),
    document.body.appendChild(renderer.domElement);
const hands = new Hands({
    locateFile: (b) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${b}`,
});
hands.setOptions({
    maxNumHands: 2,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
}),
    hands.onResults(onResults);
const camera = new Camera(videoElement, {
    async onFrame() {
        await hands.send({ image: videoElement });
    },
    width: 1280,
    height: 720,
});
function animate() {
    camera3j.lookAt(0, 0, 0),
        (b.verticesNeedUpdate = !0),
        requestAnimationFrame(animate),
        renderer.render(scene, camera3j);
}
camera.start(),
    (camera3j.position.x = 0),
    (camera3j.position.y = 0),
    (camera3j.position.z = 2),
    camera3j.lookAt(0, 0, 0),
    animate();
