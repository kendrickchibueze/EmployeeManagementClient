import React, { useState, useEffect} from 'react'
import EmployeeService from "../services/EmployeeService";
import {Link, useNavigate, useParams} from "react-router-dom";

const AddEmployeeComponent = () => {
    const [firstName, setFirstName]  = useState(" ");
    const [lastName, setLastName]  =  useState("");
    const [email,setEmail]  = useState("");
    const navigate = useNavigate();
    const {id} = useParams()

    const employeeData =  {firstName, lastName, email}


    function saveEmployee(e){
        e.preventDefault()
        if(id){
            EmployeeService.updateEmployee(id, employeeData)
                .then(res=>navigate("/employee"))
                .catch(e=>console.log(e))

        }else{

            if(employeeData.firstName !=="" && employeeData.lastName !=="" && employeeData.email!==""){
                EmployeeService.saveEmployee(employeeData)
                    .then(res=>navigate("/employee"))
                    .catch(e=>console.log(e))
            }else{
                alert("Please fill in all input")
            }
        }



    }

    function title(){
        if(id){
            return "Update Employee"
        }else{
            return "Add Employee"
        }

    }

    useEffect(() => {
        if(id){
            getEmployeeById(id)
        }


    }, [id]);

    function getEmployeeById(id){
        EmployeeService.getEmployeeById(id)
            .then(res=>{
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
                setEmail(res.data.email)
            })

            .catch(e=>console.log(e))
    }


    return (
        <div>
            <div className='container mt-5'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3'>
                        <h2 className='text-center'>{title()}</h2>
                        <div className='card-body'>
                            <form>
                                <div className='form-group mb-2'>
                                    <input className='form-control'
                                           value={firstName}
                                           onChange={(e)=>setFirstName(e.target.value)}
                                           type="text" placeholder='Enter First Name' />
                                </div>
                                <div className='form-group mb-2'>
                                    <input className='form-control'
                                           value={lastName}
                                           onChange={(e)=>setLastName(e.target.value)}
                                           type="text" placeholder='Enter Last Name' />
                                </div>
                                <div className='form-group mb-2'>
                                    <input className='form-control'
                                           value={email}
                                           onChange={(e)=>setEmail(e.target.value)}
                                           type="email" placeholder='Enter Email' />
                                </div>
                                <button onClick={(e)=>saveEmployee(e)} className='btn btn-success'>Save</button> {" "}
                                <Link to={"/employee"} className='btn btn-danger'>Cancel</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddEmployeeComponent