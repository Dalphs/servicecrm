import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://serviziocrm.herokuapp.com/api/';

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

  jobDone(id) {
    return axios.post(API_URL + `customers/visits/jobdone`, {id: id}, { headers: authHeader() });
  }

  deleteCustomer(customer) {
    return axios.delete(API_URL + `customers/${customer.id}`, { headers: authHeader() });
  }
}

export default new UserService();