'use client'
import React, { useState } from 'react';
import ReactFlagsSelect from "react-flags-select";
import { getCountryCallingCode } from 'libphonenumber-js';

function CountrySelector({ onSelect }) {
    const [selected, setSelected] = useState("ES");
    const [selectedPrefix, setSelectedPrefix] = useState("");

    const handleSelect = (code) => {
        setSelected(code);
        const prefix = getCountryCallingCode(code);
        setSelectedPrefix(`+${prefix}`);
        onSelect(code); // Llama a la función onSelect pasada como prop
    };

    return (
        <div style={{ minWidth: '200px' }}>
            <ReactFlagsSelect
                selected={selected}
                onSelect={handleSelect}
                showSelectedLabel={false} 
                placeholder="Selecciona el país"
                className="mr-4" 
            />
          
        </div>
    );
}

export default CountrySelector;
