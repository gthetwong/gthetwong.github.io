var THREE = require('three');
require('three/examples/js/controls/OrbitControls');
module.exports.inject = function(){
	var scene = new THREE.Scene();
	var container = document.body.querySelector('.frame');
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor( 0xffffff, 1);
	container.appendChild(renderer.domElement);

	var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000);
	camera.position.z = 10;

	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.addEventListener( 'change', render );

	var light = new THREE.DirectionalLight( 0xffffff, 1.5);
	light.position.set(0,0,1);
	scene.add(light);

	var texture  = new THREE.ImageUtils.loadTexture("projects/iloafyou/Bread-Loaf-Texture.jpg");
	texture.needsUpdate = true;
	var bread = new THREE.JSONLoader().load(
			'projects/iloafyou/bread.json', function(geometry){
		var material = new THREE.MeshBasicMaterial({map:texture});
		var bread = new THREE.Mesh( geometry, material);
		scene.add(bread);
		bread.rotation.x = .4;
		bread.position.y = -2;
	});

	var render = function () {
		requestAnimationFrame(render);
		renderer.render(scene, camera);
	};
	render();

};
