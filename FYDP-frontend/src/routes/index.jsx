import React, { Suspense, lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

const App = lazy(() => import("../App"));
const Login = lazy(() => import("../pages/Auth/Login"));
const StudentDashboard = lazy(() => import("../pages/Student/StudentDashboard"));
const TeacherDashboard = lazy(() => import("../pages/Teacher/TeacherDashboard"));
const OrganizationalAdminDashboard = lazy(() => import("../pages/OrganizationalAdmin/OrganizationalAdminDashboard"));
const EventAdminDashboard = lazy(() => import("../pages/EventAdminDashboard"));
const Signup = lazy(() => import("../pages/Auth/SignUp"));
const AdminDashboard = lazy(() => import("../pages/AdminDashboard"));
const ParticipantDashboard = lazy(() => import("../pages/Participant/ParticipantDashboard"));
const Home = lazy(() => import("../pages/landing/Main"));

const withSuspense = (element) => (
    <Suspense fallback={<div className="page-loading">Loading...</div>}>
        {element}
    </Suspense>
);

const router = createBrowserRouter([
    {
        path: '/',
        element: withSuspense(<App/>),
        children: [
            { index: true, element: withSuspense(<Home />) },
            { path: "login", element: withSuspense(<Login/>) },
            { path: "forgot-password", element: <Navigate to="/login" replace /> },
            { path: "student", element: withSuspense(<StudentDashboard/>) },
            { path: "teacher", element: withSuspense(<TeacherDashboard/>) },
            { path: "admin", element: withSuspense(<AdminDashboard/>) },
            { path: "eventadmin", element: withSuspense(<EventAdminDashboard/>) },
            { path: "signup", element: withSuspense(<Signup/>) },
            { path: "orgadmin", element: withSuspense(<OrganizationalAdminDashboard/>) },
            { path: "participant", element: withSuspense(<ParticipantDashboard/>) },
            { path: "*", element: <Navigate to="/" replace /> },
            { path: "home", element: withSuspense(<Home />) },
        ]
    },
])

export default router