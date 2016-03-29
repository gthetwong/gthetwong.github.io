(function(){
	var scene = new THREE.Scene();
	var container = document.getElementById("canvas");

	var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000);
	camera.position.z = 10;

	//controls = new THREE.OrbitControls( camera );
	//controls.addEventListener( 'change', render );

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	container.appendChild(renderer.domElement);

	var light = new THREE.DirectionalLight( 0xffffff, 1.5);
	light.position.set(0,0,1);
	scene.add(light);

	var texture  = new THREE.ImageUtils.loadTexture("assets/Bread-Loaf-Texture.jpg");

	//texture.needsUpdate = true;

	var bread = new THREE.JSONLoader().load(
			'js/bread.js', function(geometry){
		var material = new THREE.MeshBasicMaterial({map:texture});
		var bread = new THREE.Mesh( geometry, material);
		scene.add(bread);
		bread.rotation.x = .4;
		bread.position.y = -2;
	});

	var render = function() {
		var timer = Date.now() * 0.0005;
		camera.position.x = Math.cos( timer ) * 10;
		camera.position.y = 4;
		camera.position.z = Math.sin( timer ) * 10;
		camera.lookAt( scene.position );
		requestAnimationFrame(render);
		renderer.render(scene, camera);
	};

	render();

})();
