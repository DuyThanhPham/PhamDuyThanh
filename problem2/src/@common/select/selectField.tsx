import styles from "./selectField.module.css";

const SelectField = (props: any) => {
  const { label, placeHolder, name, formik, options, optionName, ...rest } =
    props;

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <select
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
        {...rest}
      >
        <option value="" label={placeHolder} />
        {options.map((option: any) => (
          <option key={option[optionName]} value={option[optionName]}>
            {option[optionName]}
          </option>
        ))}
      </select>
      {formik.touched[name] && formik.errors[name] ? (
        <div className={styles.formError}>{formik.errors[name]}</div>
      ) : null}
    </div>
  );
};

export default SelectField;
