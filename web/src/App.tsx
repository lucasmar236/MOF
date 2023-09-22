import React from 'react';
import { Routes, Route } from "react-router-dom";
import {authProtected,publicRoutes} from "./router";
import VerifyAuth from "./router/routes";

function App() {

  return (
      <>
      <Routes>
        {publicRoutes.map((route,idex)=>(
            <Route
            path={route.path}
            element={route.component}
            key={idex}
            />
        ))}
          {authProtected.map((route,idex)=>(
              <Route
              path={route.path}
              element={
                  <VerifyAuth location="/">
                      {route.component}
                  </VerifyAuth>}
              key={idex}
              />
          ))}
      </Routes>
      </>
  );
}

export default App;
