import React, { Fragment } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Card, Image, Button } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

function Home() {
  const { loading, error, data } = useQuery(GET_COMPANY);

  let company;

  if (data) {
    company = data.getCompany;
  }

  return (
    <Fragment>
      {loading ? (
        <h1>Loading posts..</h1>
      ) : data ? (
        <Card raised fluid className="cardWrapper">
          <Card.Content>
            <Image
              floated="left"
              size="tiny"
              src="https://media.licdn.com/dms/image/C4E0BAQENAD8md8MlKA/company-logo_400_400/0?e=1579132800&v=beta&t=RNJ9JIPZxPdIkogN8H7KAuSpouIJ4JQ-h1vRzB2CfCs"
            />
            <Card.Header>{company.name}</Card.Header>
            <Card.Meta>{`Joined ${moment(company.dateCreated).fromNow(
              true
            )} ago`}</Card.Meta>
            <Button as={Link} to="/account/create-event" primary>
              Create Event
            </Button>
          </Card.Content>
        </Card>
      ) : !data ? (
        <h1>
          No Company{" "}
          <Button as={Link} to="/account/create-company" primary>
            Create One
          </Button>
        </h1>
      ) : error ? (
        <h1>fuck</h1>
      ) : (
        <h1>Damn..how did you get here?</h1>
      )}
    </Fragment>
  );
}

const GET_COMPANY = gql`
  {
    getCompany {
      _id
      name
      address {
        streetAddress1
        streetAddress2
        zip
        city
        state
        country
      }
      phone
      einNumber
      companyType
      dateCreated
      creator {
        firstName
        lastName
      }
      createdEvents {
        title
        eventDate
        startTime
        endTime
        payType
        eventType
        eventTopic
        payAmount
        expectedTurnout
        address {
          streetAddress1
          streetAddress2
          zip
          city
          state
          country
        }
        expired
        eventVisibility
        createdAt
        updatedAt
      }
    }
  }
`;

export default Home;
