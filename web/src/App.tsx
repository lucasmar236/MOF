import React from 'react';
import { Routes, Route } from "react-router-dom";
import {authProtected,publicRoutes} from "./router";
import VerifyAuth from "./router/routes";
import PublicLayout from "./interface/utils/layouts/publicLayout";

function App() {

  return (
      <div>
      <Routes>
        {publicRoutes.map((route,idex)=>(
                <Route
                path={route.path}
                element={
                    <PublicLayout>
                        {route.component}
                    </PublicLayout>
                }
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
      </div>
  );
}

export default App;
