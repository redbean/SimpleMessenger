const sseSrc = new EventSource("http://192.168.10.131:8486/ticker");

sseSrc.onmessage = function (event) {
    const dataElement = document.getElementById("data");
    const { ticker } = JSON.parse(event.data);
    dataElement.textContent = ticker;
}