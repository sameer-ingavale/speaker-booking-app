import React, { useState } from "react";
import {
  Grid,
  Card,
  Checkbox,
  Dropdown,
  Transition,
  Message,
  Form,
  Button,
  Input,
  Flag
} from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { userTagsOptions } from "../../helpers/resusable-data/userTagsOptions";

function UserSettingsCard({ authUserData }) {
  const [values, setValues] = useState({
    userVisibility: authUserData.userVisibility,
    tags: authUserData.tags,
    tagline: authUserData.tagline,
    phone: authUserData.phone
  });

  const onToggle = () => {
    const toggleValue = !values.userVisibility;
    setValues({ ...values, userVisibility: toggleValue });
  };

  const onChange = (event, result) => {
    const { name, value } = result || event.target;
    setValues({ ...values, [name]: value });
  };

  let errors = {};

  if (values.tags.length > 5) {
    errors.tooManyTags = "Too many tags";
  }

  const [changeSettings] = useMutation(CHANGE_USER_SETTINGS, {
    update(proxy, data) {
      console.log(data);
    },
    variables: values
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    await changeSettings();
    window.location.reload();
  };

  return (
    <Grid>
      <Grid.Row centered>
        <Grid.Column width={15}>
          {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
          <Card fluid>
            <Card.Content>
              <Card.Header>Settings</Card.Header>
            </Card.Content>
            <Card.Content>
              <Checkbox
                className="makePublicToggle"
                toggle
                label="Make your profile publicly visible"
                name="userVisibility"
                checked={values.userVisibility}
                onChange={onToggle}
              />
              <Dropdown
                placeholder="Your tags"
                fluid
                multiple
                selection
                name="tags"
                onChange={onChange}
                value={values.tags}
                options={userTagsOptions}
                error={errors.tooManyTags ? true : false}
              />
              <Form>
                <Form.TextArea
                  className="textarea"
                  rows="2"
                  label="Add Tagline"
                  placeholder="Your tagline goes here"
                  name="tagline"
                  value={values.tagline}
                  onChange={onChange}
                />
                <Form.Field>
                  <label>Phone Number</label>
                  <Input
                    label={{ basic: true, content: "+1" }}
                    placeholder="Phone Number"
                    name="phone"
                    value={values.phone}
                    onChange={onChange}
                  />
                </Form.Field>
              </Form>
              <Button onClick={onSubmit}>Save Changes</Button>
            </Card.Content>
          </Card>
          <Transition.Group animation="fade up" duration={500}>
            {Object.keys(errors).length > 0 && (
              <Message error list={Object.values(errors)}></Message>
            )}
          </Transition.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

const CHANGE_USER_SETTINGS = gql`
  mutation changeUserSettings(
    $tags: [String]!
    $tagline: String
    $userVisibility: Boolean!
    $phone: String
  ) {
    changeUserSettings(
      input: {
        tags: $tags
        tagline: $tagline
        userVisibility: $userVisibility
        phone: $phone
      }
    ) {
      success
    }
  }
`;

export default UserSettingsCard;
