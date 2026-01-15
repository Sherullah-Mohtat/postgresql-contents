|aggregates| Aggregates
=========================

.. |aggregates| image:: /_static/images/sidebar_icons/aggregates.png

--------------------------------------
What are Aggregates (in PostgreSQL)?
--------------------------------------

An aggregate is a function that:
    Takes many rows → produces one result

In simple words:
    “Summarize data”


**Common aggregates you already know**

These are built-in aggregates (they live here):

.. list-table::
    :header-rows: 1

    * - Aggregate
      - What it does
    * - COUNT()
      - Number of rows
    * - SUM()
      - Total value
    * - AVG()
      - Average
    * - MIN()
      - Smallest value
    * - MAX()
      - Largest value
    * - BOOL_AND()
      - All true?
    * - BOOL_OR()
      - Any true?

Example:

.. code-block:: postgres 

    SELECT COUNT(*) FROM users;

Takes many user rows → returns **one number**

==============================================================================================================

Why pgAdmin shows “Aggregates” separately

Because in PostgreSQL:
	- Aggregates are **schema objects**
	- They are not “just functions”
	- They can be **custom-defined**

So PostgreSQL treats them as **first-class database objects**

**Difference: Function vs Aggregate**

.. list-table::
    :header-rows: 1

    * - Function
      - Aggregate
    * - Works on 1 row
      - Works on many rows
    * - LOWER(name)
      - COUNT(name)
    * - Called per row
      - Called per group
    * - Simple
      - Stateful

==============================================================================================================

-----------------------------------------
How aggregates actually work internally
-----------------------------------------

An aggregate has 3 phases:
    #. State initialization
    #. State transition (per row)
    #. Final result

Example: SUM(amount)
	- Start at 0
	- Add each amount
	- Return final value

**Example with GROUP BY**

.. code-block:: postgres 

    SELECT department, COUNT(*)
    FROM employees
    GROUP BY department;

.. list-table::
    :header-rows: 1

    * - department
      - count
    * - IT
      - 5
    * - HR
      - 2

Each group uses the aggregate separately

==============================================================================================================

**Custom Aggregates (advanced but powerful)**

You can define your own aggregate:

Example idea:
	- Median
	- Custom weighted score
	- JSON merge
	- Financial rollups

Very simplified example (conceptual):

.. code-block:: postgres 

    CREATE AGGREGATE my_sum(integer) (
        SFUNC = int4pl,
        STYPE = integer
    );

Used in advanced analytics systems, not day-one apps.

==============================================================================================================

**Security & schema rule**

Never create app aggregates in public in production

Why?
	- Aggregates affect query planning
	- Can override built-ins
	- Can cause unexpected behavior

Best practice:

.. code-block:: postgres 

    analytics.sum_revenue()

instead of:

.. code-block:: postgres 

    public.sum_revenue()


**Mental model**

Aggregates are “reducers”

They collapse many rows into one meaning.

==============================================================================================================

-----------------------------
Anatomy of CREATE AGGREGATE 
-----------------------------

Before examples, understand this **once:**

.. code-block:: postgres 

    CREATE AGGREGATE name (input_type) (
        SFUNC     = state_function,
        STYPE     = state_type,
        INITCOND  = initial_value,   -- optional
        FINALFUNC = final_function   -- optional
    );

**Meaning**

.. list-table:: 
    :header-rows: 1

    * - Part
      - Purpose
    * - STYPE
      - Type of internal state
    * - SFUNC
      - Runs once per row
    * - INITCOND
      - Initial state value
    * - FINALFUNC
      - Converts state → final output

==============================================================================================================

🟢 Example 1: Custom SUM (integer)

Step 1: State function

.. code-block:: postgres 

    CREATE OR REPLACE FUNCTION my_int_sum(state integer, value integer)
    RETURNS integer
    LANGUAGE sql
    AS $$
        SELECT COALESCE(state, 0) + COALESCE(value, 0);
    $$;

Step 2: Aggregate

.. code-block:: postgres 

    CREATE AGGREGATE my_sum(integer) (
        SFUNC = my_int_sum,
        STYPE = integer,
        INITCOND = 0
    );

Usage

