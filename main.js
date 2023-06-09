const canvas = new fabric.Canvas('canvas');

document.getElementById('image-upload').addEventListener('change', function (e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        const imgObj = new Image();
        imgObj.onload = function () {
            const image = new fabric.Image(imgObj);
            canvas.setDimensions({ width: this.width, height: this.height });
            canvas.setBackgroundImage(image, canvas.renderAll.bind(canvas));
        };
        imgObj.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

canvas.on('mouse:up', function () {
    const objects = canvas.getObjects();
    let errors = 0;

    for (let i = 0; i < objects.length; i++) {
        const obj = objects[i];

        // Aquí puedes agregar tus condiciones para detectar errores en el plano
        // Por ejemplo, podrías verificar la posición de ciertos objetos o la presencia de ciertos elementos

        if (obj.left > 500 || obj.top > 500) {
            obj.set('fill', 'red');
            errors++;
        } else {
            obj.set('fill', 'green');
        }
    }

    if (errors === 0) {
        alert('No se encontraron errores en el plano.');
    } else {
        alert('Se encontraron ' + errors + ' errores en el plano.');
    }

    canvas.renderAll();
});