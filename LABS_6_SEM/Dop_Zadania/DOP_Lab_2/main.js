const booksByAuthor = d3.group(books, d => d.author);

const authorsData = Array.from(booksByAuthor, ([author, books]) => ({
  author,
  books
}));

const ol = d3.select("#authors-list");

const authorItems = ol.selectAll("li")
  .data(authorsData)
  .enter()
  .append("li");

  
authorItems
  .append("span")
  .text(d => d.author);

const ul = authorItems
  .append("ul");

ul.selectAll("li")
  .data(d => d.books)
  .enter()
  .append("li")
  .text(d => {
    const priceStr = d.price.toFixed(2).replace(".", ",");
    return `${d.title} (${priceStr} руб.)`;
  });

