import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/';

class UserService {
  getCustomers() {
    return axios.get(API_URL + 'customers', { headers: authHeader() });
  }

  createCustomer(customer) {
    console.log(customer)
    return axios.post(API_URL + 'customers', customer, { headers: authHeader() });
  }

  updateCustomer(customer) {
    return axios.put(API_URL + `customers/${customer.id}`, customer, { headers: authHeader() });
  }

  deleteCustomer(customer) {
    return axios.delete(API_URL + `customers/${customer.id}`, { headers: authHeader() });
  }
}

export default new UserService();