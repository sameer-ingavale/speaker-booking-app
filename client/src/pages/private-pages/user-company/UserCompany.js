import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Card, Image, Button, Grid, Header } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import Spinner from "../../../helpers/loaders/Spinner";
import "./userCompany.css";

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
        <Grid.Row className="loaderRow">
          <Grid.Column className="loaderColumn">
            <Spinner />
          </Grid.Column>
        </Grid.Row>
      ) : data ? (
        <Grid.Row centered>
          <Grid.Column width={13}>
            <Header className="marginHeader header2">My Company</Header>
            <Card fluid className="userCompanyCard">
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
                  floated="left"
                  size="tiny"
                  src="https://image.flaticon.com/icons/svg/2201/2201421.svg"
                />
                <Card.Header>{company.name}</Card.Header>
                <Card.Meta>{`Added ${moment(company.dateCreated).fromNow(
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
        <Grid.Row columns="2" className="noContentGridRow">
          <Grid.Column width="6" className="noContentGridColumn1">
            <Image
              src="https://i.ibb.co/7pSxYCF/Traffic-Cone-Empty-Page.png"
              size="small"
            />
          </Grid.Column>
          <Grid.Column width="10" className="noContentGridColumn2">
            <p className="header3">You haven't created an organization yet.</p>
            <Button as={Link} to="/account/create-company" basic primary>
              Add Organization
            </Button>
          </Grid.Column>
        </Grid.Row>
      ) : (
        error && <h1>Insert error image here</h1>
      )}
    </Grid>
  );
}

export default Home;
