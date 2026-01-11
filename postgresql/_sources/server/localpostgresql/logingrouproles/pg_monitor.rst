|pg_groups| pg_monitor
=========================

.. |pg_groups| image:: /_static/images/sidebar_icons/pg_groups.png

---------------------
What is pg_monitor?
---------------------

pg_monitor allows a role to view PostgreSQL performance, activity, and statistics — without modifying data.

Think of it as:

**Read-only access to the database internals**

-------------------------
What pg_monitor CAN do
-------------------------

With pg_monitor, a role can:

See activity
	- pg_stat_activity
	- Active queries
	- Long-running queries
	- Connection counts
	- Backend states (idle, active, waiting)

See performance stats
	- pg_stat_database
	- pg_stat_user_tables
	- pg_stat_user_indexes
	- Buffer hits
	- I/O statistics
	- Index usage

See locks & waits
	- pg_locks
	- Blocking queries
	- Deadlock diagnosis

See configuration (read-only)
	- Some server settings via:
	- pg_settings
	- pg_stat_bgwriter

=======================================================================================================================

❌ What pg_monitor CANNOT do
	- ❌ Read table data
	- ❌ Modify data
	- ❌ Execute commands
	- ❌ Kill backends
	- ❌ Access filesystem
	- ❌ Execute OS programs

It is **observational only**

-----------------------------------
Why PostgreSQL created pg_monitor
-----------------------------------

Before pg_monitor, DBAs had two bad choices:
	- Grant superuser ❌ (too dangerous)
	- Grant nothing ❌ (no visibility)

pg_monitor solves this:
    - ✔ Safe
    - ✔ Auditable
    - ✔ Least-privilege
    - ✔ Perfect for dashboards & tooling

**Internally, pg_monitor includes**

It automatically grants:
	- pg_read_all_settings
	- pg_read_all_stats

So you don’t need to grant those individually.

=======================================================================================================================

Example: Who should get pg_monitor?

✅ Good candidates
	- Monitoring tools (Prometheus exporters)
	- Read-only DBA accounts
	- Performance dashboards (Grafana)
	- SRE / Ops teams
	- Support engineers

❌ Bad candidates
	- Application users
	- Web apps
	- ETL users
	- Untrusted users

Example Queries

.. code-block:: postgres 

    SELECT * FROM pg_stat_activity;

.. code-block:: postgres 

    SELECT * FROM pg_stat_user_tables;

.. code-block:: postgres 

    SELECT * FROM pg_locks;

All of these work with pg_monitor.

=======================================================================================================================

-----------------
How to grant it 
-----------------

.. code-block:: postgres 

    GRANT pg_monitor TO monitoring_user;

✔ Safe

✔ Reversible

✔ No data exposure

**Mental Model**

.. list-table::
    :header-rows: 1

    * - Role
      - Meaning
    * - pg_monitor
      - 👀 “I can see what’s happening”
    * - pg_read_all_data
      - 📖 “I can read all data”
    * - pg_write_all_data
      - ✍️ “I can change data”
    * - pg_execute_server_program
      - 💣 “I can run OS commands”

☁️ Cloud & Production Notes
	- AWS RDS → pg_monitor is allowed
	- Azure PostgreSQL → allowed
	- GCP Cloud SQL → allowed
	- Kubernetes / self-hosted → recommended

It’s the **preferred monitoring role** in production systems.

Summary
	- pg_monitor = Read-only monitoring access
	- Safe
	- Non-destructive
	- Ideal for observability
	- Designed for modern DB operations

