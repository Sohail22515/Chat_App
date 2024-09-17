// node server which will hander socketIo connection

//const io = require('socket.io')(8000);

const io = require('socket.io')(8000, {
    cors: {
        origin: "*",  // Allow all origins
        methods: ["GET", "POST"]
    }
});
const users = {};

io.on('connection', socket => {

    //console.log("A user connected:", socket.id); // Log connection

    socket.on('new-user-joined', name =>{ // new-user-joinde is just a name
        // console.log("new user connected", name);
        users[socket.id]=name;
        socket.broadcast.emit('user-joined' , name); //give message to everyone except the person joined
    });

    socket.on('send', message=>{ // send is just a name 
        socket.broadcast.emit('receive' ,{message:message , name: users[socket.id]}) // reciecve is just a name
    });
    
    socket.on('disconnect', () => {
        console.log("A user disconnected:", socket.id);
        socket.broadcast.emit('left', users[socket.id]); // Notify others the user has left
        delete users[socket.id]; // Remove user from users object
    });

    socket.on('error', (error) => {
        console.log("Socket error:", error);
    });

});

