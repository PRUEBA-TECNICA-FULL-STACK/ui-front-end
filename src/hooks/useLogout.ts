import Cookies from "js-cookie";

export const useLogout = () => {
    const logout = () => {
        Cookies.remove("currentUser");
        return window.location.href="/";
    }
    return { logout };
}