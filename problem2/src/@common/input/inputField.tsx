import styles from "./inputField.module.css";

const InputField = (props: any) => {
  const { label, name, placeHolder, formik, options, optionName, ...rest } =
    props;

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
        {...rest}
      />
      {formik.touched[name] && formik.errors[name] ? (
        <div className={styles.formError}>{formik.errors[name]}</div>
      ) : null}
    </div>
  );
};

export default InputField;
