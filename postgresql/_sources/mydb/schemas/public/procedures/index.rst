|procedures| Procedures
=========================

.. |procedures| image:: /_static/images/sidebar_icons/procedures.png

-------------------------
Procedures (PostgreSQL)
-------------------------

**1️⃣ What is a Procedure?**

A **procedure** is a database object that:
	- Runs **server-side logic**
	- Can contain **multiple SQL statements**
	- Can **control transactions** (COMMIT, ROLLBACK)
	- Is called using **CALL**, not SELECT

Procedures are for **doing things**, not for returning values.

=================================================================================================

2️⃣ Procedure vs Function
--------------------------

.. list-table:: 
    :header-rows: 1

    * - Feature
      - Function
      - Procedure
    * - Invocation
      - SELECT my_func()
      - CALL my_proc()
    * - Returns value
      - ✅ Yes
      - ❌ No (can use OUT params)
    * - Can use COMMIT / ROLLBACK
      - ❌ No
      - ✅ Yes
    * - Used in queries
      - ✅ Yes
      - ❌ No
    * - Typical use
      - Calculations, transformations
      - Business workflows

Rule of thumb
	- **Functions** → compute
	- **Procedures** → operate

=================================================================================================

3️⃣ Why PostgreSQL added Procedures (PG 11+)
------------------------------------------------

Before PostgreSQL 11:
	- Everything had to be a function
	- No transaction control inside logic

Procedures were added to support:
	- Multi-step workflows
	- Batch jobs
	- Data migrations
	- ETL logic
	- Admin tasks

=================================================================================================

4️⃣ Simple Procedure Example
---------------------------------

.. code-block:: postgres 

    CREATE PROCEDURE log_message(msg text)
    LANGUAGE plpgsql
    AS $$
    BEGIN
        INSERT INTO logs(message, created_at)
        VALUES (msg, now());
    END;
    $$;

Call it:

.. code-block:: postgres 

    CALL log_message('System started');

=================================================================================================

5️⃣ Procedure with transaction control
----------------------------------------

This is **the killer feature.**

.. code-block:: postgres 

    CREATE PROCEDURE transfer_money(
        from_id int,
        to_id int,
        amount numeric
    )
    LANGUAGE plpgsql
    AS $$
    BEGIN
        UPDATE accounts SET balance = balance - amount WHERE id = from_id;
        UPDATE accounts SET balance = balance + amount WHERE id = to_id;

        COMMIT;
    EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE;
    END;
    $$;

**Functions cannot do this**

=================================================================================================

6️⃣ Procedure with OUT parameters
------------------------------------

Procedures can **output values**, but not like functions.

.. code-block:: postgres 

    CREATE PROCEDURE get_stats(
        OUT total_users int,
        OUT total_orders int
    )
    LANGUAGE sql
    AS $$
        SELECT
            (SELECT count(*) FROM users),
            (SELECT count(*) FROM orders);
    $$;

Call: 

.. code-block:: postgres

    CALL get_stats(NULL, NULL);

=================================================================================================

7️⃣ Why Procedures appear in pgAdmin
---------------------------------------

They are stored in system catalogs:
	- pg_proc
	- Differentiated by prokind = 'p'

pgAdmin shows them separately because:
	- Different execution model
	- Different permissions
	- Different use cases

=================================================================================================

8️⃣ Permissions & security
-----------------------------

You can control who can call procedures:

.. code-block:: postgres 

    REVOKE ALL ON PROCEDURE transfer_money FROM PUBLIC;
    GRANT EXECUTE ON PROCEDURE transfer_money TO app_role;

This is **very important for production safety.**

=================================================================================================

9️⃣ Procedures vs Triggers vs Jobs
------------------------------------

.. list-table::
    :header-rows: 1

    * - Use case
      - Best choice
    * - Inline logic per row
      - Trigger
    * - Reusable computation
      - Function
    * - Multi-step workflow
      - Procedure
    * - Scheduled task
      - Procedure + cron/pg_cron

=================================================================================================

🔟 When should you use Procedures?
-------------------------------------

Use procedures when you need:
	-  Multi-step database workflows
	- xplicit transaction control
	- Admin or maintenance tasks
	- Controlled side-effects
	- Clean separation of business logic

Avoid procedures when:
	- You need values inside queries
	- You need immutability
	- You need index usage

=================================================================================================

Summary
    A PostgreSQL procedure is a transaction-capable server-side routine designed for executing workflows, not returning values.











