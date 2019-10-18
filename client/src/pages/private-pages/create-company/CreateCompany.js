import React, { useState } from "react";
import {
  Button,
  Form,
  Segment,
  Grid,
  Responsive,
  Transition,
  Message
} from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
// import { AuthContext } from "../../context/auth";
import { stateOptions } from "../../../helpers/stateOptions";

function CreateCompany(props) {
  // const context = useContext(AuthContext);
  const companyTypeOptions = [
    { key: "1", text: "Non Profit", value: "NON_PROFIT" },
    { key: "2", text: "Self Employed", value: "SELF_EMPLOYED" },
    { key: "3", text: "Sole Proprietorship", value: "SOLE_PROPRIETORSHIP" },
    { key: "4", text: "Partnership", value: "PARTNERSHIP" },
    { key: "5", text: "Privately Held", value: "PRIVATELY_HELD" },
    { key: "6", text: "Government Agency", value: "GOVERNMENT_AGENCY" },
    { key: "7", text: "Public Company", value: "PUBLIC_COMPANY" }
  ];
  const countryOptions = [{ key: "1", text: "United States", value: "US" }];
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    name: "",
    address: {
      streetAddress1: "",
      streetAddress2: "",
      zip: "",
      city: "",
      state: "",
      country: "US"
    },
    phone: "",
    einNumber: "",
    companyType: "NON_PROFIT"
  });

  const onAddressChange = (event, result) => {
    const { address } = { ...values };
    const currentAddress = address;
    const { name, value } = result || event.target;
    currentAddress[name] = value;
    setValues({ ...values, address: currentAddress });
  };

  const onChange = (event, result) => {
    const { name, value } = result || event.target;
    setValues({ ...values, [name]: value });
  };

  const [createCompany, { loading }] = useMutation(CREATE_COMPANY, {
    update(
      proxy,
      {
        data: { createCompany: companyData }
      }
    ) {
      console.log(companyData);
      props.history.push("/account/company");
    },
    onError(err) {
      console.log(err);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  const onSubmit = (event) => {
    event.preventDefault();
    createCompany();
  };

  return (
    <Grid centered columns={2} doubling padded={"horizontally"}>
      <Grid.Column>
        {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
        <Responsive as={Segment}>
          <Form
            noValidate
            onSubmit={onSubmit}
            className={loading ? "loading" : ""}
          >
            <Form.Group widths="equal">
              <Form.Input
                label="Company Name"
                placeholder="Company Name"
                name="name"
                type="text"
                value={values.name}
                onChange={onChange}
                error={errors.name ? true : false}
              />
              <Form.Dropdown
                placeholder="Company Type"
                name="companyType"
                label="Company Type"
                selection
                onChange={onChange}
                options={companyTypeOptions}
                value={values.companyType}
              />
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Input
                label="EIN Number"
                placeholder="EIN Number"
                name="einNumber"
                type="password"
                value={values.einNumber}
                onChange={onChange}
                error={errors.einNumber ? true : false}
              />
              <Form.Input
                label="Phone"
                placeholder="Phone"
                name="phone"
                type="tel"
                value={values.phone}
                onChange={onChange}
                error={errors.phone ? true : false}
              />
            </Form.Group>
            <Form.Input
              label="Address Line 1"
              placeholder="Address Line 1"
              name="streetAddress1"
              type="text"
              value={values.streetAddress1}
              onChange={onAddressChange}
              error={errors.streetAddress1 ? true : false}
            />
            <Form.Input
              label="Address Line 2"
              placeholder="Address Line 2"
              name="streetAddress2"
              type="text"
              value={values.streetAddress2}
              onChange={onAddressChange}
              error={errors.streetAddress2 ? true : false}
            />

            <Form.Group widths="equal">
              <Form.Input
                label="Zip Code"
                placeholder="Zip Code"
                name="zip"
                type="text"
                value={values.zip}
                onChange={onAddressChange}
                error={errors.zip ? true : false}
              />
              <Form.Input
                label="City"
                placeholder="City"
                name="city"
                type="text"
                value={values.city}
                onChange={onAddressChange}
                error={errors.city ? true : false}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Dropdown
                placeholder="State"
                name="state"
                label="State"
                selection
                search
                onChange={onAddressChange}
                options={stateOptions}
                value={values.stateOptions}
              />
              <Form.Dropdown
                placeholder="Country"
                name="country"
                label="Country"
                selection
                defaultValue="US"
                onChange={onAddressChange}
                options={countryOptions}
                value={values.countryOptions}
              />
            </Form.Group>

            <Button type="submit" primary>
              Create Company
            </Button>
          </Form>
        </Responsive>
        <Transition.Group animation="fade up" duration={500}>
          {Object.keys(errors).length > 0 && (
            <Message error list={Object.values(errors)}></Message>
          )}
        </Transition.Group>
      </Grid.Column>
    </Grid>
  );
}

const CREATE_COMPANY = gql`
  mutation createCompany(
    $name: String!
    $address: address!
    $phone: String!
    $einNumber: String!
    $companyType: CompanyTypeEnum!
  ) {
    createCompany(
      input: {
        name: $name
        address: $address
        phone: $phone
        einNumber: $einNumber
        companyType: $companyType
      }
    ) {
      _id
      name
      phone
      einNumber
      companyType
      dateCreated
    }
  }
`;

export default CreateCompany;
