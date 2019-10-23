import React, { useState, useRef } from "react";
import { Button, Icon } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

function ProfilePictureEditButton() {
  const ref = useRef();
  const [file, setFile] = useState({ picture: null });

  const fileChange = (event) => {
    if (event.target.files[0].size < 1000000) {
      setFile({ picture: event.target.files[0] });
    }
  };

  const [uploadImage] = useMutation(UPLOAD_IMAGE, {
    update(
      proxy,
      {
        data: {
          uploadProfilePicture: { picUrl }
        }
      }
    ) {
      window.location.reload();
    },
    variables: {
      picture: file.picture
    }
  });

  const onSubmit = (event) => {
    event.preventDefault();
    uploadImage();
  };

  const onButtonClick = () => {
    ref.current.click();
  };

  return (
    <>
      <input
        style={{ display: "none" }}
        ref={ref}
        type="file"
        onChange={fileChange}
      />
      <Button
        type="button"
        compact
        style={{ background: "none", color: "#2185D0", paddingLeft: 5 }}
        onClick={onButtonClick}
      >
        <Icon name="photo" />
        Change Picture
      </Button>
      {file.picture && (
        <Button onClick={onSubmit} basic color="blue" compact type="submit">
          Submit
        </Button>
      )}
    </>
  );
}

const UPLOAD_IMAGE = gql`
  mutation singleUpload($picture: Upload!) {
    uploadProfilePicture(picture: $picture) {
      picUrl
    }
  }
`;

export default ProfilePictureEditButton;
