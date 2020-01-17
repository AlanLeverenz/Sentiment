import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

class Visuals extends Component {
  state = {
    queries: []
  };
  // When this component mounts, grab the article with the _id of this.props.match.params.id
  // e.g. localhost:3000/saved/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getQuery(this.props.match.params.query)
      .then(res => this.setState({ queries: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                {this.query}
              </h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <article>
              <h1>{this.date}</h1>
              <p>
                Graph Goes Here
              </p>
            </article>
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/Saved">← Back to Saved Articles</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Visuals;
