import React from 'react';
import Select from 'react-select';
import './calendar-search-select.css';

const SearchSelect = props => {

    return (
        <Select
            className='react-select-container' //class needed to style the search-select
            classNamePrefix="react-select" //prefix needed to style the search-select
            value={props.selectedOption}
            onChange={props.change}
            options={props.options}
        />
    );
}


export default SearchSelect;