

const express =require("express");
const cors= require("cors");
const mysql=require("mysql");
const multer = require("multer");
const path = require("path");
const cookieParser=require("cookie-parser")
const jwt=require("jsonwebtoken");
const bodyParser = require('body-parser');
const qr = require('qr-image');

const app=express();


const allowedOrigins = [
  'https://carcare-garage.netlify.app',
  'http://localhost:3000'
];



app.use(cors(
  {
    origin: allowedOrigins,
        credentials:true,
    methods:["POST","GET","PUT","DELETE"],
  }
));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(bodyParser.json());


const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/images')
    },
        filename:(req,file,cb)=>{
            cb(null,file.fieldname +"_" +Date.now() + path.extname(file.originalname));
        }
})
const upload=multer({
    storage:storage
})


const db= mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"garage"
})

//login
const verifyUser=(req,res,next)=>{
  const token=req.cookies.token;
  if(!token){
    return res.json({Error:"you are no Authenticated"})
  }else{
    jwt.verify(token,"jwt-secret-key",(err,decoded)=>{
      if(err) return res.json({Error:"Token wrong"});
      const sql = "SELECT * FROM worker WHERE id = ?";
      const values = [decoded.id];

      db.query(sql, values, (err, data) => {
        if (err) return res.json({ Error: "Error in server" });

        if (data.length > 0) {
          req.user = data[0]; 
          next();
        } else {
          return res.json({ Error: "User not found" });
        }
      });
    })
  }
}


//check user Authentication
app.get('/Auth',verifyUser,(req,res)=>{

  const user = req.user; // Access the user information from the request object
  return res.json({ Status: "Success", user });
})

//login
app.post('/login',(req,res)=>{
  const sql="SELECT * FROM worker Where email=? AND password=?";
  const values=[
    req.body.email,
    req.body.password
  ]
  db.query(sql,values,(err,data)=>{
    if(err)return res.json({Status:"Error in server"});
    if(data.length>0){
      const role = data[0].role;
      const name = data[0].name;
      const id=data[0].id
      const token=jwt.sign({id},"jwt-secret-key" ,{expiresIn:"1h"})
      res.cookie('token',token);
      return res.json({Status:"Success",role,name})
    }else{
      return res.json({Status:"Wrong Email or Password",Error:"Wrong Email or Password"})
    }
    
  })
})

//logout

app.get('/logout',(req,res)=>{
  res.clearCookie('token') ;
  return res.json({Status:"Success"});
})




//worker


//worker
app.get("/getWorker",(req,res)=>{
const sql="SELECT * FROM worker";
db.query(sql,(err,data)=>{
    if(err) return res.json("Error");
    return res.json(data);
})
})

//get worker by id 
app.get('/getOneWorker/:id' ,(req,res)=>{
    const id=req.params.id;
    const sql="SELECT * FROM worker WHERE id=?";
    db.query(sql,[id],(err,data)=>{
    if(err) return res.json({Error: "Get one Worker error in sql"});
    return res.json({Status:"success", Result:data});
    })
})

//update worker
app.put('/updateWorker/:id', (req, res) => {
    const id = req.params.id;
    const {
        name,
        email,
        password,
        number,
       
      } = req.body;
    
      const sql = 'UPDATE worker SET name=?, email=?, password=?, number=? WHERE id=?';
      const values = [
       name,
       email,
       password,
       number,
        id
      ];
    db.query(sql, values, (err, data) => {
      if (err) {
        return res.json({ Error: 'Update cars error in SQL' });
      }
      return res.json({ updated: true });
    });
  });

//delete worker
app.delete('/deleteWorker/:id' ,(req,res)=>{
    const id=req.params.id;
    console.log(id)
    const sql="DELETE FROM worker WHERE id=?";
    db.query(sql,[id],(err,data)=>{
    if(err) return res.json({Error: "delete worker error in sql"});
    return res.json({Status:"success", Result:data});
    })
})

//addWorker
app.post("/addWorker",upload.single('image'),(req,res)=>{
  console.log(req.body)

//   if (!req.file) {
//     return res.status(400).json({ message: "No file uploaded" });
// }
    const sql= "INSERT INTO worker (`name`,`email`,`password`,`number`,`image`,`role`,`address`) VALUES (?)"
    const values=[
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.number,
        req.file.filename,
        req.body.role,
        req.body.address


    ]   
    console.log(req.file)
    db.query(sql,[values],(err,data)=>{
        if(err) return res.json("Error");
        return res.json(data);

    })
})


// carlist
app.get("/api/cars",(req,res)=>{
    const sql="SELECT * FROM cars ";
    db.query(sql,(err,data)=>{
        if(err) return res.json("Error");
        return res.json(data);
    })
    })


    // carDetail
    app.get("/api/cars/:id",(req,res)=>{
        const id=req.params.id;

        const query = "SELECT * FROM cars WHERE id = ?";
        db.query(query,[id],(err,data)=>{
            if(err) return res.json("Error");
            return res.json(data);
        })
        })
        
        app.get('/getOneCar/:id' ,(req,res)=>{
            const id=req.params.id;
            const sql="SELECT * FROM cars WHERE id=?";
            db.query(sql,[id],(err,data)=>{
            if(err) return res.json({Error: "Get one Car error in sql"});
            return res.json({Status:"success", Result:data});
            })
        })
        app.put('/updateCar/:id', (req, res) => {
            const id = req.params.id;
            const {
                car_name,
                car_model,
                car_number,
                client_name,
                client_email,
                client_number
              } = req.body;
            
              const sql = 'UPDATE cars SET car_name=?, car_model=?, car_number=?, client_name=?, client_email=?, client_number=? WHERE id=?';
              const values = [
                car_name,
                car_model,
                car_number,
                client_name,
                client_email,
                client_number,
                id
              ];
            db.query(sql, values, (err, data) => {
              if (err) {
                return res.json({ Error: 'Update cars error in SQL' });
              }
              return res.json({ updated: true });
            });
          });


