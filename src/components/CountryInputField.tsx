import { useEffect, useState } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { fetchCountries } from "../services/LocationFetcherService";
import { Input, Error } from "../styles/GlobalStyledComponents";
import { DropdownHintItem, DropdownHints } from "../styles/StyledForm";
import { ActivityRequest, OrganizationInputs } from "../types/Types";

interface ActivityCountryInputFieldProps {
    register: UseFormRegister<ActivityRequest>;
    errors: FieldErrors<ActivityRequest>;
    setValue: UseFormSetValue<ActivityRequest>;
}
interface RegistrationCountryInputFieldProps {
    register: UseFormRegister<OrganizationInputs>;
    errors: FieldErrors<OrganizationInputs>;
    setValue: UseFormSetValue<OrganizationInputs>;
}


const CountryInputField: React.FC<ActivityCountryInputFieldProps | RegistrationCountryInputFieldProps> = ({ register, errors, setValue }) => {
    const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
    const [countries, setCountries] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try {
                const countries = await fetchCountries();
                setCountries(countries);
            } catch (error) {
                console.error("Failed to fetch data");
            }
        };
        loadData();
    }, []);

    useEffect(() => {
        if (query.length > 0) {
            const filtered = countries.filter(country =>
                country.name.common.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredCountries(filtered);
        } else {
            setFilteredCountries([]);
        }
    }, [query, countries]);

    return (
        <div style={{ position: 'relative' }}>
            <Input
                type="text"
                placeholder="Search for a country"
                {...register("country", { required: "Country is required" })}
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="off"
            />
            {filteredCountries.length > 0 && (
                <DropdownHints>
                    {filteredCountries.map((country) => (
                        <DropdownHintItem
                            key={country.cca3}
                            onClick={() => {
                                setValue("country", country.name.common);
                                setQuery(country.name.common);
                                setFilteredCountries([]);
                            }}
                        >
                            {country.name.common}
                        </DropdownHintItem>
                    ))}
                </DropdownHints>
            )}
            {errors.country && <Error>{errors.country.message}</Error>}
        </div>

    )
}

export default CountryInputField;