const socket = io("http://localhost:8000");


const form = document.getElementById('send-container');
const messageInput =document.getElementById('messageInp');
const messageContainer =document.querySelector(".container");
var notification = new Audio('/resources/notification.wav');
var join = new Audio('/resources/Join.wav');

const append = (message, position)=>{
    const messageElement =document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position =='left'){
        notification.play();
    }
    messageContainer.scrollTop = messageContainer.scrollHeight; // Scroll to the bottom every time a message is added
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    if(message!=''){ // NO empty messages will be send
        append(`You: ${message}`, 'right');
        socket.emit('send', message);
        messageInput.value="";
    }
})

window.onload = function () {
    const name = prompt("Enter your name to join"); // Only executed on page load
    if (name) {
        // console.log(name);
        socket.emit('new-user-joined', name);
    }
};

// const name = prompt("Enter your name to join");
// if (name != null) {
//     console.log("Emitting new-user-joined");
//     socket.emit('new-user-joined', name);
// }

// const  name= prompt("Enter your name to join");
// socket.emit('new-user-joined', [name] );

// function myFunction(){
//     const newUser = prompt("Enter your name to join","sohail");
//     socket.emit('new-user-joined', newUser);
// }

socket.on('user-joined', name =>{
    append(`${name} connected`, 'right');
    join.play();
    //messageContainer.scrollTop = messageContainer.scrollHeight; // Scroll to the bottom every time a message is added
})

socket.on('receive' , data =>{
    append(`${data.name}: ${data.message}`, 'left')
    
    //messageContainer.scrollTop = messageContainer.scrollHeight; // Scroll to the bottom every time a message is added
})

socket.on('left', name => {
    append(`${name} left the chat`, 'left');
});


