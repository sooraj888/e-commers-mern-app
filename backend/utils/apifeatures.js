class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    // Removing some field category
    const removeField = ["keyword", "page", "limit"];

    removeField.forEach((key) => {
      delete queryCopy[key];
    });

    let queryStr = JSON.stringify(queryCopy);
    queryStr = JSON.parse(
      queryStr.replace(/\b(gt|lt|lte|gte)\b/g, (key) => `$${key}`)
    );
    this.query = this.query.find(queryStr);

    return this;
  }

  pagination(resultPerPage) {
    const currentPage = this.queryStr.page || 1;
    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

module.exports = ApiFeatures;
