/**
 * JWT Client Utilities for MentorLagbe
 * Handles storing, retrieving, clearing tokens and generating auth headers.
 */

const TOKEN_KEY = "access-token";

export const getAuthToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
};

export const setAuthToken = (token) => {
    if (typeof window === "undefined") return;
    if (token) {
        localStorage.setItem(TOKEN_KEY, token);
    } else {
        localStorage.removeItem(TOKEN_KEY);
    }
};

export const removeAuthToken = () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(TOKEN_KEY);
};

export const getAuthHeaders = (additionalHeaders = {}) => {
    const headers = { ...additionalHeaders };
    const token = getAuthToken();

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
};

/**
 * Fetch a fresh JWT from the server given an email address (or using session)
 * and store it in localStorage.
 */
export const syncJWT = async (email) => {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const response = await fetch(`${apiUrl}/api/jwt`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(email ? { email } : {}),
        });

        if (!response.ok) {
            console.error("Failed to sync JWT token, status:", response.status);
            return null;
        }

        const data = await response.json();
        if (data.token) {
            setAuthToken(data.token);
            return data.token;
        }
        return null;
    } catch (err) {
        console.error("syncJWT error:", err);
        return null;
    }
};
