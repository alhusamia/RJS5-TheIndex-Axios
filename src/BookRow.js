import React from "react";

const BookRow = props => {
  const book = props.book;
  const authorName = props.authorName;
  return (
    <tr>
      <td>{book.title}</td>
      <td>{book.authors.map(author => author.name).join(" ")}</td>
      <td>
        <button className="btn" style={{ backgroundColor: book.color }} />
      </td>
    </tr>
  );
};

export default BookRow;
