CREATE TABLE appointments (
    appointment_id         BIGSERIAL PRIMARY KEY,
    patient_id             BIGINT NOT NULL,
    doctor_id              BIGINT NOT NULL,
    appointment_date       DATE NOT NULL,
    appointment_time       TIME NOT NULL,
    appointment_type       VARCHAR(30) NOT NULL DEFAULT 'Consultation',
    appointment_status     VARCHAR(30) NOT NULL DEFAULT 'Scheduled',
    reason_for_visit       TEXT NOT NULL,
    consultation_notes     TEXT,
    cancellation_reason    TEXT,
    created_at             TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at             TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_appointments_patient
        FOREIGN KEY (patient_id)
        REFERENCES patients(patient_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_appointments_doctor
        FOREIGN KEY (doctor_id)
        REFERENCES doctors(doctor_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT uq_appointments_doctor_datetime
        UNIQUE (
            doctor_id,
            appointment_date,
            appointment_time
        ),

    CONSTRAINT chk_appointments_type
        CHECK (
            appointment_type IN (
                'Consultation',
                'Follow-up',
                'Emergency',
                'Routine Checkup',
                'Telemedicine',
                'Vaccination',
                'Lab Review',
                'Procedure'
            )
        ),

    CONSTRAINT chk_appointments_status
        CHECK (
            appointment_status IN (
                'Scheduled',
                'Confirmed',
                'Checked-In',
                'In Progress',
                'Completed',
                'Cancelled',
                'No Show',
                'Rescheduled'
            )
        ),

    CONSTRAINT chk_appointments_reason
        CHECK (
            char_length(trim(reason_for_visit)) >= 5
        ),

    CONSTRAINT chk_appointments_cancel_reason
        CHECK (
            appointment_status <> 'Cancelled'
            OR (
                cancellation_reason IS NOT NULL
                AND char_length(trim(cancellation_reason)) >= 3
            )
        ),

    CONSTRAINT chk_appointments_completed_notes
        CHECK (
            appointment_status <> 'Completed'
            OR consultation_notes IS NOT NULL
        )
);

CREATE INDEX idx_appointments_patient_id
    ON appointments (patient_id);

CREATE INDEX idx_appointments_doctor_id
    ON appointments (doctor_id);

CREATE INDEX idx_appointments_date
    ON appointments (appointment_date);

CREATE INDEX idx_appointments_time
    ON appointments (appointment_time);

CREATE INDEX idx_appointments_status
    ON appointments (appointment_status);

CREATE INDEX idx_appointments_type
    ON appointments (appointment_type);

CREATE INDEX idx_appointments_patient_date
    ON appointments (patient_id, appointment_date);

CREATE INDEX idx_appointments_doctor_date
    ON appointments (doctor_id, appointment_date);

CREATE INDEX idx_appointments_doctor_datetime
    ON appointments (
        doctor_id,
        appointment_date,
        appointment_time
    );

CREATE INDEX idx_appointments_created_at
    ON appointments (created_at);