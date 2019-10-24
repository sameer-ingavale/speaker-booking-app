import React, { useState } from "react";
import { Grid, Modal, Transition, Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { stateOptions } from "../../../helpers/stateOptions";

function TopCardEditModal({ pageUser, openModal, modalOpen }) {
  const [values, setValues] = useState({
    about: `${pageUser.about}`
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const [editProfileAbout, { loading }] = useMutation(EDIT_PROFILE_ABOUT, {
    update(proxy, data) {
      console.log(data);
    },
    variables: values
  });

  const onSubmit = async () => {
    openModal();
    await editProfileAbout();
    window.location.reload();
  };

  return (
    <Grid.Column width={10}>
      <Transition visible={modalOpen.open} animation="fade" duration={1}>
        <Modal dimmer={true} open={modalOpen.open} onClose={openModal}>
          <Modal.Header>Edit Intro</Modal.Header>
          <Modal.Content scrolling>
            <Form>
              <Form.TextArea
                className="textarea"
                rows="5"
                label="About"
                placeholder="Tell us more about you (200 characters limit)"
                name="about"
                value={values.about}
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
      </Transition>
    </Grid.Column>
  );
}

const EDIT_PROFILE_ABOUT = gql`
  mutation editProfileAbout($about: String!) {
    editProfileAbout(about: $about) {
      firstName
    }
  }
`;

export default TopCardEditModal;
