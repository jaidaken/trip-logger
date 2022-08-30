/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import { Controller } from 'react-hook-form';
// import { PlacesContext } from "./../../../contexts/places.context";
import EB from '../../ErrorBoundary';

function CountriesSelect({
  options = [],
  renderInput,
  getOptionLabel,
  onChange: ignored,
  control,
  defaultValue,
  name,
  renderOption,
}) {
  return (
    <EB>
      <Controller
        render={(props) => (
          <>
            {console.log('controller props', props.field)}
            <Autocomplete
              {...props}
              options={options}
              sx={{ width: 300 }}
              getOptionLabel={getOptionLabel}
              renderOption={renderOption}
              renderInput={renderInput}
              onChange={(e, data, reason) => {
                console.log('oc', reason);
                // console.log(props);
                props.field.onChange(data.name.common);
              }}
              // value={props?.field?.value || ''}
            />
          </>
        )}
        onChange={([, data]) => data}
        // defaultValue={defaultValue}
        name={name}
        control={control}
      />
    </EB>
  );
}

export default CountriesSelect;
