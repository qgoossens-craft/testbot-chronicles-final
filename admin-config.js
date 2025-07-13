// Admin Configuration
// Change these credentials to secure your admin panel

export const ADMIN_CONFIG = {
  // Username for admin access
  username: 'titus',
  
  // Password for admin access
  // IMPORTANT: Change this to a strong password!
  password: 'testbot2024!',
  
  // Session duration (in seconds)
  // 86400 = 24 hours
  sessionDuration: 86400,
  
  // Security settings
  security: {
    // Require HTTPS in production
    requireHttps: true,
    
    // Enable brute force protection
    enableBruteForceProtection: true,
    
    // Maximum login attempts before lockout
    maxLoginAttempts: 5,
    
    // Lockout duration (in minutes)
    lockoutDuration: 15
  }
};

// Instructions:
// 1. Change the username and password above
// 2. In production, these credentials should be stored as environment variables
// 3. Consider implementing proper authentication with a database for multiple users
// 4. This is a simple implementation suitable for a single-user blog admin