const fs = require('fs')
const express = require('express');
const morgan = require('morgan');

const app = express();


// MIDDLEWARE

app.use(morgan("combined"));

app.use(express.json());
app.use((req,  res ,  next) =>{
        console.log("Hello from the middleware");
        next();
});

app.use((req,  res ,  next) => {
    req.requestTime =  new Date().toISOString();
    // Adding the current time to the request body
    next();
});
// creating a custom middleware function



const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json` ));

// ROUTE HANDLERS

// Get all Tours
const getAllTours = (req, res)=>{
    console.log(req.requestTime);
    res.status(200).json({
    status: 'sucess',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
        tours
    }
});
};

// Get Tour by Id
const getTourById = (req, res)=>{
    // console.log(req.params)
    const id = req.params.id * 1;
    // converting params type string to number
    const tour = tours.find(el => el.id === id);

     if(!tour){
        return res.status(404).json({
            status:'fail',
            message: 'Invalid Id'
        })
     };
  
    res.status(200).json({     
        status: 'sucess',  
        data: {
            tour
        }
    });
}

// Create New Tour
const createNewTour =   (req, res)=>{
    const newId = tours[tours.length -1].id  + 1;
    const newTour = Object.assign({id: newId}, req.body);
 
    tours.push(newTour);
 
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours, null, 2), err=>{
         res.status(201).json({
             status: 'sucess',
             data: {
                 newTour
             }
         });
    });
 }

 // Update Tour details
 const updateTour =  (req, res)=> {
    if(req.params.id * 1  >  tours.length){
        return res.status(404).json({
            status:'fail',
            message: 'Invalid Id'
        })
     };
    res.status(200).json({   
            status: 'sucess',
            data: {
                tour:  '<Updated Tour here>'         
            }
        });
    }   

// Delete Tour 
const deleteTour =   (req, res)=> {
    if(req.params.id * 1  >  tours.length){
        return res.status(404).json({
            status:'fail',
            message: 'Invalid Id'
        })
        };
    res.status(204).json({   
            status: 'sucess',
            data:  null
    });   
}

//  Get All Users
const getAllUsers =   (req, res)=> {
    return res.status(500).json({
        status:'error',
        message: 'This route is under development'
    })
    };

    //  Create a User
const createUser =   (req, res)=> {
    return res.status(500).json({
        status:'error',
        message: 'This route is under development'
    })
    };

     //  Get a User
const getUser =   (req, res)=> {
    return res.status(500).json({
        status:'error',
        message: 'This route is under development'
    })
    };   

     //  Update  User's details
     const updateUser =   (req, res)=> {
        return res.status(500).json({
            status:'error',
            message: 'This route is under development'
        })
        };      
        
    //  Delete User
    const deleteUser =   (req, res)=> {
    return res.status(500).json({
        status:'error',
        message: 'This route is under development'
    })
    };       

// ROUTES

app
    .route('/api/v1/tours')
    .get(getAllTours)
    .post(createNewTour);

app
    .route('/api/v1/tours/:id')
    .get(getTourById)
    .patch(updateTour)
    .delete(deleteTour);

 app
    .route('/api/v1/users')
    .get(getAllUsers)
    .post(createUser);

app
    .route('/api/v1/users/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);


    // Start Server
const port = 3000;
app.listen( port, ( )=> {
    console.log(`App running on port ${port}....`);
});