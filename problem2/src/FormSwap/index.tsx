import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./index.module.css";
import { useCurrencyRates } from "../@hook/useCurrencyRates";
import SelectField from "../@common/select/selectField";
import InputField from "../@common/input/inputField";

const validationSchema = {
  fromCurrency: Yup.string().required(
    "You have not entered information about the Currency form"
  ),
  toCurrency: Yup.string().required(
    "You have not entered information about the Currency form"
  ),
  amount: Yup.number()
    .positive("You have to entered number than zero")
    .required("You have not entered information about amount"),
};

const CurrencySwapForm = () => {
  const { rates, error } = useCurrencyRates();
  const [loading, setLoading] = useState<boolean>(false);
  const [amountReceive, setAmountReceive] = useState<number>();

  const formik = useFormik({
    initialValues: {
      fromCurrency: "",
      toCurrency: "",
      amount: 0,
    },
    validationSchema: Yup.object(validationSchema),
    onSubmit: (values) => {
      setLoading(true);
      // Mock API call with timeout
      setTimeout(() => {
        const fromPrice = rates.find(
          (e) => e.currency === values.fromCurrency
        )?.price;
        const toPrice = rates.find(
          (e) => e.currency === values.toCurrency
        )?.price;
        if (toPrice && fromPrice)
          setAmountReceive((fromPrice / toPrice) * values.amount);
        setLoading(false);
      }, 1000);
    },
  });

  if (error) return <div>Something wrong</div>;

  return (
    <div className={styles.currencySwapForm}>
      <h1>Currency Swap</h1>
      <form onSubmit={formik.handleSubmit}>
        <SelectField
          formik={formik}
          label="From"
          options={rates}
          optionName="currency"
          id="fromCurrency"
          name="fromCurrency"
          placeHolder="Select currency to send"
        />
        <SelectField
          formik={formik}
          label="From"
          options={rates}
          optionName="currency"
          id="toCurrency"
          name="toCurrency"
          placeHolder="Select currency to receive"
        />
        <InputField
          formik={formik}
          id="amount"
          name="amount"
          type="number"
          label="Amount"
        />
        <div> Amount to receive : {amountReceive}</div>
        <button type="submit" disabled={loading}>
          {loading ? "Swapping..." : "Swap"}
        </button>
      </form>
    </div>
  );
};

export default CurrencySwapForm;
