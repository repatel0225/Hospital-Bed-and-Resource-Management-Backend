// Secret key for application (e.g., JWT secret)
export const SECRET_KEY = "SECRET_KEY";

// Common error messages
export const SOMETHING_WENT_WRONG = "Something went wrong";
export const MANDATORY_FIELDS_REQUIRED =
  "All the mandatory fields are required";
export const UNABLE_TO_CONNECT_DB = "Unable to connect DB";

// HTTP status codes
export const STATUS_CODES = {
  SUCCESS: 200, // Request succeeded
  CREATED: 201, // Resource created successfully
  ACCEPTED: 202, // Request accepted for processing
  NO_CONTENT: 204, // Request succeeded, no content returned
  BAD_REQUEST: 400, // Client error in request
  UNAUTHORIZED: 401, // Authentication required
  FORBIDDEN: 403, // Access denied
  NOT_FOUND: 404, // Resource not found
  METHOD_NOT_ALLOWED: 405, // HTTP method not allowed
  CONFLICT: 409, // Conflict with current state (e.g., user already exists)
  GONE: 410, // Resource permanently removed
  UNSUPPORTED_MEDIA_TYPE: 415, // Unsupported media type in request
  UNPROCESSABLE_ENTITY: 422, // Request well-formed but unable to process
  TOO_MANY_REQUESTS: 429, // Rate limit exceeded
  SERVER_ERROR: 500, // Internal server error
  NOT_IMPLEMENTED: 501, // Server does not support functionality
  BAD_GATEWAY: 502, // Invalid response from upstream server
  SERVICE_UNAVAILABLE: 503, // Server temporarily unavailable
  GATEWAY_TIMEOUT: 504, // Upstream server timeout
};

export const MESSAGES = {
  // General messages used in the application
  SERVER_ERROR: "Internal server error.",
  VALIDATION_ERROR: "Invalid input. Please check your data.",
  SUCCESS: "Success",
  FAILURE: "Failure",
  MESSAGE_FAILURE: "Something went wrong",
  MESSAGE_SUCCESS: "Fetched successfully",
  INVALID_CREDENTIALS: "Invalid credentials",
  PATIENT_CREATED_SUCCESSFULLY:"Patient Created Successfully",

  // Messages related to user operations
  EMAIL_ALREADY_EXIST: "Email already exists",
  INVALID_USER_OR_PASSWORD: "Invalid user or password",
  LOGIN_SUCCESS: "Login success!",
  LOGIN_OUT: "Logged out successfully!",
  USER_CREATED: "User created successfully!",
  USER_DOES_NOT_EXIST: "User does not exist",

  BOOKED_SUCCESSFULLY: "Booked Successfully"
};

