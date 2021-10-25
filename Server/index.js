const cors = require('cors'),
      express = require('express'),
      { addItems } = require('./comonFunction'),
      { BASKET_GOODS_PATH } = require('./constanse'),
      app = express();
    

       app.use(express.json());
      app.use(cors());
      app.use(express.static('./static/'));

      app.patch('/api', (res, req) => {
        addItems(BASKET_GOODS_PATH, res.body).then((items) => {
          req.setHeader('Content-type', 'application/json')
          req.send(items)
        })
      });

      app.listen('8000',()=>{
          console.log('Server is run!');
      });


      


      