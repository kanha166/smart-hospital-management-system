CREATE TABLE invoices (
    invoice_id              BIGSERIAL PRIMARY KEY,
    invoice_number          VARCHAR(50) NOT NULL,
    patient_id              BIGINT NOT NULL,
    admission_id            BIGINT,
    appointment_id          BIGINT,
    invoice_date            DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date                DATE NOT NULL,
    subtotal                NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    tax_amount              NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    discount_amount         NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    total_amount            NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    invoice_status          VARCHAR(30) NOT NULL DEFAULT 'Pending',
    notes                   TEXT,
    created_at              TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at              TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_invoices_patient
        FOREIGN KEY (patient_id)
        REFERENCES patients(patient_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_invoices_admission
        FOREIGN KEY (admission_id)
        REFERENCES admissions(admission_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    CONSTRAINT fk_invoices_appointment
        FOREIGN KEY (appointment_id)
        REFERENCES appointments(appointment_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    CONSTRAINT uq_invoices_invoice_number
        UNIQUE (invoice_number),

    CONSTRAINT chk_invoices_due_date
        CHECK (due_date >= invoice_date),

    CONSTRAINT chk_invoices_subtotal
        CHECK (subtotal >= 0),

    CONSTRAINT chk_invoices_tax
        CHECK (tax_amount >= 0),

    CONSTRAINT chk_invoices_discount
        CHECK (discount_amount >= 0),

    CONSTRAINT chk_invoices_total
        CHECK (total_amount >= 0),

    CONSTRAINT chk_invoices_status
        CHECK (
            invoice_status IN (
                'Draft',
                'Pending',
                'Partially Paid',
                'Paid',
                'Overdue',
                'Cancelled',
                'Refunded'
            )
        )
);

CREATE TABLE invoice_items (
    invoice_item_id         BIGSERIAL PRIMARY KEY,
    invoice_id              BIGINT NOT NULL,
    item_type               VARCHAR(50) NOT NULL,
    item_reference_id       BIGINT,
    description             TEXT NOT NULL,
    quantity                NUMERIC(10,2) NOT NULL DEFAULT 1.00,
    unit_price              NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    discount                NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    tax                     NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    line_total              NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    created_at              TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_invoice_items_invoice
        FOREIGN KEY (invoice_id)
        REFERENCES invoices(invoice_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT chk_invoice_items_type
        CHECK (
            item_type IN (
                'Consultation',
                'Admission',
                'Room',
                'Medicine',
                'Lab Test',
                'Procedure',
                'Surgery',
                'Nursing',
                'Equipment',
                'Other'
            )
        ),

    CONSTRAINT chk_invoice_items_quantity
        CHECK (quantity > 0),

    CONSTRAINT chk_invoice_items_unit_price
        CHECK (unit_price >= 0),

    CONSTRAINT chk_invoice_items_discount
        CHECK (discount >= 0),

    CONSTRAINT chk_invoice_items_tax
        CHECK (tax >= 0),

    CONSTRAINT chk_invoice_items_line_total
        CHECK (line_total >= 0)
);

CREATE TABLE payments (
    payment_id                  BIGSERIAL PRIMARY KEY,
    invoice_id                  BIGINT NOT NULL,
    patient_id                  BIGINT NOT NULL,
    payment_date                TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    payment_method              VARCHAR(30) NOT NULL,
    transaction_reference       VARCHAR(150),
    amount_paid                 NUMERIC(12,2) NOT NULL,
    payment_status              VARCHAR(30) NOT NULL DEFAULT 'Completed',
    remarks                     TEXT,
    created_at                  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at                  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_payments_invoice
        FOREIGN KEY (invoice_id)
        REFERENCES invoices(invoice_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_payments_patient
        FOREIGN KEY (patient_id)
        REFERENCES patients(patient_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT uq_payments_transaction_reference
        UNIQUE (transaction_reference),

    CONSTRAINT chk_payments_amount
        CHECK (amount_paid > 0),

    CONSTRAINT chk_payments_method
        CHECK (
            payment_method IN (
                'Cash',
                'Credit Card',
                'Debit Card',
                'UPI',
                'Net Banking',
                'Cheque',
                'Insurance',
                'Wallet',
                'Other'
            )
        ),

    CONSTRAINT chk_payments_status
        CHECK (
            payment_status IN (
                'Pending',
                'Completed',
                'Failed',
                'Refunded',
                'Cancelled'
            )
        )
);

CREATE INDEX idx_invoices_invoice_number
    ON invoices (invoice_number);

CREATE INDEX idx_invoices_patient
    ON invoices (patient_id);

CREATE INDEX idx_invoices_admission
    ON invoices (admission_id);

CREATE INDEX idx_invoices_appointment
    ON invoices (appointment_id);

CREATE INDEX idx_invoices_invoice_date
    ON invoices (invoice_date);

CREATE INDEX idx_invoices_due_date
    ON invoices (due_date);

CREATE INDEX idx_invoices_status
    ON invoices (invoice_status);

CREATE INDEX idx_invoice_items_invoice
    ON invoice_items (invoice_id);

CREATE INDEX idx_invoice_items_type
    ON invoice_items (item_type);

CREATE INDEX idx_invoice_items_reference
    ON invoice_items (item_reference_id);

CREATE INDEX idx_payments_invoice
    ON payments (invoice_id);

CREATE INDEX idx_payments_patient
    ON payments (patient_id);

CREATE INDEX idx_payments_date
    ON payments (payment_date);

CREATE INDEX idx_payments_method
    ON payments (payment_method);

CREATE INDEX idx_payments_status
    ON payments (payment_status);

CREATE INDEX idx_payments_transaction_reference
    ON payments (transaction_reference);