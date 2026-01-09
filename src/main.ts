import * as THREE from "three";

const width = 960;
const height = 540;
let rot = 0;
let mouseX = 0;
document.addEventListener("mousemove", (event) => {
	mouseX = event.pageX;
});

const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector("#myCanvas")!,
});

renderer.setSize(width, height);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, width / height);

const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

const texture = new THREE.TextureLoader().load("../public/earth.jpg");
texture.colorSpace = THREE.SRGBColorSpace;

const material = new THREE.MeshStandardMaterial({
	map: texture,
	side: THREE.DoubleSide,
});
const geometry = new THREE.SphereGeometry(300, 30, 30);
const earthMesh = new THREE.Mesh(geometry, material);
scene.add(earthMesh);

function createStarField() {
	const vertices = [];
	for (let i = 0; i < 1000; i++) {
		const x = 3000 * (Math.random() - 0.5);
		const y = 3000 * (Math.random() - 0.5);
		const z = 3000 * (Math.random() - 0.5);
		vertices.push(x, y, z);
	}
	const geometry = new THREE.BufferGeometry();
	geometry.setAttribute(
		"position",
		new THREE.Float32BufferAttribute(vertices, 3),
	);
	const material = new THREE.PointsMaterial({
		size: 10,
		color: 0xffffff,
	});
	const mesh = new THREE.Points(geometry, material);
	scene.add(mesh);
}

createStarField();

tick();

function tick() {
	const targetRot = (mouseX / window.innerWidth) * 360;
	rot += (targetRot - rot) * 0.02;
	const radian = (rot * Math.PI) / 180;

	camera.position.x = 1000 * Math.sin(radian);
	camera.position.z = 1000 * Math.cos(radian);
	camera.lookAt(new THREE.Vector3(0, 0, 0));
	renderer.render(scene, camera);

	requestAnimationFrame(tick);
}
