import { useNavigate } from "react-router-dom";

export const useAppNavigation = () => {
    const navigate = useNavigate();

    const goTo = (path: string | 0) => {
        if (path == 0) {
            navigate(0);
        } else {
            navigate(path);
        }
    };

    const goToWithId = (path: string, id: number) => {
        navigate(`${path}/${id}`);
    };

    return { goTo, goToWithId };
};
