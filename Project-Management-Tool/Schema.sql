




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
