|rules| Rules 
===================

.. |rules| image:: /_static/images/sidebar_icons/rules.png

--------------------------------
What are Rules in PostgreSQL?
--------------------------------

In **PostgreSQL**, a **Rule** is:

**A query-rewrite mechanism**

PostgreSQL rewrites your SQL before execution.

Important:
	- Rules run **before triggers**
	- They **rewrite** the query itself
	- They are **not procedural logic**

Think of Rules as:
    “When the user runs THIS query, secretly replace it with THAT query.”

=============================================================================================================================

Where Rules sit in the stack

Execution order:

.. code-block:: bash 

    SQL statement
    ↓
    RULE SYSTEM (query rewrite)
    ↓
    RLS policies
    ↓
    Triggers
    ↓
    Actual execution

Rules happen **very early.**

=============================================================================================================================

---------------------------------------
Why Rules exist (historical context)
---------------------------------------

Rules were created originally to:
	- Implement **views**
	- Redirect writes to views
	- Support early updatable views

Today:
	- Mostly used **internally**
	- Rarely recommended for application logic

=============================================================================================================================

**Basic Rule example (SELECT rewrite)**

Suppose you want:

.. code-block:: postgres 

    SELECT * FROM students;

To secretly become:

.. code-block:: postgres 

    SELECT * FROM students WHERE active = true;

You can do:

.. code-block:: postgres 

    CREATE RULE students_only_active AS
    ON SELECT TO students
    DO INSTEAD
    SELECT * FROM students WHERE active = true;

Now:

.. code-block:: postgres 

    SELECT * FROM students;

returns only active students.

=============================================================================================================================

-----------------------
DO INSTEAD vs DO ALSO
-----------------------

DO INSTEAD
	- Replaces the original query

DO ALSO
	- Runs **in addition** to the original query

Example:

.. code-block:: postgres 

    CREATE RULE log_student_insert AS
    ON INSERT TO students
    DO ALSO
    INSERT INTO student_logs(student_id, action)
    VALUES (NEW.id, 'insert');

=============================================================================================================================

**Rules with INSERT (redirect writes)**

Classic use case: **updatable views**

.. code-block:: postgres 

    CREATE VIEW students_public AS
    SELECT id, name FROM students;

Now allow inserts into the view:

.. code-block:: postgres 

    CREATE RULE students_public_insert AS
    ON INSERT TO students_public
    DO INSTEAD
    INSERT INTO students (name)
    VALUES (NEW.name);

This is how PostgreSQL made views “writable” before triggers existed.

=============================================================================================================================

**Rules vs Triggers (VERY IMPORTANT)**

.. list-table::
    :header-rows: 1

    * - Feature
      - Rules
      - Triggers
    * - Timing
      - Before execution
      - During execution
    * - Behavior
      - Rewrite query
      - Run procedural code
    * - Row-level
      - ❌ No
      - ✅ Yes
    * - Predictable
      - ❌ Hard
      - ✅ Clear
    * - Modern usage
      - ⚠️ Rare
      - ✅ Standard

99% of the time, you want triggers, not rules

=============================================================================================================================

**Rules vs RLS**

.. list-table:: 
    :header-rows: 1

    * - Feature
      - Rules
      - RLS
    * - Purpose
      - Rewrite queries
      - Enforce security
    * - Security
      - ❌ Unsafe
      - ✅ Strong
    * - Row visibility
      - ❌ Indirect
      - ✅ Guaranteed
    * - Recommended
      - ❌ No
      - ✅ Yes

Rules **do not replace RLS.**

=============================================================================================================================

---------------------------
Why Rules are dangerous
---------------------------

**1. They are invisible**

.. code-block:: postgres 

    SELECT * FROM students;

You **cannot tell** what rule rewrote it.

2. Hard to debug
	- EXPLAIN may not show intent clearly
	- Complex rewrite chains

**3. Can break expectations**

Multiple rules can fire and interact unexpectedly.

=============================================================================================================================

**When Rules are acceptable**

✔ Internal PostgreSQL features

✔ Very simple, read-only views

✔ Legacy systems

❌ Business logic

❌ Security

❌ Auditing

❌ Multi-tenant filtering


**PostgreSQL’s own recommendation**

PostgreSQL documentation clearly implies:
    Use triggers instead of rules for most tasks.

pgAdmin: What you’re seeing

In your tree:

.. code-block:: bash 

    students
    └── Rules

This folder exists because:
	- PostgreSQL supports rules
	- But most tables have zero rules

That’s normal.

================================================================================================

**Rule lifecycle**

.. code-block:: postgres 

    -- create
    CREATE RULE ...

    -- view
    SELECT * FROM pg_rules WHERE tablename = 'students';

    -- drop
    DROP RULE rule_name ON students;

**Mental model (remember this)**

Rules rewrite SQL text

Triggers react to data changes

If you need:
	- Logic → Trigger
	- Security → RLS
	- Aggregation → View / Materialized View
	- API → RLS + functions

**Final guidance (important)**

For modern PostgreSQL systems:
	- ❌ Avoid Rules
	- ✅ Use Triggers
	- ✅ Use RLS
	- ✅ Use Views (read-only)
	- ✅ Use Materialized Views for performance





