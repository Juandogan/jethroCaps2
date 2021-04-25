const mongoose = require('mongoose');
const { Schema } = mongoose;



// modelo de datos PROMOS y CARTA
const ProductoSchema = new Schema({

    nombre:{type: String, required : false},
    nombre2:{type: String, required : false},
    descripcion:{type: String, required : false},
    descripcion2:{type: String, required : false},
    imagen:{type: String, required : false},
    imagen2:{type: String, required : false},
    imagen3:{type: String, required : false},
    imagen4:{type: String, required : false},
    precio:{type: String, required : false}, 
    precio2:{type: String, required : false},
    color1:{type: String, required: false},
    color2:{type: String, required:false},
    color3:{type: String, required:false},
    color4:{type: String, required:false},
    cantidad:{type: Number, required:false},
    paisCosto:{type: Number, required:false},
    categoria:{type: String, required:false},
    

  //mercadoPago
    title:{type: String, required: false},
    unit_price:{type: Number, required: false}, 
    quantity:{type: Number, required: false} 


  //pedidosAdm
  
  

});


module.exports = mongoose.model('ProductoSchema', ProductoSchema); 
