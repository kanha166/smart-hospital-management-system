CREATE TABLE lab_tests (
    lab_test_id         BIGSERIAL PRIMARY KEY,
    test_name           VARCHAR(150) NOT NULL,
    test_code           VARCHAR(50) NOT NULL,
    category            VARCHAR(100) NOT NULL,
    description         TEXT,
    normal_range        VARCHAR(255),
    unit                VARCHAR(50),
    cost                NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    is_active           BOOLEAN NOT NULL DEFAULT TRUE,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT uq_lab_tests_name
        UNIQUE (test_name),

    CONSTRAINT uq_lab_tests_code
        UNIQUE (test_code),

    CONSTRAINT chk_lab_tests_name
        CHECK (char_length(trim(test_name)) >= 2),

    CONSTRAINT chk_lab_tests_code
        CHECK (char_length(trim(test_code)) >= 2),

    CONSTRAINT chk_lab_tests_category
        CHECK (char_length(trim(category)) >= 2),

    CONSTRAINT chk_lab_tests_cost
        CHECK (cost >= 0)
);

CREATE TABLE lab_reports (
    report_id           BIGSERIAL PRIMARY KEY,
    patient_id          BIGINT NOT NULL,
    doctor_id           BIGINT NOT NULL,
    appointment_id      BIGINT,
    lab_test_id         BIGINT NOT NULL,
    report_date         DATE NOT NULL DEFAULT CURRENT_DATE,
    test_result         TEXT NOT NULL,
    remarks             TEXT,
    report_file         TEXT,
    status              VARCHAR(30) NOT NULL DEFAULT 'Pending',
    created_at          TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_lab_reports_patient
        FOREIGN KEY (patient_id)
        REFERENCES patients(patient_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_lab_reports_doctor
        FOREIGN KEY (doctor_id)
        REFERENCES doctors(doctor_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_lab_reports_appointment
        FOREIGN KEY (appointment_id)
        REFERENCES appointments(appointment_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    CONSTRAINT fk_lab_reports_lab_test
        FOREIGN KEY (lab_test_id)
        REFERENCES lab_tests(lab_test_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT chk_lab_reports_status
        CHECK (
            status IN (
                'Pending',
                'Collected',
                'Processing',
                'Completed',
                'Verified',
                'Cancelled'
            )
        ),

    CONSTRAINT chk_lab_reports_report_date
        CHECK (report_date <= CURRENT_DATE),

    CONSTRAINT chk_lab_reports_test_result
        CHECK (char_length(trim(test_result)) >= 1)
);

CREATE INDEX idx_lab_tests_name
    ON lab_tests (test_name);

CREATE INDEX idx_lab_tests_code
    ON lab_tests (test_code);

CREATE INDEX idx_lab_tests_category
    ON lab_tests (category);

CREATE INDEX idx_lab_tests_active
    ON lab_tests (is_active);

CREATE INDEX idx_lab_reports_patient
    ON lab_reports (patient_id);

CREATE INDEX idx_lab_reports_doctor
    ON lab_reports (doctor_id);

CREATE INDEX idx_lab_reports_appointment
    ON lab_reports (appointment_id);

CREATE INDEX idx_lab_reports_lab_test
    ON lab_reports (lab_test_id);

CREATE INDEX idx_lab_reports_status
    ON lab_reports (status);

CREATE INDEX idx_lab_reports_report_date
    ON lab_reports (report_date);

CREATE INDEX idx_lab_reports_patient_date
    ON lab_reports (patient_id, report_date);

CREATE INDEX idx_lab_reports_lab_test_date
    ON lab_reports (lab_test_id, report_date);