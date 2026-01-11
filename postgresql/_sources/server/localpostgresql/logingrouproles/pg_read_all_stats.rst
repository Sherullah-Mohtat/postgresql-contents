|pg_groups| pg_read_all_stats
=================================

.. |pg_groups| image:: /_static/images/sidebar_icons/pg_groups.png

----------------------------
What is pg_read_all_stats?
----------------------------

pg_read_all_stats is a built-in role that allows a user to read all PostgreSQL runtime statistics.

In simple words:
    👀 “I can see what the database is doing right now and what it has been doing.”

-------------------------------
What pg_read_all_stats CAN do
-------------------------------

A role with this privilege can read all statistics views, even for objects it does not own.

**Access to key system views**

Including (but not limited to):
    Session & activity

.. code-block:: bash 

    pg_stat_activity

- Active queries
- Idle connections
- Long-running queries
- Blocked sessions

**Table statistics**

.. code-block:: bash 

    pg_stat_user_tables
    pg_stat_all_tables

- Sequential scans
- Index scans
- Dead tuples
- Vacuum / analyze counts

**Index statistics**

.. code-block:: bash 

    pg_stat_user_indexes
    pg_stat_all_indexes

- Index usage
- Index hit ratios

**I/O and background writer**

.. code-block:: bash 

    pg_stat_bgwriter

- Checkpoints
- Buffer writes
- WAL activity

**WAL & replication**

.. code-block:: bash 

    pg_stat_replication
    pg_stat_wal

- Replication lag
- Streaming status

**Functions & statements (if enabled)**

.. code-block:: bash 

    pg_stat_user_functions
    pg_stat_statements

===========================================================================================

What it CANNOT do
	- ❌ Read table data
	- ❌ Modify anything
	- ❌ Kill queries
	- ❌ Change config
	- ❌ Access files

This role is **read-only telemetry.**

**Why this role exists**

Without it:
	- You only see stats for objects you own

With it:
	- You can monitor the **entire cluster**

Essential for:
	- DBAs
	- SREs
	- Monitoring tools
	- Performance analysis

Mental model
    pg_read_all_stats = **“Database CCTV camera”**

You see:
	- Who is doing what
	- When
	- How often
	- How expensive

But you **cannot interfere.**

===========================================================================================

Example

Without role

.. code-block:: postgres 

    SELECT * FROM pg_stat_activity;
    -- limited rows

Grant role

.. code-block:: postgres 

    GRANT pg_read_all_stats TO monitor_user;

After grant

.. code-block:: postgres

    SELECT pid, usename, query, state
    FROM pg_stat_activity;

✔ Full visibility

**Relationship with other roles**

.. list-table::
    :header-rows: 1

    * - Role
      - Purpose
    * - pg_read_all_settings
      - ⚙️ Read config
    * - pg_read_all_stats
      - 📊 Read stats
    * - pg_monitor
      - 👀 Both + more
    * - pg_signal_backend
      - 🔪 Control sessions

Important:
    pg_monitor **includes** pg_read_all_stats.

**Security considerations**

.. list-table:: 
    :header-rows: 1

    * - Risk
      - Level
    * - Data exposure
      - 🟢 None
    * - Query visibility
      - 🟡 Medium
    * - Business logic exposure
      - 🟡 Medium
    * - Server control
      - 🟢 None

It can expose:
	- Query text
	- Table names
	- Access patterns

Best practices
    - ✔ Grant to monitoring users
    - ✔ Grant to observability tools
    - ✔ Use with pg_read_all_settings
    - ❌ Avoid granting to app users

Typical real-world users
	- Datadog / Prometheus agents
	- Grafana dashboards
	- DBA read-only accounts
	- Incident response teams

Summary

.. list-table::
    :header-rows: 1

    * - Feature
      - Allowed
    * - Read stats
      - ✅
    * - View all sessions
      - ✅
    * - Read data
      - ❌
    * - Modify server
      - ❌
    * - Kill queries
      - ❌


