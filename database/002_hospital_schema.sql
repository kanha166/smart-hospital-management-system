CREATE TABLE departments (
    department_id       BIGSERIAL PRIMARY KEY,
    department_name     VARCHAR(100) NOT NULL,
    department_code     VARCHAR(20) NOT NULL,
    description         TEXT,
    location            VARCHAR(150),
    contact_number      VARCHAR(20),
    email               CITEXT,
    is_active           BOOLEAN NOT NULL DEFAULT TRUE,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT uq_departments_name
        UNIQUE (department_name),

    CONSTRAINT uq_departments_code
        UNIQUE (department_code),

    CONSTRAINT uq_departments_email
        UNIQUE (email),

    CONSTRAINT chk_departments_name
        CHECK (char_length(trim(department_name)) >= 2),

    CONSTRAINT chk_departments_code
        CHECK (char_length(trim(department_code)) >= 2),

    CONSTRAINT chk_departments_contact
        CHECK (
            contact_number IS NULL
            OR contact_number ~ '^[0-9+ -]{7,20}$'
        )
);

CREATE TABLE doctors (
    doctor_id                   BIGSERIAL PRIMARY KEY,
    user_id                     BIGINT NOT NULL,
    department_id               BIGINT NOT NULL,
    employee_code               VARCHAR(30) NOT NULL,
    medical_license_number      VARCHAR(100) NOT NULL,
    specialization              VARCHAR(150) NOT NULL,
    qualification               VARCHAR(255),
    years_of_experience         INTEGER NOT NULL DEFAULT 0,
    consultation_fee            NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    joining_date                DATE NOT NULL,
    biography                   TEXT,
    is_available                BOOLEAN NOT NULL DEFAULT TRUE,
    is_active                   BOOLEAN NOT NULL DEFAULT TRUE,
    created_at                  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at                  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_doctors_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_doctors_department
        FOREIGN KEY (department_id)
        REFERENCES departments(department_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT uq_doctors_user
        UNIQUE (user_id),

    CONSTRAINT uq_doctors_employee_code
        UNIQUE (employee_code),

    CONSTRAINT uq_doctors_license
        UNIQUE (medical_license_number),

    CONSTRAINT chk_doctors_experience
        CHECK (years_of_experience >= 0),

    CONSTRAINT chk_doctors_fee
        CHECK (consultation_fee >= 0),

    CONSTRAINT chk_doctors_specialization
        CHECK (char_length(trim(specialization)) >= 2)
);

CREATE TABLE doctor_schedules (
    schedule_id         BIGSERIAL PRIMARY KEY,
    doctor_id           BIGINT NOT NULL,
    day_of_week         SMALLINT NOT NULL,
    start_time          TIME NOT NULL,
    end_time            TIME NOT NULL,
    slot_duration       SMALLINT NOT NULL DEFAULT 30,
    max_patients        INTEGER NOT NULL DEFAULT 20,
    is_available        BOOLEAN NOT NULL DEFAULT TRUE,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_doctor_schedules_doctor
        FOREIGN KEY (doctor_id)
        REFERENCES doctors(doctor_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT uq_doctor_schedule
        UNIQUE (
            doctor_id,
            day_of_week,
            start_time,
            end_time
        ),

    CONSTRAINT chk_schedule_day
        CHECK (day_of_week BETWEEN 1 AND 7),

    CONSTRAINT chk_schedule_time
        CHECK (end_time > start_time),

    CONSTRAINT chk_schedule_slot
        CHECK (slot_duration BETWEEN 5 AND 240),

    CONSTRAINT chk_schedule_max_patients
        CHECK (max_patients > 0)
);

CREATE INDEX idx_departments_name
    ON departments (department_name);

CREATE INDEX idx_departments_code
    ON departments (department_code);

CREATE INDEX idx_departments_active
    ON departments (is_active);

CREATE INDEX idx_doctors_user_id
    ON doctors (user_id);

CREATE INDEX idx_doctors_department_id
    ON doctors (department_id);

CREATE INDEX idx_doctors_employee_code
    ON doctors (employee_code);

CREATE INDEX idx_doctors_license
    ON doctors (medical_license_number);

CREATE INDEX idx_doctors_specialization
    ON doctors (specialization);

CREATE INDEX idx_doctors_available
    ON doctors (is_available);

CREATE INDEX idx_doctors_active
    ON doctors (is_active);

CREATE INDEX idx_schedule_doctor
    ON doctor_schedules (doctor_id);

CREATE INDEX idx_schedule_day
    ON doctor_schedules (day_of_week);

CREATE INDEX idx_schedule_available
    ON doctor_schedules (is_available);

CREATE INDEX idx_schedule_doctor_day
    ON doctor_schedules (doctor_id, day_of_week);