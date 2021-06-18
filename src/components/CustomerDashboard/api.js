import axios from 'axios';

async function getCustomers() {
    let res = await axios.get(`http://localhost:8080/api/customers/`)
    return res.data
}

async function createCustomer(customer) {
    let res = await axios.post(`http://localhost:8080/api/customers/`, customer)
    return res
}

async function updateCustomer(customer) {
    let res = await axios.put(`http://localhost:8080/api/customers/${customer.id}`, customer)
    return res
}

async function deleteCustomer(customer){
    let res = await axios.delete(`http://localhost:8080/api/customers/${customer.id}`)
    return res
}

export default {getCustomers, createCustomer, updateCustomer, deleteCustomer}