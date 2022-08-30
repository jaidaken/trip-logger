/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Controller } from 'react-hook-form';
import EB from '../../ErrorBoundary';

function DatePicker({ control, ...props }) {
  console.log('dp props', props);

  return (
    <EB>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          render={({
            field: {
              name, onBlur, onChange, value, ref,
            },
            formState: { errors },
            fieldState,
          }) => (
            <DesktopDatePicker
              inputFormat="DD/MM/YYYY"
              onChange={onChange}
              value={value}
              renderInput={(params) => (
                <TextField
                  {...params}
                  inputRef={ref}
                  onBlur={onBlur}
                  error={errors.date}
                  helperText={errors.date?.message}
                  id="date"
                  name={name}
                  label="Date"
                />
              )}
            />
          )}
          name="date"
          control={control}
          rules={{ required: true }}
        />
      </LocalizationProvider>
    </EB>
  );
}

export default DatePicker;
