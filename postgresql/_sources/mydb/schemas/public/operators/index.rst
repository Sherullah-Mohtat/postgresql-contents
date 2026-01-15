|operators| Operators
=======================

.. |operators| image:: /_static/images/sidebar_icons/operators.png

-------------------------
Operators (PostgreSQL)
-------------------------

In PostgreSQL, an **operator** is a **symbol or keyword that performs an operation between values.**

Examples you already know:

.. code-block:: postgres
    
	=
	>
	<
	+
	||
	@>
	->

PostgreSQL treats operators as **first-class database objects,** not just syntax.

That’s why you see **Operators** as a node in pgAdmin.

================================================================================================================================

1️⃣ What makes PostgreSQL operators special?
----------------------------------------------

Unlike many databases:
	- Operators are **typed**
	- Operators can be **overloaded**
	- You can **create your own operators**
	- Operators are backed by **functions**
	- Operators can be indexed
	- Operators integrate deeply with **indexes, JSON, arrays, FTS, GIS**

================================================================================================================================

2️⃣ Basic operator categories
--------------------------------

**Comparison operators**

.. code-block:: postgres 

    =   <>   !=   <   <=   >   >=

Example: 

.. code-block:: postgres 

    SELECT * FROM users WHERE age >= 18;

================================================================================================================================

**Logical operators**

.. code-block:: postgres 

    AND   OR   NOT

Example:

.. code-block:: postgres 

    WHERE active = true AND deleted = false;

================================================================================================================================

**String operators**

.. code-block:: postgres 

    ||     -- concatenate
    LIKE
    ILIKE

Example: 

.. code-block:: postgres 

    SELECT first_name || ' ' || last_name FROM users;

================================================================================================================================

3️⃣ Array operators (very PostgreSQL-specific)
-----------------------------------------------

.. code-block:: postgres 

    @>   contains
    <@   is contained by
    &&   overlaps

Example:

.. code-block:: postgres 

    SELECT * FROM posts
    WHERE tags @> ARRAY['database'];

================================================================================================================================

4️⃣ JSON / JSONB operators (huge feature)
-------------------------------------------

.. code-block:: postgres 

    ->    get JSON object
    ->>   get text
    @>    contains
    ?     key exists

Example: 

.. code-block:: postgres 

    SELECT data->>'email'
    FROM users
    WHERE data @> '{"verified": true}';

These operators are **indexable** with GIN indexes.

================================================================================================================================

5️⃣ Range operators
-------------------------

Used with range types (int4range, tsrange, etc.)

.. code-block:: postgres 

    @>   contains
    &&   overlaps

Example: 

.. code-block:: postgres 

    SELECT *
    FROM bookings
    WHERE period && tsrange('2025-01-01', '2025-01-10');

================================================================================================================================

6️⃣ Pattern matching operators
---------------------------------

.. code-block:: postgres 

    ~     regex match
    ~*    regex match (case-insensitive)
    !~    regex NOT match

Example:

.. code-block:: postgres 

    SELECT *
    FROM users
    WHERE email ~* '^[a-z0-9._%+-]+@example\.com$';

================================================================================================================================

7️⃣ Why Operators appear in pgAdmin
-------------------------------------

Because operators are stored in system catalogs:
	•	pg_operator
	•	Linked to:
	•	left type
	•	right type
	•	result type
	•	implementation function

Example (simplified):

.. code-block:: postgres 

    SELECT *
    FROM pg_operator
    WHERE oprname = '@>';

================================================================================================================================

8️⃣ Creating your own operator (advanced)
-------------------------------------------

PostgreSQL allows custom operators.

Step 1: Create a function

.. code-block:: postgres

    CREATE FUNCTION int_is_even(int)
    RETURNS boolean
    LANGUAGE sql
    AS $$
        SELECT $1 % 2 = 0;
    $$;

Step 2: Create operator

.. code-block:: postgres

    CREATE OPERATOR ## (
        RIGHTARG = int,
        PROCEDURE = int_is_even
    );

Use it

.. code-block:: postgres

    SELECT 10 ##;  -- true
    SELECT 7  ##;  -- false

This is why operators are real database objects.

================================================================================================================================

9️⃣ Operators + Indexes (important)
---------------------------------------

PostgreSQL indexes support **specific operators.**

Example:
	- B-tree supports: = < > <= >=
	- GIN supports: @> ? &&
	- GiST supports: spatial and range operators

This is why **operator choice affects performance.**

================================================================================================================================

🔟 When should you care deeply about operators?
---------------------------------------------------

You should care if you are:
	- Designing APIs directly on PostgreSQL
	- Using JSONB heavily
	- Using arrays or ranges
	- Building search systems
	- Using PostgREST or Hasura
	- Designing custom domains and constraints
	- Optimizing query performance

================================================================================================================================


Summary
    Operators in PostgreSQL are typed, index-aware, extensible database objects that define how values interact.











