CREATE TABLE RateEntity (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    rate DOUBLE
);


INSERT INTO RateEntity (name, description, rate) VALUES ('Loan CP TAX', 'Sample Description', 1.5);
INSERT INTO RateEntity (name, description, rate) VALUES ('Loan CNS TAX', 'Sample Description', 1.3);
INSERT INTO RateEntity (name, description, rate) VALUES ('Loan FGTS TAX', 'Sample Description', 1.3);