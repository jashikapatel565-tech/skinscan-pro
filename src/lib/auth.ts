export interface User {
  username: string;
}

const USERS_KEY = "skin_app_users";
const SESSION_KEY = "skin_app_session";

function getUsers(): Record<string, string> {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : {};
}

export function signUp(username: string, password: string): { success: boolean; error?: string } {
  const users = getUsers();
  if (users[username]) return { success: false, error: "Username already exists" };
  if (username.length < 3) return { success: false, error: "Username must be at least 3 characters" };
  if (password.length < 4) return { success: false, error: "Password must be at least 4 characters" };
  users[username] = password;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  localStorage.setItem(SESSION_KEY, username);
  return { success: true };
}

export function login(username: string, password: string): { success: boolean; error?: string } {
  const users = getUsers();
  if (!users[username] || users[username] !== password) {
    return { success: false, error: "Invalid username or password" };
  }
  localStorage.setItem(SESSION_KEY, username);
  return { success: true };
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function getCurrentUser(): User | null {
  const username = localStorage.getItem(SESSION_KEY);
  return username ? { username } : null;
}
