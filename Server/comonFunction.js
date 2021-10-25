const fs = require('fs');
const{GOODS_PATH, BASKET_GOODS_PATH} = require('./constanse');

const readItems = function(path){
    return new Promise((resolve,reject)=>{
        fs.readFile(path,'utf-8',(err,data)=>{
            if(err){
                reject(err);
            }
            resolve(JSON.parse(data));
        });
    })
};

const writeItems = function(path,items){
    return new Promise((resolve,reject)=>{
        fs.writeFile(path,JSON.stringify(items),(err)=>{
            if(err){
                reject(err);
            }
            resolve(items);
        
        })

    })

}


const addItems = (path, item) => {
    return new Promise((resolve, reject) => {
      readItems(path).then((items) => {
        const resultItems = [...items];
        resultItems.push(item);
        writeItems(path, resultItems).then((_resultItems) => {
          resolve(_resultItems)
        }).catch((err) => {
          reject(err);
        })
      })
    });
  }

  


  module.exports = {
    addItems
  }