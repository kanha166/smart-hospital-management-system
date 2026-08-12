// File: src/services/authService.js

import bcrypt from "bcrypt";
import Patient from "../models/Patient.js";
import User from "../models/User.js";
import RefreshToken from "../models/RefreshToken.js";

import {
    generateAccessToken,
    generateRefreshToken
} from "../utils/generateToken.js";



// REGISTER USER
export const register = async (userData) => {

   const {
    name,
    email,
    password
} = userData;

const role = "patient";

    const existingUser = await User.findByEmail(email);

    if (existingUser) {
        throw new Error("EMAIL_ALREADY_EXISTS");
    }


    const password_hash = await bcrypt.hash(password, 12);


    const createdUser = await User.create({
        name,
        email,
        password_hash,
        role
    });

    await Patient.create({

    user_id: createdUser.id,

    phone: null,

    date_of_birth: null,

    gender: null,

    blood_group: null,

    address: null,

    emergency_contact: null,

    profile_image: null

});

    const {
        password_hash: removedPassword,
        ...user
    } = createdUser;


    return user;

};




// LOGIN USER
export const login = async (email, password) => {

    const user = await User.findByEmail(email);


    if (!user) {
        throw new Error("INVALID_CREDENTIALS");
    }


    const passwordMatch = await bcrypt.compare(
        password,
        user.password_hash
    );


    if (!passwordMatch) {
        throw new Error("INVALID_CREDENTIALS");
    }


    const accessToken = generateAccessToken(user);

    const refreshToken = generateRefreshToken(user);


    const expiresAt = new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
    );


    await RefreshToken.create(
        user.id,
        refreshToken,
        expiresAt
    );



    const {
        password_hash,
        ...safeUser
    } = user;


    return {
        user: safeUser,
        accessToken,
        refreshToken
    };

};

// REFRESH ACCESS TOKEN
export const refreshAccessToken = async (token) => {

    const storedToken = await RefreshToken.find(token);


    if (!storedToken) {
        throw new Error("INVALID_REFRESH_TOKEN");
    }


    if (storedToken.revoked_at) {
        throw new Error("REFRESH_TOKEN_REVOKED");
    }


    if (new Date() > new Date(storedToken.expires_at)) {
        throw new Error("REFRESH_TOKEN_EXPIRED");
    }


    const user = await User.findById(
        storedToken.user_id
    );


    if (!user) {
        throw new Error("USER_NOT_FOUND");
    }


    const accessToken = generateAccessToken(user);


    return {
        accessToken
    };

};

// LOGOUT USER
export const logout = async (token) => {

    const storedToken = await RefreshToken.find(token);


    if (!storedToken) {
        throw new Error("INVALID_REFRESH_TOKEN");
    }


    await RefreshToken.revoke(token);


    return true;

};