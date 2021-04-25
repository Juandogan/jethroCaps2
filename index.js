
const express = require ('express'); 
const app = express(); // API
const morgan = require ('morgan'); // middleware Morgan muestra las peticiones en consola. 
const cors = require ('cors');     // autorizacion de cxn entre servidores
const path = require ('path')
const bodyParser = require ('body-parser');
const multipart = require ('connect-multiparty');
var geoip = require('geoip-lite');
//https
const fs = require('fs');
const https = require('https');



const { mongoose } = require('./database'); //mongodb

const configMensaje = require('./configMensaje');



const multiPartMiddleware = multipart({
    uploadDir: './subidas'

});

//var body_parser = require('body-parser');
// CREATE SERVER socket.IO
const serverSocketIo = express(); 
const serverHttp = require('http').Server(serverSocketIo);
const io = require('socket.io')(serverHttp);
serverHttp.listen(3001, () =>{
console.log('***** SocketIO port: 3001')
        
    })
         
    
// CONFIG SOCKET.IO     
const ordenSocketIo=[]; //  recibe data desde comunicacion.serivce.ts (funciones emit(), liten()) son llamadas x productos.component funcion: formEdit()                                                    
const ordenStateMongo=[];
       
io.on('connection', function(socket){    // abre cnx no recibe data
        socket.on('send-cxn', function(data){  //Llega pedido desde            
        socket.emit('text-event',ordenSocketIo)     
        socket.broadcast.emit('text-event',ordenSocketIo)
   })  
         
        socket.on('send-message', function(data){
        ordenSocketIo.push(data);
        socket.emit('text-event',ordenSocketIo)
        socket.broadcast.emit('text-event',ordenSocketIo)
    })
     
    socket.on('send-messageEstado', function(index,estado){
        ordenSocketIo.reverse()
            for(var x = 0 ; x < ordenSocketIo.length;  x++ ) {
              
            ordenSocketIo[index].estado = estado
            
        }
        ordenSocketIo.reverse()
        socket.emit('text-event',ordenSocketIo)
        socket.broadcast.emit('text-event',ordenSocketIo)
    })
   
            
})      
  

    
// CREATE API

app.set('port', process.env.PORT || 3000);  // tomo app e nsu propiedad .set  // paso "port" y process.env.PORT (escucha puerto por defecto)
// sino usa el 3000

// Midlewares
app.use(morgan('dev')); // morgan es una funcion, la pegamos en la propiedad use de app. y pasamos el parametro dev que indica que mostrara el mensaje por consola de desarrollo. 
app.use(express.json()); // habilita para que el servidor entienda formato json, es una propiedad de la dependencia Express.npom
app.use(cors('https://66.97.34.215:4200'));
//app.use(body_parser.urlencoded({extended:true}));
//app.use(cors({origin:'http://localhost:4200'}));
//app.use(cors({origin:'http://167.99.0.153:4200'}));
app.use(bodyParser.urlencoded({
    extended : true
}));

app.post('/upload', multiPartMiddleware, (req,res)=>{
    res.json(req.files['archivos'].path    

    );
    console.log(req.files['archivos'].path )    
    
});

//mail
app.post('/mail', (req, res) => {
    configMensaje(req.body);
    res.status(200).send();
   })

//mail


// Routes http://
app.use('/', express.static('client', {redirect:false}))
app.use('/upload', express.static(path.resolve('./subidas')));
app.use('/productos',require('./routes/productos.routes'));

app.use('/mercadopago', require('./routes/mercadopago.routes'));
app.use('/modulocompras/mediosdepago',require('./routes/mercadopago.routes'));
app.use('/pais', require('./routes/pais.routes'));

app.get('*', function(req, res, next){res.sendFile(path.resolve('client/index.html'));}) 






// Starting server  

const PUERTO = 3000 ;

// Starting server  
https.createServer({
    cert: fs.readFileSync('jethrocaps.com.crt'),
    key: fs.readFileSync('jethrocaps.com.key')
  },app).listen(PUERTO, function(){
     console.log('Servidor https corrindo e');
 });

//app.listen(app.get('port'), () => {console.log("Puerto escuchando en puerto: ", app.get('port'))});    
       

             