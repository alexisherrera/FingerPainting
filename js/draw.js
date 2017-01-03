
window.onload = function () {
    
    var video = document.getElementById('video');
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    var drawSegments = [
                []
            ];

    var segment = 0;
    var canvas = document.getElementById('canvas');
    var downloadEl = document.getElementById('downloadImage');
    downloadEl.addEventListener('click', download, false);

    function download() {
        var dt = canvas.toDataURL();
        this.href = dt;
        console.log("here");
    }

    var tracker = new tracking.ColorTracker(['magenta', 'cyan']);

    tracking.track('#video', tracker, {
        camera: true
    });

    tracker.on('track', function (event) {
        if (event.data.length === 0 && drawSegments[segment].length > 0) {
            segment++;

            if (!drawSegments[segment]) {
                drawSegments[segment] = [];
            }
        }

        event.data.forEach(function (rect) {
            if (rect.color === 'magenta') {
                draw(rect);
            } else if (rect.color === 'cyan') {
                erase(rect);
            }
        });

    });

    function draw(rect) {
        drawSegments[segment].push(rect.x + rect.width / 2, rect.y + rect.height / 2);
    }

    function erase(rect) {
        context.clearRect(rect.x, rect.y, rect.width, rect.height);
    }

    (function loop() {
        for (var i = 0, len = drawSegments.length; i < len; i++) {
            var activeColor = $('input[name=color_options]:checked', '#buuuuts').val()
            drawSpline(context, drawSegments[i], 0.5, false, activeColor);
        }

        drawSegments = [drawSegments[drawSegments.length - 1]];
        segment = 0;

        requestAnimationFrame(loop);
    }());
};