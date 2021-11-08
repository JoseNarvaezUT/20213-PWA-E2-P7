let player = $('#player');
let photoUser = $('#photoUser');

let btnCamera = $('#btnCamera');
let btnTakePhoto = $('#btnTakePhoto');

const camera = new Camera($('#player')[0]);
let photoBase64 ='';


let contextSW = '20213-PWA-E2-P7/sw.js'
let url = window.location.href;
if(navigator.serviceWorker){
    if(url.includes('localhost')){
        contextSW = '/sw.js';
    }
    navigator.serviceWorker.register(contextSW);
}

btnCamera.on('click',function(){
    camera.on()
    .then(resOn =>{
        console.log(resOn)
        if(!resOn){
            alert(`Error al iniciar la cámara`);
        }
    })
    .catch(err=>{
        console.log(err);
    });
});

btnTakePhoto.on('click',function(){
    camera.off();
    photoBase64 = camera.takePhoto();
    photoUser.attr('src',photoBase64);
});