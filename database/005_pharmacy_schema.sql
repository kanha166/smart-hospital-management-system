CREATE TABLE medicines (
    medicine_id         BIGSERIAL PRIMARY KEY,
    medicine_name       VARCHAR(150) NOT NULL,
    generic_name        VARCHAR(150),
    manufacturer        VARCHAR(150) NOT NULL,
    category            VARCHAR(100) NOT NULL,
    dosage_form         VARCHAR(50) NOT NULL,
    strength            VARCHAR(50) NOT NULL,
    unit_price          NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    description         TEXT,
    is_active           BOOLEAN NOT NULL DEFAULT TRUE,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT uq_medicines_name_strength_manufacturer
        UNIQUE (
            medicine_name,
            strength,
            manufacturer
        ),

    CONSTRAINT chk_medicines_name
        CHECK (char_length(trim(medicine_name)) >= 2),

    CONSTRAINT chk_medicines_manufacturer
        CHECK (char_length(trim(manufacturer)) >= 2),

    CONSTRAINT chk_medicines_category
        CHECK (char_length(trim(category)) >= 2),

    CONSTRAINT chk_medicines_dosage_form
        CHECK (
            dosage_form IN (
                'Tablet',
                'Capsule',
                'Syrup',
                'Injection',
                'Drops',
                'Cream',
                'Ointment',
                'Gel',
                'Powder',
                'Suspension',
                'Inhaler',
                'Solution',
                'Patch',
                'Suppository',
                'Other'
            )
        ),

    CONSTRAINT chk_medicines_unit_price
        CHECK (unit_price >= 0)
);

CREATE TABLE pharmacy_inventory (
    inventory_id            BIGSERIAL PRIMARY KEY,
    medicine_id             BIGINT NOT NULL,
    batch_number            VARCHAR(100) NOT NULL,
    quantity_in_stock       INTEGER NOT NULL DEFAULT 0,
    reorder_level           INTEGER NOT NULL DEFAULT 10,
    expiry_date             DATE NOT NULL,
    supplier_name           VARCHAR(150) NOT NULL,
    created_at              TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at              TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_inventory_medicine
        FOREIGN KEY (medicine_id)
        REFERENCES medicines(medicine_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT uq_inventory_batch
        UNIQUE (
            medicine_id,
            batch_number
        ),

    CONSTRAINT chk_inventory_quantity
        CHECK (quantity_in_stock >= 0),

    CONSTRAINT chk_inventory_reorder
        CHECK (reorder_level >= 0),

    CONSTRAINT chk_inventory_expiry
        CHECK (expiry_date >= CURRENT_DATE),

    CONSTRAINT chk_inventory_supplier
        CHECK (char_length(trim(supplier_name)) >= 2)
);

CREATE TABLE prescriptions (
    prescription_id         BIGSERIAL PRIMARY KEY,
    patient_id              BIGINT NOT NULL,
    doctor_id               BIGINT NOT NULL,
    appointment_id          BIGINT,
    prescription_date       DATE NOT NULL DEFAULT CURRENT_DATE,
    notes                   TEXT,
    created_at              TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at              TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_prescriptions_patient
        FOREIGN KEY (patient_id)
        REFERENCES patients(patient_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_prescriptions_doctor
        FOREIGN KEY (doctor_id)
        REFERENCES doctors(doctor_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_prescriptions_appointment
        FOREIGN KEY (appointment_id)
        REFERENCES appointments(appointment_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    CONSTRAINT chk_prescription_date
        CHECK (prescription_date <= CURRENT_DATE)
);

CREATE TABLE prescription_items (
    prescription_item_id    BIGSERIAL PRIMARY KEY,
    prescription_id         BIGINT NOT NULL,
    medicine_id             BIGINT NOT NULL,
    dosage                  VARCHAR(100) NOT NULL,
    frequency               VARCHAR(100) NOT NULL,
    duration                VARCHAR(100) NOT NULL,
    instructions            TEXT,
    quantity                INTEGER NOT NULL,

    CONSTRAINT fk_prescription_items_prescription
        FOREIGN KEY (prescription_id)
        REFERENCES prescriptions(prescription_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_prescription_items_medicine
        FOREIGN KEY (medicine_id)
        REFERENCES medicines(medicine_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT uq_prescription_item
        UNIQUE (
            prescription_id,
            medicine_id
        ),

    CONSTRAINT chk_prescription_item_dosage
        CHECK (char_length(trim(dosage)) >= 1),

    CONSTRAINT chk_prescription_item_frequency
        CHECK (char_length(trim(frequency)) >= 1),

    CONSTRAINT chk_prescription_item_duration
        CHECK (char_length(trim(duration)) >= 1),

    CONSTRAINT chk_prescription_item_quantity
        CHECK (quantity > 0)
);

CREATE INDEX idx_medicines_name
    ON medicines (medicine_name);

CREATE INDEX idx_medicines_generic_name
    ON medicines (generic_name);

CREATE INDEX idx_medicines_category
    ON medicines (category);

CREATE INDEX idx_medicines_manufacturer
    ON medicines (manufacturer);

CREATE INDEX idx_medicines_is_active
    ON medicines (is_active);

CREATE INDEX idx_inventory_medicine
    ON pharmacy_inventory (medicine_id);

CREATE INDEX idx_inventory_batch
    ON pharmacy_inventory (batch_number);

CREATE INDEX idx_inventory_expiry
    ON pharmacy_inventory (expiry_date);

CREATE INDEX idx_inventory_supplier
    ON pharmacy_inventory (supplier_name);

CREATE INDEX idx_inventory_quantity
    ON pharmacy_inventory (quantity_in_stock);

CREATE INDEX idx_prescriptions_patient
    ON prescriptions (patient_id);

CREATE INDEX idx_prescriptions_doctor
    ON prescriptions (doctor_id);

CREATE INDEX idx_prescriptions_appointment
    ON prescriptions (appointment_id);

CREATE INDEX idx_prescriptions_date
    ON prescriptions (prescription_date);

CREATE INDEX idx_prescription_items_prescription
    ON prescription_items (prescription_id);

CREATE INDEX idx_prescription_items_medicine
    ON prescription_items (medicine_id);

CREATE INDEX idx_prescription_items_prescription_medicine
    ON prescription_items (
        prescription_id,
        medicine_id
    );