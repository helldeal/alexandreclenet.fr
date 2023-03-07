const asteroidload = new GLTFLoader();
asteroidload.load("assets/js/astroid.gltf",gtlf => {
  for (let i = 0; i < 5000; i++) {
    const mesh = gtlf.scene

    mesh.position.x = 12000 * (2.0 * Math.random() - 1.0);
    mesh.position.y = 12000 * (2.0 * Math.random() - 1.0);
    mesh.position.z = 12000 * (2.0 * Math.random() - 1.0);

    mesh.rotation.x = Math.random() * Math.PI;
    mesh.rotation.y = Math.random() * Math.PI;
    mesh.rotation.z = Math.random() * Math.PI;

    mesh.scale.set(200,200,200)

    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();

    scene.add(mesh);
    meteorArray.push(mesh)
  }
  console.log(meteorArray)
})