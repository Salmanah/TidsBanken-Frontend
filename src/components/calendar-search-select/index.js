import React from 'react';
import Select from 'react-select';
import './calendar-search-select.css';

function SearchSelect() {
    const [options, setOptions] = React.useState
        ([
            { value: 'Ola Helgesen', label: 'Ola Helgesen' },
            { value: 'Heidi Furnes', label: 'Heidi Furnes' },
            { value: 'Åge Alexander', label: 'Åge Alexander' },
        ]);

    const [selectedOption, setSelectedOption] = React.useState(null)

    const handleChange = selectedOption => {
        setSelectedOption(selectedOption)
    };

    return (
        <Select
            className='react-select-container' //class needed to style the search-select
            classNamePrefix="react-select" //prefix needed to style the search-select
            value={selectedOption}
            onChange={handleChange}
            options={options}
        />
    );
}


export default SearchSelect;