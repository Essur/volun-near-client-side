import { useEffect, useState } from "react";
import { useAppNavigation } from "../../services/utils/AppNavigation";
import { OrganizationResponseDTO } from "../../types/Types";
import { getAllOrganizations } from "../../services/OrganizationService";
import { Error, Loading, OrganizationItem, OrganizationList, OrganizationName, SubTitle } from "../../styles/GlobalStyledComponents";
import { OrganizationDetails } from "../../styles/GlobalStyledContainers";

const AllOrganizationsPage: React.FC = () => {
    const [organizations, setOrganizations] = useState<OrganizationResponseDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const { goToWithId } = useAppNavigation();

    useEffect(() => {
        const fetchOrganizations = async () => {
            try {
                const data = await getAllOrganizations();
                setOrganizations(data);
            } catch (err) {
                setError('Failed to load organizations');
            } finally {
                setLoading(false);
            }
        };

        fetchOrganizations();
    }, []);

    if (loading) {
        return <Loading>Loading...</Loading>;
    }

    if (error) {
        return <Error>{error}</Error>;
    }

    return (
        <>
            <SubTitle>All Organizations</SubTitle>
            <OrganizationList>
                {organizations.map((org) => (
                    <OrganizationItem key={org.id} onClick={() => goToWithId("/organization", org.id)}>
                        <OrganizationName>{org.nameOfOrganization}</OrganizationName> ({org.city}, {org.country})
                        <OrganizationDetails>
                            Address: {org.address}, Email: {org.email}
                        </OrganizationDetails>
                    </OrganizationItem>
                ))}
            </OrganizationList>
        </>
    );
};

export default AllOrganizationsPage;