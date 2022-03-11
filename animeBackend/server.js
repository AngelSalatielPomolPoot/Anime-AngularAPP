

//requiere de las dependencias en variables/constantes
const express=require('express');
const bodyParser=require('body-parser');
const mysql =require('mysql');
const ipHandler=require('ip');
const jwt =require("jsonwebtoken");
const config=require('./configs/config');
const crypto= require('crypto');
const cors = require('cors');
const nodemailer = require('nodemailer');

const port=3000;

//creamos la instancia en express
var app=express();

const protectedRoute = express.Router();

app.use(cors());
//habilitamos el parseo de URL
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('secret_key',config.CLAVE_SECRETA);

//-------------------------------------------------
//configuracion de las conexiones
var dbConn=mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'',
    database:'anime_db'
});

//Conectar a BD    
dbConn.connect();

//default route
app.get('/',function(req,res){
    return res.send('Running node!');
});


//variable para la creacion del route
const router=express.Router();

 



//----------------------------------------------------------------------------------------------
//ejemplo Routing 

app.use(function(req,res,next){
    var sIPCliente=ipHandler.address();
    var sSqlInsert="INSERT INTO bitacora(cip,cevento,cobservacion,dtcreacion) VALUES(?,?,?,CURRENT_TIMESTAMP)";
    
    console.log('IP cliente=>'+sIPCliente);
    console.log('Time:',Date.now());

    var aDatosInsert =[sIPCliente,'Acceso cliente desde web','Registro evento'];

    try{
        //Invocar petticion a la base para guardar un valor, usamos transacciones para la peticion de datos
        dbConn.beginTransaction(function(errTran){
            if(errTran){throw errTran;}
            dbConn.query(sSqlInsert,aDatosInsert,function (error,results,fields){
                if(error){
                    dbConn.rollback(function(){throw error;});
                }
                dbConn.commit(function(){});
                next();
            });//fin:dbDesarrollo.query
        });//Fin:beginTran
    }catch(exc){
        console.log(exc);
        res.send("Ocurrio un error el el procesamiento de la informacion");
    }

})//fin:use

//-----------------------------------------------------------------
//Registrar Usuario
app.post("/api/seguridad/registrar/usuario",(req,res)=>{
    var fullName = req.body.nombreUsuario;
    var correo =req.body.correo;
    var password =req.body.contrasenia;

    var sQuerySelect="select iid,correo,cpassword from usuario where lactivo = 1";
    var Sha1pass="";
    var sQueryInsert='INSERT INTO usuario(nombreCompleto, correo, cpassword)';
        sQueryInsert+="VALUES(?,?,?)";
    
    var tokenData={ };
    var dtExpireToken=0;

    res.setHeader('Content-Type','application/json');

    if((fullName != null && fullName!= undefined)&&(correo != null && correo!= undefined) && (password !=null && password !=undefined)){
        sQuerySelect +=" and correo = '" + correo +"'"; 


        dbConn.query( //////editar y adaptar
            sQuerySelect,
            function (error, results,fields){
                if(error){
                    throw error;
                }else{
                    Sha1pass= crypto.createHash('sha1').update(password).digest('hex');
                 
                    if(results.length<1){

                            let aDataInsert=[fullName,correo,Sha1pass];
                            dbConn.query(sQueryInsert,aDataInsert,(err,results,fields)=>{
                                if(err){
                                    throw err;
                                }
                                console.log('Correo Insertado:'+results.correo);
                            });

                            return res.status(201).send({
                                lError:false,
                                cError:"Exitoso",                           
                            });
                        
                    }else{
                        return res.status(200).send(
                            {
                                lError:true,
                                cError:"Usuario ya registrado",     
                            }
                        )
                    }//fin:else
                }//fin:else
            }
        );
    }else{
        return res.status(400).send(
            {
                lError:true,
                cError:"El parámetro [fullname], [usuario] y [password] son obligatorios",    
            }
        )
    }//fin:else

});


