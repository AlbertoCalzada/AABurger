// Pagina.jsx
import React from 'react';
import CountrySelector from '../../components/countrySelector'; // Asegúrate de que la ruta del archivo sea correcta

function SelectCountry() {
    return (
        <div>
            <CountrySelector /> {/* Aquí agregamos el componente CountrySelector */}
        </div>
    );
}

export default SelectCountry;
