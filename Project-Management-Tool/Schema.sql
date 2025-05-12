CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user',
  PRIMARY KEY (id)
);


CREATE TABLE projects (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    assigned_to INT DEFAULT NULL,              
    created_by INT,                          
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    deadline DATE NOT NULL,  
    status ENUM('complete', 'end', 'pending') DEFAULT 'pending',
    
    FOREIGN KEY (assigned_to) REFERENCES users(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);