//---------------------------------------------------------------
//generacion del Token JWT
app.post("/api/seguridad/tokenjwt",(req,res)=>{
    var correo =req.body.correo;
    var password =req.body.contrasenia;

    var sQuerySelect="select iid,nombreCompleto,correo,cpassword from usuario where lactivo = 1";
    var Sha1pass="";
    var sQueryInsert='INSERT INTO tokens_jwt(ctoken,iid_usuario,correo,dtfecha_expira,lactivo)';
        sQueryInsert+="VALUES(?,?,?,?,?)";
    
    var tokenData={ };
    var dtExpireToken=0;

    res.setHeader('Content-Type','application/json');

    if((correo != null && correo!= undefined) && (password !=null && password !=undefined)){
        sQuerySelect +=" and correo = '" + correo +"'"; 
        
        dbConn.query(
            sQuerySelect,
            function (error, results,fields){
                if(error){
                    throw error;
                }else{
                    Sha1pass= crypto.createHash('sha1').update(password).digest('hex');
                 
                    if(results.length>0){
                        if(Sha1pass==results[0].cpassword){
                            tokenData={
                                nombreCompleto:results[0].nombreCompleto,
                                usuario:results[0].correo
                            }
                            

                            let dtExpire=new Date();
                            dtExpire.setSeconds(dtExpire.getSeconds()+config.EXPIRE_TOKEN);
                            //console.log(dtExpire);
                            dtExpireToken=config.EXPIRE_TOKEN;
                            var token=jwt.sign(tokenData,config.CLAVE_SECRETA,
                                {
                                    expiresIn:dtExpireToken
                                }
                            );

                            let aDataInsert=[token,results[0].iid,results[0].correo,dtExpire,1];
                            dbConn.query(sQueryInsert,aDataInsert,(err,results,fields)=>{
                                if(err){
                                    throw err;
                                }
                                console.log('Insert id:'+results.insertId);
                            });

                            return res.status(201).send({
                                lError:false,
                                cError:"",
                                cToken:token,
                                iExpireIn:  dtExpireToken                              
                            });
                        }else{
                            return res.status(200).send(
                                {
                                    lError:true,
                                    cError:"El password es incorrecto",
                                    cToken:"",
                                    iExpireIn:  0     
                                }
                            );
                        }//fin:else
                    }else{
                        return res.status(200).send(
                            {
                                lError:true,
                                cError:"El usuario no se encuentra",
                                cToken:"",
                                iExpireIn:  0     
                            }
                        )
                    }//fin:else
                }//fin:else
            }
        );
    }else{
        return res.status(400).send(
            {
                lError:true,
                cError:"El parámetro [usuario] y [password] son obligatorios",
                cToken:"",
                iExpireIn:  0     
            }
        )
    }//fin:else
});//post()


app.get('/api/seguridad/tokenjwt',(req,res)=>{
    var sToken=req.headers['token'];

    res.setHeader('Content-Type','application/json');

    if(!sToken){
        return res.status(401).send(
            {
                lError:true,
                cError:"El token no fue enviado en la cabecera de la petición"
            }
        );
        
    }

    sToken=sToken.replace('Bearer','');

    try{
        jwt.verify(sToken,config.CLAVE_SECRETA,function(err,user){
            if(err){
                return res.status(401).send(
                    {
                        lError:true,
                        error:'El token ha caducado.'
                    }
                );
            }else{
                return res.status(200).send(
                    {
                        lError:false,
                        error:'El token aun esta vigente.'
                    }
                );
            }
        });
    }catch(ex){
        console.log(ex.messege);
    }
});

//--------------------------------------------------------------------
//creacion de middleware para procesar la peticiones antes de invocar los servicios
protectedRoute.use((req,res,next)=>{
    const sToken=req.headers['token'];

    if(sToken){
        jwt.verify(sToken,app.get('secret_key'),(err,decoded)=>{
            if(err){
                return res.json(
                    {
                        lError:true,
                        cError:"El token es invalido."
                    }
                );
            }else{
                req.decoded = decoded;
                next();
            }
        });      
    }else{
        res.status(400).send(
            {
                lError:true,
                cError:"El token no fue enviado en la cabecera de la petición."
            }
        );
    }

});

//--------------------------------------------------------------------
app.get('/api/bitacora',protectedRoute,(req,res)=>{
    var stQuery="SELECT cip,cevento,dtcreacion FROM anime_db.bitacora";

    dbConn.query(
        stQuery,function (error, results,fields){
            if(error) throw error;
            res.setHeader('Content-Type','application/json');
            return res.status(200).send(
                {
                    lError:false,
                    cError:"",
                    bitacora:results
                }
            );
        }
    );
});




//-------------------------------------------------------------------------------------
//Envio de Correo electronico
app.post('/formulario', (req, res) => {
    var formulario=req.body;
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        segure:false,
        auth: {
            user: 'ila.abbott@ethereal.email',
            pass: 'HCamh7q5AJf4THvdA4'
        }
    });

    const mailOptions = {
        from: `"Anime Angular👻" <info@animeAngular.email>`,
        to: `${formulario.email}`, // Cambia esta parte por el destinatario
        subject: formulario.asunto,
        html: `
            <h1>Mensaje de usuario desde Anime Angular</h1>
            <strong>Nombre:</strong> ${formulario.nombre} <br/>
            <strong>E-mail:</strong> ${formulario.email} <br/>
            <strong>Mensaje:</strong> ${formulario.mensaje}
        `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error){
            console.log(error);
            res.status(400).send(
                {
                    lError:true,
                    cError:"Error al enviar el correo"
                }
            );
        }
        else{
            console.log(info);
            res.status(200).send(
                {
                    lError:false,
                    cError:""
                }
            );
            
        }
    });
})


//iniciar el servidor

app.listen(port,function(){
    console.log('Node app is running on port 3000');
});
//-------------------------------------------------------------------------------------------
//module.exports=app;
