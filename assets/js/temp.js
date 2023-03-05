const loader = new FontLoader();
        loader.load( 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function ( font )
        {

            const matLite = new THREE.MeshBasicMaterial(
             {
              color: 0x2c3e50,
              transparent: true,
              opacity: 0.8,
              side: THREE.DoubleSide
            } );

            const message = " Three.js\nUniversity";

            const shapes = font.generateShapes( message, 100 );

            const geometry = new THREE.ShapeGeometry( shapes );
            geometry.computeBoundingBox();

            const xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
            geometry.translate( xMid, 0, 0 );
          
            const text = new THREE.Mesh( geometry, matLite );
            text.position.z = - 150;
            scene.add( text );

            camera.lookAt(new THREE.Vector3(text.position.x,0,text.position.z));
          
        } ); //end load function