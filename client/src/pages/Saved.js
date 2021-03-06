import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import Article from "../components/Article";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";

class Saved extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      listCount: "",
      email: ""
    };
  }

  componentDidMount() {
    this.getSavedArticles(this.props.email);
  }

  getSavedArticles = (id) => {
    API.getSavedArticles(id)
      .then(res => {
        this.setState({
          articles: res.data,
          listCount: res.data.length
        }, 
        () => {console.log(this.state.articles, this.props.email)})
      }
    )
    .catch(err => console.log(err));
  };


// original function for handleArticleDelete

// handleArticleDelete = id => {
//   API.deleteArticle(id)
//     .then(res => this.getSavedArticles(this.state.email))
//     .catch(err => console.log(err));
// };

  // test to check server controller response
  handleArticleDelete = (id) => {

    const newLabel = "OPTIMAL";
    // this.state.match
    const myEmail = this.props.state.email;
    const myQuery = this.state.search;
    const myData = [{ 
      "email": myEmail, 
      "query": myQuery
    }];
    console.log(myData);
    console.log("queryId = " + this.state.queryId);

    API.deleteArticle(id)
      .then(res => this.getSavedArticles(this.state.email))
      .catch(err => console.log(err));
  };

  handleArticleUpdate = (id) => {
    API.updateArticle(id)
      .then(res => this.getSavedArticles(this.state.email))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12">
            <Jumbotron>
            <div className="jumbo-text">
            <h1 className="text-center jumbo-text" style={{fontFamily: "Libre Baskerville, serif"}}>
             News Polarizer
              </h1>
              <h5 className="text-center jumbo-text" style={{fontFamily: "Libre Baskerville, serif, regular"}}>You saved {this.state.listCount} News Polarizer articles
              </h5>            
            </div>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Card title="Saved Articles" icon="download">
              {this.state.articles.length ? (
                <List>
                  {this.state.articles.map((article) => (
                    <Article
                      _id = {article._id}
                      id={article.id}
                      key={article.key}
                      email={article.email}
                      query={article.query}
                      source={article.source.name}
                      author={article.author}
                      title={article.title}
                      description={article.description}
                      url={article.url}
                      urlToImage={article.urlToImage}
                      publishedAt={article.publishedAt}
                      content={article.content}
                      label={article.label}
                      score={article.score}
                      padScore={article.padScore}
                      hml={article.hml}
                      Button={() => (
                        // <button
                        //   onClick={() => this.handleArticleDelete(article.id)}
                        //   className="btn btn-danger ml-2"
                        // >
                        //   Delete
                        // </button>
                        <button
                        onClick={() => this.handleArticleUpdate(article.id)}
                        className="btn btn-danger ml-2"
                      >
                        Delete
                      </button>
                      )}
                    />
                  ))}
                </List>
              ) : (
                <h2 className="text-center">No Saved Articles</h2>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Saved;

