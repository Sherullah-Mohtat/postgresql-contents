|materialize_views| Materialized Views
=========================================

.. |materialize_views| image:: /_static/images/sidebar_icons/materialize_views.png

---------------------------------
Materialized Views (PostgreSQL)
---------------------------------

A **Materialized View** is a **stored, physical snapshot of a query result.**

Think of it as:
    “A table that is automatically created from a SELECT query.”

================================================================================================================

1️⃣ Why Materialized Views exist
-----------------------------------

Normal VIEW:
	- Stores **only the query**
	- Executes the query **every time**
	- Always up to date
	- Can be slow for heavy queries

MATERIALIZED VIEW:
	- Stores **the query result**
	- Query runs **once**
	- Data is **cached**
	- Extremely fast to read
	- Must be **manually refreshed**

================================================================================================================

2️⃣ Normal View vs Materialized View
---------------------------------------

.. list-table::
    :header-rows: 1

    * - Feature
      - View
      - Materialized View
    * - Data stored
      - ❌ No
      - ✅ Yes
    * - Speed
      - Slow (recomputed)
      - Fast (precomputed)
    * - Always fresh
      - ✅ Yes
      - ❌ No
    * - Can index
      - ❌ No
      - ✅ Yes
    * - Needs refresh
      - ❌ No
      - ✅ Yes

================================================================================================================

3️⃣ Simple example
--------------------

**Base table**

.. code-block:: postgres 

    CREATE TABLE orders (
        id serial,
        amount numeric,
        created_at date
    );

**Create a MATERIALIZED VIEW**

.. code-block:: postgres 

    CREATE MATERIALIZED VIEW daily_sales AS
    SELECT
        created_at,
        SUM(amount) AS total_sales
    FROM orders
    GROUP BY created_at;

✅ PostgreSQL runs this query once

✅ Stores the result like a table

================================================================================================================

**Query it**

.. code-block:: postgres 

    SELECT * FROM daily_sales;

Very fast — no aggregation happens now.

4️⃣ Refreshing a materialized view
------------------------------------

Because data is **not automatic**, you must refresh it.

**Manual refresh**

.. code-block:: postgres 

    REFRESH MATERIALIZED VIEW daily_sales;

================================================================================================================

**Non-blocking refresh (important)**

.. code-block:: postgres 

    REFRESH MATERIALIZED VIEW CONCURRENTLY daily_sales;

Requires a **unique index**

.. code-block:: postgres 

    CREATE UNIQUE INDEX ON daily_sales (created_at);

5️⃣ Indexing Materialized Views (huge benefit)
-----------------------------------------------

Unlike normal views, you **CAN index** materialized views.

.. code-block:: postgres 

    CREATE INDEX idx_daily_sales_date
    ON daily_sales (created_at);

This makes reporting queries extremely fast.

================================================================================================================

6️⃣ When should you use Materialized Views?
--------------------------------------------

✅ Use them when:
	- Heavy JOIN + GROUP BY
	- Reporting dashboards
	- Analytics queries
	- Read-heavy systems
	- Data changes less frequently
	- You want predictable performance

❌ Avoid them when:
	- Data must always be real-time
	- Writes are extremely frequent
	- You forget to refresh

================================================================================================================

7️⃣ Typical production patterns
---------------------------------

1. Nightly refresh (cron / scheduler)

.. code-block:: postgres 

    REFRESH MATERIALIZED VIEW daily_sales;

2. Event-based refresh
	- After ETL
	- After batch imports

3. Layered architecture

.. code-block:: bash 

    Tables → Materialized Views → API / Dashboard

================================================================================================================

8️⃣ Permissions & security
------------------------------

Materialized views behave like tables:
	- You can GRANT SELECT
	- You can apply **RLS**
	- You can hide base tables from users

.. code-block:: postgres 

    GRANT SELECT ON daily_sales TO reporting_role;

9️⃣ Common mistakes
----------------------

- ❌ Forgetting to refresh
- ❌ Using materialized views for transactional data
- ❌ Not using CONCURRENTLY in production
- ❌ Not indexing them

================================================================================================================

Summary
    A Materialized View is a stored, indexable snapshot of a query that trades freshness for speed and scalability.



