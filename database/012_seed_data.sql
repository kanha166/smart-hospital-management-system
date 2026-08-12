INSERT INTO roles (role_name, description)
VALUES
('Super Admin', 'Full system access'),
('Administrator', 'Hospital administration'),
('Doctor', 'Medical practitioner'),
('Nurse', 'Nursing staff'),
('Receptionist', 'Front desk staff'),
('Pharmacist', 'Pharmacy staff'),
('Lab Technician', 'Laboratory staff'),
('Patient', 'Patient portal user');

INSERT INTO departments (
    department_name,
    department_code,
    description,
    location,
    contact_number,
    email
)
VALUES
('Cardiology', 'CARD', 'Heart and cardiovascular care', 'Block A - Floor 2', '+911111111111', 'cardiology@hospital.com'),
('Neurology', 'NEUR', 'Brain and nervous system', 'Block B - Floor 3', '+912222222222', 'neurology@hospital.com'),
('Orthopedics', 'ORTH', 'Bone and joint care', 'Block C - Floor 1', '+913333333333', 'orthopedics@hospital.com'),
('Pediatrics', 'PED', 'Child healthcare', 'Block D - Floor 2', '+914444444444', 'pediatrics@hospital.com'),
('Radiology', 'RAD', 'Medical imaging', 'Block E - Floor 1', '+915555555555', 'radiology@hospital.com'),
('Pathology', 'PATH', 'Laboratory diagnostics', 'Block E - Floor 2', '+916666666666', 'pathology@hospital.com');

INSERT INTO users (
    first_name,
    last_name,
    username,
    email,
    password_hash,
    phone_number,
    is_email_verified,
    is_phone_verified
)
VALUES
('System','Administrator','sysadmin','admin@hospital.com','$2b$12$abcdefghijklmnopqrstuvABCDEFGHIJKLMNOPQRSTUV1234567890','9000000001',TRUE,TRUE),
('Amit','Sharma','amit.sharma','amit.sharma@hospital.com','$2b$12$abcdefghijklmnopqrstuvABCDEFGHIJKLMNOPQRSTUV1234567891','9000000002',TRUE,TRUE),
('Priya','Verma','priya.verma','priya.verma@hospital.com','$2b$12$abcdefghijklmnopqrstuvABCDEFGHIJKLMNOPQRSTUV1234567892','9000000003',TRUE,TRUE),
('Rahul','Singh','rahul.singh','rahul.singh@hospital.com','$2b$12$abcdefghijklmnopqrstuvABCDEFGHIJKLMNOPQRSTUV1234567893','9000000004',TRUE,TRUE),
('Neha','Gupta','neha.gupta','neha.gupta@hospital.com','$2b$12$abcdefghijklmnopqrstuvABCDEFGHIJKLMNOPQRSTUV1234567894','9000000005',TRUE,TRUE),
('Vikram','Mehta','vikram.mehta','vikram.mehta@hospital.com','$2b$12$abcdefghijklmnopqrstuvABCDEFGHIJKLMNOPQRSTUV1234567895','9000000006',TRUE,TRUE),
('Anita','Joshi','anita.joshi','anita.joshi@hospital.com','$2b$12$abcdefghijklmnopqrstuvABCDEFGHIJKLMNOPQRSTUV1234567896','9000000007',TRUE,TRUE),
('Suresh','Patel','suresh.patel','suresh.patel@hospital.com','$2b$12$abcdefghijklmnopqrstuvABCDEFGHIJKLMNOPQRSTUV1234567897','9000000008',TRUE,TRUE),
('Rohan','Malhotra','rohan.patient','rohan.patient@example.com','$2b$12$abcdefghijklmnopqrstuvABCDEFGHIJKLMNOPQRSTUV1234567898','9000000009',TRUE,TRUE),
('Sneha','Kapoor','sneha.patient','sneha.patient@example.com','$2b$12$abcdefghijklmnopqrstuvABCDEFGHIJKLMNOPQRSTUV1234567899','9000000010',TRUE,TRUE);

INSERT INTO user_roles (user_id, role_id)
VALUES
(1,1),
(2,3),
(3,3),
(4,3),
(5,3),
(6,5),
(7,6),
(8,7),
(9,8),
(10,8);

