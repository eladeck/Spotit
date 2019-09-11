import React from "react"
import ReactDOM from "react-dom"

import App from "./components/App"

ReactDOM.render(<App />, document.getElementById("root"))

    // WARNING !!!! code to insert field or remove field from all records in a collection!
    // app.locals.imgCollection.updateMany({},
    //     {$set : {"likes":[]}},
    //     {upsert:false,
    //     multi:true})

    // app.locals.usersCollection.updateMany({},
    //     {$set : {"score":0}},
    //     {upsert:false,
    //     multi:true})

    // app.locals.imgCollection.updateMany({},
    //     {$unset : {"likes":1}},
    //     {upsert:false,
    //     multi:true})