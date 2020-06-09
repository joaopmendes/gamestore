import { FieldProps } from 'formik';
import React from 'react';
import Select from 'react-select';

export const SelectField: React.FC<any> = (props) => {
  console.log("props", props)
  const {field, form, options} = props;
  return (
    <>
      <label htmlFor={field.name}>Categories</label>
      <Select
        id={field.name}
        options={options}
        name={field.name}
        value={field.value}
        isMulti
        onChange={(option: any) => form.setFieldValue(field.name, option, true)}
        onBlur={() => {
          form.setFieldTouched(field.name)
        }}
      />
      <p style={{ color: 'red' }}>{form.touched.categories && form.errors.categories && form.errors.categories}</p>

    </>
  );
};