const fs = require('fs')
const express = require('express');

const app = express();
app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json` ));

// Get all Tours
const getAllTours = (req, res)=>{
    res.status(200).json({
    status: 'sucess',
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

// Routes
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id',  getTourById);
// app.post('/api/v1/tours', createNewTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app
    .route('/api/v1/tours')
    .get(getAllTours)
    .post(createNewTour);

    app
    .route('/api/v1/tours/:id')
    .get(getTourById)
    .patch(updateTour)
    .delete(deleteTour);


const port = 3000;
app.listen( port, ( )=> {
    console.log(`App running on port ${port}....`);
});