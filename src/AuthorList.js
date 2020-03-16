import React, { Component } from "react";

// Components
import AuthorCard from "./AuthorCard";
import SearchBar from "./SearchBar";

class AuthorList extends Component {
  state = {
    filteredAuthors: this.props.authors
    
  };

  filterAuthors = query => {
    const filteredAuthors = this.props.authors.filter(author => {
      return `${author.first_name} ${author.last_name}`
        .toLowerCase()
        .includes(query.toLowerCase());
    });
    
    this.setState({ filteredAuthors: filteredAuthors });
  };
  render() {
    const authorCards = this.state.filteredAuthors.map(author => (
      <AuthorCard
        key={author.first_name + author.last_name}
        author={author}
        selectAuthor={this.props.selectAuthor}
      />
    ));

    return (
      <div className="authors">
        <h3>Authors</h3>
        <SearchBar filterAuthors={this.filterAuthors} />
        <div className="row">{authorCards}</div>
      </div>
    );
  }
}

export default AuthorList;
