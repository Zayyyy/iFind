/**
 * Created by zayy on 2016/9/5.
 */
var container;
var camera, scene, renderer;
var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;


function init() {
    container = document.createElement( 'div' );
    $("#view-container").append( container );
    container.className="container-3D";
    camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 1, 4000 );
    //视野角：fov 纵横比：aspect 相机离视体积最近的距离：near 相机离视体积最远的距离：far
    camera.position.z = 100;

    // scene
    scene = new THREE.Scene();

    var ambient = new THREE.AmbientLight( 0xCCCCCC );
    scene.add( ambient );

    var directionalLightx = new THREE.DirectionalLight( 0xEECBAD,0.2 );
    directionalLightx.position.set( 1, 0, 0 );
    scene.add( directionalLightx );
    var directionalLightx1 = new THREE.DirectionalLight( 0xEECBAD,0.2 );
    directionalLightx1.position.set( -1, 0, 0 );
    scene.add( directionalLightx1 );
    var directionalLighty = new THREE.DirectionalLight( 0xEECBAD,0.5 );
    directionalLighty.position.set( 0, 1, 0 );
    scene.add( directionalLighty );
    var directionalLighty1 = new THREE.DirectionalLight( 0xEECBAD,0.5 );
    directionalLighty1.position.set( 0, -1, 0 );
    scene.add( directionalLighty1 );
    var directionalLightz = new THREE.DirectionalLight( 0xEECBAD,0.2 );
    directionalLightz.position.set( 0, 0, 1 );
    scene.add( directionalLightz );
    var directionalLightz1 = new THREE.DirectionalLight( 0xEECBAD,0.2 );
    directionalLightz1.position.set( 0, 0, -1 );
    scene.add( directionalLightz1 );

    // texture

    var manager = new THREE.LoadingManager();
    manager.onProgress = function ( item, loaded, total ) {
        console.log( item, loaded, total );

    };

    var texture = new THREE.Texture();

    var onProgress = function ( xhr ) {
        if ( xhr.lengthComputable ) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round(percentComplete, 2) + '% downloaded' );
        }
    };

    var onError = function ( xhr ) {
    };


    // model

    var loader = new THREE.OBJLoader( manager );
    loader.load( 'images/005.obj', function ( object ) {
        object.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
                child.material = new THREE.MeshLambertMaterial({
                    color: 0x8B1A1A,
                    side: THREE.DoubleSide
                });
               // child.material.map = texture;

            }

        } );
        object.scale.x = 4;object.scale.y =  4;object.scale.z = 4;
        object.updateMatrix();
        object.position.y = 1;
        scene.add( object );

    }, onProgress, onError );

    //
    var width = container.clientWidth;
    var height = container.clientHeight;
    renderer = new THREE.WebGLRenderer({
        // antialias:true,       //是否开启反锯齿
        // precision:"highp",    //着色精度选择
        alpha:true           //是否可以设置背景色透明
        // premultipliedAlpha:false,
        //stencil:false,
        //preserveDrawingBuffer:true, //是否保存绘图缓冲
        // maxLights:1           //maxLights:最大灯光数
    });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( width, height );
    renderer.setClearColor(0xFFFfff, 1);
    container.appendChild( renderer.domElement );

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    window.addEventListener( 'resize', onWindowResize(width,height), false );

    //鼠标旋转
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render);
    //旋转的中心点
    controls.target.set(0, 0, 0);
    controls.update();

}

function onWindowResize(width,height) {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( width, height );

}

function onDocumentMouseMove( event ) {

    mouseX = ( event.clientX - windowHalfX ) / 2;
    mouseY = ( event.clientY - windowHalfY ) / 2;

}

//

function animate() {
    requestAnimationFrame( animate );
    render();
}

function render() {
/*
    camera.position.x += ( mouseX - camera.position.x ) * .5;
    camera.position.y += ( - mouseY - camera.position.y ) * .5;

    camera.lookAt( scene.position );*/

    renderer.render( scene, camera );

}


