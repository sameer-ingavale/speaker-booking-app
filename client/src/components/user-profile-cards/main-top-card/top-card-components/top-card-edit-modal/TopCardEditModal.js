import React, { useState } from "react";
import { Grid, Modal, Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { stateOptions } from "../../../../../helpers/stateOptions";

function TopCardEditModal({ pageUser, openModal, modalOpen }) {
  const [values, setValues] = useState({
    firstName: `${pageUser.firstName}`,
    lastName: `${pageUser.lastName}`,
    headline: pageUser.headline === null ? "" : `${pageUser.headline}`,
    city: pageUser.city === null ? "" : `${pageUser.city}`,
    state: pageUser.state === null ? "" : `${pageUser.state}`,
    gender: pageUser.gender === null ? "" : `${pageUser.gender}`,
    age: pageUser.age === null ? "" : `${pageUser.age}`
  });

  const genderOptions = [
    { key: "1", text: "Male", value: "Male" },
    { key: "2", text: "Female", value: "Female" },
    { key: "3", text: "Other", value: "Other" }
  ];

  const onChange = (event, result) => {
    const { name, value } = result || event.target;
    setValues({ ...values, [name]: value });
  };

  const [editProfileIntro] = useMutation(EDIT_PROFILE_INTRO, {
    update(proxy, data) {
      console.log(data);
    },
    variables: values
  });

  const onSubmit = async () => {
    openModal();
    await editProfileIntro();
    window.location.reload();
  };

  return (
    <Grid.Column width={10}>
      <Modal dimmer="blurring" open={modalOpen.open} onClose={openModal}>
        <Modal.Header>Edit Intro</Modal.Header>
        <Modal.Content scrolling>
          <Form>
            <Form.Group widths="equal">
              <Form.Input
                label="First Name"
                placeholder="First Name"
                name="firstName"
                type="text"
                value={values.firstName}
                onChange={onChange}
                // error={errors.title ? true : false}
              />
              <Form.Input
                placeholder="Last Name"
                name="lastName"
                label="Last Name"
                type="text"
                onChange={onChange}
                value={values.lastName}
              />
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Dropdown
                placeholder="State"
                name="state"
                label="State"
                selection
                onChange={onChange}
                options={stateOptions}
                value={values.state}
                //error={errors.state ? true : false}
              />
              <Form.Input
                label="City"
                placeholder="City"
                name="city"
                type="text"
                value={values.city}
                onChange={onChange}
                //error={errors.city ? true : false}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Dropdown
                placeholder="Gender"
                name="gender"
                label="Gender"
                selection
                onChange={onChange}
                options={genderOptions}
                value={values.gender}
                //error={errors.state ? true : false}
              />
              <Form.Input
                label="Age"
                placeholder="Age"
                name="age"
                type="text"
                value={values.age}
                onChange={onChange}
                //error={errors.city ? true : false}
              />
            </Form.Group>
            <Form.TextArea
              className="textarea"
              rows="2"
              label="headline"
              placeholder="Your headline goes here"
              name="headline"
              value={values.headline}
              onChange={onChange}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={onSubmit} type="submit">
            Save
          </Button>
        </Modal.Actions>
      </Modal>
    </Grid.Column>
  );
}

const EDIT_PROFILE_INTRO = gql`
  mutation editProfileIntro(
    $firstName: String!
    $lastName: String!
    $headline: String
    $city: String
    $state: String
    $age: String
    $gender: String
  ) {
    editProfileIntro(
      input: {
        firstName: $firstName
        lastName: $lastName
        headline: $headline
        city: $city
        state: $state
        age: $age
        gender: $gender
      }
    ) {
      firstName
    }
  }
`;

export default TopCardEditModal;
