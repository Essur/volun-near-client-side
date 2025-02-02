import { useEffect, useState } from "react";
import { OrganizationResponseDTO } from "../../components/Types";
import { getAllOrganizations } from "../../services/OrganizationService";
import { Loading, Error, SubTitle, OrganizationList, OrganizationItem, OrganizationName } from "../../styles/StyledComponents";
import { OrganizationDetails } from "../../styles/StyledContainers";
import { useNavigate } from "react-router-dom";

const AllOrganizationsPage: React.FC = () => {
    const [organizations, setOrganizations] = useState<OrganizationResponseDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

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

    const goToOrganizationPage = (id: number) => {
        console.log(`Organization ID: ${id}`);
        navigate(`/organization/${id}`)
    };

    return (
        <>
            <SubTitle>All Organizations</SubTitle>
            <OrganizationList>
                {organizations.map((org) => (
                <OrganizationItem key={org.id} onClick={() => goToOrganizationPage(org.id)}>
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