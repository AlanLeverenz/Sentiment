import React, { Component } from "react";
import { Query, Graph } from "../components/Query";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

class Visuals extends Component {

  constructor(props) {
  super(props)

    this.state = {
      queries: [],
      queryCount: 0
    };
  }

  componentDidMount() {
    this.getSavedQueries();
  }

  getSavedQueries = () => {
    API.getSavedQueries()
    // create an array of an array of queries grouped by a common query string
      .then(res => {
        console.log(res.data);
        this.setState({
          queries: res.data,
          queryCount: res.data.length
      })
    })
    .catch(err => console.log(err));
    };

  // componentDidMount() {
  //   API.getQuery(this.props.match.params.query)
  //     .then(res => this.setState({ queries: res.data }))
  //     .catch(err => console.log(err));
  // }

  // componentDidMount() {
  //   this.getQuery(this.query);
  // }

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <div className="jumbo-text">
                <h1 className="text-center jumbo-text" style={{fontSize: "4rem"}}>
                  News Polarizer
                </h1>
                <h5 className="text-center jumbo-text" style={{fontFamily: "Libre Baskerville, serif, regular"}}>You Have {this.state.queryCount} Articles
                </h5>
                  <div style={{padding:30}}>
                    <span>Positive <i className="fas fa-circle" style={{color:"green"}}></i>
                    &emsp;&emsp; Neutral <i className="fas fa-circle" style={{color:"blue"}}></i>
                    &emsp;&emsp; Negative <i className="fas fa-circle" style={{color:"red"}}></i></span>
                  </div>
              </div>
            </Jumbotron>
          </Col>
        </Row>

         {this.state.queries.length ? (
          <div>
            <Query 
              title={this.state.queries[6].title}
            />
          <Row>
            {this.state.queries.map((query,i) => (
              <Col size="1" key={i}>
                <Graph 
                  key={query.key}
                  id={query.id}
                  url={query.url}
                  score={query.score}
                  padScore={query.padScore}
                  colorScore={query.colorScore}
                />
              </Col>
            ))}
          </Row>
        </div>
      ) : (
      <h2 className="text-center">No Saved Queries</h2>
      )}
      
    </Container>
    )
  }
}

export default Visuals;

// <button
// onClick={() => this.handleQueryDelete(queryId)}
// className="btn btn-danger ml-2"
// >
// Delete
// </button>


/* Button={() => (
  <button
    onClick={() => this.handleQueryDelete(query.id)}
    className="btn btn-danger ml-2"
  >
    Delete
  </button>
)} 
*/