|indexes| Indexes 
======================

.. |indexes| image:: /_static/images/sidebar_icons/indexes.png

--------------------
What are Indexes?
--------------------

In PostgreSQL, an index is:
    A data structure that allows PostgreSQL to find rows quickly without scanning the entire table.

Think of it like:
	- Book index → jump to a page
	- Memory shortcut → avoid slow searching

Without indexes → PostgreSQL reads **every row.**

======================================================================================================================

-------------------------------
Where indexes live (pgAdmin)
-------------------------------

.. code-block:: bash 

    students
    └── Indexes
        ├── students_pkey
        ├── students_email_key
        └── custom_indexes...

Important:
	- Primary Key = index
	- Unique constraint = index
	- Other indexes are manual

======================================================================================================================

----------------------------------
Why indexes exist (core problem)
----------------------------------

Without index

.. code-block:: postgres 

    SELECT * FROM students WHERE email = 'john@example.com';

PostgreSQL must:
	- Scan **every student**
	- Compare email one-by-one

This is **O(n)** → slow as table grows.

======================================================================================================================

**With index**

PostgreSQL:
	- Uses a **B-tree**
	- Jumps directly to the row

This is **O(log n)** → fast at scale.


======================================================================================================================

-------------------------
Indexes vs Constraints
-------------------------

.. list-table:: 
    :header-rows: 1

    * - Feature
      - Constraint
      - Index
    * - Enforces rules
      - ✅ Yes
      - ❌ No
    * - Improves speed
      - ❌ No
      - ✅ Yes
    * - Protects data
      - ✅ Yes
      - ❌ No
    * - Optional
      - ❌
      - ✅

Constraints = correctness

Indexes = performance

======================================================================================================================

---------------------------------
Common index types (must-know)
---------------------------------

1️⃣ B-tree (default, most important)
-------------------------------------

Used for:
	- =
	- <, >, <=, >=
	- ORDER BY
	- JOIN

Example

.. code-block:: postgres 

    CREATE INDEX idx_students_last_name
    ON students(last_name);

When PostgreSQL uses it

.. code-block:: postgres

    WHERE last_name = 'Smith'
    ORDER BY last_name

90% of indexes are B-tree.

======================================================================================================================

2️⃣ Unique index (automatic)
-----------------------------

Created by:

.. code-block:: postgres 

    UNIQUE (email)

Behind the scenes:

.. code-block:: postgres 

    CREATE UNIQUE INDEX ...

Guarantees:
	- No duplicates
	- Fast lookups

======================================================================================================================

3️⃣ Composite index (multi-column)
------------------------------------

Example

.. code-block:: postgres 

    CREATE INDEX idx_students_name
    ON students(last_name, first_name);

Used when:

.. code-block:: postgres 

    WHERE last_name = 'Smith'
    AND first_name = 'John';

⚠ Order matters:
	- (last_name, first_name) ≠ (first_name, last_name)

======================================================================================================================

4️⃣ Partial index (advanced but powerful)
-------------------------------------------

Index only part of the table.

Example

.. code-block:: postgres 

    CREATE INDEX idx_active_students
    ON students(enrollment_year)
    WHERE enrollment_year >= 2020;

Benefits:
	- Smaller index
	- Faster queries
	- Less memory

Used when:

.. code-block:: postgres 

    WHERE enrollment_year >= 2020;

======================================================================================================================

5️⃣ Expression index
----------------------

Index computed values.

Example

.. code-block:: postgres 

    CREATE INDEX idx_students_lower_email
    ON students (LOWER(email));

Used when:

.. code-block:: postgres 

    WHERE LOWER(email) = 'john@example.com';

Without this → index NOT used.

======================================================================================================================

How to see indexes in SQL

.. code-block:: postgres 

    SELECT indexname, indexdef
    FROM pg_indexes
    WHERE tablename = 'students';

-----------------------------------------
How PostgreSQL decides to use an index
-----------------------------------------

It uses the **query planner**, based on:
	- Table size
	- Index selectivity
	- Statistics

To inspect:

.. code-block:: postgres 

    EXPLAIN ANALYZE
    SELECT * FROM students WHERE email = 'john@example.com';

Look for:

.. code-block:: bash 

    Index Scan using students_email_key

❌ If you see:

.. code-block:: bash 

    Seq Scan

→ no index used.

======================================================================================================================

**Indexes are NOT free (important warning)**

Indexes cost:
	- Disk space
	- Slower INSERT / UPDATE / DELETE
	-  Memory (cache)

Do not **index everything**

**Index best practices (production rules)**

✔ Index columns used in WHERE

✔ Index columns used in JOIN

✔ Index columns used in ORDER BY

✔ Avoid indexing low-cardinality columns (e.g. gender)

✔ Measure with EXPLAIN ANALYZE

======================================================================================================================

**Students table: realistic index set**

.. code-block:: postgres 

    -- Already exists (primary key)
    students_pkey

    -- Already exists (unique)
    students_email_key

    -- Useful additions
    CREATE INDEX idx_students_last_name
    ON students(last_name);

    CREATE INDEX idx_students_enrollment_year
    ON students(enrollment_year);

This supports:
	- Search
	- Filtering
	- Sorting
	- Pagination







