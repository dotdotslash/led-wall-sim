import * as THREE from 'three';
import GUI from 'lil-gui';

let cube_count;
let video, texture, material, mesh;

/// 
const controls = { caemreaZ: 700, number2: 50 }


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
const boxMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( boxGeometry, boxMaterial );
//scene.add( cube );

const cGeometry = new THREE.CircleGeometry( 2, 8 ); 
const cMaterial = new THREE.MeshBasicMaterial( { color: 0xfff000 } ); 
const circle = new THREE.Mesh( cGeometry, cMaterial ); 
//scene.add( circle );


texture = new THREE.TextureLoader().load( "rainbow.png" );
//texture.wrapS = THREE.RepeatWrapping;
//texture.wrapT = THREE.RepeatWrapping;
//texture.repeat.set( 4, 4 );


let meshes = [], materials = [];
const xgrid = 100, ygrid = 100;
//384 x 216

const pixelSize = 1;
const pixelPitch = 2;


const ux = 1 / xgrid;
const uy = 1 / ygrid;

const xsize = (pixelSize * 2) + pixelPitch;
const ysize = (pixelSize * 2) + pixelPitch;

const parameters = { color: 0xffffff, map: texture };


const PixelGeo = new THREE.CircleGeometry( 0.1, 32 ); 
const PixelMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } ); 
const pCircle = new THREE.Mesh( PixelGeo, PixelMaterial ); 
scene.add( pCircle );

cube_count = 0;

let ox, oy;

function change_uvs( geometry, unitx, unity, offsetx, offsety ) {

    const uvs = geometry.attributes.uv.array;

    for ( let i = 0; i < uvs.length; i += 2 ) {

        uvs[ i ] = ( uvs[ i ] + offsetx ) * unitx;
        uvs[ i + 1 ] = ( uvs[ i + 1 ] + offsety ) * unity;

    }

}


for (let i = 0; i < xgrid; i ++ ) {
    for (let j = 0; j < ygrid; j ++ ) {
        ox = i;
        oy = j;

        // 0.001 * ( 0.5 - Math.random() )
        let foo =  1 - Math.random() ;
        //const newColor = new THREE.Color( 1 - Math.random(), 1 - Math.random(), (1 - Math.random()) );

        // const color5 = new THREE.Color( 'skyblue' );

        const pixGeo = new THREE.CircleGeometry( pixelSize, 32 ); // new THREE.BoxGeometry( xsize, ysize, xsize ); // 
        const pixMat = new THREE.MeshBasicMaterial( parameters );  // new THREE.MeshBasicMaterial( { color: newColor } ); 

       //  materials[ cube_count ] = new THREE.MeshLambertMaterial( parameters );
       // materials[ cube_count ] = new THREE.MeshBasicMaterial( { color: 0xff00ff } ); 

       /// material = materials[ cube_count ];

       change_uvs( pixGeo, ux, uy, ox, oy );


        mesh = new THREE.Mesh( pixGeo, pixMat );

        mesh.position.x = (i - xgrid / 2) * xsize;
        mesh.position.y = ( j - ygrid / 2 ) * ysize;
        mesh.position.z = 0;
        mesh.scale.x = mesh.scale.y = mesh.scale.z = 1;
        
        scene.add( mesh );

        mesh.dx = 0.001 * ( 0.5 - Math.random() );
	    mesh.dy = 0.001 * ( 0.5 - Math.random() );

        meshes[ cube_count ] = mesh;

        cube_count += 1;
    }
}



// camera.position.z = 5;


const gui = new GUI();
gui.add( controls, 'caemreaZ', 1, 1000, 1  ); // min, max

camera.position.z = controls.caemreaZ;


function animate() {
	requestAnimationFrame( animate );
    camera.lookAt( scene.position );
    camera.position.z = controls.caemreaZ;
	renderer.render( scene, camera );
}

animate();