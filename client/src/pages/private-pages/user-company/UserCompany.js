import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Card, Image, Button, Grid, Header } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

import { GET_COMPANY } from "../../../helpers/gql-queries/getCompanyQuery";
import { enumToWord } from "../../../helpers/helper-functions/enumToWord";

function Home() {
  const { loading, error, data } = useQuery(GET_COMPANY);

  let company;

  if (data) {
    company = data.getCompany;
    console.log(company);
  }

  return (
    <Grid>
      {loading ? (
        <h1>Loading company..</h1>
      ) : data ? (
        <Grid.Row centered>
          <Grid.Column width={13}>
            <Header as="h4" dividing>
              My Company
            </Header>
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
                <Card.Meta>{`${enumToWord(company.companyType)} based in ${
                  company.address[0].city
                }, ${company.address[0].state}`}</Card.Meta>
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
      ) : (
        error && <h1>Insert error image here</h1>
      )}
    </Grid>
  );
}

export default Home;
