// routes.js

import React from "react";
import {Routes, Route} from "react-router-dom";
import Response from "./pages/response"
import Home from "@/pages";
import {imageOptimizer} from "next/dist/server/image-optimizer";

const RouterCom = () => (
    <Routes>
        <Route exact path="/" element={Home}/>
        <Route exact path="/response" element={Response}/>
    </Routes>
);

export default RouterCom;