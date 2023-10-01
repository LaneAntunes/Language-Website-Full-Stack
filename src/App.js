// import React, { useState, useEffect } from 'react';
import { Form, Link, Route, Routes } from "react-router-dom"
import Home from './Pages/Home';
import Grammar from './Pages/Grammar';
import Reading from './Pages/Reading';
import StudyTips from './Pages/StudyTips';
import Courses from './Pages/Courses';
import NotFound from './Pages/NotFound';
import './styles.scss';
import LandingPage from "./Pages/LandingPage";
import PlayQuizPage from "./Pages/PlayQuizPage";
import UsersProgress from "./Pages/UsersProgress";
import ProtectedRoutes from './Components/auth/ProtectedRoutes';
import LoadingSnipper from "./Components/Common/LoadingSnipper";

import { UserContext } from "./Components/Hooks/useUser";
import { BrowserRouter } from "react-router-dom"
import useUser, { UserProvider } from "./Components/Hooks/useUser"
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import ContactPage from "./Pages/ContactPage";
import ForgotPassword from "./Components/auth/ResetPassword/ForgotPassword";
import Layout from "./Components/MainPageComponents/Layout";
import DeleteAccount from "./Components/auth/DeleteAccount";


function ProviderWrappedApp() {
  return (
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  );
}
function App() {
  const userState = useUser();

  return (

    <div>
      {userState.isLoading ? (
        <LoadingSnipper />
      ) : (
        <>

          {/* <li><Link to={`/my-progress/${userState.userId}`}>Contact</Link></li> */}
          <Layout>
            <Routes>

              <Route path="/" element={<Home />} />
              <Route path="/grammar" element={<Grammar />} />
              <Route path="/quiz/:id" element={<PlayQuizPage userId={userState.userId} />} />
              <Route element={<ProtectedRoutes isSignedIn={userState.isSignedIn} />}>
                <Route element={<UsersProgress userId={userState.userId} />} path={`/my-progress/${userState.userId}`} />
                <Route path="/deleteAccount" element={<DeleteAccount />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Route>
              {/* <Route path="/contact" element={<ContactPage />} /> */}
              <Route path="reading" element={<Reading />} />
              <Route path="/cursodeingles" element={<LandingPage />} />
              <Route path="/studyTips" element={<StudyTips />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<RegisterPage />} />
              <Route path="*" element={<NotFound />} />


            </Routes>
          </Layout>
          {/* <Footer /> */}
        </>
      )}

    </div>

  );
}

export default ProviderWrappedApp;

