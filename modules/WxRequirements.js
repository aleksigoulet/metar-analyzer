class WxRequirements{
    constructor() {
        this.vis = document.getElementById('visValue').value;
        this.ceil = document.getElementById('ceilValue').value;
        this.snow = document.getElementById('snow').checked;
        this.rain = document.getElementById('rain').checked;
        this.fog = document.getElementById('fog').checked;
    }
}

export {WxRequirements};