import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router";
import { Toaster } from "react-hot-toast";

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SigninPage from './pages/SigninPage';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ManageStudents from './components/admin/ManageStudents';
import AddStudent from './components/admin/AddStudent';
import UpdateStudent from './components/admin/UpdateStudent';
import AddTeacher from './components/admin/AddTeacher';
import ManageTeachers from './components/admin/ManageTeacher';
import UpdateTeacher from './components/admin/UpdateTeacher';



import TeacherDashboard from './pages/TeacherDashboard';
import Attendance from './components/teacher/Attendance';
import Assignment from './components/teacher/Assignment';
import Marks from './components/teacher/Marks';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />
    },
    {
      path: "/signin",
      element: <SigninPage />
    },
    {
      path: "/login",
      element: <LoginPage />
    },

    
    {
      path: "/admin_dashboard",
      element: <AdminDashboard />
    },
    {
      path: "/admin/students",
      element: <ManageStudents />
    },
    {
      path: "/admin/students/add",
      element: <AddStudent />
    }, 
    {
      path: "/admin/students/:id",
      element: <UpdateStudent />
    },
    {
      path: "/admin/teachers",
      element: <ManageTeachers />
    },
    {
      path: "/admin/teachers/add",
      element: <AddTeacher />
    },
    {
      path: "/admin/teachers/:id",
      element: <UpdateTeacher />
    },



    {
      path: "/teacher_dashboard",
      element: <TeacherDashboard />
    },
    {
      path: "/teacher/attendance",
      element: <Attendance />
    },
    {
      path: "/teacher/assignment",
      element: <Assignment />
    },
    {
      path: "/teacher/marks",
      element: <Marks />
    },





    
    {
      path: "/student_dashboard",
      element: <StudentDashboard />
    },
    
  ]);

  return (
    <>
      <RouterProvider router={router}/>
      <Toaster />
    </>
  )
}

export default App
