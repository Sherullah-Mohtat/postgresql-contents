|types| Types
===============

.. |types| image:: /_static/images/sidebar_icons/types.png

--------------------------------------
1️⃣ What are “Types” in PostgreSQL?
--------------------------------------

A **Type** defines **what kind of data** a column, variable, or function can hold.

You already know built-in types like:
	- integer
	- text
	- boolean
	- timestamp

The **Types** section in pgAdmin is about **user-defined and advanced types**, not the basic ones.

=========================================================================================================================

------------------------------------
2️⃣ Categories of Types you’ll see
------------------------------------

In PostgreSQL, types fall into these groups:

**Built-in (system) types**

Provided by PostgreSQL itself:
	- int, bigint
	- text, varchar
	- json, jsonb
	- uuid
	- numeric

These don’t usually appear under Types in pgAdmin because they’re global/system-level.

=========================================================================================================================

**Composite types (custom row structures)**

A **composite type** is like a **struct** or **record.**

Example:

.. code-block:: postgres 

    CREATE TYPE address_type AS (
        street text,
        city text,
        zip_code text
    );

Usage:

.. code-block:: postgres 

    CREATE TABLE users (
        id serial,
        address address_type
    );

Think:
    “A reusable row shape”

=========================================================================================================================

**Enum types (fixed values)**

ENUM = **limited set of allowed values**

Example:

.. code-block:: postgres 

    CREATE TYPE order_status AS ENUM (
        'pending',
        'paid',
        'shipped',
        'cancelled'
    );

Usage:

.. code-block:: postgres 

    CREATE TABLE orders (
        id serial,
        status order_status
    );

✔ Enforces correctness

❌ Hard to change later (requires migrations)

=========================================================================================================================

**Domain types (restricted base types)**

A domain is:
    A base type + rules

Example:

.. code-block:: postgres 

    CREATE DOMAIN positive_int AS integer
    CHECK (VALUE > 0);

Usage:

.. code-block:: postgres 

    CREATE TABLE products (
        quantity positive_int
    );

Domains:
	- Centralize validation
	- Improve schema readability
	- Are safer than repeating CHECK constraints

=========================================================================================================================

**Range types**

Used for ranges like:
	- dates
	- numbers
	- timestamps

Example:

.. code-block:: postgres 

    CREATE TABLE bookings (
        period daterange
    );

Query:

.. code-block:: postgres 

    SELECT *
    FROM bookings
    WHERE period @> DATE '2026-01-10';

Very powerful for:
	- availability
	- scheduling
	- time windows

=========================================================================================================================

**Array types**

Any type can become an array:

.. code-block:: postgres 

    CREATE TABLE posts (
        tags text[]
    );

Usage:

.. code-block:: postgres 

    SELECT * FROM posts WHERE 'sql' = ANY(tags);

=========================================================================================================================

**Pseudo-types (advanced / internal)**

Examples:
	- record
	- anyelement
	- trigger

Used mainly in:
	- functions
	- triggers
	- system internals

Example:

.. code-block:: postgres 

    RETURNS trigger

You don’t store these in tables.

=========================================================================================================================

----------------------------------------
3️⃣ Where “Types” fit in schema design
----------------------------------------

.. list-table:: 
    :header-rows: 1

    * - Use case
      - Best type
    * - Reusable structure
      - Composite type
    * - Limited states
      - ENUM
    * - Shared validation
      - DOMAIN
    * - Time ranges
      - RANGE
    * - Multiple values
      - ARRAY
    * - Logic plumbing
      - Pseudo-types

=========================================================================================================================

--------------------------------
4️⃣ Types vs Tables vs Domains
--------------------------------

.. list-table:: 
    :header-rows: 1

    * - Feature
      - Purpose
    * - Table
      - Stores data
    * - Type
      - Defines shape
    * - Domain
      - Constrained type
    * - Function
      - Behavior
    * - Trigger
      - Automation

Types are **building blocks**, not storage.

=========================================================================================================================

--------------------------------------
5️⃣ What pgAdmin shows under “Types”
--------------------------------------

When you expand Types, pgAdmin lists:
	- ENUMs
	- Composite types
	- Domains (sometimes grouped separately)
	- Custom range types

System types are hidden.

=========================================================================================================================

----------------------------------------
6️⃣ Production best practices 
----------------------------------------

- ✔ Use **DOMAIN** for shared validation
- ✔ Use **ENUM** only for stable values
- ✔ Prefer **lookup tables** if values change often
- ✔ Avoid overusing composite types in APIs
- ✔ Document every custom type clearly

=========================================================================================================================

---------------------------------
7️⃣ Mental model (remember this)
---------------------------------

**Type** = shape of data

**Table** = storage of data

**Function** = behavior









