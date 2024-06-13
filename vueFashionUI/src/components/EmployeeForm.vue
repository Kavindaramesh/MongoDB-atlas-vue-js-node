<template>
    <div class="form-container">
      <h2>{{ isEdit ? 'Edit Employee' : 'Add Employee' ,'Delete Employee' }}</h2>
      <form @submit.prevent="handleSubmit" class="employee-form">
        <fieldset>
          <legend>Personal Details</legend>
          <div class="form-group">
            <label for="first_name">Emplyee ID:</label>
            <input type="text" v-model="employee.personal_details.employee_ID" required />
          </div>
          <div class="form-group">
            <label for="first_name">First Name:</label>
            <input type="text" v-model="employee.personal_details.first_name" required />
          </div>
          <div class="form-group">
            <label for="last_name">Last Name:</label>
            <input type="text" v-model="employee.personal_details.last_name" required />
          </div>
          <div class="form-group">
            <label for="date_of_birth">Date of Birth:</label>
            <input type="date" v-model="employee.personal_details.date_of_birth" required />
          </div>
          <div class="form-group">
            <label for="gender">Gender:</label>
            <input type="text" v-model="employee.personal_details.gender" required />
          </div>
          <div class="form-group">
            <label for="address">Address:</label>
            <input type="text" v-model="employee.personal_details.address" required />
          </div>
        </fieldset>
  
        
        <fieldset>
            <div class="cd">
          <legend>Contact Details</legend>
          <div class="form-group">
            <label for="phone_numbers">Phone Numbers:</label>
            <input type="text" v-model="employee.contact_details.phone_numbers[0]" required />
            <input type="text" v-model="employee.contact_details.phone_numbers[1]" />
          </div>
          <div class="form-group">
            <label for="email_addresses">Email Addresses:</label>
            <input type="email" v-model="employee.contact_details.email_addresses[0]" required />
          </div>
          <div class="form-group">
            <label for="emergency_contact_name">Emergency Contact Name:</label>
            <input type="text" v-model="employee.contact_details.emergency_contact.name" required />
          </div>
          <div class="form-group">
            <label for="emergency_contact_relationship">Emergency Contact Relationship:</label>
            <input type="text" v-model="employee.contact_details.emergency_contact.relationship" required />
          </div>
          <div class="form-group">
            <label for="emergency_contact_phone">Emergency Contact Phone:</label>
            <input type="text" v-model="employee.contact_details.emergency_contact.phone" required />
          </div>
        </div>
        </fieldset>
   
  
       
        <fieldset>
            <div class="ei">
          <legend>Employment Information</legend>
          <div class="form-group">
            <label for="position">Position:</label>
            <input type="text" v-model="employee.employment_information.position" required />
          </div>
          <div class="form-group">
            <label for="department">Department:</label>
            <input type="text" v-model="employee.employment_information.department" required />
          </div>
          <div class="form-group">
            <label for="date_of_joining">Date of Joining:</label>
            <input type="date" v-model="employee.employment_information.date_of_joining" required />
          </div>
          <div class="form-group">
            <label for="salary">Salary:</label>
            <input type="number" v-model="employee.employment_information.salary" required />
          </div>
        </div>
        </fieldset>
  
        <button type="submit" class="submit-button">{{ isEdit ? 'Update' : 'Add' }}</button>
      </form>
    </div>
    
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    employee: {
      type: Object,
      default: () => ({
        personal_details: {
          employee_ID: '',
          first_name: '',
          last_name: '',
          date_of_birth: '',
          gender: '',
          address: ''
        },
        contact_details: {
          phone_numbers: ['', ''],
          email_addresses: [''],
          emergency_contact: {
            name: '',
            relationship: '',
            phone: ''
          }
        },
        employment_information: {
          position: '',
          department: '',
          date_of_joining: '',
          salary: 0
        }
      })
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  });
  
  const emit = defineEmits(['submitSuccess']);
  
  let searchQuery = '';
  
  async function handleSubmit() {
    try {
      const url = props.isEdit ? `http://localhost:3000/employees/${props.employee.employee_id}` : 'http://localhost:3000/employees';
      const method = props.isEdit ? 'PUT' : 'POST';
      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(props.employee)
      });
      emit('submitSuccess');
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  async function searchEmployee() {
    try {
      const response = await fetch(`http://localhost:3000/employees?search=${searchQuery}`);
      const data = await response.json();
      if (data.length > 0) {
       
        props.employee = data[0];
      } else {
        
        console.log('No employee found.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  </script>
  
  <style scoped>

  .form-container {
    max-width: 600px;
    margin:  auto;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #474547;
    
  }
  
  h2 {
    text-align: center;
    margin-bottom: 0rem;
  }
  
  .fieldset {
    border: 1px solid #ddd;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 4px;
    
  }
  
  legend {
    padding: 0 10px;
    font-weight: bold;
    
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }
  
  .form-group label {
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  
  .form-group input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  .submit-button {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    font-weight: bold;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .submit-button:hover {
    background-color: #0056b3;
  }
  </style>
  