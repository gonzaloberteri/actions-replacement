window.onload = function () {
  var socket = io();

  socket.on('connection', (socket) => {
    console.log("Connected!");
  });


  socket.on('buildOutput', (hi) => {
    const container = document.getElementById('container');
    const newText =  document.createElement('li');
    newText.innerText = hi;
    newText.className += " text";
    container.appendChild(newText);

    window.scroll({
      top: document.body.scrollHeight,
      behavior: 'smooth' 
    });
  })
  socket.emit("triggerBuild", { hi: "hey" });

};
