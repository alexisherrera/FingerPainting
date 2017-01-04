tracking.ColorTracker.registerColor('green', function (r, g, b) {
    if (r < 50 && g > 200 && b < 50) {
        return true;
    }
    return false;

});
tracking.ColorTracker.registerColor('blue', function (r, g, b) {
    if (r < 50 && g < 50 && b > 200) {
        return true;
    }
    return false;

});