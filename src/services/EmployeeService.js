import axios from "axios";


const BASE_URL = "http://localhost:4040/employee"
class EmployeeService{

    getAllEmployee(){
        return axios.get(BASE_URL)
    }

    saveEmployee(employeeData){
        return axios.post(BASE_URL + '/save', employeeData)

    }

    updateEmployee(id, employeeData){
        return axios.put(BASE_URL + `/update/${id}`, employeeData);
    }

    getEmployeeById(id){
        return axios.get(BASE_URL + `/${id}`)
    }

    deleteEmployee(id){
        return  axios.delete(BASE_URL + `/delete/${id}`)
    }



}

export default new EmployeeService();
