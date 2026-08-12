CREATE TABLE patients (
    patient_id                  BIGSERIAL PRIMARY KEY,
    patient_code                VARCHAR(30) NOT NULL,
    user_id                     BIGINT,
    first_name                  VARCHAR(100) NOT NULL,
    last_name                   VARCHAR(100) NOT NULL,
    gender                      VARCHAR(20) NOT NULL,
    date_of_birth               DATE NOT NULL,
    blood_group                 VARCHAR(5),
    marital_status              VARCHAR(20),
    phone_number                VARCHAR(20) NOT NULL,
    alternate_phone_number      VARCHAR(20),
    email                       CITEXT,
    address_line_1              VARCHAR(255) NOT NULL,
    address_line_2              VARCHAR(255),
    city                        VARCHAR(100) NOT NULL,
    state                       VARCHAR(100) NOT NULL,
    postal_code                 VARCHAR(20),
    country                     VARCHAR(100) NOT NULL DEFAULT 'India',
    emergency_contact_name      VARCHAR(150) NOT NULL,
    emergency_contact_phone     VARCHAR(20) NOT NULL,
    emergency_contact_relation  VARCHAR(100),
    height_cm                   NUMERIC(5,2),
    weight_kg                   NUMERIC(5,2),
    allergies                   TEXT,
    insurance_provider          VARCHAR(150),
    insurance_policy_number     VARCHAR(100),
    is_active                   BOOLEAN NOT NULL DEFAULT TRUE,
    created_at                  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at                  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_patients_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    CONSTRAINT uq_patients_patient_code
        UNIQUE (patient_code),

    CONSTRAINT uq_patients_user
        UNIQUE (user_id),

    CONSTRAINT uq_patients_email
        UNIQUE (email),

    CONSTRAINT chk_patients_gender
        CHECK (
            gender IN (
                'Male',
                'Female',
                'Other'
            )
        ),

    CONSTRAINT chk_patients_blood_group
        CHECK (
            blood_group IS NULL
            OR blood_group IN (
                'A+','A-',
                'B+','B-',
                'AB+','AB-',
                'O+','O-'
            )
        ),

    CONSTRAINT chk_patients_marital_status
        CHECK (
            marital_status IS NULL
            OR marital_status IN (
                'Single',
                'Married',
                'Divorced',
                'Widowed'
            )
        ),

    CONSTRAINT chk_patients_dob
        CHECK (
            date_of_birth <= CURRENT_DATE
        ),

    CONSTRAINT chk_patients_height
        CHECK (
            height_cm IS NULL
            OR height_cm > 0
        ),

    CONSTRAINT chk_patients_weight
        CHECK (
            weight_kg IS NULL
            OR weight_kg > 0
        ),

    CONSTRAINT chk_patients_phone
        CHECK (
            phone_number ~ '^[0-9+ -]{7,20}$'
        ),

    CONSTRAINT chk_patients_alt_phone
        CHECK (
            alternate_phone_number IS NULL
            OR alternate_phone_number ~ '^[0-9+ -]{7,20}$'
        ),

    CONSTRAINT chk_patients_emergency_phone
        CHECK (
            emergency_contact_phone ~ '^[0-9+ -]{7,20}$'
        )
);

CREATE TABLE medical_history (
    medical_history_id      BIGSERIAL PRIMARY KEY,
    patient_id              BIGINT NOT NULL,
    doctor_id               BIGINT,
    diagnosis               TEXT NOT NULL,
    symptoms                TEXT,
    allergies               TEXT,
    chronic_diseases        TEXT,
    surgeries               TEXT,
    family_history          TEXT,
    medications             TEXT,
    notes                   TEXT,
    visit_date              DATE NOT NULL DEFAULT CURRENT_DATE,
    follow_up_date          DATE,
    created_at              TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at              TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_medical_history_patient
        FOREIGN KEY (patient_id)
        REFERENCES patients(patient_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_medical_history_doctor
        FOREIGN KEY (doctor_id)
        REFERENCES doctors(doctor_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    CONSTRAINT chk_medical_history_follow_up
        CHECK (
            follow_up_date IS NULL
            OR follow_up_date >= visit_date
        )
);

CREATE INDEX idx_patients_patient_code
    ON patients (patient_code);

CREATE INDEX idx_patients_user_id
    ON patients (user_id);

CREATE INDEX idx_patients_first_name
    ON patients (first_name);

CREATE INDEX idx_patients_last_name
    ON patients (last_name);

CREATE INDEX idx_patients_phone_number
    ON patients (phone_number);

CREATE INDEX idx_patients_email
    ON patients (email);

CREATE INDEX idx_patients_city
    ON patients (city);

CREATE INDEX idx_patients_state
    ON patients (state);

CREATE INDEX idx_patients_is_active
    ON patients (is_active);

CREATE INDEX idx_medical_history_patient_id
    ON medical_history (patient_id);

CREATE INDEX idx_medical_history_doctor_id
    ON medical_history (doctor_id);

CREATE INDEX idx_medical_history_visit_date
    ON medical_history (visit_date);

CREATE INDEX idx_medical_history_follow_up_date
    ON medical_history (follow_up_date);