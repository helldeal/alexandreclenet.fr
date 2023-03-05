

            import * as THREE from  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
            import { OrbitControls } from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/controls/OrbitControls";
            import { Reflector } from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/objects/Reflector";
            import { FontLoader } from 'https://cdn.skypack.dev/three@0.133.1/examples/jsm/loaders/FontLoader.js';
            
            
            const scene = new THREE.Scene()
            
            
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 0)
            camera.position.set( 100, 100, 100 );
            const renderer = new THREE.WebGLRenderer()
            renderer.setSize(window.innerWidth, window.innerHeight)
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.shadowMap.enabled = true
            document.body.appendChild(renderer.domElement)
            
            const controls = new OrbitControls(camera, renderer.domElement)
            
            controls.minDistance = 100;
            controls.maxDistance = 250;
            controls.screenSpacePanning = true
            controls.minPolarAngle = 0
            controls.maxPolarAngle = Math.PI/2-0.1
            controls.enablePan = false;
            
            const spotLight = new THREE.SpotLight( 0xaaaaff,1 ,280,Math.PI/2.5,1,1);
            spotLight.position.set( 0, 200, 0 );
            scene.add(spotLight)
            const light = new THREE.AmbientLight( 0x404040 ); // soft white light
            scene.add( light );
            
            // PLANE
            
            // const mirrorFront1 = new Reflector(
            //     new THREE.PlaneGeometry(1000, 1000),
            //     {
            //         color: new THREE.Color(0x7f7f7f),
            //         //clipBias: 0.003,
            //         textureWidth: window.innerWidth * window.devicePixelRatio,
            //         textureHeight: window.innerHeight * window.devicePixelRatio
            //     }
            // )
            // mirrorFront1.position.y = 0.1
            // mirrorFront1.rotateX(Math.PI/2)
            // mirrorFront1.rotateY(Math.PI)
            // scene.add(mirrorFront1)
            
            const geometry = new THREE.BoxGeometry(1000,1,1000)
            const material = new THREE.MeshStandardMaterial({
                color: "#c0c0c0",
              });
            const plane = new THREE.Mesh(geometry, material)
            plane.position.y=0
            scene.add(plane)
            
            // const box = new THREE.BoxHelper( mirrorFront1, 0xffff00 );
            // scene.add( box );
            
            
            
            //PAN 1
            const light1 = new THREE.PointLight("#ffca57", 0.5, 1000);
            light1.position.set( 0, 10, 30 );
            light1.castShadow=true
            light1.shadow.mapSize.width = 4096;
            light1.shadow.mapSize.height = 4096;
            scene.add(light1);
            
            const pan1 = new THREE.Mesh(new THREE.BoxGeometry(2,8,2), new THREE.MeshStandardMaterial({color: "#ffca57",}))
            pan1.castShadow=true
            pan1.position.set( 0, 5, 30 );
            scene.add(pan1)
            
            const geometry2 = new THREE.BoxGeometry(2,2,2)
            const material2 = new THREE.MeshLambertMaterial({
                color: "#ffca57",
                emissive: "#ffca57",
            });
            const bulb1 = new THREE.Mesh(geometry2, material2)
            bulb1.position.set( 0, 10, 30 );
            bulb1.receiveShadow=true
            scene.add(bulb1)
            
            
            // const slhelper = new THREE.SpotLightHelper(spotLight);
            // scene.add(slhelper);
            
            //PAN 2
            
            const light2 = new THREE.PointLight("#ffca57", 0.5, 1000);
            light2.position.set( 0, 10, -30 );
            light2.castShadow=true
            light2.shadow.mapSize.width = 4096;
            light2.shadow.mapSize.height = 4096;
            scene.add(light2);
            
            const geometry31 = new THREE.BoxGeometry(2,10,2)
            const material31 = new THREE.MeshStandardMaterial({
                color: "#ffca57",
            })
            const pan2 = new THREE.Mesh(geometry31, material31)
            pan2.castShadow=true
            pan2.receiveShadow=true
            pan2.position.set( 0, 5, -30 );
            scene.add(pan2)
            
            const geometry3 = new THREE.BoxGeometry(2,2,2)
            const material3 = new THREE.MeshStandardMaterial({
                color: "#ffca57",
                emissive: "#ffca57",
            });
            const bulb2 = new THREE.Mesh(geometry3, material3)
            bulb2.position.set( 0, 10, -30 );
            scene.add(bulb2)
            
            
            
            
            
            window.addEventListener('resize', onWindowResize, false)
            function onWindowResize() {
                camera.aspect = window.innerWidth / window.innerHeight
                camera.updateProjectionMatrix()
                renderer.setSize(window.innerWidth, window.innerHeight)
                render()
            }
            
            
            function animate() {
                requestAnimationFrame(animate)
                controls.update()
                render()
            }
            
            function render() {
                renderer.render(scene, camera)
            }
            
            animate()