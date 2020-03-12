import React from 'react';
import { FormGroup, FormControlLabel, Switch } from '@material-ui/core/';

function FilterCalendar() {

    const [checked, setChecked] = React.useState(false);

    const toggleChecked = () => {
        setChecked(prev => !prev);
    };

    return (
        <div>
            <FormGroup className="pt-4">
                <FormControlLabel
                    control={<Switch checked={checked} onChange={toggleChecked} />}
                    label="My vacations"
                />
                <FormControlLabel
                    control={<Switch checked={checked} onChange={toggleChecked} />}
                    label="All vacations"
                />
            </FormGroup>

        </div>
    )
}

export default FilterCalendar;