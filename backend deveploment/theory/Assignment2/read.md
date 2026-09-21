# Assignment 2 — PostgreSQL as SQL + NoSQL: Working with JSONB

## Part A — Conceptual Questions

### 1. What is `jsonb` in PostgreSQL, and how does it differ from the plain `json` type?

`jsonb` is a PostgreSQL data type used to store JSON data in a binary format. Unlike the plain `json` type, which stores JSON as text, `jsonb` converts the JSON data into a format that PostgreSQL can process more efficiently. Because `jsonb` stores data in a decomposed binary form, it can usually be queried and indexed faster than plain `json`.

The main difference is the trade-off during writing. `jsonb` may take slightly more time when inserting or updating data because PostgreSQL has to convert the JSON text into its binary representation. However, this extra work generally makes reading and querying the data more efficient.

For example:

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    attributes JSONB
);
### 2. How can PostgreSQL work as both a SQL and a NoSQL database in the same table?

PostgreSQL can combine relational SQL features with document-style NoSQL features by using a `jsonb` column alongside normal typed columns. The fixed columns can store important structured information such as an ID, name, and price, while the `jsonb` column can store attributes that may differ between records.

For example:

```sql
CREATE TABLE products (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    attributes JSONB
);
### 3. Give an example of a `jsonb` query using `->`, `->>`, `@>`, and `?`

PostgreSQL provides several operators for working with JSONB data. The `->` operator extracts a JSON object or JSON value, while the `->>` operator extracts the value as text.

For example, if a row contains:

```sql
'{"author": "Robert C. Martin", "pages": 464, "available": true}'
### 4. How can a GIN index on a `jsonb` column change query performance?

A GIN (Generalized Inverted Index) index can improve the performance of searches that look for specific data inside a `jsonb` column. It is especially useful for containment queries using the `@>` operator and for checking JSONB keys or values.

For example, we can create a GIN index like this:

```sql
CREATE INDEX idx_products_attributes
ON products USING GIN (attributes);
### 5. Where could PostgreSQL + `jsonb` replace a MongoDB deployment, and where would MongoDB still be the better fit?

PostgreSQL with `jsonb` can replace MongoDB when an application needs both relational SQL features and flexible document-style data. PostgreSQL is useful when the application requires transactions, relationships between tables, and joins. It also allows important fields to have strict data types and constraints while less predictable attributes can be stored in `jsonb`.

For example:

```sql
CREATE TABLE products (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    attributes JSONB
);

## Part B — Task 7: PostgreSQL and MongoDB Comparison

### PostgreSQL with JSONB

PostgreSQL uses SQL syntax to work with structured columns and JSONB data. For example:

```sql
SELECT name, attributes ->> 'cpu' AS cpu
FROM products
WHERE category = 'laptop'
  AND (attributes ->> 'ram_gb')::int >= 16;