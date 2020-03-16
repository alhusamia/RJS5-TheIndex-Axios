import React, { Component } from "react";

import authors from "./data.js";
import loading from "./Loading";

// Components
import Sidebar from "./Sidebar";
import AuthorList from "./AuthorList";
import AuthorDetail from "./AuthorDetail";
import axios from "axios";
import Loading from "./Loading";

class App extends Component {
  state = {
    currentAuthor: null,
    authors: [],
    loading: true
  };
  AutherList = async () => {
    try {
      let authors = await axios.get(
        "https://the-index-api.herokuapp.com/api/authors/"
      );
      this.setState({ authors: authors.data, loading: false });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.AutherList();
  }

  selectAuthor = async author => {
    this.setState({loading:true});
    let id = author.id;
    try {
      let author = await axios.get(
        `https://the-index-api.herokuapp.com/api/authors/${id}/`
      );      
      this.setState({ currentAuthor: author.data , loading: false });
    } catch (error) {
      console.log(error);
    }
  };

  unselectAuthor = () => this.setState({ currentAuthor: null });

  getContentView = () => {
    if (this.state.currentAuthor) {
      return <AuthorDetail author={this.state.currentAuthor} />;
    } else {
      return (
        <AuthorList
          authors={this.state.authors}
          selectAuthor={this.selectAuthor}
        />
      );
    }
  };

  render() {
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar unselectAuthor={this.unselectAuthor} />
          </div>
          {this.state.loading ? (
            <Loading />
          ) : (
            <div className="content col-10">{this.getContentView()}</div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
