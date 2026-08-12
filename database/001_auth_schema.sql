CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS citext;

CREATE TABLE roles (
    role_id          BIGSERIAL PRIMARY KEY,
    role_name        VARCHAR(50) NOT NULL,
    description      TEXT,
    is_active        BOOLEAN NOT NULL DEFAULT TRUE,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT uq_roles_role_name UNIQUE (role_name),
    CONSTRAINT chk_roles_role_name CHECK (char_length(trim(role_name)) >= 2)
);

CREATE TABLE users (
    user_id              BIGSERIAL PRIMARY KEY,
    first_name           VARCHAR(100) NOT NULL,
    last_name            VARCHAR(100) NOT NULL,
    username             CITEXT NOT NULL,
    email                CITEXT NOT NULL,
    password_hash        VARCHAR(255) NOT NULL,
    phone_number         VARCHAR(20),
    profile_image_url    TEXT,
    is_email_verified    BOOLEAN NOT NULL DEFAULT FALSE,
    is_phone_verified    BOOLEAN NOT NULL DEFAULT FALSE,
    is_active            BOOLEAN NOT NULL DEFAULT TRUE,
    last_login_at        TIMESTAMPTZ,
    created_at           TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at           TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT uq_users_username UNIQUE (username),
    CONSTRAINT uq_users_email UNIQUE (email),

    CONSTRAINT chk_users_first_name
        CHECK (char_length(trim(first_name)) >= 2),

    CONSTRAINT chk_users_last_name
        CHECK (char_length(trim(last_name)) >= 2),

    CONSTRAINT chk_users_phone
        CHECK (
            phone_number IS NULL
            OR phone_number ~ '^[0-9+ -]{7,20}$'
        )
);

CREATE TABLE user_roles (
    user_role_id     BIGSERIAL PRIMARY KEY,
    user_id          BIGINT NOT NULL,
    role_id          BIGINT NOT NULL,
    assigned_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    assigned_by      BIGINT,

    CONSTRAINT fk_user_roles_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_user_roles_role
        FOREIGN KEY (role_id)
        REFERENCES roles(role_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_user_roles_assigned_by
        FOREIGN KEY (assigned_by)
        REFERENCES users(user_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    CONSTRAINT uq_user_roles_user_role
        UNIQUE (user_id, role_id)
);

CREATE TABLE refresh_tokens (
    refresh_token_id     BIGSERIAL PRIMARY KEY,
    user_id              BIGINT NOT NULL,
    token                UUID NOT NULL DEFAULT gen_random_uuid(),
    expires_at           TIMESTAMPTZ NOT NULL,
    revoked_at           TIMESTAMPTZ,
    created_at           TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ip_address           INET,
    user_agent           TEXT,

    CONSTRAINT fk_refresh_tokens_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT uq_refresh_tokens_token
        UNIQUE (token),

    CONSTRAINT chk_refresh_tokens_expiry
        CHECK (expires_at > created_at),

    CONSTRAINT chk_refresh_tokens_revoked
        CHECK (
            revoked_at IS NULL
            OR revoked_at >= created_at
        )
);

CREATE INDEX idx_roles_is_active
    ON roles (is_active);

CREATE INDEX idx_users_email
    ON users (email);

CREATE INDEX idx_users_username
    ON users (username);

CREATE INDEX idx_users_phone_number
    ON users (phone_number);

CREATE INDEX idx_users_is_active
    ON users (is_active);

CREATE INDEX idx_users_created_at
    ON users (created_at);

CREATE INDEX idx_user_roles_user_id
    ON user_roles (user_id);

CREATE INDEX idx_user_roles_role_id
    ON user_roles (role_id);

CREATE INDEX idx_refresh_tokens_user_id
    ON refresh_tokens (user_id);

CREATE INDEX idx_refresh_tokens_token
    ON refresh_tokens (token);

CREATE INDEX idx_refresh_tokens_expires_at
    ON refresh_tokens (expires_at);

CREATE INDEX idx_refresh_tokens_revoked_at
    ON refresh_tokens (revoked_at);