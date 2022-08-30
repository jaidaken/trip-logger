import React, { useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
// import { useParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import { PlacesContext } from '../../contexts/places.context';
import DatePicker from './components/DatePicker';
import CountriesSelect from './components/CountriesSelect';

import { TripsContext } from '../../contexts/trips.context';
// import ErrorBoundary from "./../../components/error-boundary/ErrorBoundary";

const schema = yup.object().shape({
  place: yup.string().required().min(2).max(20),
  date: yup.date().required(),
});

function TripForm() {
  const defaultValues = {
    date: null,
    place: '',
  };

  const { addTrip } = useContext(TripsContext);
  const { places } = useContext(PlacesContext);

  const {
    handleSubmit, control, reset, formState, watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues,
  });

  // console.log('formState', formState);
  const { isDirty, isValid, errors } = formState;

  // console.log('errors', errors);
  const onSubmit = async (formValues) => {
    // treat data
    formValues.date = dayjs(formValues.date).format('YYYY-MM-DD'); // format
    formValues.place = places.find((place) => place.name.common === formValues.place)?._id;
    // console.log('re-formatted formValues', formValues);
    addTrip(formValues);
    reset(defaultValues);
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => console.log(value, name, type));
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ margin: '15px auto' }}>
        <CountriesSelect
          control={control}
          name="place"
          options={places}
          getOptionLabel={(option) => option.name.common}
          renderOption={(props, option) => (
            <Box
              {...props}
              key={option._id}
              component="li"
              sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            >
              <img loading="lazy" width="20" src={option.flags.svg} alt="" />
              {option.name.common}
              {' '}
              (
              {option.cca3}
              )
            </Box>
          )}
          renderInput={({ formState, fieldState, ...params }) => (
            <TextField
              {...params}
              label="Choose a destination"
              error={errors.place}
              // defaultValue={null}
            />
          )}
        />
      </div>
      <div style={{ margin: '15px auto' }}>
        <DatePicker control={control} errors={errors} />
      </div>
      {/* <div style={{ margin: "15px auto" }}>
        FormState: {JSON.stringify(formState)}
      </div>
      <div>
        isDirty: {isDirty ? "true" : "false"}, isValid:{" "}
        {isValid ? "true" : "false"}
      </div> */}
      <div style={{ margin: '15px auto' }}>
        <Button onClick={() => reset({ ...defaultValues })}>Reset</Button>
        <Button type="submit" variant="contained" color="primary" disabled={!isValid || !isDirty}>
          Add Trip
        </Button>
      </div>
      {/* {JSON.stringify(places)} */}
    </form>
  );
}

export default TripForm;
