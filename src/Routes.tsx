import React from 'react';
import { Routes, Route } from "react-router-dom";
import Programs from './containers/Programs';

const TalentBoxRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Programs />} />
        </Routes>
    )
};

export default TalentBoxRoutes;