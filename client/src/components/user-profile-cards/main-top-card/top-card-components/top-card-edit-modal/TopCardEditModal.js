import React, { useState } from "react";
import { Grid, Modal, Transition, Button, Form } from "semantic-ui-react";

import { stateOptions } from "../../../../../helpers/stateOptions";

function TopCardEditModal({ openEditModal, modalOpen }) {
  const [values, setValues] = useState({
    firstName: "",
    lastName: ""
  });

  const onChange = (event, result) => {
    const { name, value } = result || event.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <Grid.Column width={10}>
      <Transition visible={modalOpen.open} animation="fade" duration={1}>
        <Modal dimmer={true} open={modalOpen.open} onClose={openEditModal}>
          <Modal.Header>Edit Intro</Modal.Header>
          <Modal.Content scrolling>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  label="First Name"
                  placeholder="First Name"
                  name="firstName"
                  type="text"
                  value={values.title}
                  onChange={onChange}
                  // error={errors.title ? true : false}
                />
                <Form.Input
                  placeholder="Last Name"
                  name="lastName"
                  label="Last Name"
                  type="text"
                  onChange={onChange}
                  value={values.eventType}
                />
              </Form.Group>
              <Form.TextArea
                className="textarea"
                rows="2"
                label="About"
                placeholder="Tell us more about you (80 characters limit)"
              />
              <Form.Group widths="equal">
                <Form.Dropdown
                  placeholder="State"
                  name="state"
                  label="State"
                  selection
                  search
                  //onChange={onAddressChange}
                  options={stateOptions}
                  //value={values.stateOptions}
                  //error={errors.state ? true : false}
                />
                <Form.Input
                  label="City"
                  placeholder="City"
                  name="city"
                  type="text"
                  //value={values.city}
                  //onChange={onAddressChange}
                  //error={errors.city ? true : false}
                />
              </Form.Group>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button>Save</Button>
          </Modal.Actions>
        </Modal>
      </Transition>
    </Grid.Column>
  );
}

export default TopCardEditModal;
