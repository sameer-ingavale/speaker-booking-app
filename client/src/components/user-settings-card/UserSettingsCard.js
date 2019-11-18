import React, { useState } from "react";
import {
  Grid,
  Card,
  Checkbox,
  Transition,
  Message,
  Form,
  Button,
  Popup,
  Label
} from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { userTagsOptions } from "../../helpers/resusable-data/userTagsOptions";

function UserSettingsCard({ authUserData }) {
  const [values, setValues] = useState({
    userVisibility: authUserData.userVisibility,
    tags: authUserData.tags,
    tagline: "" || authUserData.tagline,
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

  const [changeSettings, { loading }] = useMutation(CHANGE_USER_SETTINGS, {
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
    <Grid.Column className="formCardColumn">
      <Card fluid className="formCard">
        <Card.Content>
          <Card.Header className="header2">Settings & Privacy</Card.Header>
        </Card.Content>
        <Card.Content>
          <Form noValidate className={loading ? "loading" : ""}>
            <Form.Dropdown
              label="Your Tags"
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
            <Form.Field>
              <Label className="toolTipLabel">Your Tagline</Label>
              <Popup
                pinned
                content="This is your chance to capture attention"
                trigger={
                  <Button
                    className="toolTipIcon"
                    compact
                    size="tiny"
                    icon="question circle"
                  />
                }
              />
              <Form.TextArea
                className="textarea"
                rows="2"
                placeholder="Your tagline goes here"
                name="tagline"
                value={values.tagline}
                onChange={onChange}
              />
            </Form.Field>
            <Form.Field>
              <Label className="toolTipLabel">Phone Number</Label>
              <Popup
                pinned
                content="Your phone number will only be shown to confirmed speakers"
                trigger={
                  <Button
                    className="toolTipIcon"
                    compact
                    size="tiny"
                    icon="question circle"
                  />
                }
              />
              <Form.Input
                placeholder="Phone Number"
                name="phone"
                value={values.phone}
                onChange={onChange}
              />
            </Form.Field>
            <Checkbox
              className="makePublicToggle"
              toggle
              label="Make your profile publicly visible"
              name="userVisibility"
              checked={values.userVisibility}
              onChange={onToggle}
            />
          </Form>
          <Button
            onClick={onSubmit}
            style={{ margin: "15px 0px 5px 0px" }}
            primary
          >
            Save Changes
          </Button>
        </Card.Content>
      </Card>
      <Transition.Group animation="fade up" duration={500}>
        {Object.keys(errors).length > 0 && (
          <Message
            className="errorMessageBox"
            error
            list={Object.values(errors)}
          ></Message>
        )}
      </Transition.Group>
    </Grid.Column>
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