//delete car
app.delete('/deleteCar/:id', (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM cars WHERE id = ?";
  db.query(sql, [id], (err, data) => {
    if (err) {
      return res.json({ Error: "Delete Car error in SQL" });
    }
    return res.json({ Status: "success", Result: data });
  });
});

        


        //get one car services
        app.get("/api/cars/:id/services",(req,res)=>{
            const id=req.params.id;
    
            const query = "SELECT * FROM services WHERE car_id = ?";
            db.query(query,[id],(err,data)=>{
                if(err) return res.json("Error");
                
                return res.json(data);
            })
            })



    

//to post data to car and service

  
  app.post("/Addcars", (req, res) => {
    // const id=req.body.id
    // console.log(id)
    

    const sql = 
    " INSERT INTO cars (car_name, car_model, car_number,client_name,client_email,client_number) VALUES (?)"
    const values = [
        req.body.selectedCar,
         req.body.carModel, 
         req.body.carNumber,
         req.body.clientName,
         req.body.clientEmail,
         req.body.clientNumber];

    console.log(req.body)

       db.query(sql,[values],(err,data)=>{
        if(err) return res.json("Error");
        return res.json(data);
       
    })
   
})
  //add service
    app.post("/api/cars/:id/Addservices", (req, res) => {

      const id = parseInt(req.params.id);
      console.log(req.body)
      console.log(id)
      const service_check = req.body.service_check.join(", "); // Convert array to string

      const sql = `INSERT INTO services (service_check,service_date, service_cost, service_invoice, car_id) VALUES(?,?,?,?,?)`;
        
      const values = [
        service_check,
          req.body.service_date,
          req.body.service_cost, 
          req.body.service_invoice,
          
            id];

            db.query(sql, values, (err, data) => {
              if (err) return res.json("Error");
              console.log(err)
              return res.json(data);
            })})
  


//WIDGET

app.get('/adminCount',(req,res)=>{
  const sql = `SELECT count(*) as admin FROM worker where role='admin' `
  db.query(sql,(err,data)=>{
    if(err) return res.json({Error:"Error in query"});
    return res.json(data);
  })
})

app.get('/WorkerCount',(req,res)=>{
  const sql = `SELECT count(*) as user FROM worker where role='user' `
  db.query(sql,(err,data)=>{
    if(err) return res.json({Error:"Error in query"});
    return res.json(data);
  })
})
app.get('/carCount',(req,res)=>{
  const sql = `SELECT count(*) as car FROM cars  `
  db.query(sql,(err,data)=>{
    if(err) return res.json({Error:"Error in query"});
    return res.json(data);
  })
})
app.get('/salary',(req,res)=>{
  const sql = `SELECT sum(service_cost) as cost FROM services  `
  db.query(sql,(err,data)=>{
    if(err) return res.json({Error:"Error in query"});
    return res.json(data);
  })
})

//to fill the spinner car name
app.get("/getCarName",(req,res)=>{
  const sql="SELECT * FROM carname";
  db.query(sql,(err,data)=>{
      if(err) return res.json("Error");
      return res.json(data);
  })
  })
  
//checkboxes
  app.get('/servicecheck', (req, res) => {
    const sql = 'SELECT * FROM servicescheck';
    db.query(sql,(err,data)=>{
      if(err) return res.json("Error");
      return res.json(data);
    });
  });

  //check if car chassis number is exist or not
  app.get('/CheckCarNumber/:carNumber', (req, res) => {
    const carNumber = req.params.carNumber;
    const query = `SELECT COUNT(*) AS count FROM cars WHERE car_number = '${carNumber}'`;
    
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('An error occurred while checking the car number');
      } else {
        const count = result[0].count;
        const exists = count > 0;
        res.json({ exists });
      }
    });
  });
  
//retrieve the sum of service 

  app.get('/service-cost', (req, res) => {
    const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const todayDateString = `${year}-${month}-${day}`;

  db.query(`SELECT SUM(service_cost) AS total_sales FROM services WHERE service_date = '${todayDateString}'`, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const totalSales = results[0].total_sales;
      res.json({ totalSales });
    }
  });
});


app.get('/totalSalary/:year', (req, res) => {
  const year = req.params.year;

  db.query(`SELECT MONTH(service_date) AS month, SUM(service_cost) AS totalSales FROM services WHERE YEAR(service_date) = ${year} GROUP BY MONTH(service_date)`, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});




  app.get('/dashTable', (req, res) => {
    const sql = "SELECT * FROM cars JOIN services ON cars.id = services.car_id ORDER BY services.service_date DESC";
    db.query(sql, (err, data) => {
      if (err) {
        console.error(err);
        return res.json({ status: "Error fetching data from database" });
      }
      return res.json(data);
    });
  });


  


  



app.listen(8081,()=>{
    console.log("listening");
 
 
})