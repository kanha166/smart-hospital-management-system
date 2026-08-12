CREATE TABLE rooms (
    room_id             BIGSERIAL PRIMARY KEY,
    room_number         VARCHAR(30) NOT NULL,
    room_type           VARCHAR(50) NOT NULL,
    floor_number        INTEGER NOT NULL,
    department_id       BIGINT NOT NULL,
    total_beds          INTEGER NOT NULL DEFAULT 1,
    is_active           BOOLEAN NOT NULL DEFAULT TRUE,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_rooms_department
        FOREIGN KEY (department_id)
        REFERENCES departments(department_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT uq_rooms_room_number
        UNIQUE (room_number),

    CONSTRAINT chk_rooms_type
        CHECK (
            room_type IN (
                'General Ward',
                'Semi Private',
                'Private',
                'ICU',
                'NICU',
                'PICU',
                'Emergency',
                'Operation Theatre',
                'Recovery',
                'Isolation'
            )
        ),

    CONSTRAINT chk_rooms_floor
        CHECK (floor_number >= 0),

    CONSTRAINT chk_rooms_total_beds
        CHECK (total_beds > 0)
);

CREATE TABLE beds (
    bed_id               BIGSERIAL PRIMARY KEY,
    room_id              BIGINT NOT NULL,
    bed_number           VARCHAR(30) NOT NULL,
    bed_status           VARCHAR(30) NOT NULL DEFAULT 'Available',
    is_active            BOOLEAN NOT NULL DEFAULT TRUE,
    created_at           TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at           TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_beds_room
        FOREIGN KEY (room_id)
        REFERENCES rooms(room_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT uq_beds_room_bed
        UNIQUE (room_id, bed_number),

    CONSTRAINT chk_beds_status
        CHECK (
            bed_status IN (
                'Available',
                'Occupied',
                'Reserved',
                'Cleaning',
                'Maintenance',
                'Out of Service'
            )
        )
);

CREATE TABLE admissions (
    admission_id          BIGSERIAL PRIMARY KEY,
    patient_id            BIGINT NOT NULL,
    doctor_id             BIGINT NOT NULL,
    bed_id                BIGINT NOT NULL,
    admission_date        TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    discharge_date        TIMESTAMPTZ,
    admission_reason      TEXT NOT NULL,
    diagnosis             TEXT,
    treatment_plan        TEXT,
    admission_status      VARCHAR(30) NOT NULL DEFAULT 'Admitted',
    created_at            TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at            TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_admissions_patient
        FOREIGN KEY (patient_id)
        REFERENCES patients(patient_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_admissions_doctor
        FOREIGN KEY (doctor_id)
        REFERENCES doctors(doctor_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_admissions_bed
        FOREIGN KEY (bed_id)
        REFERENCES beds(bed_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT uq_admissions_active_bed
        UNIQUE (
            bed_id,
            admission_date
        ),

    CONSTRAINT chk_admissions_discharge
        CHECK (
            discharge_date IS NULL
            OR discharge_date >= admission_date
        ),

    CONSTRAINT chk_admissions_status
        CHECK (
            admission_status IN (
                'Admitted',
                'Under Treatment',
                'Transferred',
                'Discharged',
                'Cancelled'
            )
        ),

    CONSTRAINT chk_admissions_reason
        CHECK (
            char_length(trim(admission_reason)) >= 3
        )
);

CREATE INDEX idx_rooms_department
    ON rooms (department_id);

CREATE INDEX idx_rooms_room_number
    ON rooms (room_number);

CREATE INDEX idx_rooms_room_type
    ON rooms (room_type);

CREATE INDEX idx_rooms_floor
    ON rooms (floor_number);

CREATE INDEX idx_rooms_active
    ON rooms (is_active);

CREATE INDEX idx_beds_room
    ON beds (room_id);

CREATE INDEX idx_beds_status
    ON beds (bed_status);

CREATE INDEX idx_beds_active
    ON beds (is_active);

CREATE INDEX idx_beds_room_status
    ON beds (room_id, bed_status);

CREATE INDEX idx_admissions_patient
    ON admissions (patient_id);

CREATE INDEX idx_admissions_doctor
    ON admissions (doctor_id);

CREATE INDEX idx_admissions_bed
    ON admissions (bed_id);

CREATE INDEX idx_admissions_status
    ON admissions (admission_status);

CREATE INDEX idx_admissions_admission_date
    ON admissions (admission_date);

CREATE INDEX idx_admissions_discharge_date
    ON admissions (discharge_date);

CREATE INDEX idx_admissions_patient_status
    ON admissions (patient_id, admission_status);

CREATE INDEX idx_admissions_doctor_date
    ON admissions (doctor_id, admission_date);