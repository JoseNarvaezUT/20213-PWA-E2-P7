class Camera {
    constructor(videoNode) {
        this.videoNode = videoNode;
        this.stream = null;
        this.photo = null;
        console.log('Cramos new Camera');
    }

    on() {
        if (navigator.mediaDevices) {
            return navigator.mediaDevices.getUserMedia({
                audio: false,
                video: { width: 300, height: 300 }
            }).then(stream => {
                this.videoNode.srcObject = stream;
                this.stream = stream;
                return true;
            }).catch(err => {
                alert(`Ocurrio un error al iniciar la cámara`);
                console.log(err);
                return false;
            });
        } else {
            alert(`No cuentas con algún dispositivo multimedia`);
            return false;
        }
    }

    off() {
        this.videoNode.pause();
        if (this.stream) {
            this.stream.getTracks().forEach(track => {
                track.stop();
            });
        }
    }

    takePhoto() {
        let canvas = document.createElement('canvas');
        canvas.setAttribute('width', 300);
        canvas.setAttribute('height', 300);
        let context = canvas.getContext('2d');
        context.drawImage(this.videoNode, 0, 0, canvas.width, canvas.height);
        this.photo = context.canvas.toDataURL();
        canvas = null;
        context = null;
        this.videoNode.removeAttribute('src'); // empty source
        this.videoNode.load();
        return this.photo;
    }
}