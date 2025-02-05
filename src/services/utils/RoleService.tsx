export const getRole = (): string | undefined => {
    const role = localStorage.getItem("role");
    return role?.substring(5, role.length).toLowerCase();
};