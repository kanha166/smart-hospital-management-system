CREATE TABLE notifications (
    notification_id        BIGSERIAL PRIMARY KEY,
    user_id                BIGINT NOT NULL,
    title                  VARCHAR(255) NOT NULL,
    message                TEXT NOT NULL,
    notification_type      VARCHAR(30) NOT NULL DEFAULT 'System',
    priority               VARCHAR(20) NOT NULL DEFAULT 'Medium',
    is_read                BOOLEAN NOT NULL DEFAULT FALSE,
    sent_via               VARCHAR(30) NOT NULL DEFAULT 'In-App',
    scheduled_at           TIMESTAMPTZ,
    read_at                TIMESTAMPTZ,
    created_at             TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at             TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_notifications_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT chk_notifications_title
        CHECK (char_length(trim(title)) >= 2),

    CONSTRAINT chk_notifications_message
        CHECK (char_length(trim(message)) >= 1),

    CONSTRAINT chk_notifications_type
        CHECK (
            notification_type IN (
                'System',
                'Appointment',
                'Prescription',
                'Lab Report',
                'Billing',
                'Admission',
                'Discharge',
                'Reminder',
                'Emergency',
                'General'
            )
        ),

    CONSTRAINT chk_notifications_priority
        CHECK (
            priority IN (
                'Low',
                'Medium',
                'High',
                'Critical'
            )
        ),

    CONSTRAINT chk_notifications_sent_via
        CHECK (
            sent_via IN (
                'In-App',
                'Email',
                'SMS',
                'Push',
                'WhatsApp'
            )
        ),

    CONSTRAINT chk_notifications_read_at
        CHECK (
            read_at IS NULL
            OR read_at >= created_at
        )
);

CREATE TABLE audit_logs (
    audit_log_id           BIGSERIAL PRIMARY KEY,
    user_id                BIGINT,
    module_name            VARCHAR(100) NOT NULL,
    action                 VARCHAR(30) NOT NULL,
    table_name             VARCHAR(100) NOT NULL,
    record_id              BIGINT,
    old_values             JSONB,
    new_values             JSONB,
    ip_address             INET,
    user_agent             TEXT,
    created_at             TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_audit_logs_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    CONSTRAINT chk_audit_logs_module
        CHECK (char_length(trim(module_name)) >= 2),

    CONSTRAINT chk_audit_logs_table
        CHECK (char_length(trim(table_name)) >= 2),

    CONSTRAINT chk_audit_logs_action
        CHECK (
            action IN (
                'INSERT',
                'UPDATE',
                'DELETE',
                'LOGIN',
                'LOGOUT',
                'CREATE',
                'READ',
                'EXPORT',
                'IMPORT',
                'APPROVE',
                'REJECT',
                'OTHER'
            )
        )
);

CREATE INDEX idx_notifications_user_id
    ON notifications (user_id);

CREATE INDEX idx_notifications_type
    ON notifications (notification_type);

CREATE INDEX idx_notifications_priority
    ON notifications (priority);

CREATE INDEX idx_notifications_is_read
    ON notifications (is_read);

CREATE INDEX idx_notifications_created_at
    ON notifications (created_at);

CREATE INDEX idx_notifications_scheduled_at
    ON notifications (scheduled_at);

CREATE INDEX idx_notifications_user_read
    ON notifications (user_id, is_read);

CREATE INDEX idx_audit_logs_user_id
    ON audit_logs (user_id);

CREATE INDEX idx_audit_logs_module_name
    ON audit_logs (module_name);

CREATE INDEX idx_audit_logs_table_name
    ON audit_logs (table_name);

CREATE INDEX idx_audit_logs_action
    ON audit_logs (action);

CREATE INDEX idx_audit_logs_record_id
    ON audit_logs (record_id);

CREATE INDEX idx_audit_logs_created_at
    ON audit_logs (created_at);

CREATE INDEX idx_audit_logs_old_values_gin
    ON audit_logs
    USING GIN (old_values);

CREATE INDEX idx_audit_logs_new_values_gin
    ON audit_logs
    USING GIN (new_values);