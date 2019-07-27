import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./Header";
import Container from "./Container";

const App = () => (
    <Router>
        <div>
            <Header />
            <Container />
        </div>
    </Router>
   );

export default App;