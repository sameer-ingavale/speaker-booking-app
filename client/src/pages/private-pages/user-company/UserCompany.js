import React, { Fragment } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Card, Image, Button, Grid } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

function Home() {
  const { loading, error, data } = useQuery(GET_COMPANY);

  let company;

  if (data) {
    company = data.getCompany;
  }

  return (
    <Grid>
      {loading ? (
        <h1>Loading posts..</h1>
      ) : data ? (
        <Grid.Row centered>
          <Grid.Column width={13}>
            <Card fluid>
              <Card.Content>
                <Button
                  floated="right"
                  as={Link}
                  to="/account/create-event"
                  basic
                  color="blue"
                >
                  Create Event
                </Button>
                <Image
                  bordered
                  circular
                  floated="left"
                  size="tiny"
                  src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/07/attachment_63424222-e1498868872570.png?auto=format&q=60&fit=max&w=930"
                />
                <Card.Header>{company.name}</Card.Header>
                <Card.Meta>{`Member since ${moment(company.dateCreated).fromNow(
                  true
                )} ago`}</Card.Meta>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
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
    </Grid>
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
