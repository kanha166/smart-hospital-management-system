CREATE OR REPLACE VIEW vw_patient_details AS
SELECT
    p.patient_id,
    p.patient_code,
    p.first_name,
    p.last_name,
    CONCAT(p.first_name, ' ', p.last_name) AS full_name,
    p.gender,
    p.date_of_birth,
    p.blood_group,
    p.phone_number,
    p.email,
    p.city,
    p.state,
    p.country,
    p.insurance_provider,
    p.insurance_policy_number,
    p.is_active,
    p.created_at,
    p.updated_at
FROM patients p;

CREATE OR REPLACE VIEW vw_doctor_schedule AS
SELECT
    ds.schedule_id,
    d.doctor_id,
    d.employee_code,
    CONCAT(u.first_name, ' ', u.last_name) AS doctor_name,
    dep.department_id,
    dep.department_name,
    d.specialization,
    ds.day_of_week,
    ds.start_time,
    ds.end_time,
    ds.slot_duration,
    ds.max_patients,
    ds.is_available
FROM doctor_schedules ds
INNER JOIN doctors d
    ON ds.doctor_id = d.doctor_id
INNER JOIN users u
    ON d.user_id = u.user_id
INNER JOIN departments dep
    ON d.department_id = dep.department_id;

CREATE OR REPLACE VIEW vw_appointment_details AS
SELECT
    a.appointment_id,
    a.appointment_date,
    a.appointment_time,
    a.appointment_type,
    a.appointment_status,
    a.reason_for_visit,
    a.consultation_notes,
    p.patient_id,
    p.patient_code,
    CONCAT(p.first_name, ' ', p.last_name) AS patient_name,
    d.doctor_id,
    CONCAT(u.first_name, ' ', u.last_name) AS doctor_name,
    d.specialization,
    dep.department_name,
    a.created_at,
    a.updated_at
FROM appointments a
INNER JOIN patients p
    ON a.patient_id = p.patient_id
INNER JOIN doctors d
    ON a.doctor_id = d.doctor_id
INNER JOIN users u
    ON d.user_id = u.user_id
INNER JOIN departments dep
    ON d.department_id = dep.department_id;

CREATE OR REPLACE VIEW vw_invoice_summary AS
SELECT
    i.invoice_id,
    i.invoice_number,
    i.invoice_date,
    i.due_date,
    i.invoice_status,
    p.patient_id,
    p.patient_code,
    CONCAT(p.first_name, ' ', p.last_name) AS patient_name,
    i.subtotal,
    i.tax_amount,
    i.discount_amount,
    i.total_amount,
    COALESCE(SUM(pay.amount_paid), 0.00) AS amount_paid,
    i.total_amount - COALESCE(SUM(pay.amount_paid), 0.00) AS balance_due
FROM invoices i
INNER JOIN patients p
    ON i.patient_id = p.patient_id
LEFT JOIN payments pay
    ON i.invoice_id = pay.invoice_id
    AND pay.payment_status = 'Completed'
GROUP BY
    i.invoice_id,
    i.invoice_number,
    i.invoice_date,
    i.due_date,
    i.invoice_status,
    p.patient_id,
    p.patient_code,
    p.first_name,
    p.last_name,
    i.subtotal,
    i.tax_amount,
    i.discount_amount,
    i.total_amount;

CREATE OR REPLACE VIEW vw_pharmacy_inventory AS
SELECT
    pi.inventory_id,
    m.medicine_id,
    m.medicine_name,
    m.generic_name,
    m.manufacturer,
    m.category,
    m.dosage_form,
    m.strength,
    pi.batch_number,
    pi.quantity_in_stock,
    pi.reorder_level,
    pi.expiry_date,
    pi.supplier_name,
    m.unit_price,
    m.is_active
FROM pharmacy_inventory pi
INNER JOIN medicines m
    ON pi.medicine_id = m.medicine_id;

CREATE OR REPLACE VIEW vw_lab_reports AS
SELECT
    lr.report_id,
    lr.report_date,
    lr.status,
    lr.test_result,
    lr.remarks,
    lr.report_file,
    p.patient_id,
    p.patient_code,
    CONCAT(p.first_name, ' ', p.last_name) AS patient_name,
    d.doctor_id,
    CONCAT(u.first_name, ' ', u.last_name) AS doctor_name,
    dep.department_name,
    lt.lab_test_id,
    lt.test_name,
    lt.test_code,
    lt.category,
    lt.normal_range,
    lt.unit
FROM lab_reports lr
INNER JOIN patients p
    ON lr.patient_id = p.patient_id
INNER JOIN doctors d
    ON lr.doctor_id = d.doctor_id
INNER JOIN users u
    ON d.user_id = u.user_id
INNER JOIN departments dep
    ON d.department_id = dep.department_id
INNER JOIN lab_tests lt
    ON lr.lab_test_id = lt.lab_test_id;