const BASE_URL = "http://localhost:4000/api/v1"

// const BASE_URL = "https://startup-healer-backend.onrender.com/api/v1"

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  UPDATE_PROFILE : BASE_URL + "/profile/updateProfile", 
  UPDATE_PROFILE_PICTURE : BASE_URL + "/profile/updateDisplayPicture", 
}

// src/services/api.js or similar
export const pitchDeckEndpoints = {
  // Create
  CREATE_PITCH: `${BASE_URL}/pitch/createPitch`,

  // Read
  GET_MY_PITCH_DECKS: `${BASE_URL}/pitch/myPitchDecks`,
  GET_PITCH_DECK_BY_ID: `${BASE_URL}/pitch/:pitchId`,

  // Update
  UPDATE_PITCH_DECK: `${BASE_URL}/pitch/:pitchId`,

  // Delete
  DELETE_PITCH_DECK: `${BASE_URL}/pitch/:pitchId`,
};

export const employeeEndpoints = {
  // Create
  CREATE_EMPLOYEE: `${BASE_URL}/employee/employees`,

  // Read
  GET_ALL_EMPLOYEES: `${BASE_URL}/employee/employees`,
  GET_EMPLOYEE_BY_ID: `${BASE_URL}/employee/employees/:id`,

  // Update
  UPDATE_EMPLOYEE: `${BASE_URL}/employee/employees/:id`,

  // Delete
  DELETE_EMPLOYEE: `${BASE_URL}/employee/employees/:id`,

  // Additional Actions
  RESET_EMPLOYEE_PASSWORD: `${BASE_URL}/employee/employees/:id/reset-password`,
};

