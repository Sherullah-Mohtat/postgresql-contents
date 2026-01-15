|functions| Functions
=======================

.. |functions| image:: /_static/images/sidebar_icons/functions.png

----------------------
What is a Function?
----------------------

A **function** is a reusable block of code stored in the database that:
	- Takes **inputs (parameters)**
	- Performs logic (SQL or another language)
	- **Returns a value** (scalar, row, or set of rows)

Think of it like a **method inside the database.**

========================================================================================================

Why functions exist
	- Reuse logic (DRY)
	- Encapsulate business rules
	- Reduce application-side code
	- Improve performance (fewer round-trips)
	- Use inside SELECT, WHERE, JOIN, indexes, triggers

========================================================================================================

-----------------------------------
Where functions appear in pgAdmin
-----------------------------------

Schemas → public → Functions

You’ll see:
	- Built-in functions (thousands)
	- Your custom SQL / PL functions
	- Aggregate helper functions (state/transition)

========================================================================================================

Basic function example (SQL)

.. code-block:: postgres 

    CREATE FUNCTION add_numbers(a int, b int)
    RETURNS int
    LANGUAGE sql
    AS $$
        SELECT a + b;
    $$;

Use it: 

.. code-block:: postgres 

    SELECT add_numbers(2, 3);  -- 5

========================================================================================================

--------------------
Function languages
--------------------

Functions can be written in different languages:

.. list-table:: 
    :header-rows: 1

    * - Language
      - Use case
    * - sql
      - Simple logic
    * - plpgsql
      - Complex logic, loops, conditions
    * - plpython3u
      - Advanced processing
    * - plpgsql (most common)
      - Default

Example with **PL/pgSQL:**

.. code-block:: postgres 

    CREATE FUNCTION is_even(n int)
    RETURNS boolean
    LANGUAGE plpgsql
    AS $$
    BEGIN
        RETURN n % 2 = 0;
    END;
    $$;

========================================================================================================

Returning rows (table functions)

.. code-block:: postgres 

    CREATE FUNCTION get_students()
    RETURNS TABLE(stname text)
    LANGUAGE sql
    AS $$
        SELECT stname FROM students;
    $$;

Use like a table:

.. code-block:: postgres 

    SELECT * FROM get_students();

========================================================================================================

-------------------
Function vs View
-------------------
.. list-table:: 
    :header-rows: 1

    * - Feature
      - Function
      - View
    * - Parameters
      - ✅
      - ❌
    * - Logic
      - Complex
      - Simple
    * - Reusable
      - ✅
      - Limited
    * - Can be indexed
      - ❌
      - ❌

========================================================================================================

------------------------
Function vs Procedure
------------------------

.. list-table:: 
    :header-rows: 1

    * - Feature
      - Function
      - Procedure
    * - Returns value
      - ✅
      - ❌
    * - Can be used in SELECT
      - ✅
      - ❌
    * - Supports transactions
      - ❌
      - ✅
    * - Called with
      - SELECT
      - CALL

Example procedure:

.. code-block:: postgres 

    CALL cleanup_old_data();

========================================================================================================

--------------------------------
Volatility (optimizer behavior)
--------------------------------

Every function has volatility:

.. list-table:: 
    :header-rows: 1

    * - Type
      - Meaning
    * - IMMUTABLE
      - Same input → same output
    * - STABLE
      - Same within a query
    * - VOLATILE
      - Can change anytime (default)

Example:

.. code-block:: postgres 

    CREATE FUNCTION square(n int)
    RETURNS int
    IMMUTABLE
    LANGUAGE sql
    AS $$ SELECT n * n $$;

========================================================================================================

------------------------------
Security: DEFINER vs INVOKER
------------------------------

By default, functions run as **caller.**

To run as owner:

.. code-block:: postgres 

    CREATE FUNCTION secure_fn()
    RETURNS text
    SECURITY DEFINER
    LANGUAGE sql
    AS $$ SELECT current_user $$;

Use carefully (privilege escalation risk).

========================================================================================================

Where functions are used
	- SELECT queries
	- CHECK constraints
	- Index expressions
	- Triggers
	- Aggregates
	- APIs (via `PostgREST <../../../../tutorial/.postgrest.html>`_, `Hasura <../../../../tutorial/.hasura.html>`_)

========================================================================================================

Summary:
    A PostgreSQL function is reusable, callable database logic that returns values and can be used like a built-in SQL feature.