INSERT INTO doctors (
    user_id,
    department_id,
    employee_code,
    medical_license_number,
    specialization,
    qualification,
    years_of_experience,
    consultation_fee,
    joining_date
)
VALUES
(2,1,'DOC001','LIC-CARD-1001','Cardiologist','MD Cardiology',12,1000.00,'2018-01-15'),
(3,2,'DOC002','LIC-NEUR-1002','Neurologist','DM Neurology',10,1200.00,'2019-03-10'),
(4,3,'DOC003','LIC-ORTH-1003','Orthopedic Surgeon','MS Orthopedics',8,900.00,'2020-06-20'),
(5,4,'DOC004','LIC-PED-1004','Pediatrician','MD Pediatrics',7,800.00,'2021-02-05');

INSERT INTO patients (
    patient_code,
    user_id,
    first_name,
    last_name,
    gender,
    date_of_birth,
    blood_group,
    phone_number,
    email,
    address_line_1,
    city,
    state,
    country,
    emergency_contact_name,
    emergency_contact_phone
)
VALUES
(
'PAT0001',
9,
'Rohan',
'Malhotra',
'Male',
'1996-04-12',
'B+',
'9000000009',
'rohan.patient@example.com',
'21 MG Road',
'Lucknow',
'Uttar Pradesh',
'India',
'Amit Malhotra',
'9100000001'
),
(
'PAT0002',
10,
'Sneha',
'Kapoor',
'Female',
'1999-09-08',
'A+',
'9000000010',
'sneha.patient@example.com',
'55 Civil Lines',
'Kanpur',
'Uttar Pradesh',
'India',
'Raj Kapoor',
'9100000002'
),
(
'PAT0003',
NULL,
'Arjun',
'Yadav',
'Male',
'1988-01-22',
'O+',
'9000000011',
'arjun.yadav@example.com',
'18 Park Street',
'Prayagraj',
'Uttar Pradesh',
'India',
'Sunita Yadav',
'9100000003'
);

INSERT INTO medicines (
    medicine_name,
    generic_name,
    manufacturer,
    category,
    dosage_form,
    strength,
    unit_price,
    description
)
VALUES
('Paracetamol 500','Paracetamol','Sun Pharma','Analgesic','Tablet','500 mg',2.50,'Pain relief and fever'),
('Azithromycin 500','Azithromycin','Cipla','Antibiotic','Tablet','500 mg',18.00,'Broad spectrum antibiotic'),
('Amoxicillin 500','Amoxicillin','Mankind','Antibiotic','Capsule','500 mg',12.50,'Penicillin antibiotic'),
('Pantoprazole 40','Pantoprazole','Dr. Reddy''s','Gastrointestinal','Tablet','40 mg',7.00,'Acid reflux treatment'),
('Metformin 500','Metformin','Sun Pharma','Antidiabetic','Tablet','500 mg',3.50,'Type 2 diabetes management'),
('Cetirizine 10','Cetirizine','Cipla','Antihistamine','Tablet','10 mg',2.00,'Allergy treatment'),
('Vitamin C Syrup','Ascorbic Acid','Abbott','Supplement','Syrup','100 mg/5 ml',65.00,'Vitamin supplement'),
('Insulin Regular','Human Insulin','Novo Nordisk','Antidiabetic','Injection','100 IU/ml',450.00,'Insulin injection');

INSERT INTO lab_tests (
    test_name,
    test_code,
    category,
    description,
    normal_range,
    unit,
    cost
)
VALUES
('Complete Blood Count','CBC001','Hematology','Complete blood count','4.5-11.0','x10^9/L',350.00),
('Blood Sugar Fasting','BSF001','Biochemistry','Fasting blood glucose','70-100','mg/dL',200.00),
('Lipid Profile','LIP001','Biochemistry','Cholesterol profile','Variable','mg/dL',700.00),
('Liver Function Test','LFT001','Biochemistry','Liver enzyme analysis','Variable','U/L',850.00),
('Kidney Function Test','KFT001','Biochemistry','Kidney function analysis','Variable','mg/dL',800.00),
('Thyroid Profile','THY001','Endocrinology','Thyroid hormone analysis','Variable','µIU/mL',900.00),
('Urine Routine','UR001','Pathology','Routine urine examination','Normal','N/A',150.00),
('HbA1c','HBA1C001','Diabetes','Average blood glucose','4.0-5.6','%',650.00);