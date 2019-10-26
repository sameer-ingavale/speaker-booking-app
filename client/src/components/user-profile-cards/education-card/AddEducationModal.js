import React, { useState } from "react";
import { Grid, Modal, Transition, Button, Form, Icon } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { presentYears } from "../../../helpers/resusable-data/presentYears";
import { futureYears } from "../../../helpers/resusable-data/futureYears";

function AddEducationModal({ pageUser }) {
  const [values, setValues] = useState({
    school: "",
    degree: "",
    field: "",
    startYear: "",
    endYear: "",
    grade: "",
    activities: "",
    description: ""
  });

  /* const [errors, setErrors] = useState({}); */

  const onChange = (event, result) => {
    const { name, value } = result || event.target;
    setValues({ ...values, [name]: value });
  };

  const [addEducation, { loading }] = useMutation(ADD_EDUCATION, {
    update(proxy, data) {
      console.log(data);
    },
    variables: values
  });

  const onSubmit = async () => {
    openModal();
    await addEducation();
    window.location.reload();
  };

  const [modalOpen, setModalOpen] = useState({ open: false });

  const openModal = () => {
    setModalOpen({ open: !modalOpen.open });
  };

  return (
    <Grid.Column width={10}>
      <Button
        style={{ margin: "5px 5px 0px 0px" }}
        basic
        color="blue"
        compact
        floated="right"
        onClick={openModal}
      >
        <Icon name="edit outline" />
        Add Education
      </Button>
      <Transition visible={modalOpen.open} animation="fade" duration={1}>
        <Modal
          dimmer="blurring"
          open={modalOpen.open}
          onClose={openModal}
          closeIcon
        >
          <Modal.Header>Add Education</Modal.Header>
          <Modal.Content scrolling>
            <Form>
              <Form.Input
                label="School"
                placeholder="Ex. University of Texas at Arlington"
                name="school"
                type="text"
                value={values.school}
                onChange={onChange}
                // error={errors.title ? true : false}
              />
              <Form.Input
                label="Degree"
                placeholder="Ex. Bachelor's"
                name="degree"
                type="text"
                value={values.degree}
                onChange={onChange}
                // error={errors.title ? true : false}
              />
              <Form.Input
                label="Field of Study"
                placeholder="Ex. Business"
                name="field"
                type="text"
                value={values.field}
                onChange={onChange}
                // error={errors.title ? true : false}
              />
              <Form.Group widths="equal">
                <Form.Dropdown
                  placeholder="Year"
                  name="startYear"
                  label="Start Year"
                  selection
                  onChange={onChange}
                  options={presentYears}
                  value={values.startYear}
                  //error={errors.state ? true : false}
                />
                <Form.Dropdown
                  placeholder="Year"
                  name="endYear"
                  label="End Year"
                  selection
                  onChange={onChange}
                  options={futureYears}
                  value={values.endYear}
                  //error={errors.state ? true : false}
                />
              </Form.Group>
              <Form.Input
                label="Grade"
                placeholder="Ex. 3.2"
                name="grade"
                type="text"
                value={values.grade}
                onChange={onChange}
                // error={errors.title ? true : false}
              />
              <Form.TextArea
                className="textarea"
                rows="2"
                label="Activities & Organizations"
                placeholder="Ex. Kappa Alpha Order, Marching Band, Basketball"
                name="activities"
                value={values.activities}
                onChange={onChange}
              />
              <Form.TextArea
                className="textarea"
                rows="5"
                label="Description"
                placeholder="Ex. Placed 2nd runner up at UTA MavsChallenge pitch competition"
                name="description"
                value={values.description}
                onChange={onChange}
              />
            </Form>
            {/* <Transition.Group animation="fade up" duration={500}>
              {Object.keys(errors).length > 0 && (
                <Message error list={Object.values(errors)}></Message>
              )}
            </Transition.Group> */}
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

const ADD_EDUCATION = gql`
  mutation addProfileEducation(
    $school: String!
    $degree: String!
    $field: String!
    $startYear: String!
    $endYear: String!
    $grade: String
    $activities: String
    $description: String
  ) {
    addProfileEducation(
      input: {
        school: $school
        degree: $degree
        field: $field
        startYear: $startYear
        endYear: $endYear
        grade: $grade
        activities: $activities
        description: $description
      }
    ) {
      firstName
    }
  }
`;

export default AddEducationModal;
