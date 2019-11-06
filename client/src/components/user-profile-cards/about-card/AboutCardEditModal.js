import React, { useState } from "react";
import { Grid, Modal, Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

function AboutCardEditModal({ pageUser, openModal, modalOpen }) {
  const [values, setValues] = useState({
    about: `${pageUser.about}`
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const [editProfileAbout] = useMutation(EDIT_PROFILE_ABOUT, {
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
      <Modal dimmer="blurring" open={modalOpen.open} onClose={openModal}>
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

export default AboutCardEditModal;