.. code-block:: postgres

    SELECT my_sum(salary) FROM employees;

==============================================================================================================

🟢 Example 2: STRING CONCAT Aggregate (custom GROUP_CONCAT)

(PostgreSQL already has string_agg, but this teaches the concept.)

State function

.. code-block:: postgres 

    CREATE OR REPLACE FUNCTION concat_state(state text, value text)
    RETURNS text
    LANGUAGE sql
    AS $$
        SELECT
            CASE
                WHEN state IS NULL THEN value
                ELSE state || ', ' || value
            END;
    $$;

Aggregate

.. code-block:: postgres 

    CREATE AGGREGATE my_concat(text) (
        SFUNC = concat_state,
        STYPE = text
    );

Usage 

.. code-block:: postgres 

    SELECT my_concat(name) FROM users;

==============================================================================================================

🟡 Example 3: Average (manual implementation)

State = (sum, count)

.. code-block:: postgres 

    CREATE TYPE avg_state AS (
        total numeric,
        count integer
    );

State transition

.. code-block:: postgres 

    CREATE OR REPLACE FUNCTION avg_sfunc(state avg_state, value numeric)
    RETURNS avg_state
    LANGUAGE sql
    AS $$
        SELECT
            (COALESCE(state.total, 0) + value,
            COALESCE(state.count, 0) + 1);
    $$;

Final function

.. code-block:: postgres 

    CREATE OR REPLACE FUNCTION avg_final(state avg_state)
    RETURNS numeric
    LANGUAGE sql
    AS $$
        SELECT state.total / state.count;
    $$;

Aggregate

.. code-block:: postgres 

    CREATE AGGREGATE my_avg(numeric) (
        SFUNC     = avg_sfunc,
        STYPE     = avg_state,
        FINALFUNC = avg_final
    );

Usage

.. code-block:: postgres 

    SELECT my_avg(price) FROM products;

==============================================================================================================

🔵 Example 4: MEDIAN (classic interview example)

State = array of numbers

.. code-block:: postgres 

    CREATE OR REPLACE FUNCTION median_state(state numeric[], value numeric)
    RETURNS numeric[]
    LANGUAGE sql
    AS $$
        SELECT array_append(state, value);
    $$;

Final function

.. code-block:: postgres 

    CREATE OR REPLACE FUNCTION median_final(state numeric[])
    RETURNS numeric
    LANGUAGE sql
    AS $$
        SELECT percentile_cont(0.5)
        WITHIN GROUP (ORDER BY x)
        FROM unnest(state) x;
    $$;

Aggregate

.. code-block:: postgres 

    CREATE AGGREGATE median(numeric) (
        SFUNC     = median_state,
        STYPE     = numeric[],
        INITCOND  = '{}',
        FINALFUNC = median_final
    );

Usage 

.. code-block:: postgres 

    SELECT median(salary) FROM employees;

==============================================================================================================

🔴 Example 5: JSON Merge Aggregate (very practical)

State function

.. code-block:: postgres 

    CREATE OR REPLACE FUNCTION json_merge(state jsonb, value jsonb)
    RETURNS jsonb
    LANGUAGE sql
    AS $$
        SELECT COALESCE(state, '{}'::jsonb) || value;
    $$;

Aggregate

.. code-block:: postgres 

    CREATE AGGREGATE json_merge_agg(jsonb) (
        SFUNC = json_merge,
        STYPE = jsonb,
        INITCOND = '{}'
    );

Usage 

.. code-block:: postgres 

    SELECT json_merge_agg(metadata)
    FROM events;

==============================================================================================================

**Production Rules**

❌ Do NOT create aggregates in public in prod

✔ Create a dedicated schema:

.. code-block:: postgres 

    CREATE SCHEMA analytics;

.. code-block:: postgres 

    CREATE AGGREGATE analytics.median(numeric) (...)

==============================================================================================================

When should you create custom aggregates?

- ✅ Analytics
- ✅ Reporting engines
- ✅ Financial rollups
- ✅ JSON / event systems
- ❌ Normal CRUD apps
- ❌ Beginner projects

==============================================================================================================

Mental Model

Aggregate = Function + Memory + Finalizer




