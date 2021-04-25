const productosCtrl = {};
const Productos  = require('../models/productos')
// const MercadoPagoSchema  = require('../models/mercadopago')
const mercadopago = require ('mercadopago');

// API
productosCtrl.getProductos = async (req,res) =>{

const productos = await Productos.find();
res.json(productos);

};

productosCtrl.newProductos = async(req,res) => {
    const productos = new Productos({
       nombre: req.body.nombre,
       nombre2: req.body.nombre2,
       precio: req.body.precio,       
       precio2: req.body.precio2, 
       descripcion: req.body.descripcion,
       descripcion2: req.body.descripcion2,
       imagen: req.body.imagen,
       imagen2: req.body.imagen2,
       imagen3: req.body.imagen3,
       imagen4: req.body.imagen4,
       color1: req.body.color1,
       color2: req.body.color2,
       color3: req.body.color3,
       color4: req.body.color4,
       cantidad: req.body.cantidad,               
       categoria: req.body.categoria,
       paisCosto: req.body.paisCosto
    });
       await productos.save();
       res.json('Guardado');

};

 productosCtrl.getProducto = async(req,res) => { 
    const productos = await Productos.findById(req.params.id);
    res.json(productos);

};

productosCtrl.modificarProducto = async (req,res) => {
    const { id } = req.params;
    const producto = { nombre: req.body.nombre, 
                        nombre2: req.body.nombre2, 
                       precio: req.body.precio,
                       precio2: req.body.precio2,
                       descripcion: req.body.descripcion, 
                       descripcion2: req.body.descripcion2, 
                       imagen: req.body.imagen, 
                       imagen2: req.body.imagen2, 
                       imagen3: req.body.imagen3, 
                       imagen4: req.body.imagen4, 
                       color1: req.body.color1,
                       color2: req.body.color2,
                       color3: req.body.color3,
                       color4: req.body.color4,
                       cantidad: req.body.cantidad,
                       categoria: req.body.categoria,
                       paisCosto: req.body.paisCosto

    };
    
       await Productos.findByIdAndUpdate(id, {$set: producto}, {new: true});
       res.json('actualizado');

};

productosCtrl.deleteProducto = async (req,res) => {
    const { id } = req.params;
    await Productos.findByIdAndDelete(id);
    res.json("eliminado");
};

//Mercadopago

productosCtrl.nuevoPago = async (req,res) => {
    var { id } = req.params
     id = Number(id);
     mercadopago.configure({access_token: 'TEST-5952899216905685-020218-5db2793d7558989dbee92f29a816339a-205944115'});
   
  let preference = { 

    back_urls: {
        success: "https://www.jethrocaps.com/mercadopagofin/",
        failure: "https://www.jethrocaps.com/mercadopagofin/",
        pending: "https://www.jethrocaps.com/mercadopagofin/"
    },
    auto_return: "approved",
      
    items: [
        { title: 'Jethro Caps ',
          unit_price: (id),
          currency_id: 'ARS',
          quantity: 1,
          
        }
            ]

       
    
    };
  
    await mercadopago.preferences.create(preference)
    .then(function(res){  
    global.init_point = res.body.init_point;
    console.log(global.init_point)}).catch(function(error){console.log(error);});
    res.json({link: (global.init_point)}); 
};



productosCtrl.pagoResp = async (req,res) => {
        await  res.json(req.query);    
        console.log('loquellega',req.query)
        
        


};



module.exports = productosCtrl