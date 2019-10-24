import React, { useState } from "react";
import { Grid, Modal, Transition, Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { stateOptions } from "../../../../../helpers/stateOptions";

function TopCardEditModal({ pageUser, openModal, modalOpen }) {
  const [values, setValues] = useState({
    firstName: `${pageUser.firstName}`,
    lastName: `${pageUser.lastName}`,
    tagline: `${pageUser.tagline}`,
    city: `${pageUser.city}`,
    state: `${pageUser.state}`
  });

  const onChange = (event, result) => {
    const { name, value } = result || event.target;
    setValues({ ...values, [name]: value });
  };

  const [editProfileIntro, { loading }] = useMutation(EDIT_PROFILE_INTRO, {
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
      <Transition visible={modalOpen.open} animation="fade" duration={1}>
        <Modal dimmer={true} open={modalOpen.open} onClose={openModal}>
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
              <Form.TextArea
                className="textarea"
                rows="2"
                label="Tagline"
                placeholder="Your tagline goes here"
                name="tagline"
                value={values.tagline}
                onChange={onChange}
              />
              <Form.Group widths="equal">
                <Form.Dropdown
                  placeholder="State"
                  name="state"
                  label="State"
                  selection
                  search
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
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={onSubmit} type="submit">
              Save
            </Button>
          </Modal.Actions>
        </Modal>
      </Transition>
    </Grid.Column>
  );
}

const EDIT_PROFILE_INTRO = gql`
  mutation editProfileIntro(
    $firstName: String!
    $lastName: String!
    $tagline: String
    $city: String
    $state: String
  ) {
    editProfileIntro(
      input: {
        firstName: $firstName
        lastName: $lastName
        tagline: $tagline
        city: $city
        state: $state
      }
    ) {
      firstName
    }
  }
`;

export default TopCardEditModal;
